const baseUrl = process.env.BASE_URL;

export const connectAppDescriptor = {
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
    apiVersion: 1,
    modules: {
        postInstallPage: {
            url: '/',
            key: 'acn-index',
            name: {
                value: 'Index'
            },
        },
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
};