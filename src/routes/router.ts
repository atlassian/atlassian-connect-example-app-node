import path from "path";
import { Router, static as Static } from "express";
import { marked } from "marked";
import { connectAppDescriptor, connectDescriptorGet } from "./atlassian-connect";
import { eventsRouter } from "./events";
import { logsRouter } from "./logs";
import { webhooksRouter } from "./webhooks";
import { connectIframeJWTMiddleware } from "../middlewares/connect-iframe-jwt-middleware";
import * as fs from "fs";
// import file from "../content/introduction";

export const RootRouter = Router();

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
	const introductionPath = path.join(__dirname, '..', 'content', 'introduction.md')
	const contents = fs.readFileSync(introductionPath);

	res.render("index.mst", {
		content: marked(contents.toString())
	})
});

RootRouter.get("/config", async (_req, res) => {
	res.render("config.mst", {
		index: "Connect app descriptor",
		config: JSON.stringify(connectAppDescriptor, undefined, 2)
	});
});

RootRouter.use("/logs", logsRouter);
