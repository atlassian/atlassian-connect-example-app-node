import { Router } from 'express';
import {connectAppDescriptor, connectDescriptorGet} from './atlassian-connect';
import { eventsRouter } from './events';
import { logsRouter } from './logs';
import { publicRouter } from './public';
import { webhooksRouter } from './webhooks';
import { jwtTokenMiddleware } from '../middlewares/jwt-middleware';

export const RootRouter = Router();

RootRouter.get('/', (_req, res) => {
    res.render('index.mst', {
        index: 'Index Page',
        body: 'You in the home page!'
    });
});

RootRouter.get('/atlassian-connect.json', connectDescriptorGet);

RootRouter.use('/events', eventsRouter);

RootRouter.use('/public', publicRouter);

RootRouter.use('/webhooks', webhooksRouter);

RootRouter.get('/config', async (_req, res) => {
    res.render('config.mst', {
        index: 'Connect app descriptor',
        config: JSON.stringify(connectAppDescriptor, undefined, 2)
    });
});

RootRouter.use('/logs', jwtTokenMiddleware, logsRouter);