import { Router } from "express";
import { database } from "../db";

export const logsRouter = Router();

logsRouter.get("/webhooks", async (_req, res) => {
	const { clientKey } = res.locals;
	const tenant = await database.findJiraTenant({ clientKey });
	const logs = await database.findLogsForJiraTenant(tenant.url);

	res.render("webhooksLogs.mst", {
		index: "Webhooks Page",
		logs: logs?.reverse().map(log => {
			const clonedLog = { ...log };
			clonedLog.data = JSON.stringify(log.data);
			return clonedLog;
		})
	});
});
