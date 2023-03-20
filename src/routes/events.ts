import { Router } from "express";
import { database } from "../db";
import { v4 as uuid } from "uuid";

export const eventsRouter = Router();

eventsRouter.post("/installed", async (req, res) => {
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
		await database.addJiraTenant({
			...data,
			id: uuid()
		});
	}

	res.sendStatus(204);
});

eventsRouter.post("/uninstalled", async (req, res) => {
	const { clientKey } = req.body;
	await database.removeJiraTenant(clientKey);
	res.sendStatus(204);
});
