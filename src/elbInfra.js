class ElbInfra {

    constructor(elasticBeanstalk) {
        this.bean = elasticBeanstalk;
    }

    /**
     * Deploys an application to an existing environment.
     * @param detail
     * S3 is used to store the source copy of your application version,
     * so that if you need to scale-up, the new EC2 instance pulls a copy from S3.
     * TODO: AutoGenerate S3 bucket key.
     */
    deployApplication(detail) {
        this.bean.uploadApplication({
            fileName: detail.fileName,
            bucket: "elasticbeanstalk-us-west-2-514467551670",
            key: "2016162Erg-odetofood-aws.zip"
        })
            .then(data => this.bean.createApplicationVersion({
                ApplicationName: detail.appName,
                AutoCreateApplication: false,
                Description: detail.appDescription,
                Process: true,
                SourceBundle: {
                    S3Bucket: data.Bucket,
                    S3Key: data.Key
                },
                VersionLabel: detail.appVersionLabel
            }))
            .then(data => this.bean.updateEnvironment({
                EnvironmentName: detail.environmentName,
                VersionLabel: data.ApplicationVersion.VersionLabel
            }))
            .then(data => console.log(data))
            .catch(error => console.log("Failed to complete: " + error));
    }

    /**
     * Creates a new environment, with a specified app.
     * @param detail
     */
    createEnvironment(detail) {
        this.bean.checkDnsAvailability({CNAMEPrefix: detail.appName})
            .then(data => {
                if (data.Available === false)
                    return Promise.reject(`DNS name '${detail.appName}' is not available.`);
                return this.bean.createApplication({
                    ApplicationName: detail.appName,
                    Description: detail.appDescription
                });
            })
            .then(data => this.bean.uploadApplication({
                fileName: `${__dirname}/output.zip`,
                bucket: "elasticbeanstalk-us-west-2-514467551670",
                key: "2016162Erg-odetofoodtest-aws.zip"
            }))
            .then(data => this.bean.createApplicationVersion({
                ApplicationName: detail.appName,
                AutoCreateApplication: true,
                Description: detail.appDescription,
                Process: true,
                SourceBundle: {
                    S3Bucket: data.Bucket,
                    S3Key: data.Key
                },
                VersionLabel: detail.appVersionLabel
            }))
            .then(data => this.bean.createEnvironment({
                ApplicationName: detail.appName,
                CNAMEPrefix: detail.appName,
                EnvironmentName: detail.environmentName,
                SolutionStackName: detail.solutionStackName,
                VersionLabel: detail.appVersionLabel
            }))
            .then(data => console.log(data))
            .catch(error => console.log("Failed to complete: " + error));
    }
}

export default ElbInfra;