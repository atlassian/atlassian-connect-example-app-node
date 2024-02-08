import { Express } from "express";
import httpProxy from "http-proxy";
import { isNodeDev } from "./utils/is-node-dev";

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
	if (isNodeDev()) {
		app.use(SPA_PATH, (req, res) => proxy.web(req, res));
	}
};

