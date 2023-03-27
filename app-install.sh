echo $APP_URL
echo $NGROK_AUTHTOKEN
echo $INSTALL_JIRA_ADMIN_PASSWORD

# Bypassing the ngrok warning page
curl -H "ngrok-skip-browser-warning: 1" $APP_URL

# Uninstalling the app first
curl -X DELETE -u $INSTALL_JIRA_ADMIN_USERNAME:$INSTALL_JIRA_ADMIN_PASSWORD \
-H "Content-Type: application/vnd.atl.plugins.install.uri+json" "${INSTALL_ATLASSIAN_URL}/rest/plugins/1.0/${APP_KEY}-key"

# Getting the UPM token first, which will be used for app installation
UPM_TOKEN=$(curl -u $INSTALL_JIRA_ADMIN_USERNAME:$INSTALL_JIRA_ADMIN_PASSWORD --head ${INSTALL_ATLASSIAN_URL}/rest/plugins/1.0/| fgrep upm-token | cut -c 12- | tr -d '\r\n')
echo "Wat \n"
echo $UPM_TOKEN

# Installing the app
curl -u $INSTALL_JIRA_ADMIN_USERNAME:$INSTALL_JIRA_ADMIN_PASSWORD -H "Content-Type: application/vnd.atl.plugins.install.uri+json" \
-X POST ${INSTALL_ATLASSIAN_URL}/rest/plugins/1.0/?token=${UPM_TOKEN} \
-d "{\"pluginUri\":\"${APP_URL}/atlassian-connect.json\", \"pluginName\": \"Sample Connect Node App\"}"
