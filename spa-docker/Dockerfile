FROM node:lts-alpine as build

COPY ./spa /app/spa
WORKDIR /app/spa

RUN yarn install

EXPOSE 3010

CMD [ "yarn", "start" ]

