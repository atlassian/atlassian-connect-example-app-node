import path from "path";
import { Router, static as Static, Request, Response } from "express";
import { connectAppDescriptor, connectDescriptorGet } from "./atlassian-connect";
import { eventsRouter } from "./events";
import { webhooksRouter } from "./webhooks";
import { database } from "../db";
import { connectIframeJWTMiddleware } from "../middlewares/connect-iframe-jwt-middleware";
import getMarkdownAndConvertToHtml from "../utils/markup";

export const RootRouter = Router();

/************************************************************************************************************************
 * Healthcheck
	************************************************************************************************************************/
RootRouter.get("/healthcheck", (_req, res) => res.status(200).send("Works!"));

/************************************************************************************************************************
 * Connect app descriptor
 ************************************************************************************************************************/
RootRouter.get("/atlassian-connect.json", connectDescriptorGet);

/************************************************************************************************************************
 * Public files(images, stylesheets)
 ************************************************************************************************************************/
RootRouter.use("/public", Static(path.join(process.cwd(), "static")));

/************************************************************************************************************************
 * Connect lifecycle Events
 ************************************************************************************************************************/
RootRouter.use("/events", eventsRouter);

/************************************************************************************************************************
 * Webhooks
 ************************************************************************************************************************/
RootRouter.use("/webhooks", webhooksRouter);

/************************************************************************************************************************
 * Middlewares
 ************************************************************************************************************************/
RootRouter.use(connectIframeJWTMiddleware);

/************************************************************************************************************************
 * Views
 ************************************************************************************************************************/
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

RootRouter.get("/authentication", async (_req: Request, res: Response): Promise<void> => {
	res.render("authentication", {
		pageContent: getMarkdownAndConvertToHtml("authentication.md")
	});
});

RootRouter.get("/connect-library", async (_req: Request, res: Response): Promise<void> => {
	res.render("connect-js", {
		pageContent: getMarkdownAndConvertToHtml("connect-js.md")
	});
});

RootRouter.get("/modules", async (_req: Request, res: Response): Promise<void> => {
	res.render("modules", {
		pageContent: getMarkdownAndConvertToHtml("modules.md")
	});
});

RootRouter.get("/lifecycle-events", async (_req: Request, res: Response): Promise<void> => {
	res.render("lifecycle-events", {
		pageContent: getMarkdownAndConvertToHtml("lifecycle-events.md")
	});
});

RootRouter.get("/making-api-requests", async (_req: Request, res: Response): Promise<void> => {
	res.render("api-requests", {
		pageContent: getMarkdownAndConvertToHtml("api-requests.md")
	});
});

RootRouter.get("/marketplace", async (_req: Request, res: Response): Promise<void> => {
	res.render("marketplace", {
		pageContent: getMarkdownAndConvertToHtml("marketplace.md")
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
