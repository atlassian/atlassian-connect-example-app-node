# [WIP] atlassian-connect-sample-app-node

> **_NOTE:_**  This repository is in progress and is not ready yet.

## About
This repository contains a [Express](https://expressjs.com/en/4x/api.html) starter for building an [Atlassian Connect app](https://developer.atlassian.com/cloud/jira/platform/getting-started-with-connect/).
This app is aimed to help you to easily add your integration in Jira.

## Table of Contents
- [Features](#features)
- [Getting started](#getting-started)
- [Running your application](#running-your-application)
- [Testing](#testing)
- [Getting help](#getting-help)
- [License](#license)

## Features
- TBD

## Getting started
You can run this app in 3 simple steps:
- **Initial Setup** - Run `yarn setup` for the initial setup of the app. This command does two things: installs all the dependencies and sets up the env file for this app.

- **Tunneling** - For this purpose, we are using [ngrok](https://ngrok.com/docs/getting-started). You need to set the ngrok authtoken in the env file, so please make sure you have a ngrok account. 
Simply go to [ngrok](https://dashboard.ngrok.com/get-started/your-authtoken) and copy your authtoken and paste it in the [.env](./.env) file.

- **Running docker compose** - Then simply run `docker-compose up`. Once the docker finishes running, you can view the tunneled URL in the logs. 
![img.png](static/images/tunnel-output.png)

After you have the tunneled URL, check for the config in the url `/config`(`https://TUNNELED_URL/config`). This is the __app descriptor URL__ for uploading the app and installing in Jira.

## Running your application
- TBD

## Testing
- TBD

## Getting help
- TBD

## License
The project is available as open source under the terms of the [MIT License](./LICENSE).
