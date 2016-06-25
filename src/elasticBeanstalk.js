import "babel-polyfill";
import fs from "fs";

class ElasticBeanstalk {

    constructor(eb, s3) {
        this.eb = eb;
        this.s3 = s3;
    }

    checkDNSAvailability(detail) {
        return new Promise((resolve, reject) => {
            this.eb.checkDNSAvailability(detail, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            })
        });
    }

    createApplication(appDetail) {
        return new Promise((resolve, reject) => {
            this.eb.createApplication(appDetail, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            })
        });
    }

    updateApplicationVersion(appDetail) {
        return new Promise((resolve, reject) => {
            this.eb.updateApplicationVersion(appDetail, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            })
        });
    }

    uploadApplication(appDetail) {
        return new Promise((resolve, reject) => {
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