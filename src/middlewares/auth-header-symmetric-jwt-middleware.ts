import { NextFunction, Request, Response } from "express";
import { verifySymmetricJWTToken } from "../utils/jwt";
import { fromExpressRequest } from "atlassian-jwt";

/**
 * Takes JWT token from Authorization header and verifies it using jwt-middleware
 */
export const authHeaderSymmetricJwtMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		// The jwt token is sent with the Authorization headers of the webhook
		res.locals.jiraTenant = await verifySymmetricJWTToken(fromExpressRequest(req), req.headers.authorization?.replace("JWT ", ""));
		next();
	} catch (e) {
		res.status(e.status).send(e.message);
	}
};
