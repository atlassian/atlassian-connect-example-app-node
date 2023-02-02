import { Router } from 'express';
import { connectAppDescriptor } from '../config';
import { baseUrl } from '../utils';

const routes = Router();

routes.get('/', (_req, res) => {
    res.render('index.mst', {
        index: 'Index Page',
        body: 'You in the home page!'
    });
});

routes.get('/config', async (req, res) => {
    const props = { baseUrl: await baseUrl() };

    if (req.query.isView) {
        res.render('config.mst', {
            index: 'Connect app descriptor',
            config: JSON.stringify(connectAppDescriptor(props), undefined, 2)
        });
    } else {
        res.json(connectAppDescriptor(props));
    }
})

export default routes;
