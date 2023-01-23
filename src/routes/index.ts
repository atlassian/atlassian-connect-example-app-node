import { Router } from 'express';

const routes = Router();

routes.get('/', (_req, res) => {
    return res.json({ message: 'This is the sample connect app done in Node!' });
});

export default routes;