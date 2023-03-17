import { Page } from "@playwright/test";
import { JiraTestDataRoles, testData } from "./constants";
import { envVars } from "../../../src/env";

const data = testData.jira;

export const jiraLogin = async (page: Page, roleName: keyof JiraTestDataRoles): Promise<Page> => {
	const role = data.roles[roleName];
	if (!role.username || !role.password) {
		throw "Jira username or password missing";
	}
	await page.goto(data.urls.login);
	await page.waitForLoadState();
	await page.waitForTimeout(500);
	await page.waitForLoadState();
	if (page.url().startsWith(data.urls.auth)) {
		const userinput = page.locator("#username");
		const passinput = page.locator("#password");
		await userinput.fill(role.username);
		await userinput.press("Enter");
		await passinput.fill(role.password);
		await passinput.press("Enter");
		await page.waitForURL(data.urls.yourWork);
	}

	return page;
};

export const jiraAppInstall = async (page: Page): Promise<Page> => {
	await page.goto(data.urls.manageApps);

	// If app is already installed, uninstall it first
	if (await removeApp(page)) {
		await page.reload();
		await page.waitForSelector("#upm-manage-plugins-user-installed");
	}

	await page.click("#upm-upload");
	await page.fill("#upm-upload-url", data.urls.connectJson);
	await page.click("#upm-upload-dialog .aui-button-primary");
	await page.click(`#upm-plugin-status-dialog .confirm`);
	const iframe = await page.frameLocator("#ak-main-content iframe");
	await (await iframe.locator(".ac-content")).waitFor();
	return page;
};

export const jiraAppUninstall = async (page: Page): Promise<Page> => {
	await page.goto(data.urls.manageApps);
	await removeApp(page);
	return page;
};

const removeApp = async (page: Page): Promise<boolean> => {
	await page.waitForSelector("#upm-manage-plugins-user-installed");
	const pluginRow = page.locator(`.upm-plugin[data-key="${envVars.APP_KEY}"]`);
	if (await pluginRow.isVisible()) {
		await pluginRow.click();
		const uninstallButton = await pluginRow.locator(`a[data-action="UNINSTALL"]`);
		await uninstallButton.click();
		await page.click("#upm-confirm-dialog .confirm");
		await uninstallButton.isDisabled();
		return true;
	}
	return false;
};
