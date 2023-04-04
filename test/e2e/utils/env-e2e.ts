import { envVars, EnvVars } from "../../../src/env";

export interface E2EEnvVars extends EnvVars {
	E2E_JIRA_ADMIN_EMAIL: string;
	E2E_JIRA_ADMIN_API_TOKEN: string;
}

export const e2eEnvVars = envVars as E2EEnvVars;
