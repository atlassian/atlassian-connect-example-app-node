import { Router } from 'express';
import { connectAppDescriptor } from '../config';

const routes = Router();

routes.get('/', (_req, res) => {
    return res.json({ message: 'This is the sample connect app done in Node!' });
});

routes.get('/config', (_req, res) => {
    res.json(connectAppDescriptor);
})

export default routes;