import { Router } from 'express';
import { appendLogsToFile, readLogsFromFile, removeLogFile } from '../utils';

export const WebhooksRouter = Router();

WebhooksRouter.get('/', (_req, res) => {
    let logs = "";
    try {
        logs = readLogsFromFile();
   } catch (e) {
        console.log("Error: ", e);
        logs = 'No logs yet!!';
    }
    res.render('webhooks.mst', {
        index: 'Webhook',
        body: 'Check out the logs coming in from the webhooks:',
        logs
    });
});

WebhooksRouter.delete('/', (_req, res) => {
    try {
        removeLogFile();
        res.sendStatus(204);
    } catch (e) {
        res.sendStatus(500);
    }
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

