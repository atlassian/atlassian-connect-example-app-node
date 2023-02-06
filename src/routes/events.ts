import { Router } from 'express';
import { insertToDb, removeFromDB, TenantType} from '../db';

export const EventsRouter = Router();

EventsRouter.post('/installed', (req, res) => {
    const { baseUrl: host, clientKey } = req.body;
    const newTenant: TenantType = { host, clientKey, logs: [] };

    insertToDb(
        newTenant,
        () => { res.sendStatus(200) },
        (error) => { res.sendStatus(500).json(error) }
    );
});

EventsRouter.post('/uninstalled', (req, res) => {
    const { baseUrl: host, clientKey } = req.body;

    removeFromDB(
        { host, clientKey },
        () => { res.sendStatus(200) },
        (error) => { res.sendStatus(500).json(error) }
    );
});