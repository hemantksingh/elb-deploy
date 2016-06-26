import "babel-polyfill";
import fs from "fs";

class ElasticBeanstalk {

    constructor(eb, s3) {
        this.eb = eb;
        this.s3 = s3;
    }

    checkDnsAvailability(detail) {
        return new Promise((resolve, reject) => {
            console.log("Checking DNS availability...");
            this.eb.checkDNSAvailability(detail, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            })
        });
    }

    createApplication(appDetail) {
        return new Promise((resolve, reject) => {
            console.log("Creating application...");
            this.eb.createApplication(appDetail, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            })
        });
    }

    createApplicationVersion(appDetail) {
        return new Promise((resolve, reject) => {
            console.log("Creating application version...");
            this.eb.createApplicationVersion(appDetail, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            })
        });
    }

    createEnvironment(detail) {
        return new Promise((resolve, reject) => {
            console.log("Creating environment...");
            this.eb.createEnvironment(detail, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            })
        });
    }

    uploadApplication(appDetail) {
        return new Promise((resolve, reject) => {
            console.log("Uploading application...");
            fs.readFile(appDetail.fileName, (err, data) => {
                if (err) throw err;

                this.s3.upload({
                    Bucket: appDetail.bucket,
                    Key: appDetail.key,
                    Body: data
                }, (err, data) => {
                    if (err) reject(err);
                    else resolve(data);
                })

            })
        });
    }
}

export default ElasticBeanstalk;