import { Router } from 'express';
import { insertToDb, removeFromDB } from '../db';

export const eventsRouter = Router();

eventsRouter.post('/installed', async (req, res) => {
    const { baseUrl: host, clientKey, sharedSecret } = req.body;
    await insertToDb({ host, clientKey, sharedSecret, logs: [] });
    res.sendStatus(204);
});

eventsRouter.post('/uninstalled', async (req, res) => {
    const { baseUrl: host, clientKey } = req.body;
    await removeFromDB({ host, clientKey });
    res.sendStatus(204);
});