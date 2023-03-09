import { createQueryStringHash, decodeSymmetric, getAlgorithm, Request } from 'atlassian-jwt';
import { database } from '../db/db';
import { Request as ExpressRequest } from 'express';
import { getJWTRequest } from '../utils/utils';


/**
 * This middleware decodes the JWT token from Jira, verifies it
 * And sets the `clientKey` in `res.locals`
 * The tenant for each instance of the app is recognized based on this `clientKey`
 *
 * source: https://developer.atlassian.com/cloud/jira/platform/understanding-jwt-for-connect-apps/#decoding-and-verifying-a-jwt-token
 *
 */
export const jwtTokenMiddleware = async (req, res, next) => {
    const host = req.query.xdm_e;
    const tenant = await database.findTenant({host});

    if (
        decodeWithoutVerification(req) &&
        verifyIssFromUnverifiedToken(req, tenant.clientKey) &&
        decodeWithVerification(req, tenant.sharedSecret) &&
        verifyTokenNotExpired(req, tenant.sharedSecret) &&
        verifyTokenQsh(req, tenant.sharedSecret)
    ) {
        res.locals.clientKey = tenant.clientKey;
    }

    next();
};

const decodeWithoutVerification = (req: ExpressRequest): boolean => {
    const token = req.query.jwt as string;
    const alg = getAlgorithm(token);

    try {
        decodeSymmetric(token, "", alg, true);
        return true;
    } catch (e) {
        console.error('Invalid JWT:', e.message);
        return false;
    }
};
const verifyIssFromUnverifiedToken = (req: ExpressRequest, clientKey: string): boolean => {
    const token = req.query.jwt as string;
    const alg = getAlgorithm(token);

    const unverifiedToken = decodeSymmetric(token, "", alg, true);

    if (unverifiedToken.iss !== clientKey) {
        console.error("JWT claim did not contain the issuer (iss) claim");
        return false;
    }

    return true;
};
const decodeWithVerification = (req: ExpressRequest, sharedSecret: string) => {
    const token = req.query.jwt as string;
    const alg = getAlgorithm(token);

    try {
        decodeSymmetric(token, sharedSecret, alg, false);
        return true;
    } catch (e) {
        console.error('JWT token couldn\'t be verified:', e.message);
        return false;
    }
};
const verifyTokenNotExpired = (req: ExpressRequest, sharedSecret: string): boolean => {
    const token = req.query.jwt as string;
    const alg = getAlgorithm(token);

    const verifiedToken = decodeSymmetric(token, sharedSecret, alg, false);

    if (verifiedToken.exp && (Date.now() / 1000 - 3) >= verifiedToken.exp) {
        console.error("JWT Token has expired");
        return false;
    }

    return true;
};
const verifyTokenQsh = (req: ExpressRequest, sharedSecret: string): boolean => {
    const token = req.query.jwt as string;
    const alg = getAlgorithm(token);
    const verifiedToken = decodeSymmetric(token, sharedSecret, alg, false);

    if (!verifiedToken.qsh) {
        console.error("JWT validation Failed, no qsh");
        return false;
    }

    const jwtRequest = getJWTRequest(req);
    const expectedQsh = createQueryStringHash(jwtRequest as Request, true);
    if (expectedQsh !== verifiedToken.qsh) {
        console.error("Invalid Qsh!");
        return false;
    }

    return true;
};

