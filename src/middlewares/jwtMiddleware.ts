import { decodeJwtToken } from '../utils';
import {findOneInDb, TenantType} from '../db';

/**
 * This middleware decodes the JWT token from Jira and identifies the users
 */
export const jwtTokenMiddleware = async (req, res, next) => {
    if (!req.query.jwt) {
        console.error('JWT Token not found!');
        throw new Error('JWT Token not found!');
    }

    const host = req.query.xdm_e;
    const tenant = await findOneInDb(
        { host },
    ) as TenantType;

    if (tenant?.sharedSecret) {
        const decodedJwtToken = decodeJwtToken(req.query.jwt, tenant.sharedSecret);

        res.locals.clientKey = decodedJwtToken.iss;
    }

    next();
};