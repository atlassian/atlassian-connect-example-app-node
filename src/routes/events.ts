import { Router } from 'express';
import { DBFile, TenantType } from '../db';

export const EventsRouter = Router();

EventsRouter.post('/installed', (req, res) => {
    const { baseUrl: host, key, description } = req.body;
    const newTenant: TenantType = { host, key, description };

    DBFile.insert(newTenant, (error, data) => {
        if (error) {
            console.log("Error inserting data: ", error);
            res.sendStatus(500).json(error);
        } else {
            console.log("Data inserted successfully", data);
            res.sendStatus(200);
        }
    });
});

EventsRouter.post('/uninstalled', (req, res) => {
    const { baseUrl: host, key, description } = req.body;
    const newTenant: TenantType = { host, key, description };

    DBFile.remove(newTenant, (error, data) => {
        if (error) {
            console.log("Error removing data: ", error);
            res.sendStatus(500).json(error);
        } else {
            console.log("Data removed successfully", data);
            res.sendStatus(200);
        }
    });
});