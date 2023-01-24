FROM node:latest as build

COPY . /app
WORKDIR /app

# Installing packages
RUN yarn install --frozen-lockfile

CMD ["yarn", "start:dev"]
