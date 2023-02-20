import {envVars} from './env';

type ConnectJsonPrimitive = string | number | boolean | null
type ConnectJsonObject = { [k: string]: ConnectJsonValue }
type ConnectJsonArray = ConnectJsonValue[]
type ConnectJsonValue = ConnectJsonArray | ConnectJsonObject | ConnectJsonPrimitive

export const APP_KEY = 'com.atlassian.sample-app-node';

/**
 * General schema can be seen here: https://bitbucket.org/atlassian/connect-schemas/raw/master/jira-global-schema.json
 */
export const connectAppDescriptor = {

    /**
     * Name of the connect app
     */
    name: 'Sample Connect App Node',

    /**
     * Description for the connect app
     */
    description: 'Atlassian Connect app - Node',

    /**
     *  A unique key to identify your connect app. This key must be <= 64 characters.
     */
    key: APP_KEY,

    /**
     * The base url of the remote app, which is used for all communications back to the app instance.
     *
     * For this sample app, this is the tunneled URL which is set in the `prestart.ts`
     */
    baseUrl: envVars.APP_URL,

    /**
     * The vendor who is offering this connect app.
     */
    vendor: {
        name: 'Node connect app sample',
        url: 'https://github.com/atlassian/atlassian-connect-sample-app-node/'
    },

    /**
     * Defines the authentication type to use when signing requests between the host application and the connect app.
     * Types include: `jwt`, `JWT`, `none`, `NONE`
     *
     * Pages defined in the connect app(by default) run within the iframe inside Jira,
     * Defining this authentication will pass the jwt token for each page running within the iframe.
     */
    authentication: {
        type: 'jwt'
    },

    /**
     * Sets the scopes requested by the app
     * https://developer.atlassian.com/cloud/jira/platform/scopes-for-connect-apps/
     */
    scopes: ["READ"],

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
        installed: '/events/installed',
        uninstalled: '/events/uninstalled'
    },

    /**
     * The list of modules this app provides.
     */
    modules: {
        /**
         * This is the first page where the user lands after clicking on the `Get Started` link after installing the app
         * You can think of this page as the main index page for the app.
         */
        postInstallPage: {
            url: '/',
            key: 'acn-index',
            name: {
                value: 'Index'
            }
        },

        /**
         * List of all the webhooks for the connect app.
         * For this sample app, we've added some Jira webhooks events.
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
         * The list of pages/views within the app.
         * https://developer.atlassian.com/cloud/jira/software/modules/page/
         */
        generalPages: [
            {
                /**
                 * The url to retrieve the content from. This must be relative to the add-on's baseUrl.
                 */
                url: '/config',

                /**
                 * A key to identify this module.
                 * The key is used to generate the url to your add-on's module.
                 * The url is generated as a combination of your add-on key and module key.
                 *
                 * For instance:
                 * The node app URL `https://<TUNNELED_URL>/config` is now mapped to `https://<JIRAHOST_INSTANCE>/plugins/servlet/ac/com.atlassian.sample-app-node/acn-config`
                 */
                key: 'acn-config',

                /**
                 * Defines the location in the application interface where the page's link should appear.
                 * For finding locations, please use these web fragment finders:
                 * Jira -> https://marketplace.atlassian.com/apps/1211656/web-fragment-finder?hosting=cloud&tab=overview
                 * Confluence -> https://marketplace.atlassian.com/apps/1215092/web-fragment-finder-for-confluence?hosting=cloud&tab=overview
                 */
                location: 'none',

                /**
                 * A human-readable name for the page.
                 */
                name: {
                    'value': 'Connect Descriptor'
                }
            },
            {
                url: '/logs/webhooks',
                key: 'acn-logs-webhooks',
                location: 'none',
                name: {
                    'value': 'Logs for webhooks'
                }
            }
        ]
    }
};