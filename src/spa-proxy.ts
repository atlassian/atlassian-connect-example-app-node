import { Express } from "express";
import httpProxy from "http-proxy";

const SPA_PATH = "/spa";

const proxy = httpProxy.createProxyServer({
	target: {
		host: "single-page-app",
		port: 3010,
		path: SPA_PATH
	},
	ws: false
});

export const proxyLocalUIForDev = (app: Express) => {
	app.use(SPA_PATH, (req, res) => {
		return proxy.web(req, res);
	});
};

