import { Router } from 'express';
import { DBFile, TenantType } from '../db';

export const EventsRouter = Router();

EventsRouter.post('/installed', (req, res) => {
    const { baseUrl: host } = req.body;
    const newTenant: TenantType = { host, logs: [] };

    DBFile.insert(newTenant, (error, data) => {
        if (error) {
            console.log("Error adding a new tenant: ", error);
            res.sendStatus(500).json(error);
        } else {
            console.log("New tenant added successfully", data);
            res.sendStatus(200);
        }
    });
});

EventsRouter.post('/uninstalled', (req, res) => {
    const { baseUrl: host } = req.body;

    DBFile.remove({ host }, (error, data) => {
        if (error) {
            console.log("Error removing existing tenant: ", error);
            res.sendStatus(500).json(error);
        } else {
            console.log("Existing tenant removed successfully", data);
            res.sendStatus(200);
        }
    });
});