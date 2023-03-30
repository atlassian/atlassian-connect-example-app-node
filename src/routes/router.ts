import path from "path";
import { Request, Response, Router, static as Static } from "express";
import { connectAppDescriptor, connectDescriptorGet } from "./atlassian-connect";
import { eventsRouter } from "./events";
import { webhooksRouter } from "./webhooks";
import { database } from "../db";
import { connectIframeJWTMiddleware } from "../middlewares/connect-iframe-jwt-middleware";
import { getMarkdownAndConvertToHtml } from "../utils/markup";

export const RootRouter = Router();
const modules = connectAppDescriptor.modules.generalPages.map(page => ({
	url: page.url,
	key: page.key,
	title: page.name.value
}));
const navigation = (req: Request) => {
	const index = modules.findIndex(m => m.url === req.path);
	return {
		back: index > 0 ? modules[index - 1] : undefined,
		next: index < (modules.length - 1) ? modules[index + 1] : undefined
	};
};
const renderPage = (title: string, markdownFile: string) => (req: Request, res: Response) => {
	res.render("layout", {
		title,
		...navigation(req),
		content: getMarkdownAndConvertToHtml(markdownFile)
	});
};

/************************************************************************************************************************
 * Healthcheck
 ************************************************************************************************************************/
RootRouter.get("/healthcheck", (_req, res) => res.status(200).send("Healthy!"));

/************************************************************************************************************************
 * Connect app manifest
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
RootRouter.get("/pages/get-started", renderPage("Get Started", "get-started.md"));
RootRouter.get("/pages/introduction", renderPage("Introduction", "introduction.md"));
RootRouter.get("/pages/authentication", renderPage("Authentication with JWT and Storage", "authentication.md"));
RootRouter.get("/pages/connect-library", renderPage("Connect Javascript Library", "connect-js.md"));
RootRouter.get("/pages/modules", renderPage("Connect Modules", "modules.md"));
RootRouter.get("/pages/lifecycle-events", renderPage("Lifecycle Events", "lifecycle-events.md"));
RootRouter.get("/pages/making-api-requests", renderPage("Making API Requests", "api-requests.md"));
RootRouter.get("/pages/marketplace", renderPage("Marketplace", "marketplace.md"));

RootRouter.get("/pages/config", async (req: Request, res: Response): Promise<void> => {
	res.render("config", {
		title: "Connect JSON",
		...navigation(req),
		config: JSON.stringify(connectAppDescriptor, undefined, 2),
		pageContent: getMarkdownAndConvertToHtml("config.md")
	});
});

RootRouter.get("/pages/webhooks", async (req: Request, res: Response): Promise<void> => {
	const clientKey = res.locals.jiraTenant?.clientKey;
	if (!clientKey) {
		res.status(404).send("Missing clientKey");
		return;
	}

	const tenant = await database.findJiraTenant({ clientKey });
	const logs = await database.findLogsForJiraTenant(tenant.url);

	res.render("webhook-logs", {
		title: "Webhooks",
		...navigation(req),
		pageContent: getMarkdownAndConvertToHtml("webhooks.md"),
		logs: logs?.reverse().map(log => {
			const clonedLog = { ...log };
			clonedLog.data = JSON.stringify(log.data);
			return clonedLog;
		})
	});
});
