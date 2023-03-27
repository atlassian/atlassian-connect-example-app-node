import express, { json } from "express";
import { RootRouter } from "./routes/router";
import { envVars } from "./env";
import { appInstallation, appUninstallation, byPassNgrokPage } from "./utils/app-installation";

const app = express();

// Setting the template engine
app.set("view engine", "squirrelly");
app.set("views", __dirname + "/views");

// Remove caching
app.set("view cache", false);
app.set("etag", false);

app.use((_req, res, next) => {
	res.set("Cache-Control", "no-store");
	next();
});

// Calling the express.json() method for parsing
app.use(json());

// Setting the routes
app.use(RootRouter);

const port = 3000;
app.listen(port, async () => {
	// App is now running
	console.log(`Sample app listening on port ${port}`);

	// This step is done for the free ngrok users, so that we bypass ngrok warning page
	await byPassNgrokPage();

	// Uninstall the app first
	console.log("Uninstalling the app----------------");
	await appUninstallation();
	console.log("Uninstallation complete----------------");

	// Install the app in Jira
	console.log("Installing the app----------------");
	await appInstallation();
	console.log("Installation complete----------------");

	console.log(`
*********************************************************************************************************************

IF YOU ARE USING A FREE NGROK ACCOUNT, PLEASE DO THIS STEP FIRST!!!
Before going to your app, please open this URL first: ${envVars.APP_URL}.
This will open up the ngrok page, don't worry just click on the Visit button.
That's it, you're all ready!

*********************************************************************************************************************

*********************************************************************************************************************

Now open your app in this URL: ${envVars.INSTALL_ATLASSIAN_URL}/plugins/servlet/ac/${envVars.APP_KEY}/acn-introduction

*********************************************************************************************************************`);
});
