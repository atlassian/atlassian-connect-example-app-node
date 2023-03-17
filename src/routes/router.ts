import path from "path";
import { Router, static as Static } from "express";
import { marked } from "marked";
import { connectAppDescriptor, connectDescriptorGet } from "./atlassian-connect";
import { eventsRouter } from "./events";
import { webhooksRouter } from "./webhooks";
import { connectIframeJWTMiddleware } from "../middlewares/connect-iframe-jwt-middleware";
import * as fs from "fs";
import { database } from "../db";
import sanitizeHtml from "sanitize-html";

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

const renderer = new marked.Renderer();

renderer.link = ( href, _, text ): string => {
	if (href?.includes("https" || href?.includes("http"))) {
		return '<a target="_blank" href="'+ href +'">' + text + '</a>';
	} else {
		const page = href?.substring(1);
		return `<span class="link-span" id=${page} data-connect-module-key=${page}>` + text + '</span>';
	}
}

const getMarkdownAndConvertToHtml = (fileName: string) => {
	const filePath = path.join(__dirname, '..', 'content', fileName)
	const contents = fs.readFileSync(filePath);
	const markdownToHtml = marked(contents.toString(), { renderer: renderer });
	return sanitizeHtml(markdownToHtml, {
		allowedAttributes: {
			span: [ 'class', 'id', 'data-connect-module-key' ],
			a: [ 'href', 'target' ]
		},
	});
}

RootRouter.get("/", (_req, res) => {
	res.render("introduction", {
		pageContent: getMarkdownAndConvertToHtml("introduction.md")
	});
});

RootRouter.get("/config", async (_req, res) => {
	res.render("config", {
		config: JSON.stringify(connectAppDescriptor, undefined, 2),
		pageContent: getMarkdownAndConvertToHtml("config.md")
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
		}),
		pageContent: getMarkdownAndConvertToHtml("webhooks.md")
	});
});
