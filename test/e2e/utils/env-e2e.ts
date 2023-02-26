import { envVars, EnvVars } from '../../../src/config/env';

export interface E2EEnvVars extends EnvVars {
	ATLASSIAN_URL: string;
	JIRA_ADMIN_USERNAME: string;
	JIRA_ADMIN_PASSWORD: string;
}

export const e2eEnvVars = envVars as E2EEnvVars;
