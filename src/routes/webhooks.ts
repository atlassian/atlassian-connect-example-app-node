import { Router } from 'express';
import { DBFile } from '../db';

export const WebhooksRouter = Router();

WebhooksRouter.get('/', (_, res) => {
    DBFile.find({}, (error, data) => {
            if (error) {
                console.log("Error fetching logs: ", error);
                res.status(500).json(error);
            }else {
                console.log("Logs fetched successfully", data);
                res.json(data);
            }
        }
    );
});

WebhooksRouter.post('/jira/issue-created', (req, res) => {
    // Mapping the host set during the installation with the url coming in from the webhooks
    const host = new URL(req.body.user.self).origin;

    DBFile.update(
        { host },
        { $push: { logs: `Issue created ---> ${JSON.stringify(req.body)}` } },
        {},
        (error, data) => {
            if (error) {
                console.log("Error when adding Create logs: ", error);
                res.status(500).json(error);
            }else {
                console.log("Create logs added successfully", data);
                res.sendStatus(200);
            }
        }
    );

    res.sendStatus(200);
});

WebhooksRouter.post('/jira/issue-updated', (req, res) => {
    // Mapping the host set during the installation with the url coming in from the webhooks
    const host = new URL(req.body.user.self).origin;

    DBFile.update(
        { host },
        { $push: { logs: `Issue updated ---> ${JSON.stringify(req.body)}` } },
        {},
        (error, data) => {
            if (error) {
                console.log("Error when adding Update logs: ", error);
                res.status(500).json(error);
            }else {
                console.log("Update logs added successfully", data);
                res.sendStatus(200);
            }
        }
    );

    res.sendStatus(200);
});

WebhooksRouter.post('/jira/issue-deleted', (req, res) => {
    // Mapping the host set during the installation with the url coming in from the webhooks
    const host = new URL(req.body.user.self).origin;

    DBFile.update(
        { host },
        { $push: { logs: `Issue deleted ---> ${JSON.stringify(req.body)}` } },
        {},
        (error, data) => {
            if (error) {
                console.log("Error when adding Delete logs: ", error);
                res.status(500).json(error);
            }else {
                console.log("Delete logs added successfully", data);
                res.sendStatus(200);
            }
        }
    );

    res.sendStatus(200);
});

