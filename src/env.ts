import { config } from "dotenv";

export type EnvVars = {
	APP_URL: string;
	APP_KEY: string;
	NGROK_AUTHTOKEN: string;
	ATLASSIAN_URL: string;
	JIRA_ADMIN_USERNAME: string;
	JIRA_ADMIN_PASSWORD: string;
};

const variables = config().parsed as Partial<EnvVars>;

if (!variables?.APP_URL) {
	console.error("Missing APP_URL environment variable, exiting...");
	process.exit(1);
}

if (!variables?.NGROK_AUTHTOKEN) {
	console.error("Missing NGROK_AUTHTOKEN environment variable, exiting...");
	process.exit(1);
}

export const envVars: EnvVars = {
	APP_KEY: "com.atlassian.sample-app-node",
	...variables
} as EnvVars;
