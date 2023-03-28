# [WIP] Atlassian Connect example app - Node edition

> **_NOTE:_**  This repository is in progress and is not ready yet.

## About
This repository contains an example [Express](https://expressjs.com/en/4x/api.html) server for building an [Atlassian Connect app](https://developer.atlassian.com/cloud/jira/platform/getting-started-with-connect/).
This app is aimed to help you to easily add your integration in Jira.

## Table of Contents
- [Pre-requisites](#pre-requisites)
- [Features](#features)
- [Getting started](#getting-started)
- [Running your application](#running-your-application)
- [Testing](#testing)
- [Getting help](#getting-help)
- [License](#license)

## Pre-requisites
- yarn
- docker & docker-compose
- ngrok account

## Features
- TBD

## Getting started
You can run this app in 3 simple steps:
- **Installing dependencies** - Run `yarn install` for installing all the dependencies for this app.

- **Tunneling** - For this purpose, we are using [ngrok](https://ngrok.com/docs/getting-started). You need to set the ngrok authtoken in the env file, so please make sure you have a ngrok account. 
Simply go to [ngrok](https://dashboard.ngrok.com/get-started/your-authtoken) and copy your authtoken and paste it in the [.env](./.env) file.

- **Running docker compose** - Then simply run `docker-compose up`. Once the docker finishes running, you can view the tunneled URL in the logs. 
![img.png](static/images/tunnel-output.png)

After you have the tunneled URL, check for the config in the url `/atlassian-connect.json`(`https://TUNNELED_URL/atlassian-connect.json`). This is the __app descriptor URL__ for uploading the app and installing in Jira.

## Installing the App
Go to your Jira instance and do the following steps:
- From the header menu, select Apps -> Manage your apps.
- Verify the filter is set to User-installed, and select Settings beneath the User-installed apps table.
- On the Settings pop-up, add Enable development mode and click Apply. Refresh the page. 
- On the right side of the header, there should now appear a button Upload app. Click it and enter the tunneled URL `/atlassian-connect.json`(`https://TUNNELED_URL/atlassian-connect.json`)
- Click Upload. 
- That's it! You're done. 🎉

## Running your application
- TBD

## Testing
We have added a basic end to end test for installing and uninstalling the app, using [playwright](https://playwright.dev/docs/intro). You can add your own test cases on top of it. 

To run the end to end test, please add the values for `ATLASSIAN_URL`, `JIRA_ADMIN_USERNAME` and `JIRA_ADMIN_PASSWORD` in the `.env` file. Then simply run `yarn test:e2e` in the terminal.

## Getting help
- TBD

## License
The project is available as open source under the terms of the [MIT License](./LICENSE).
