const setPageContent = (elementId) => {
	const pageContainer = document.getElementById(elementId);
	const pageContent = pageContainer.getAttribute("data-page-content")
	pageContainer.innerHTML = pageContent;
}
document.addEventListener("DOMContentLoaded", () => {
	// Introduction page
	const introPageContainer = document.getElementById("introductionPageContent");
	if (introPageContainer !== null) {
		setPageContent("introductionPageContent");
	}

	// Atlassian Connect JSON
	const configPage = document.getElementById(("atlassianConnectJson"));
	if (configPage !== null) {
		setPageContent("atlassianConnectJson");
	}

	// Lifecycle Events
	const lifecycleEventsPage = document.getElementById(("lifecycleEvents"));
	if (lifecycleEventsPage !== null) {
		setPageContent("lifecycleEvents");
	}

	// Webhooks
	const webhooksPage = document.getElementById(("webhooks"));
	if (webhooksPage !== null) {
		setPageContent("webhooks");
	}

	// Connect Modules for Jira
	const modulesPage = document.getElementById(("connectModulesForJira"));
	if (modulesPage !== null) {
		setPageContent("connectModulesForJira");
	}

	// Auth with JWT and Storage
	const authPage = document.getElementById(("authWithJwtAndStorage"));
	if (authPage !== null) {
		setPageContent("authWithJwtAndStorage");
	}

	const apiRequestsPage = document.getElementById(("atlassianConnectJson"));
	if (apiRequestsPage !== null) {
		setPageContent("atlassianConnectJson");
	}

	// Making API requests
	const connectLibraryPage = document.getElementById(("makingApiRequests"));
	if (connectLibraryPage !== null) {
		setPageContent("makingApiRequests");
	}

	// Marketplace
	const marketPlacePage = document.getElementById(("marketplace"));
	if (marketPlacePage !== null) {
		setPageContent("marketplace");
	}

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
