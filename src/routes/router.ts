import path from "path";
import { Router, static as Static } from "express";
import { connectDescriptorGet } from "./atlassian-connect";
import { eventsRouter } from "./events";
import { webhooksRouter } from "./webhooks";
import { apiRouter } from "./api";
import { pageRouter } from "./pages";

export const RootRouter = Router();

/************************************************************************************************************************
 * Root page
 ************************************************************************************************************************/
RootRouter.get("/", (_req, res) => res.status(200).send("Server up and working."));

/************************************************************************************************************************
 * Connect app manifest
 ************************************************************************************************************************/
RootRouter.get("/atlassian-connect.json", connectDescriptorGet);

/************************************************************************************************************************
 * Public files(images, stylesheets)
 ************************************************************************************************************************/
RootRouter.use("/public", Static(path.join(process.cwd(), "static")));

/************************************************************************************************************************
 * Pages
 ************************************************************************************************************************/
RootRouter.use("/pages", pageRouter);

/************************************************************************************************************************
 * Connect lifecycle Events
 ************************************************************************************************************************/
RootRouter.use("/events", eventsRouter);

/************************************************************************************************************************
 * Webhooks
 ************************************************************************************************************************/
RootRouter.use("/webhooks", webhooksRouter);

/************************************************************************************************************************
 * API
 ************************************************************************************************************************/
RootRouter.use("/api/example", apiRouter);
