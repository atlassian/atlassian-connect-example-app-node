import { Router } from 'express';
import { database } from '../db/db';
import { v4 as uuid } from 'uuid';

export const webhooksRouter = Router();

webhooksRouter.post('/jira/issue-created', async (req, res) => {
    // Mapping the host set during the installation with the url coming in from the webhooks
    const host = new URL(req.body.user.self).origin;
    const tenant = await database.findTenant({ host });
    await database.addLogs({
        id: uuid(),
        tenantId: tenant.id,
        message: new Date().toISOString() + ' Issue created!',
        data: req.body
    });

    res.sendStatus(200);
});

webhooksRouter.post('/jira/issue-updated', async (req, res) => {
    // Mapping the host set during the installation with the url coming in from the webhooks
    const host = new URL(req.body.user.self).origin;
    const tenant = await database.findTenant({ host });
    await database.addLogs({
        id: uuid(),
        tenantId: tenant.id,
        message: new Date().toISOString() + ' Issue Updated!',
        data: req.body
    });

    res.sendStatus(200);
});

webhooksRouter.post('/jira/issue-deleted', async (req, res) => {
    // Mapping the host set during the installation with the url coming in from the webhooks
    const host = new URL(req.body.user.self).origin;
    const tenant = await database.findTenant({ host });
    await database.addLogs({
        id: uuid(),
        tenantId: tenant.id,
        message: new Date().toISOString() + ' Issue Deleted!',
        data: req.body
    });

    res.sendStatus(200);
});

