import { Router } from "express";
import { database } from "../db";
import { authHeaderSymmetricJwtMiddleware, authHeaderAsymmetricJwtMiddleware } from "../middlewares/auth-header-jwt-middleware";

export const eventsRouter = Router();

eventsRouter.post("/installed", authHeaderAsymmetricJwtMiddleware, async (req, res) => {
	const { baseUrl: url, clientKey, sharedSecret } = req.body;
	// Find jira tenant if it already exists
	const tenant = await database.findJiraTenant({ clientKey });

	const data = {
		url,
		sharedSecret,
		clientKey
	};

	if (tenant) {
		// If jira tenant already exists, only update the information given (sharedSecret can rotate sometimes)
		await database.updateJiraTenant(clientKey, data);
	} else {
		// If jira tenant doesn't exist, let's add it to the database
		await database.addJiraTenant(data);
	}

	res.sendStatus(204);
});

eventsRouter.post("/enabled", authHeaderSymmetricJwtMiddleware, async (req, res) => {
	await database.enableJiraTenant(req.body.clientKey);
	res.sendStatus(204);
});

eventsRouter.post("/disabled", authHeaderSymmetricJwtMiddleware, async (req, res) => {
	await database.disableJiraTenant(req.body.clientKey);
	res.sendStatus(204);
});

eventsRouter.post("/uninstalled", authHeaderAsymmetricJwtMiddleware, async (req, res) => {
	const { clientKey } = req.body;
	await database.removeJiraTenant(clientKey);
	res.sendStatus(204);
});
