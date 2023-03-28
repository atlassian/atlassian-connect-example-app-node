import { Request, Response } from "express";
import { envVars } from "../env";

export const connectDescriptorGet = async (_: Request, res: Response): Promise<void> => {
	res.status(200).json(connectAppDescriptor);
};

/**
 * General schema can be seen here: https://bitbucket.org/atlassian/connect-schemas/raw/master/jira-global-schema.json
 */
export const connectAppDescriptor = {

	/**
	 * Name of the Connect app
	 */
	name: "Atlassian Connect Example Node App",

	/**
	 * Description for the Connect app
	 */
	description: "Atlassian Connect Example Node App",

	/**
	 *  A unique key to identify your Connect app. This key must be <= 64 characters.
	 */
	key: envVars.APP_KEY,

	/**
	 * The base url of the server, which is used for all communications between Connect and the app.
	 *
	 * The tunneled URL which is set in the `prestart.ts`
	 */
	baseUrl: envVars.APP_URL,

	/**
	 * The vendor who is offering this Connect app.
	 */
	vendor: {
		name: "Atlassian",
		url: "https://atlassian.com"
	},

	/**
	 * Defines the authentication type to use when signing requests between the host application and the Connect app.
	 * Types include: `jwt`, `JWT`, `none`, `NONE`
	 *
	 * Pages defined in the Connect app(by default) run within the iframe inside Jira,
	 * Defining this authentication will pass the JWT token for each page running within the iframe.
	 */
	authentication: {
		type: "jwt"
	},

	/**
	 * Sets the scopes requested by the app
	 * https://developer.atlassian.com/cloud/jira/platform/scopes-for-connect-apps/
	 */
	scopes: ["READ", "WRITE"],

	/**
	 * The API version is an OPTIONAL integer. If omitted we will infer an API version of 1.
	 */
	apiVersion: 1,

	/**
	 * Allows an app to register callbacks for events that occur in the lifecycle of an installation.
	 * When a lifecycle event is fired, a POST request will be made to the appropriate URL registered for the event.
	 *
	 * https://developer.atlassian.com/cloud/jira/platform/connect-app-descriptor/#lifecycle
	 *
	 */
	lifecycle: {
		installed: "/events/installed",
		uninstalled: "/events/uninstalled"
	},

	/**
	 * Extensions for the different parts of Jira
	 * like links, panels, pages, permissions, workflows etc.
	 */
	modules: {
		/**
		 * This is the first page where the user lands after clicking on the `Get Started` link after installing the app
		 * You can think of this page as the main index page for the app.
		 */
		postInstallPage: {
			url: "/",
			key: "acn-introduction",
			name: {
				value: "Index"
			}
		},

		/**
		 * List of all the webhooks for the Connect app.
		 * For this example, we've added some Jira webhooks events.
		 *
		 * https://developer.atlassian.com/cloud/jira/platform/webhooks/
		 */
		webhooks: [
			{
				event: "jira:issue_created",
				url: "/webhooks/jira/issue-created"
			},
			{
				event: "jira:issue_deleted",
				url: "/webhooks/jira/issue-deleted"
			},
			{
				event: "jira:issue_updated",
				url: "/webhooks/jira/issue-updated"
			}
		],

		/**
		 * Defines the new sections in the application menus.
		 *
		 * https://developer.atlassian.com/cloud/jira/platform/modules/web-section/
		 */
		webSections: [
			{
				key: "addon-web-section",
				location: "admin_plugins_menu",
				name: {
					value: "Node Connect Example App"
				}
			}
		],

		/**
		 * The list of pages/views within the app.
		 * https://developer.atlassian.com/cloud/jira/software/modules/page/
		 */
		generalPages: [
			{
				/**
				 * The url to retrieve the content from. This must be relative to the add-on's baseUrl.
				 */
				url: "/config",

				/**
				 * A key to identify this module.
				 * The key is used to generate the url to your add-on's module.
				 * The url is generated as a combination of your add-on key and module key.
				 *
				 * For instance:
				 * The node app URL `https://<TUNNELED_URL>/config` is now mapped to `https://<JIRAHOST_INSTANCE>/plugins/servlet/ac/com.example.node-connect-app/acn-config`
				 */
				key: "acn-config",

				/**
				 * Defines the location in the application interface where the page's link should appear.
				 * For finding locations, please use these web fragment finders:
				 * Jira -> https://marketplace.atlassian.com/apps/1211656/web-fragment-finder?hosting=cloud&tab=overview
				 * Confluence -> https://marketplace.atlassian.com/apps/1215092/web-fragment-finder-for-confluence?hosting=cloud&tab=overview
				 */
				location: "none",

				/**
				 * A human-readable name for the page.
				 */
				name: {
					"value": "Connect Descriptor"
				}
			},
			{
				url: "/logs/webhooks",
				key: "acn-logs-webhooks",
				location: "none",
				name: {
					"value": "Logs for webhooks"
				}
			},
			{
				url: "/connect-library",
				key: "acn-js-library",
				location: "none",
				name: {
					"value": "Connect JS library"
				}
			},
			{
				url: "/authentication",
				key: "acn-authentication",
				location: "none",
				name: {
					"value": "iFrame jwt authentication"
				}
			},
			{
				url: "/modules",
				key: "acn-modules",
				location: "none",
				name: {
					"value": "Creating modules with Connect"
				}
			},
			{
				url: "/lifecycle-events",
				key: "acn-lifecycle-events",
				location: "none",
				name: {
					"value": "Lifecycle events"
				}
			},
			{
				url: "/making-api-requests",
				key: "acn-api-requests",
				location: "none",
				name: {
					"value": "Making API requests"
				}
			},
			{
				url: "/marketplace",
				key: "acn-marketplace",
				location: "none",
				name: {
					"value": "Atlassian Marketplace"
				}
			},
			/**
			 * The postInstall page is defined here again with a different key and a different location
			 *
			 * Key has to be unique, so used a different one for this
			 * Location is pointing to the key defined in the webSection module
			 *
			 * This ensures that this page will always have Jira's left sidebar opened for this page
			 */
			{
				url: "/",
				key: "acn-home",
				name: {
					value: "Introduction"
				},
				location: "admin_plugins_menu/addon-web-section"
			}
		]
	}
};
