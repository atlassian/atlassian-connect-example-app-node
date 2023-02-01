import { Router } from 'express';
import { appendLogsToFile } from '../utils';

export const WebhooksRouter = Router();

WebhooksRouter.get('/', (_req, res) => {
    res.render('webhooks.mst', {
        index: 'Webhooks',
        body: 'Check out the logs coming in from the webhooks:'
    });
});

WebhooksRouter.post('/jira-issue_created', (req, res) => {
    appendLogsToFile('Jira Issue Created', req.body);
    res.sendStatus(200);
});

WebhooksRouter.post('/jira-issue_updated', (req, res) => {
    appendLogsToFile('Jira Issue Updated', req.body);
    res.sendStatus(200);
});

WebhooksRouter.post('/jira-issue_deleted', (req, res) => {
    appendLogsToFile('Jira Issue Deleted', req.body);
    res.sendStatus(200);
});
