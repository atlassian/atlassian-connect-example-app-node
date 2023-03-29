# App key defined for this sample app
APP_KEY=com.atlassian.sample-app-node
# Fetching the new ngrok URL, not fetching the one from the .env because its not updated
BASE_URL=$(curl --silent http://tunnel:4040/api/tunnels | jq -r '.tunnels[] | select(.proto == "https") | .public_url')

# Bypassing the ngrok warning page
curl -H "ngrok-skip-browser-warning: 1" BASE_URL

# Uninstalling the app first
curl -X DELETE -u $INSTALL_JIRA_ADMIN_USERNAME:$INSTALL_JIRA_ADMIN_PASSWORD \
-H "Content-Type: application/vnd.atl.plugins.install.uri+json" "${INSTALL_ATLASSIAN_URL}/rest/plugins/1.0/${APP_KEY}-key"
echo "Uninstalling old version of the app \n\n"

# Getting the UPM token first, which will be used for app installation
UPM_TOKEN=$(curl -u $INSTALL_JIRA_ADMIN_USERNAME:$INSTALL_JIRA_ADMIN_PASSWORD --head ${INSTALL_ATLASSIAN_URL}/rest/plugins/1.0/| fgrep upm-token | cut -c 12- | tr -d '\r\n')

# Installing the app
curl -u $INSTALL_JIRA_ADMIN_USERNAME:$INSTALL_JIRA_ADMIN_PASSWORD -H "Content-Type: application/vnd.atl.plugins.install.uri+json" \
-X POST ${INSTALL_ATLASSIAN_URL}/rest/plugins/1.0/?token=${UPM_TOKEN} \
-d "{\"pluginUri\":\"${BASE_URL}/atlassian-connect.json\", \"pluginName\": \"Sample Connect Node App\"}"

echo "The app has been successfully installed \n\n"
echo "
*********************************************************************************************************************
IF YOU ARE USING A FREE NGROK ACCOUNT, PLEASE DO THIS STEP FIRST!!!
Before going to your app, please open this URL first: ${BASE_URL}.
This will open up the ngrok page, don't worry just click on the Visit button.
That's it, you're all ready!
*********************************************************************************************************************
*********************************************************************************************************************
Now open your app in this URL: ${INSTALL_ATLASSIAN_URL}/plugins/servlet/ac/${APP_KEY}/acn-introduction
*********************************************************************************************************************
"
