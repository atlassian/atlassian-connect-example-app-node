import { envVars } from "../../../src/env";

export const STATE_PATH = "./test/e2e/test-results/states";
export const testData: TestData = {
	stateDirectoryPath: STATE_PATH,
	state: `${STATE_PATH}/default.json`,
	appUrl: envVars.APP_URL,
	jira: {
		urls: {
			base: envVars.ATLASSIAN_URL,
			login: `${envVars.ATLASSIAN_URL}/login`,
			auth: `https://id.atlassian.com/login`,
			logout: `${envVars.ATLASSIAN_URL}/logout`,
			yourWork: `${envVars.ATLASSIAN_URL}/jira/your-work`,
			manageApps: `${envVars.ATLASSIAN_URL}/plugins/servlet/upm`,
			connectJson: `${envVars.APP_URL}/atlassian-connect.json`
		},
		roles: {
			admin: {
				username: envVars.JIRA_ADMIN_EMAIL,
				password: envVars.JIRA_ADMIN_API_TOKEN,
				state: `${STATE_PATH}/jira-admin.json`
			}
		}
	}
};

export interface TestData {
	stateDirectoryPath: string;
	state: string;
	appUrl: string;
	jira: TestDataEntry<JiraTestDataURLs, JiraTestDataRoles>;
}

export interface TestDataEntry<U extends TestDataURLs = TestDataURLs, R extends TestDataRoles = TestDataRoles> {
	urls: U;
	roles: R;
}

export interface TestDataURLs {
	base: string;
	login: string;
	logout: string;
}

export interface JiraTestDataURLs extends TestDataURLs {
	yourWork: string;
	auth: string;
	manageApps: string;
	connectJson: string;
}


export interface TestDataRoles {
	admin: TestDataRole;
}

export type JiraTestDataRoles = TestDataRoles;

export interface TestDataRole {
	username?: string;
	password?: string;
	state?: string;
}
