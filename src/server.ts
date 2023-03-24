import express, { json } from "express";
import { RootRouter } from "./routes/router";
import { envVars } from "./env";
import { appInstallation, byPassNgrokPage } from "./utils/appinstall";

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
	console.log(`Sample app listening on port ${port}`);

	await byPassNgrokPage();
	console.log("Starting the installation----------------");

	await appInstallation();
	console.log("App installation complete----------------");

	console.log(`Open this URL: ${envVars.INSTALL_ATLASSIAN_URL}/plugins/servlet/ac/${envVars.APP_KEY}/acn-introduction`);
	// await open(`${envVars.INSTALL_ATLASSIAN_URL}/plugins/servlet/ac/${envVars.APP_KEY}/acn-introduction`);
});



