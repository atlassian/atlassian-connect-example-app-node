type Props = {
    baseUrl: string;
};

export const connectAppDescriptor = ({ baseUrl }: Props) => ({
    name: 'Sample Connect App Node',
    description: 'Atlassian Connect app - Node',
    key: 'com.atlassian.sample-app-node',
    baseUrl,
    vendor: {
        name: 'Node connect app sample',
        url: 'https://github.com/atlassian/atlassian-connect-sample-app-node/'
    },
    authentication: {
        type: 'none'
    },
    scopes: [ "READ" ],
    apiVersion: 1,
    modules: {
        postInstallPage: {
            url: '/',
            key: 'acn-index',
            name: {
                value: 'Index'
            },
        },
        webhooks: [
            {
                event: "jira:issue_created",
                url: "webhooks/jira-issue_created"
            },
            {
                event: "jira:issue_deleted",
                url: "webhooks/jira-issue_deleted"
            },
            {
                event: "jira:issue_updated",
                url: "webhooks/jira-issue_updated"
            }
        ],
        generalPages: [
            {
                url: '/',
                key: 'acn-contact',
                location: 'none',
                name: {
                    'value': 'Index'
                }
            }
        ]
    }
});