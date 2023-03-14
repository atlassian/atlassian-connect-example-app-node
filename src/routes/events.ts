import { Router } from "express";
import { database } from "../db";
import { v4 as uuid } from "uuid";

export const eventsRouter = Router();

eventsRouter.post("/installed", async (req, res) => {
	const { baseUrl: host, clientKey, sharedSecret } = req.body;

	await database.addJiraTenant({
		id: uuid(),
		url: host,
		sharedSecret,
		clientKey
	});

	res.sendStatus(204);
});

eventsRouter.post("/uninstalled", async (req, res) => {
	const { baseUrl: host } = req.body;

	await database.removeLogsForJiraTenant(host);
	await database.removeJiraTenant(host);

	res.sendStatus(204);
});