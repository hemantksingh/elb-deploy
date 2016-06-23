import 'babel-polyfill';

class ElasticBeanstalk {

  constructor(eb){
    this.eb = eb;
  }

  checkDNSAvailability(detail) {
    this.eb.checkDNSAvailability(detail, (err, data) => {
      return new Promise((resolve, reject) => {
          if (err) reject (Error(err));
          else resolve(data);
      });
    });
  }

  start() {
    return new Promise((resolve, reject) => {
      resolve("Started..........");
    });
  }

}

export default ElasticBeanstalk;
