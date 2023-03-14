import { chromium } from "@playwright/test";
import { jiraAppInstall, jiraLogin } from "./utils/jira";
import { ngrokBypass } from "./utils/ngrok";

export default async function setup() {
	const browser = await chromium.launch();
	const page = await browser.newPage();

	// login and save state before tests
	await ngrokBypass(page).then(async (page) => jiraLogin(page, "admin"));

	await jiraAppInstall(page);

	// Close the browser
	await browser.close();
}
