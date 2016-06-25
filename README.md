# AWS Elastic Beanstalk application deployer

Create an AWS Elastic Beanstalk application environment and deploy to it using the AWS nodejs sdk. Environment variables required:
* AWS_ACCESS_KEY_ID
* AWS_SECRET_ACCESS_KEY


## Running the app

Prerequisites: `docker` or `node`

For docker

* make build
* make run

For node 

* npm install
* npm run package
* npm run start