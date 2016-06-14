var gulp = require('gulp')
var AWS = require('aws-sdk')

gulp.task('deploy', function() {

    var  = function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data); // successful response
    };

    var eb = new AWS.ElasticBeanstalk({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: "us-west-2",
        apiVersion: '2010-12-01'
    });

    // eb.createApplicationVersion({
    //     ApplicationName: 'test-app',
    //     VersionLabel: 'test-app-1',
    //     AutoCreateApplication: true,
    //     Description: 'Test application',
    //     Process: true,
    //     SourceBundle: {
    //         S3Bucket: 'elasticbeanstalk-us-west-2-514467551670',
    //         S3Key: '201616526M-stockport-web-source.zip'
    //     }
    // }, handleResponse);

    eb.createConfigurationTemplate({
        ApplicationName: "test-app",
        SolutionStackName: "64bit Amazon Linux 2016.03 v2.1.1 running Multi-container Docker 1.9.1 (Generic)",
        TemplateName: "test-app-v1"
    }, handleResponse);

    // eb.composeEnvironments({
    //     ApplicationName: 'test-app',
    //     GroupName: 'Stockport',
    //     //SolutionStackName: "64bit Amazon Linux 2016.03 v2.1.1 running Multi-container Docker 1.9.1",
    //     VersionLabels: [
    //         'test-app-1',
    //         /* more items */
    //     ]
    // }, handleResponse);
});
