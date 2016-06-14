FROM ubuntu:trusty

MAINTAINER Stockport IAG

RUN apt-get -qq update \
 	&& apt-get install -y \
 		nodejs npm \
 		vim \
   	&& apt-get clean -y \
 	&& rm -rf /var/lib/apt/lists/

COPY src/package.json /app/package.json
WORKDIR /app
RUN ["npm", "install"]
RUN ln -s /usr/bin/nodejs /usr/bin/node

COPY src/gulpfile.js /app/gulpfile.js
COPY src/env.yaml /app/env.yaml

ENTRYPOINT ["npm", "run", "deploy"]
