# Atlassian Connect Node Example App

## About
This repository contains an example [Express](https://expressjs.com/en/4x/api.html) server for building an [Atlassian Connect app](https://developer.atlassian.com/cloud/jira/platform/getting-started-with-connect/).
This app is aimed to help you to easily add your integration in Jira.

## Table of Contents
- [Pre-requisites](#pre-requisites)
- [Getting started](#getting-started)
- [Manual Install](#manually-installing-the-app)
- [Running your application](#running-your-application)
- [Testing](#testing)
- [Getting help](#getting-help)
- [License](#license)

## Pre-requisites
- Install [Node.js](https://nodejs.org).
- Install [yarn](https://yarnpkg.com/getting-started/install) (optional).
- Install [Docker & Docker Compose](https://docs.docker.com/engine/install/).
- Create an [ngrok](https://ngrok.com/) account.
- Create an [Atlassian development site](http://go.atlassian.com/cloud-dev).

## Getting started

1. Install the dependencies.
   ```shell
   # If use Yarn (recommended)...
   yarn install
   # If use npm...
   npm install
   ```
2. Create `.env` file based on `.env.example` and set the environment variables.
3. Start the app and install it on Jira.
   ```shell
   docker-compose up
   ```

Please be patient as it will take a few minutes for everything to be setup. When everything is set up, you should see the URL in the terminal as in the picture below. ![img.png](static/images/tunnel-output.png)

> **Note:** _If you are using a free version of ngrok, please open the tunneled URL first. This needs to be done to bypass the ngrok browser warning. Just visit the ngrok warning page and just click on the Visit button._

At the very end, you can see the URL the index page of your app. Just open the URL and that's it, you're ready!

## Manually Installing the App

The above steps automatically installs the app, however you can only install one app at a time.

1. Go to your Jira instance.
2. Enable the installation of apps that are not listed on the Atlassian Marketplace.
    1. Go to **Apps** > **Manage your apps**.
    2. Click **User-installed apps** > **Settings**.
    3. Check **Enable development mode** and click **Apply**.
3. Reload the page.
4. Install the app.
    1. Click **Upload app**.
    2. Paste the link to your Connect descriptor (`${APP_URL}/atlassian-connect.json`) and
       click **Upload**.

That's it! You're done. 🎉

## Testing
We have added a basic end to end test for installing and uninstalling the app, using [playwright](https://playwright.dev/docs/intro). You can add your own test cases on top of it.

To run the end to end test, please add the values for `ATLASSIAN_URL`, `JIRA_ADMIN_EMAIL` and `JIRA_ADMIN_API_TOKEN` in the `.env` file. Then simply run `yarn test:e2e` in the terminal.

## Getting help
If you have feedback, found a bug or need some help, please create a [new issue in this repo](https://github.com/atlassian/atlassian-connect-example-app-node/issues/new/choose).

## License
The project is available as open source under the terms of the [MIT License](./LICENSE).
