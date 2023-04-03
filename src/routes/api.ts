import { NextFunction, Request, Response, Router } from "express";
import { database } from "../db";
import { encodeSymmetric } from "atlassian-jwt";

export const apiRouter = Router();
/*
apiRouter.use(async (req:Request, res:Response, next: NextFunction) => {
	req.query.jwt;
	next();
});*/

apiRouter.get("/", async (_req:Request, res:Response) => {
	/*const jwtToken = encodeSymmetric(
		{
			...getExpirationInSeconds(),
			iss,
			qsh: createQueryStringHash({
				method: config.method || "GET", // method can be undefined, defaults to GET
				pathname: pathname || undefined,
				query
			})
		},
		secret
	);

	// Set authorization headers
	config.headers = config.headers || {};
	config.headers.Authorization = `JWT ${jwtToken}`;*/
	res.send(res.locals.jiraTenant);
});
