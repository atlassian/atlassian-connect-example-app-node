const setPageContent = (elementId) => {
	const pageContainer = document.getElementById(elementId);
	pageContainer.innerHTML = pageContainer.getAttribute("data-page-content");
}

const getPageElement = (id) => {
	const pageContainer = document.getElementById(id);
	if (pageContainer !== null) {
		setPageContent(id);
	}
}

const highlightCurrentMenuInSidebar = () => {
	// TODO: Figure out why AP.navigator.getLocation is not working
	const currentLocation = AP._data.options.key;

	document.querySelector("[data-connect-module-key=" + currentLocation + "]").classList.add("selected");
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

	highlightCurrentMenuInSidebar();
});
