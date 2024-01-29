# Overview

This is the front end of the Connect Node app in React. 

This React app renders the configuration flow of your Connect app. 

Reusable page components are included, plus examples.

# How to use the app

A proxy server has been set up for local instances. 

This lets you work on your Connect app locally while still interacting with Jira.

To view the front end on a Jira instance:

1. **Run the Node app:** the Node app is the back end of your Connect app and handles requests from Jira. Use the command "yarn start" to start the app.

2. **Run the React app:** the React app is the front end of your Connect app and provides the user interface. Use the command “yarn start” from the SPA directory to start the app.

3. **Run ngrok:** ngrok provides a public URL that forwards incoming requests to your local server. Run the command "ngrok http --domain="yourdomainname.com" 3000" to start ngrok and point it to your local server  on port 3000 (make sure to add in your actual domain name).

The Node app, React app, and ngrok all need to be running for the local development environment to run correctly. Run each process in its own terminal window or tab.

Note: These three steps will not be necessary once Docker support is implemented.
