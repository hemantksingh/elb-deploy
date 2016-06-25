'use strict'

import AWS from 'aws-sdk';
import ElasticBeanstalk from './src/elasticBeanstalk.js';

let eb = new AWS.ElasticBeanstalk({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "us-west-2",
    apiVersion: '2010-12-01'
});

let bean = new ElasticBeanstalk(eb, new AWS.S3());

let appName = "odetofood",
    appDescription = "Ode to food",
    appVersionLabel = "v1.0.6",
    environmentName = "odetofood";

//TODO AutoGenerate S3 bucket key.
bean.uploadApplication({
    fileName: `${__dirname}/output.zip`,
    bucket: "elasticbeanstalk-us-west-2-514467551670",
    key: "2016162Erg-odetofood-aws.zip"
})
    .then(data => bean.createApplicationVersion({
        ApplicationName: appName,
        AutoCreateApplication: false,
        Description: appDescription,
        Process: true,
        SourceBundle: {
            S3Bucket: data.Bucket,
            S3Key: data.Key
        },
        VersionLabel: appVersionLabel
    }))
    .then(data => bean.updateEnvironment({
        EnvironmentName: environmentName,
        VersionLabel: data.ApplicationVersion.VersionLabel
    }))
    .then(data => console.log(data))
    .catch(error => console.log(error));