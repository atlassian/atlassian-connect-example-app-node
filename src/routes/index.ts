import { Router } from 'express';
import { connectAppDescriptor } from '../config';
import { baseUrl } from '../utils';
import { WebhooksRouter } from './webhooks';
import { PublicRouter } from './public';
import { ConnectDescriptorGet } from "./atlassian-connect";

const Routes = Router();

Routes.get('/', (_req, res) => {
    res.render('index.mst', {
        index: 'Index Page',
        body: 'You in the home page!'
    });
});

Routes.get('/config', async (req, res) => {
    const props = { baseUrl: await baseUrl() };

    if (req.query.isView) {
        res.render('config.mst', {
            index: 'Connect app descriptor',
            config: JSON.stringify(connectAppDescriptor(props), undefined, 2)
        });
    } else {
        res.json(connectAppDescriptor(props));
    }
});

Routes.get("/atlassian-connect.json", ConnectDescriptorGet);

Routes.use('/public', PublicRouter);

Routes.use('/webhooks', WebhooksRouter);

export default Routes;