import { Router } from "express";
import { database } from "../db";
import { authHeaderSymmetricJwtMiddleware } from "../middlewares/auth-header-jwt-middleware";

export const webhooksRouter = Router();

webhooksRouter.use(authHeaderSymmetricJwtMiddleware);

// All webhooks just add an entry to the logs DB table to be viewed by the user in the webhooks section
webhooksRouter.post("/jira/:event", async (req, res) => {
	await database.addLogs({
		tenantId: res.locals.jiraTenant.id,
		message: `${new Date().toISOString()} ${req.params.event?.replace("-", " ").toUpperCase()}!`,
		data: req.body
	});
	res.sendStatus(200);
});
