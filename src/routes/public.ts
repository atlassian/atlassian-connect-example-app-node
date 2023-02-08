import { Router, static as Static } from 'express';
import path from 'path';

export const publicRouter = Router();

publicRouter.use('/', Static(path.join( process.cwd(), 'static')));
