import { Request, Response, Router } from "express";
import { createQueryStringHash, encodeSymmetric } from "atlassian-jwt";
import { envVars } from "../env";
import { querystringJwtMiddleware } from "../middlewares/querystring-jwt-middleware";

export const apiRouter = Router();

/************************************************************************************************************************
 * Middlewares auth
 ************************************************************************************************************************/
apiRouter.use(querystringJwtMiddleware);

apiRouter.get("/user/:userId", async (req: Request, res: Response) => {
	// REST API url info
	const pathname = "/rest/api/3/user";
	const query = { accountId: req.params.userId };

	// Creating JWT token for Jira REST API, using atlassian-jwt library: https://bitbucket.org/atlassian/atlassian-jwt-js/src/master/
	const nowInSeconds = Math.floor(Date.now() / 1000);
	const jwtToken = encodeSymmetric(
		{
			iat: nowInSeconds,
			exp: nowInSeconds + 3 * 60, // 3 minutes
			iss: envVars.APP_KEY,
			qsh: createQueryStringHash({
				method: "GET",
				pathname,
				query
			})
		},
		// shared secret given as part of the installed lifecycle event
		res.locals.jiraTenant.sharedSecret
	);

	// Call Jira REST API
	const response = await fetch(`${envVars.ATLASSIAN_URL}${pathname}?${new URLSearchParams(query).toString()}`,{
		headers: {
			"Authorization": `JWT ${jwtToken}`
		}
	});

	res.send(await response.json());
});
