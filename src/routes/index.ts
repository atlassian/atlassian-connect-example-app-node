import { Router } from 'express';
import { connectAppDescriptor } from '../config';
import baseUrl from '../utils';

const routes = Router();

routes.get('/', (_req, res) => {
    res.render('index.mst', {
        index: 'Index Page',
        body: 'This is the body'
    });
});

routes.get('/config', async (_req, res) => {
    const props = {
        baseUrl: await baseUrl(),
    }

    res.json(connectAppDescriptor(props));
})

export default routes;