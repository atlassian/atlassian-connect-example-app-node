import { createQueryStringHash, decodeSymmetric, getAlgorithm } from "atlassian-jwt";
import { database, JiraTenant } from "../db";
import { Request } from "atlassian-jwt/dist/lib/jwt";

export interface JWTError {
	status: number;
	message: string;
}

/**
 * This middleware decodes the JWT token from Jira, verifies it
 * And sets the `clientKey` in `res.locals`
 * The tenant for each instance of the app is recognized based on this `clientKey`
 * https://developer.atlassian.com/cloud/jira/platform/understanding-jwt-for-connect-apps/#decoding-and-verifying-a-jwt-token
 */
export const validateJWTToken = async (request: Request, token?: string): Promise<JiraTenant> => {
	// if JWT is missing, return a 401
	if (!token) {
		return Promise.reject({
			status: 401,
			message: "Missing JWT token"
		});
	}

	// Decode jwt token without verification
	let data = decodeSymmetric(token, "", getAlgorithm(token), true);
	// Get the jira tenant associated with this url
	const jiraTenant = await database.findJiraTenant({ clientKey: data.iss });

	// If tenant doesn't exist anymore, return a 404
	if (!jiraTenant) {
		return Promise.reject({
			status: 404,
			message: "Jira Tenant doesn't exist"
		});
	}

	try {
		// Try to verify the jwt token
		data = decodeSymmetric(token, jiraTenant.sharedSecret, getAlgorithm(token));
		// Verify query string hash
		if (data.qsh !== "context-qsh" && data.qsh !== createQueryStringHash(request, false)) {
			throw "qsh doesn't match";
		}
		// If all verifications pass, save the jiraTenant to local to be used later
		return jiraTenant;
	} catch (e) {
		// If verification doesn't work, show a 401 error
		return Promise.reject({
			status: 401,
			message: `JWT verification failed: ${e}`
		});
	}
};
