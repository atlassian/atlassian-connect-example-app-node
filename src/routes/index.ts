import { Router } from 'express';
import { connectAppDescriptor } from '../config';
import baseUrl from '../utils';

const routes = Router();

routes.get('/', (_req, res) => {
    res.render('index.mst', {
        index: 'Index Page',
        body: 'You in the home page!'
    });
});

routes.get('/config', async (_req, res) => {
    const props = { baseUrl: await baseUrl() };

    res.render('config.mst', {
        index: 'Connect app descriptor',
        config: JSON.stringify(connectAppDescriptor(props), undefined, 2)
    });
})

export default routes;