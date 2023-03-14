import path from "path";
import { Router, static as Static } from "express";
import { connectAppDescriptor, connectDescriptorGet } from "./atlassian-connect";
import { eventsRouter } from "./events";
import { logsRouter } from "./logs";
import { webhooksRouter } from "./webhooks";
import { connectIframeJWTMiddleware } from "../middlewares/connect-iframe-jwt-middleware";

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

RootRouter.get("/", (_req, res) => {
	res.render("index.mst", {
		index: "Introduction",
		body: "Welcome to the Node.js Sample App!"
	});
});

RootRouter.get("/config", async (_req, res) => {
	res.render("config.mst", {
		index: "Connect app descriptor",
		config: JSON.stringify(connectAppDescriptor, undefined, 2)
	});
});

RootRouter.use("/logs", logsRouter);

RootRouter.get("/connect-library", async (_req, res) => {
	res.render("connect.mst", {
		index: "Connect JS library"
	});
});

RootRouter.get("/auth", async (_req, res) => {
	res.render("auth.mst", {
		index: "iFrame jwt authentication"
	});
});

RootRouter.get("/modules", async (_req, res) => {
	res.render("modules.mst", {
		index: "Creating modules with Connect"
	});
});
