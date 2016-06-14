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

COPY src/gulpfile.babel.js /app/gulpfile.babel.js
COPY src/.babelrc /app/.babelrc

ENTRYPOINT ["npm", "run", "deploy"]
