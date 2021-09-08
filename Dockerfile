FROM node:14.17

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

RUN apt-get update

WORKDIR /app
ADD package.json ./
RUN yarn install
RUN sed -i -z 's/clearConsole(.*).*{.*}/clearConsole(){}/' ./node_modules/react-dev-utils/clearConsole.js

ENV HOST 0.0.0.0
ENV PORT 80
