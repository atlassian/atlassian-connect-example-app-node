import { envVars } from "../env";

const appDescriptorUrl = `${envVars.APP_URL}/atlassian-connect.json`;
const baseUrl = envVars.INSTALL_ATLASSIAN_URL;
const username = envVars.INSTALL_JIRA_ADMIN_USERNAME;
const password = envVars.INSTALL_JIRA_ADMIN_PASSWORD;

/**
 * Get the UPM token first, this token is needed for installing the app
 */
const getUPMToken = async () => {
	const apiUrl = `${baseUrl}/rest/plugins/1.0/`;

	const result = await fetch(apiUrl, {
		method: "GET",
		headers: {
			Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`
		}
	}).then(response => response.headers);
	if (result) {
		return result.get("upm-token");
	} else {
		throw Error("Couldn't get UPM token");
	}
};

/**
 * Installing the Connect app in Jira
 */
const appInstallation = async () => {
	const upmToken = await getUPMToken();
	const apiUrl = `${baseUrl}/rest/plugins/1.0/?token=${upmToken}`;

	const result = await fetch(apiUrl, {
		method: "POST",
		headers: {
			Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`,
			Accept: "application/json",
			"Content-Type": "application/vnd.atl.plugins.install.uri+json"
		},
		body: JSON.stringify({
			pluginUri: appDescriptorUrl,
			pluginName: "Sample Connect Node App"
		})
	}).then(response => response.json());
	if (result.status) {
		console.log("Installed", result);
	} else {
		console.error("Couldn't install", result);
		throw Error("Couldn't Install");
	}
};

/**
 * Uninstall the Connect app from Jira
 */
const appUninstallation = async () => {
	const apiUrl = `${baseUrl}/rest/plugins/1.0/${envVars.APP_KEY}-key`;

	const result = await fetch(apiUrl, {
		method: "DELETE",
		headers: {
			Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`,
			Accept: "application/json",
			"Content-Type": "application/vnd.atl.plugins.install.uri+json"
		}
	});
	if (result.status === 204) {
		console.log("UnInstalled", result.statusText);
	} else {
		console.error("Couldn't uninstall", result);
		throw Error("Couldn't uninstall");
	}
};

/**
 * Bypassing the ngrok Visit Page,
 * to resolve the ERR_NGROK_6024 error coming from ngrok
 * (Only for free users in ngrok)
 */
const byPassNgrokPage = () => fetch(envVars.APP_URL, {
	method: "GET",
	headers: new Headers({
		"ngrok-skip-browser-warning": "1"
	})
}).then(response => response.text())
	.then(data => console.log("Successfully bypassed ngrok: ", data))
	.catch(err => console.error("Error when bypassing ngrok: ", err));

export { appInstallation, appUninstallation, byPassNgrokPage };
