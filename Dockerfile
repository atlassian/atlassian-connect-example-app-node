FROM node:latest as build

COPY . /app
WORKDIR /app

# Installing packages
RUN yarn install --frozen-lockfile

# Only for dev instances, not for PROD
RUN yarn start
