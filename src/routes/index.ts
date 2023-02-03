import { Router } from 'express';
import { connectAppDescriptor } from '../config';
import { baseUrl } from '../utils';
import { WebhooksRouter } from './webhooks';
import { PublicRouter } from './public';
import { ConnectDescriptorGet } from "./atlassian-connect";

const Routes = Router();

Routes.get('/atlassian-connect.json', ConnectDescriptorGet);

Routes.get('/', (_req, res) => {
    res.render('index.mst', {
        index: 'Index Page',
        body: 'You in the home page!'
    });
});

Routes.get('/config', async (_req, res) => {
    const props = { baseUrl: await baseUrl() };
    res.render('config.mst', {
        index: 'Connect app descriptor',
        config: JSON.stringify(connectAppDescriptor(props), undefined, 2)
    });
});

Routes.use('/public', PublicRouter);

Routes.use('/webhooks', WebhooksRouter);

export default Routes;