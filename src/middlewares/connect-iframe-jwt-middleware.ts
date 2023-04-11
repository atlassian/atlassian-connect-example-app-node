import { NextFunction, Request, Response } from "express";
import { validateJWTToken } from "../utils/jwt";
import { fromExpressRequest } from "atlassian-jwt";

/**
 * Takes JWT token from query and verifies it using jwt-middleware
 */
export const connectIframeJwtMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		// The 'jwt' query parameter is injected into the iframe url
		res.locals.jiraTenant = await validateJWTToken(fromExpressRequest(req), req.query.jwt as string);
		next();
	} catch (e) {
		res.status(e.status).send(e.message);
	}
};
