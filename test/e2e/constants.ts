import { e2eEnvVars } from './env-e2e';

export const STATE_PATH = './test/e2e/test-results/states';
export const testData: TestData = {
	stateDirectoryPath: STATE_PATH,
	state: `${STATE_PATH}/default.json`,
	appUrl: e2eEnvVars.APP_URL,
	jira: {
		urls: {
			base: e2eEnvVars.ATLASSIAN_URL,
			login: `${e2eEnvVars.ATLASSIAN_URL}/login`,
			auth: `https://id.atlassian.com/login`,
			logout: `${e2eEnvVars.ATLASSIAN_URL}/logout`,
			dashboard: `${e2eEnvVars.ATLASSIAN_URL}/jira/dashboards`,
			yourWork: `${e2eEnvVars.ATLASSIAN_URL}/jira/your-work`,
			manageApps: `${e2eEnvVars.ATLASSIAN_URL}/plugins/servlet/upm`,
			connectJson: `${e2eEnvVars.APP_URL}/jira/atlassian-connect.json`,
			projects: `${e2eEnvVars.ATLASSIAN_URL}/jira/projects`,
		},
		roles: {
			admin: {
				username: e2eEnvVars.JIRA_ADMIN_USERNAME,
				password: e2eEnvVars.JIRA_ADMIN_PASSWORD,
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
	dashboard: string;
	auth: string;
	manageApps: string;
	connectJson: string;
	projects: string;
}


export interface TestDataRoles {
	admin: TestDataRole;
}

export type JiraTestDataRoles = TestDataRoles;

export interface TestDataRole {
	username: string;
	password: string;
	state?: string;
}
