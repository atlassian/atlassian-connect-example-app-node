import { createQueryStringHash, decodeSymmetric, getAlgorithm } from "atlassian-jwt";
import { database } from "../db";
import { NextFunction, Request, Response } from "express";

/**
 * This middleware decodes the JWT token from Jira, verifies it
 * And sets the `clientKey` in `res.locals`
 * The tenant for each instance of the app is recognized based on this `clientKey`
 *
 * source: https://developer.atlassian.com/cloud/jira/platform/understanding-jwt-for-connect-apps/#decoding-and-verifying-a-jwt-token
 *
 */
export const connectIframeJWTMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

	// const request = fromExpressRequest(req);
	// This is the Jira instance url injected into the iframe url
	const jwt = req.query.jwt as string;

	// if JWT is missing, return a 401
	if (!jwt) {
		res.sendStatus(401);
		return;
	}

	// Decode jwt token without verification
	let token = decodeSymmetric(jwt, "", getAlgorithm(jwt), true);
	// Get the jira tenant associated with this url
	const jiraTenant = await database.findJiraTenant({ clientKey: token.iss });

	// If tenant doesn't exist anymore, return a 404
	if (!jiraTenant) {
		res.sendStatus(404);
		return;
	}

	try {
		// Try to verify the jwt token
		token = decodeSymmetric(jwt, jiraTenant.sharedSecret, getAlgorithm(jwt));
		// Verify query string hash
		const expectedHash = createQueryStringHash(req, false);
		if (token.qsh !== expectedHash) {
			throw "qsh doesn't match";
		}
		// If all verifications pass, save the jiraTenant to local to be used later
		res.locals.jiraTenant = jiraTenant;
		next();
	} catch (e) {
		// If verification doesn't work, show a 401 error
		res.sendStatus(401);
	}
};
