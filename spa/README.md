# Overview

This is the frontend of the Connect Node app in React. The React app renders the configuration flow of your Connect app. Reusable page components have been created with examples.

# For Development

For local instances, a proxy server has been set up to run this locally. Three procedures must be run in order to view the frontend on a Jira instance:

1. **Run the Node app:** This app serves as the backend of your Connect app and handles requests from Jira. Use the command "yarn start" to start the application.

2. **Run the React app:** This app is the frontend of your Connect app, providing the interface that users will interact with. Navigate to the SPA directory and then use the command "yarn start" to start the application.

3. **Run ngrok:** Ngrok provides a public URL that forwards incoming requests to your local server. In this case, the command "ngrok http --domain="your domain name" 3000" starts ngrok and points it to your local server running on port 3000. Be sure to replace "your domain name" with your actual domain name.

All three processes (Node app, React app, and ngrok) need to be running simultaneously for the local development environment to run correctly. Each process should run in its own terminal window or tab.

This setup allows you to work on your Connect app locally while still interacting with Jira.
