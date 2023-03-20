const setPageContent = (elementId) => {
	const pageContainer = document.getElementById(elementId);
	const pageContent = pageContainer.getAttribute("data-page-content")
	pageContainer.innerHTML = pageContent;
}

const getPageElement = (id) => {
	const pageContainer = document.getElementById(id);
	if (pageContainer !== null) {
		setPageContent(id);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	// Introduction page
	getPageElement("introductionPageContent");

	// Atlassian Connect JSON
	getPageElement("atlassianConnectJson");

	// Lifecycle Events
	getPageElement("lifecycleEvents");

	// Webhooks
	getPageElement("webhooks");

	// Connect Modules for Jira
	getPageElement("connectModulesForJira");

	// Auth with JWT and Storage
	getPageElement("authWithJwtAndStorage");

	// Making API requests
	getPageElement("makingApiRequests");

	// Connect JS library
	getPageElement("connectLibrary");

	// Listing your app in Marketplace
	getPageElement("marketplace");

	/**
	 *  Page navigation is handled by AP.navigator
	 *  source: https://developer.atlassian.com/cloud/jira/software/jsapi/navigator/
	 */
	document.querySelectorAll('[data-connect-module-key]')
		.forEach(el => {
			el.addEventListener('click', () =>
				AP.navigator.go('addonmodule', { moduleKey: el.getAttribute('data-connect-module-key') }))
			}
		);
});
