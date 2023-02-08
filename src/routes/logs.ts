import { Router } from 'express';
import { findOneInDb, TenantType } from '../db';

export const LogsRouter = Router();

LogsRouter.get('/webhooks', async (_req, res) => {
    const { clientKey } = res.locals;
    const logsData = await findOneInDb(
        { clientKey },
    ) as TenantType;

    res.render('webhooksLogs.mst', {
        index: 'Webhooks Page',
        logs: logsData ? logsData.logs.sort().reverse() : []
    });
});
