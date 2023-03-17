import path from "path";
import { Router, static as Static } from "express";
// import { marked } from "marked";
import { connectAppDescriptor, connectDescriptorGet } from "./atlassian-connect";
import { eventsRouter } from "./events";
import { webhooksRouter } from "./webhooks";
import { connectIframeJWTMiddleware } from "../middlewares/connect-iframe-jwt-middleware";
// import * as fs from "fs";
import { database } from "../db";

export const RootRouter = Router();

// Healthcheck route to make sure the server works
RootRouter.get("/healthcheck", (_req, res) => res.status(200).send("Works!"));

// This is the Connect JSON app descriptor
RootRouter.get("/atlassian-connect.json", connectDescriptorGet);

// Public files like images and stylesheets
RootRouter.use("/public", Static(path.join(process.cwd(), "static")));

// The Connect lifecycle events as specified in the Connect JSON above
RootRouter.use("/events", eventsRouter);

// Jira webhooks we listen to as specified in the Connect JSON above
RootRouter.use("/webhooks", webhooksRouter);

// Below are the Connect Module routes which need to pass the JWT check to continue
RootRouter.use(connectIframeJWTMiddleware);

// marked.setOptions({
// 	renderer: new marked.Renderer()
// });
RootRouter.get("/", (_req, res) => {
	// const introductionPath = path.join(__dirname, '..', 'content', 'introduction.md')
	// const contents = fs.readFileSync(introductionPath);

	res.render("introduction", {
		title: "Introduction"
	});

	// res.render("introduction", {
	// 	content: marked(contents.toString())
	// });
});

RootRouter.get("/config", async (_req, res) => {
	res.render("config", {
		config: JSON.stringify(connectAppDescriptor, undefined, 2)
	});
});

RootRouter.get("/logs/webhooks", async (_req, res) => {
	const { clientKey } = res.locals.jiraTenant;
	const tenant = await database.findJiraTenant({ clientKey });
	const logs = await database.findLogsForJiraTenant(tenant.url);

	res.render("webhook-logs", {
		logs: logs?.reverse().map(log => {
			const clonedLog = { ...log };
			clonedLog.data = JSON.stringify(log.data);
			return clonedLog;
		})
	});
});
