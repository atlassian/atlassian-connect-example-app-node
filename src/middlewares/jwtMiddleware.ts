import {decodeAtlassianJwtToken, decodeJwtToken} from '../utils';

/**
 * This middleware decodes the JWT token from Jira and identifies the users
 */
export const jwtTokenMiddleware = (req, res, next) => {
    if (!req.query.jwt) {
        console.error('JWT Token not found!');
        throw new Error('JWT Token not found!');
    }

    const decodedJwtToken = decodeJwtToken(req.query.jwt);

    res.locals.atlassianToken = decodeAtlassianJwtToken(req.query.jwt);
    res.locals.clientKey = decodedJwtToken.iss;
    next();
};