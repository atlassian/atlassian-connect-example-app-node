import { envVars, EnvVars } from "../../../src/env";

export interface E2EEnvVars extends EnvVars {
	E2E_ATLASSIAN_URL: string;
	E2E_JIRA_ADMIN_USERNAME: string;
	E2E_JIRA_ADMIN_PASSWORD: string;
}

export const e2eEnvVars = envVars as E2EEnvVars;
