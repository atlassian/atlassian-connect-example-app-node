import { Router } from 'express';
import {database} from "../db/db";

export const logsRouter = Router();

logsRouter.get('/webhooks', async (_req, res) => {
    const { clientKey } = res.locals;
    const logs = await database.findLogsForTenant(await database.findTenant({ clientKey }));

    res.render('webhooksLogs.mst', {
        index: 'Webhooks Page',
        logs: logs.reverse()
    });
});
