import { createQueryStringHash, decodeAsymmetric, decodeSymmetric, getAlgorithm, getKeyId } from "atlassian-jwt";
import { database, JiraTenant } from "../db";
import { Request } from "atlassian-jwt/dist/lib/jwt";
import { envVars } from "../env";

/**
 * A Jira JWT token claims.
 *
 * @ses https://developer.atlassian.com/cloud/jira/platform/understanding-jwt-for-connect-apps/#manually-creating-a-jwt
 */
export type JiraJwtClaims = {
	readonly iss: string;
	readonly iat: number;
	readonly exp: number;
	readonly qsh: string;
	readonly sub?: string;
	readonly aud?: string[];
}

/**
 * Verifies a Jira symmetric JWT token.
 *
 * This decodes the JWT token, verifies it against the jira tenant's shared secret
 * and returns the verified Jira tenant if it passes.
 *
 * @see https://developer.atlassian.com/cloud/jira/platform/understanding-jwt-for-connect-apps/#types-of-jwt-token
 * @see https://developer.atlassian.com/cloud/jira/platform/understanding-jwt-for-connect-apps/#decoding-and-verifying-a-jwt-token
 *
 * @throws {JwtVerificationError} The given token is invalid or cannot be verified.
 */
export const verifySymmetricJWTToken = async (request: Request, token?: string): Promise<JiraTenant> => {
	// if JWT is missing, return a 401
	if (!token) throw new JwtVerificationError("Missing JWT token");

	// Decode jwt token without verification
	let unverifiedClaims: Record<string, unknown>;
	try {
		unverifiedClaims = decodeSymmetric(token, "", getAlgorithm(token), true) as Record<string, unknown>;
	} catch (e) {
		throw new JwtVerificationError("The JWT token is invalid.");
	}

	validateIss(unverifiedClaims.iss);

	// Get the jira tenant associated with this url
	const jiraTenant = await database.findJiraTenant({ clientKey: unverifiedClaims.iss as string });

	if (!jiraTenant) throw new JwtVerificationError("The JWT token is invalid.");

	// Decode a JWT token with verification.
	let verifiedClaims: JiraJwtClaims;
	try {
		verifiedClaims = decodeSymmetric(token, jiraTenant.sharedSecret, getAlgorithm(token));
	} catch (e) {
		throw new JwtVerificationError("The JWT token is not authentic.");
	}

	// Validate the standard claims.
	validateQsh(verifiedClaims.qsh, request);
	validateExp(verifiedClaims.exp);

	// If all verifications pass, save the jiraTenant to local to be used later
	return jiraTenant;
};


/**
 * Verifies a Jira asymmetric JWT token, used for lifecycle event requests.
 *
 * This decodes the JWT token, verifies it based on the connect public key.
 *
 * @see https://developer.atlassian.com/cloud/jira/platform/understanding-jwt-for-connect-apps/#types-of-jwt-token
 * @see https://developer.atlassian.com/cloud/jira/platform/understanding-jwt-for-connect-apps/#decoding-and-verifying-a-jwt-token
 * @see https://developer.atlassian.com/cloud/jira/platform/security-for-connect-apps/#validating-installation-lifecycle-requests
 *
 * @throws {JwtVerificationError} The given token is invalid or cannot be verified.
 */
export const verifyAsymmetricJWTToken = async (request: Request, token?: string): Promise<void> => {
	if (!token) throw new JwtVerificationError("Missing JWT token");

	let unverifiedClaims: Record<string, unknown>;

	// Decode a JWT token without verification.
	try {
		unverifiedClaims = decodeAsymmetric(token, "", getAlgorithm(token), true) as Record<string, unknown>;
	} catch (e) {
		throw new JwtVerificationError("The JWT token is invalid.");
	}

	validateIss(unverifiedClaims.iss);

	const publicKey = await queryAtlassianConnectPublicKey(getKeyId(token));

	// Decode a JWT token with verification.
	let verifiedClaims: JiraJwtClaims;
	try {
		verifiedClaims = decodeAsymmetric(token, publicKey, getAlgorithm(token));
	} catch (e) {
		throw new JwtVerificationError("The JWT token is not authentic.");
	}

	// Validate the standard claims.
	validateExp(verifiedClaims.exp);
	validateQsh(verifiedClaims.qsh, request);

	// Make sure the AUD claim has the correct URL
	if (!verifiedClaims?.aud?.[0]?.includes(envVars.APP_URL)) {
		throw new JwtVerificationError("The JWT token does not contain the correct audience (aud) claim");
	}
};

export class JwtVerificationError extends Error {
}

const validateIss = (iss: unknown): void => {
	if (typeof iss !== "string" || !iss) {
		throw new JwtVerificationError("The JWT token does not contain or contains the unexpected issuer (iss) claim");
	}
};

/**
 * Validates whether the fixed or URL-bound `qsh` claim.
 */
const validateQsh = (qsh: string, request: Request): void => {
	if (qsh !== "context-qsh" && qsh !== createQueryStringHash(request, false)) {
		throw new JwtVerificationError("JWT Verification Failed, wrong qsh");
	}
};

/**
 * Validates the `exp` claim. Gives a 3-second leeway in case of time drift.
 */
const validateExp = (exp: number): void => {
	const leewayInSeconds = 3;
	const nowInSeconds = Date.now() / 1000 - 3;

	if (nowInSeconds >= exp + leewayInSeconds) {
		throw new JwtVerificationError("The JWT validation failed, token is expired");
	}
};

/**
 * Queries the public key for the specified keyId.
 *
 * @see https://developer.atlassian.com/cloud/jira/platform/understanding-jwt-for-connect-apps/#verifying-a-asymmetric-jwt-token-for-install-callbacks
 */
const queryAtlassianConnectPublicKey = async (keyId: string): Promise<string> => {
	const response = await fetch(`https://connect-install-keys.atlassian.com/${keyId}`);
	if (response.status !== 200) {
		throw new JwtVerificationError(`Unable to get public key for keyId ${keyId}`);
	}
	return response.text();
};
