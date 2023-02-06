import { Router } from 'express';
import { findOneInDb, updateToDb} from '../db';
import {decodeJwtToken} from '../utils';

export const WebhooksRouter = Router();

WebhooksRouter.get('/', (_req, res) => {
    const decodedTokenValues = decodeJwtToken(res.locals.jwt);
    if (decodedTokenValues && decodedTokenValues.iss) {
        const clientKey = decodedTokenValues.iss;

        findOneInDb(
            { clientKey },
            (data) => {
                if (data?.logs.length) {
                    res.render('webhooks.mst', {
                        index: 'Webhooks Page',
                        logs: data.logs.sort().reverse()
                    });
                } else {
                    res.render('webhooks.mst', {
                        index: 'Webhooks Page',
                        logs: [ "No logs yet!" ]
                    });
                }
            },
            () => {
                res.render('webhooks.mst', {
                    index: 'Webhooks Page',
                    logs: [ "No logs yet!" ]
                });
            }
        );
    } else {
        res.render('webhooks.mst', {
            index: 'Webhooks Page',
            logs: [ "No logs yet!" ]
        });
    }
});

WebhooksRouter.post('/jira/issue-created', (req, res) => {
    // Mapping the host set during the installation with the url coming in from the webhooks
    const host = new URL(req.body.user.self).origin;

    updateToDb(
        { host },
        { $push: { logs: `${new Date().toISOString()} : Issue created ---> ${JSON.stringify(req.body)}` } },
        () => { res.sendStatus(200) },
        (error) => { res.status(500).json(error) },
    );
});

WebhooksRouter.post('/jira/issue-updated', (req, res) => {
    // Mapping the host set during the installation with the url coming in from the webhooks
    const host = new URL(req.body.user.self).origin;

    updateToDb(
        { host },
        { $push: { logs: `${new Date().toISOString()} : Issue updated ---> ${JSON.stringify(req.body)}` } },
        () => { res.sendStatus(200) },
        (error) => { res.status(500).json(error) },
    );
});

WebhooksRouter.post('/jira/issue-deleted', (req, res) => {
    // Mapping the host set during the installation with the url coming in from the webhooks
    const host = new URL(req.body.user.self).origin;

    updateToDb(
        { host },
        { $push: { logs: `${new Date().toISOString()} : Issue deleted ---> ${JSON.stringify(req.body)}` } },
        () => { res.sendStatus(200) },
        (error) => { res.status(500).json(error) },
    );
});

