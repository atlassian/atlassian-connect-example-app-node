const cookieOptions =  {
    sameSite: "none",
    secure: true,
    httpOnly: true
};

/**
 * This middleware saves the JWT token from Jira into the browser cookies
 */
export const jwtTokenMiddleware = (req, res, next) => {
    // Check the cookies first
    if (req.cookies.jwt) {
        res.locals.jwt = req.cookies.jwt;
    } else {
        // Check if its in query parameters
        if (req.query.jwt) {
            res.cookie('jwt', req.query.jwt, cookieOptions);
            res.locals.jwt = req.query.jwt;
        } else {
            res.locals.jwt = undefined;
        }
    }

    next();
};