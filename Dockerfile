FROM node:14.15.4-alpine3.12

ARG POSTGRES_USERNAME
ARG POSTGRES_PASSWORD

RUN apk add --no-cache bash

RUN npm install -g @nestjs/cli

USER node 

WORKDIR /home/node/app


