# yarn build
FROM node:14.17 AS build
WORKDIR /app
ADD ./ ./
RUN yarn install \
  && yarn build

# nginx image build
FROM docker.io/nginx:stable-alpine AS prod
ENV LANG C.UTF-8
ENV TZ Asia/Tokyo
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/
COPY --from=build /app/build/ /usr/share/nginx/html/

# for dev
FROM node:14.17 AS dev

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

WORKDIR /app
ADD package.json ./

RUN apt-get update \
  && yarn install \
  && sed -i -z 's/clearConsole(.*).*{.*}/clearConsole(){}/' ./node_modules/react-dev-utils/clearConsole.js

ENV HOST 0.0.0.0
ENV PORT 80
