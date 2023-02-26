import { Router } from 'express';
import { database } from '../db/db';
import { v4 as uuid } from 'uuid';

export const eventsRouter = Router();

eventsRouter.post('/installed', async (req, res) => {
    const { baseUrl: host, clientKey, sharedSecret } = req.body;

    await database.addTenant({
        id: uuid(),
        host,
        sharedSecret,
        clientKey
    });

    res.sendStatus(204);
});

eventsRouter.post('/uninstalled', async (req, res) => {
    const { baseUrl: host } = req.body;

    await database.removeLogsForTenant(host);
    await database.removeTenant(host);

    res.sendStatus(204);
});