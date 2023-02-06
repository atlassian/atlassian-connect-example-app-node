import { Router } from 'express';
import { ConnectDescriptorGet } from './atlassian-connect';
import { EventsRouter } from './events';
import { PublicRouter } from './public';
import { WebhooksRouter } from './webhooks';
import { connectAppDescriptor } from '../config';
import { baseUrl } from '../utils';
import { jwtTokenMiddleware } from '../middlewares/jwtMiddleware';

const Routes = Router();

Routes.get('/atlassian-connect.json', ConnectDescriptorGet);

Routes.use('/events', EventsRouter);

Routes.use('/public', PublicRouter);

Routes.get('/', jwtTokenMiddleware, (_req, res) => {
    res.render('index.mst', {
        index: 'Index Page',
        body: 'You in the home page!'
    });
});

Routes.get('/config', jwtTokenMiddleware, async (_req, res) => {
    const props = { baseUrl: await baseUrl() };
    res.render('config.mst', {
        index: 'Connect app descriptor',
        config: JSON.stringify(connectAppDescriptor(props), undefined, 2)
    });
});

Routes.use('/webhooks', jwtTokenMiddleware, WebhooksRouter);

export default Routes;