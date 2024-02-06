import { Router, static as Static } from "express";
import path from "path";
import fs from "fs/promises";

export const spaRouter = Router();

const rootPath = process.cwd();

//Assets from within the new spa experience in /spa/build/static
spaRouter.use("/static", Static(path.join(rootPath, "spa/build/static")));

let indexHtmlContent = "";

spaRouter.use("/*", async (_, res) => {
	if (!indexHtmlContent) {
		indexHtmlContent = await fs.readFile(path.join(process.cwd(), "spa/build/index.html"), "utf-8");
	}

	res.status(200).send(indexHtmlContent);
});
