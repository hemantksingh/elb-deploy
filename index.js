'use strict'

import AWS from 'aws-sdk';
import ElasticBeanstalk from './src/elasticBeanstalk.js';


let eb = new AWS.ElasticBeanstalk({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "us-west-2",
    apiVersion: '2010-12-01'
});

let bean = new ElasticBeanstalk(eb);

let appName = "smbc-app",
    appVersionLabel = "smbc-app-1",
    environmentName = "smbc-env-1";

bean.checkDNSAvailability({CNAMEPrefix: appName})
    .then(data => bean.createApplication({
          ApplicationName: appName,
          Description: "Test application"
        })
      )
      .then(data => console.log(data))
      .catch(error => console.log(error.message));
