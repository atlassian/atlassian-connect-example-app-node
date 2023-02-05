import { Router } from 'express';
import { insertToDb, removeFromDB, TenantType} from '../db';

export const EventsRouter = Router();

EventsRouter.post('/installed', (req, res) => {
    const { baseUrl: host } = req.body;
    const newTenant: TenantType = { host, logs: [] };

    insertToDb(
        newTenant,
        () => { res.sendStatus(200) },
        (error) => { res.sendStatus(500).json(error) }
    );
});

EventsRouter.post('/uninstalled', (req, res) => {
    const { baseUrl: host } = req.body;

    removeFromDB(
        { host },
        () => { res.sendStatus(200) },
        (error) => { res.sendStatus(500).json(error) }
    );
});