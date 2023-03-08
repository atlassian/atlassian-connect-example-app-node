import { Request as ExpressRequest } from 'express';
import url from 'url';

export const getJWTRequest = (req: ExpressRequest) => ({
    ...url.parse(req.originalUrl || req.url, true),
    method: req.method,
    body: req.body
});
