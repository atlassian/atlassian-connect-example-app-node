import { Router, static as Static } from "express";
import { connectAppDescriptor, connectDescriptorGet } from "./atlassian-connect";
import { eventsRouter } from "./events";
import { webhooksRouter } from "./webhooks";
import path from "path";
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
// RootRouter.use(connectIframeJWTMiddleware);

RootRouter.get("/", (_req, res) => {
	res.render("introduction");
});

RootRouter.get("/config", async (_req, res) => {
	res.render("config", {
		config: JSON.stringify(connectAppDescriptor, undefined, 2)
	});
});

RootRouter.get("/logs/webhooks", async (_req, res) => {
	const clientKey = res.locals.jiraTenant?.clientKey;
	if (!clientKey) {
		res.status(404).send("Missing clientKey");
		return;
	}
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
