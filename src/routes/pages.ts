import { Request, Response, Router } from "express";
import { database } from "../db";
import { querystringJwtMiddleware } from "../middlewares/querystring-jwt-middleware";
import { connectAppDescriptor } from "./atlassian-connect";
import { getMarkdownAndConvertToHtml } from "../utils/markup";

export const pageRouter = Router();

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
 * Middlewares auth
 ************************************************************************************************************************/
pageRouter.use(querystringJwtMiddleware);

/************************************************************************************************************************
 * Views
 ************************************************************************************************************************/
pageRouter.get("/get-started", renderPage("Get Started", "get-started.md"));
pageRouter.get("/introduction", renderPage("Introduction", "introduction.md"));
pageRouter.get("/authentication", renderPage("Authentication with JWT and Storage", "authentication.md"));
pageRouter.get("/connect-library", renderPage("Connect Javascript Library", "connect-js.md"));
pageRouter.get("/modules", renderPage("Connect Modules", "modules.md"));
pageRouter.get("/context", renderPage("Context Parameters", "context-parameters.md"));
pageRouter.get("/lifecycle-events", renderPage("Lifecycle Events", "lifecycle-events.md"));
pageRouter.get("/making-api-requests", renderPage("Making API Requests", "api-requests.md"));
pageRouter.get("/marketplace", renderPage("Marketplace", "marketplace.md"));

pageRouter.get("/config", async (req: Request, res: Response): Promise<void> => {
	res.render("config", {
		title: "Connect JSON",
		...navigation(req),
		config: JSON.stringify(connectAppDescriptor, undefined, 2),
		pageContent: getMarkdownAndConvertToHtml("config.md")
	});
});

pageRouter.get("/webhooks", async (req: Request, res: Response): Promise<void> => {
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
