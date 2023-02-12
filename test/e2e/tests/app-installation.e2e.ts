import { expect, Page, test } from '@playwright/test';
import { testData } from '../utils/constants';
import { jiraAppInstall, jiraAppUninstall, jiraLogin } from '../utils/jira';
import { ngrokBypass } from '../utils/ngrok';

test.describe("App Installation", () => {
	for (const useState of [false, true]) {
		test.describe("jira", () => {
			test.describe(useState ? "with state" : "without state", () => {
				if (useState) {
					test.use({
						storageState: testData.jira.roles.admin.state
					});
				}

				test("jiraLogin", async ({ page }) => {
					expect(await jiraLogin(page, "admin")).toBeTruthy();
				});

				test.describe("app", () => {
					let page: Page;
					test.beforeEach(async ({ page: newPage }) => {
						page = newPage;
						if (!useState) {
							await jiraLogin(page, "admin");
						}
					});

					test("jiraAppInstall", async () => {
						await ngrokBypass(page);
						expect(await jiraAppInstall(page)).toBeTruthy();
					});

					test("jiraAppUninstall", async () => {
						expect(await jiraAppUninstall(page)).toBeTruthy();
					});
				});
			});
		});
	}
});

