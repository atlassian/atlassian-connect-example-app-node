import { Router } from 'express';
import { findOneInDb } from '../db';
export const LogsRouter = Router();

LogsRouter.get('/webhooks', (_req, res) => {
    const { clientKey } = res.locals;
    findOneInDb(
        { clientKey },
        (data) => {
            if (data?.logs.length) {
                res.render('webhooksLogs.mst', {
                    index: 'Webhooks Page',
                    logs: data.logs.sort().reverse()
                });
            } else {
                res.render('webhooksLogs.mst', {
                    index: 'Webhooks Page',
                    logs: [ "No logs yet!" ]
                });
            }
        },
        () => {
            res.render('webhooksLogs.mst', {
                index: 'Webhooks Page',
                logs: [ "No logs yet!" ]
            });
        }
    );
});
