import { config } from "dotenv";
import path from "path";

export type EnvVars = {
	APP_URL: string;
	APP_KEY: string;
	NGROK_AUTHTOKEN: string;
	ATLASSIAN_URL: string;
	JIRA_ADMIN_EMAIL?: string;
	JIRA_ADMIN_API_TOKEN?: string;
};

const nodeEnv = process.env.NODE_ENV || "development";
const variables:Partial<EnvVars> = [
	`.env.${nodeEnv}`,
	".env"
].reduce((acc, env) => ({
	...acc,
	...config({
		path: path.resolve(__dirname, "..", env)
	}).parsed
}), {});

if (!variables?.APP_URL) {
	console.error("Missing APP_URL environment variable, exiting...");
	process.exit(1);
}

if (!variables?.NGROK_AUTHTOKEN) {
	console.error("Missing NGROK_AUTHTOKEN environment variable, exiting...");
	process.exit(1);
}

export const envVars: EnvVars = {
	APP_KEY: "com.example.node-connect-app",
	...variables
} as EnvVars;
