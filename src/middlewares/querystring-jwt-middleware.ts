import { NextFunction, Request, Response } from "express";
import { JwtVerificationError, verifySymmetricJWTToken } from "../utils/jwt";
import { fromExpressRequest } from "atlassian-jwt";

/**
 * Takes JWT token from query and verifies it using jwt-middleware
 */
export const querystringJwtMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		// The 'jwt' query parameter is injected into the iframe url
		res.locals.jiraTenant = await verifySymmetricJWTToken(fromExpressRequest(req), req.query.jwt as string);
		next();
	} catch (e) {
		const message = e instanceof JwtVerificationError ? e.message : "Unauthorized";
		res.status(401).send(message);
	}
};
