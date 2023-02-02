import { Router, static as Static } from "express";
import path from "path";

export const PublicRouter = Router();

PublicRouter.use("/", Static(path.join( process.cwd(), "static")));
