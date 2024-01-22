FROM node:lts-alpine as build

COPY . /app/spa
WORKDIR /app/spa

# Installing packages from lockfile
RUN yarn install --frozen-lockfile

EXPOSE 3010

# Only for dev instances, not for PROD
CMD ["yarn", "start"]
