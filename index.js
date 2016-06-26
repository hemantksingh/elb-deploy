'use strict'

import AWS from 'aws-sdk';
import ElasticBeanstalk from './src/elasticBeanstalk.js';
import ElbInfra from './src/elbInfra.js';

let eb = new AWS.ElasticBeanstalk({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "us-west-2",
    apiVersion: '2010-12-01'
});

let elbInfra = new ElbInfra(new ElasticBeanstalk(eb, new AWS.S3()));

elbInfra.deployApplication({
    appName: "odetofood",
    appDescription: "Ode to food",
    appVersionLabel: "v1.0.7",
    environmentName: "odetofood"
    });

/*
 TODO: Fix creating environment
 http://stackoverflow.com/questions/30140462/launchwaitcondition-failed-the-expected-number-of-ec2-instances-were-not-initia

elbInfra.createEnvironment({
    appName: "odetofoodtest",
    appDescription: "Testing application and environment creation",
    appVersionLabel: "v1.0.0",
    environmentName: "odetofoodtest-env"
    });
*/

