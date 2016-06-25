FROM ubuntu:trusty

MAINTAINER Stockport IAG

RUN apt-get -qq update \
 	&& apt-get install -y \
 		nodejs npm \
 		vim \
   	&& apt-get clean -y \
 	&& rm -rf /var/lib/apt/lists/

COPY package.json /app/package.json
WORKDIR /app
RUN ["npm", "install"]
RUN ln -s /usr/bin/nodejs /usr/bin/node

COPY gulpfile.babel.js /app/gulpfile.babel.js
COPY .babelrc /app/.babelrc
COPY index.js /app/index.js
COPY Dockerrun.aws.json /app/Dockerrun.aws.json
COPY src /app/src

RUN ["npm", "run", "package"]
ENTRYPOINT ["npm", "run", "start"]
