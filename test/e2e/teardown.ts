import { chromium } from "@playwright/test";
import { ngrokBypass } from "./utils/ngrok";
import { jiraAppUninstall, jiraLogin } from "./utils/jira";

export default async function teardown() {
	const browser = await chromium.launch();
	const page = await browser.newPage();

	// login and save state before tests
	await ngrokBypass(page).then(async (page) => jiraLogin(page, "admin"));

	// Uninstall the app
	await jiraAppUninstall(page);
	// Close the browser

	await browser.close();
}
