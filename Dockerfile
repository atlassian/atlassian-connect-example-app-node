FROM node:lts-alpine as build

COPY . /app
WORKDIR /app

# Installing packages from lockfile
RUN yarn install --frozen-lockfile

# Only for dev instances, not for PROD
CMD ["yarn", "start"]
