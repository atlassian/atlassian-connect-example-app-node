import { NextFunction, Request, Response, Router } from "express";
import { database } from "../db";
import { validateJWTToken } from "../utils/jwt";
import { fromExpressRequest } from "atlassian-jwt";

export const webhooksRouter = Router();

webhooksRouter.use(async (req: Request, res: Response, next: NextFunction) => {
	try {
		// The jwt token is sent with the Authorization headers of the webhook
		res.locals.jiraTenant = await validateJWTToken(fromExpressRequest(req), req.headers.authorization?.replace("JWT ", ""));
		next();
	} catch (e) {
		res.status(e.status).send(e.message);
	}
});

// All webhooks just add an entry to the logs DB table to be viewed by the user in the webhooks section
webhooksRouter.post("/jira/:event", async (req, res) => {
	await database.addLogs({
		tenantId: res.locals.jiraTenant.id,
		message: `${new Date().toISOString()} ${req.params.event?.replace("-", " ").toUpperCase()}!`,
		data: req.body
	});
	res.sendStatus(200);
});
