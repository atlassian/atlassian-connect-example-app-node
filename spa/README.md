# Overview

This is the front end of the Connect Node app in React. 

This React app renders the configuration flow of your Connect app. 

Reusable page components are included, plus examples.

# How to use the app

The front end React app should already be up if you ran `docker compose up`.

> **Note:** <br/> For development environment, this React app is proxied into the running node server.  <br/>However, for production environment, you'll need to create the build for the react app and make sure the environment variable NODE_ENV is set to "production".

# Run React app separately

In case you want to run the React app separately from docker, then follow the steps below:

1. **Run the Node app:** the Node app is the back end of your Connect app and handles requests from Jira. Use the command "yarn start" to start the app.

2. **Run the React app:** the React app is the front end of your Connect app and provides the user interface. Use the command “yarn start” from the SPA directory to start the app.

3. **Run ngrok:** ngrok provides a public URL that forwards incoming requests to your local server. Run the command "ngrok http --domain="yourdomainname.com" 3000" to start ngrok and point it to your local server  on port 3000 (make sure to add in your actual domain name).

The Node app, React app, and ngrok all need to be running for the local development environment to run correctly. Run each process in its own terminal window or tab.
