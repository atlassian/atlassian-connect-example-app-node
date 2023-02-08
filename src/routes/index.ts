import { Router } from 'express';
import { connectDescriptorGet } from './atlassian-connect';
import { eventsRouter } from './events';
import { logsRouter } from './logs';
import { publicRouter } from './public';
import { webhooksRouter } from './webhooks';
import { connectAppDescriptor } from '../config';
import { baseUrl } from '../utils';
import { jwtTokenMiddleware } from '../middlewares/jwtMiddleware';

const routes = Router();

routes.get('/', (_req, res) => {
    res.render('index.mst', {
        index: 'Index Page',
        body: 'You in the home page!'
    });
});

routes.get('/atlassian-connect.json', connectDescriptorGet);

routes.use('/events', eventsRouter);

routes.use('/public', publicRouter);

routes.use('/webhooks', webhooksRouter);

routes.get('/config', async (_req, res) => {
    const props = { baseUrl: await baseUrl() };
    res.render('config.mst', {
        index: 'Connect app descriptor',
        config: JSON.stringify(connectAppDescriptor(props), undefined, 2)
    });
});

routes.use('/logs', jwtTokenMiddleware, logsRouter);

export default routes;