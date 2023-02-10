import {envVars} from './env';

type ConnectJsonPrimitive = string | number | boolean | null
type ConnectJsonObject = { [k: string]: ConnectJsonValue }
type ConnectJsonArray = ConnectJsonValue[]
type ConnectJsonValue = ConnectJsonArray | ConnectJsonObject | ConnectJsonPrimitive

export const connectAppDescriptor = {
    name: 'Sample Connect App Node',
    description: 'Atlassian Connect app - Node',
    key: 'com.atlassian.sample-app-node',
    baseUrl: envVars.APP_URL,
    vendor: {
        name: 'Node connect app sample',
        url: 'https://github.com/atlassian/atlassian-connect-sample-app-node/'
    },
    authentication: {
        type: 'jwt'
    },
    scopes: ["READ"],
    apiVersion: 1,
    lifecycle: {
        installed: '/events/installed',
        uninstalled: '/events/uninstalled'
    },
    modules: {
        postInstallPage: {
            url: '/',
            key: 'acn-index',
            name: {
                value: 'Index'
            }
        },
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
        generalPages: [
            {
                url: '/config',
                key: 'acn-config',
                location: 'none',
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