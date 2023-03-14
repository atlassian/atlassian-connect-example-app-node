import { expect, Page, test } from "@playwright/test";
import { jiraAppInstall, jiraAppUninstall, jiraLogin } from "../utils/jira";
import { ngrokBypass } from "../utils/ngrok";

test.describe("App Installation", () => {
	test.describe("jira", () => {
		test("jiraLogin", async ({ page }) => {
			expect(await jiraLogin(page, "admin")).toBeTruthy();
		});

		test.describe("app", () => {
			let page: Page;
			test.beforeEach(async ({ page: newPage }) => {
				page = newPage;
				await jiraLogin(page, "admin");
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

