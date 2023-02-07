import { Router } from 'express';
import { findOneInDb, TenantType } from '../db';

export const LogsRouter = Router();

LogsRouter.get('/webhooks', async (_req, res) => {
    const { clientKey } = res.locals;
    const logsData = await findOneInDb(
        { clientKey },
    ) as TenantType;

    if (logsData?.logs.length) {
        res.render('webhooksLogs.mst', {
            index: 'Webhooks Page',
            logs: logsData.logs.sort().reverse()
        });
    } else {
        res.render('webhooksLogs.mst', {
            index: 'Webhooks Page',
            logs: ["No logs yet!"]
        });
    }
});
