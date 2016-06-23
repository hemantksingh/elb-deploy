import 'babel-polyfill';

class ElasticBeanstalk {

  constructor(eb){
    this.eb = eb;
  }

  checkDNSAvailability(detail) {
    return new Promise((resolve, reject) => {
        this.eb.checkDNSAvailability(detail, (err, data) => {
          if (err) reject(err);
          else resolve(data);
        });
    });
  }

}

export default ElasticBeanstalk;
