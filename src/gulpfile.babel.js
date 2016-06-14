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

    eb.checkDNSAvailability({
        CNAMEPrefix: "test-app-1"
      }, handleResponse
    );
});
