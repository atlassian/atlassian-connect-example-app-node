import { Request, Response, Router } from "express";
import { createQueryStringHash, encodeSymmetric } from "atlassian-jwt";
import { envVars } from "../env";
import axios from "axios";

export const apiRouter = Router();

apiRouter.get("/user/:userId", async (req: Request, res: Response) => {
	const pathname = "/rest/api/3/user";
	const query = {
		accountId: req.params.userId
	};
	const nowInSeconds = Math.floor(Date.now() / 1000);
	const jwtToken = encodeSymmetric(
		{
			iat: nowInSeconds,
			exp: nowInSeconds + 3 * 60, // 3 minutes
			iss: envVars.APP_KEY,
			qsh: createQueryStringHash({
				method: "GET", // method can be undefined, defaults to GET
				pathname,
				query
			})
		},
		res.locals.jiraTenant.sharedSecret
	);

	const response = await axios.request({
		baseURL: envVars.ATLASSIAN_URL,
		url: pathname,
		params: query,
		headers: {
			"Authorization": `JWT ${jwtToken}`
		}
	});

	res.send(response.data);
});
