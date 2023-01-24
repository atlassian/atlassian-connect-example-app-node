import { Router } from 'express';
import { connectAppDescriptor } from '../config';
import baseUrl from '../utils';

const routes = Router();

routes.get('/', (_req, res) => {
    return res.json({ message: 'This is the sample connect app done in Node!' });
});

routes.get('/config', async (_req, res) => {
    const props = {
        baseUrl: await baseUrl(),
    }

    res.json(connectAppDescriptor(props));
})

export default routes;