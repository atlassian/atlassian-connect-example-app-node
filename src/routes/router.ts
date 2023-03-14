import { Router } from 'express';
import { connectDescriptorGet } from './atlassian-connect';
import { eventsRouter } from './events';
import { logsRouter } from './logs';
import { publicRouter } from './public';
import { webhooksRouter } from './webhooks';
import { connectAppDescriptor } from '../config';
import { jwtTokenMiddleware } from '../middlewares/jwt-middleware';

const routes = Router();

routes.get('/', (_req, res) => {
    res.render('index.mst', {
        index: 'Introduction',
        body: 'Welcome to the Node.js Sample App'
    });
});

routes.get('/config', async (_req, res) => {
    res.render('config.mst', {
        index: 'Connect app descriptor',
        config: JSON.stringify(connectAppDescriptor, undefined, 2)
    });
});

routes.use('/webhooks', webhooksRouter);

routes.use('/logs', jwtTokenMiddleware, logsRouter);

routes.get('/connect-library', async (_req, res) => {
    res.render('connect.mst', {
        index: 'Connect JS Library'
    });
});

routes.get('/auth', async (_req, res) => {
    res.render('auth.mst', {
        index: 'iFrame JWT Authentication'
    });
});

routes.get('/modules', async (_req, res) => {
    res.render('modules.mst', {
        index: 'Connect Modules'
    });
});

routes.get('/atlassian-connect.json', connectDescriptorGet);

routes.use('/events', eventsRouter);

routes.use('/public', publicRouter);

export default routes;