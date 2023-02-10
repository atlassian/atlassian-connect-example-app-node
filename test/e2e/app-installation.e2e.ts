import { expect, Page, test } from '@playwright/test';
import { jiraAppInstall, jiraAppUninstall, jiraLogin } from './utils/jira';
import { testData } from "test/e2e/constants";

test.skip("App Installation", () => {
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

					test("jiraAppUninstall", async () => {
						expect(await jiraAppUninstall(page)).toBeTruthy();
					});

					test("jiraAppInstall", async () => {
						expect(await jiraAppInstall(page)).toBeTruthy();
					});
				});
			});
		});
	}
});

