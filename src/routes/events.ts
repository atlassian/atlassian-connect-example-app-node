import { Router } from 'express';
import { insertToDb, removeFromDB, TenantType } from '../db';

export const EventsRouter = Router();

EventsRouter.post('/installed', async (req, res) => {
    const { baseUrl: host, clientKey } = req.body;
    const newTenant: TenantType = { host, clientKey, logs: [] };
    const insertedData = await insertToDb(newTenant);
    if (insertedData) {
        res.sendStatus(204);
    } else {
        res.sendStatus(500);
    }
});

EventsRouter.post('/uninstalled', async (req, res) => {
    const { baseUrl: host, clientKey } = req.body;
    const removedData = await removeFromDB({ host, clientKey });
    if (removedData) {
        res.sendStatus(204);
    } else {
        res.sendStatus(500);
    }
});