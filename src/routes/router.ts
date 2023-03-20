import path from "path";
import { Router, static as Static, Request, Response } from "express";
import { connectAppDescriptor, connectDescriptorGet } from "./atlassian-connect";
import { eventsRouter } from "./events";
import { webhooksRouter } from "./webhooks";
import { database } from "../db";
import { connectIframeJWTMiddleware } from "../middlewares/connect-iframe-jwt-middleware";
import getMarkdownAndConvertToHtml from "../utils/markup";

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

RootRouter.use(connectIframeJWTMiddleware);

RootRouter.get("/", (_req: Request, res: Response): void => {
	res.render("introduction", {
		pageContent: getMarkdownAndConvertToHtml("introduction.md")
	});
});

RootRouter.get("/config", async (_req: Request, res: Response): Promise<void> => {
	res.render("config", {
		config: JSON.stringify(connectAppDescriptor, undefined, 2),
		pageContent: getMarkdownAndConvertToHtml("config.md")
	});
});

RootRouter.get("/connect-library", async (_req: Request, res: Response): Promise<void> => {
	res.render("connect-library", {
		pageContent: getMarkdownAndConvertToHtml("connect-library.md")
	});
});

RootRouter.get("/logs/webhooks", async (_req: Request, res: Response): Promise<void> => {
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
		}),
		pageContent: getMarkdownAndConvertToHtml("webhooks.md")
	});
});
