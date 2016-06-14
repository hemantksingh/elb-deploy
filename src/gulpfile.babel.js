require('babel-core/register');

import gulp from 'gulp';
import AWS from 'aws-sdk';

gulp.task('deploy', () => {

    let handleResponse = (err, data) => {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data); // successful response
    };

    let eb = new AWS.ElasticBeanstalk({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: "us-west-2",
        apiVersion: '2010-12-01'
    });

    let appName = "smbc-app",
        appVersionLabel = "smbc-app-1",
        environmentName = "smbc-env-1";

    eb.checkDNSAvailability({
        CNAMEPrefix: appName
      }, (err, data) => {
        if (err) console.log(err, err.stack);
        else {
          console.log("Creating application..");
          eb.createApplication({
              ApplicationName: appName,
              Description: "Test application"
            }, (err, data) => {
              if (err) console.log(err, err.stack);
              else {
                  console.log("Creating application version..");
                  eb.createApplicationVersion({
                      ApplicationName: appName,
                      VersionLabel: appVersionLabel,
                      AutoCreateApplication: false,
                      Description: "Test application",
                      Process: true,
                      SourceBundle: {
                        S3Bucket: "elasticbeanstalk-us-west-2-514467551670",
                        S3Key: "201616526M-stockport-web-source.zip"
                      }
                    }, (err, data) => {
                      if (err) console.log(err, err.stack);
                      else {
                        console.log("Creating environment..");
                        eb.createEnvironment({
                            ApplicationName: appName,
                            CNAMEPrefix: appName,
                            EnvironmentName: environmentName,
                            SolutionStackName: "64bit Amazon Linux 2016.03 v2.1.1 running Multi-container Docker 1.9.1 (Generic)",
                            VersionLabel: appVersionLabel
                          }, handleResponse
                        );
                      }
                    }
                  );
              }
            }
          );
        }
      }
    );
});
