# Overview

This is the frontend version of the connect node app in React.

# For Development

For local instances, a proxy server has been created to run this locally. Three procedures must be run in order to view the frontend on Jira:

1.run the node app:
atlassian-connect-example-app-node % yarn start

2.run the react app:
spa % yarn start

3.run ngrock:
atlassian-connect-example-app-node % ngrok http --domain=better-ladybug-diverse.ngrok-free.app 3000
