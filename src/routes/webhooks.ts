import { Router } from 'express';
import { updateToDb } from '../db';

export const webhooksRouter = Router();

webhooksRouter.post('/jira/issue-created', async (req, res) => {
    // Mapping the host set during the installation with the url coming in from the webhooks
    const host = new URL(req.body.user.self).origin;
    const updatedData = await updateToDb(
        { host },
        { $push: { logs: `${new Date().toISOString()} : Issue created ---> ${JSON.stringify(req.body)}` } }
    );
    res.sendStatus(updatedData ? 200 : 500);
});

webhooksRouter.post('/jira/issue-updated', async (req, res) => {
    // Mapping the host set during the installation with the url coming in from the webhooks
    const host = new URL(req.body.user.self).origin;
    const updatedData = await updateToDb(
        { host },
        { $push: { logs: `${new Date().toISOString()} : Issue updated ---> ${JSON.stringify(req.body)}` } }
    );
    res.sendStatus(updatedData ? 200 : 500);
});

webhooksRouter.post('/jira/issue-deleted', async (req, res) => {
    // Mapping the host set during the installation with the url coming in from the webhooks
    const host = new URL(req.body.user.self).origin;
    const updatedData = await updateToDb(
        { host },
        { $push: { logs: `${new Date().toISOString()} : Issue deleted ---> ${JSON.stringify(req.body)}` } }
    );
    res.sendStatus(updatedData ? 200 : 500);
});

