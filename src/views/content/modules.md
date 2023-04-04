As mentioned in our **[Introduction](~introduction)**, modules can be used to extend the functionality of the 
Jira/Confluence platform or a Jira/Confluence application. They are commonly used to extend the user interface by adding
links, panels, or pages, or to extend permissions or workflows.

To use a Connect module you can either declare it in your app descriptor e.g.

```
"modules": {
      "generalPages": [
          {
              "key": "hello-world",
              "url": "/hello-world-page",
              "name": {
                  "value": "Hello World!"
              }
          }
      ]
}
```

or, for some modules, you can register them dynamically using the 
[REST API](https://developer.atlassian.com/cloud/jira/platform/dynamic-modules).

## iframes

Atlassian Connect creates an iframe, which it reuses across modules, and passes information to the app using query parameters in
the iframe URL. Here is a simplified example of this:

```
<iframe src="https://some-app.com/confirm-dialog?project=FOO&etc">
	<!-- app content here -->
</iframe>
```

Please refer to our documentation for information about [Opting in to cacheable iframes](https://developer.atlassian.com/cloud/confluence/cacheable-app-iframes-for-connect-apps/#opting-in-to-cacheable-iframes).

## Jira modules

For Jira, there are 2 types of modules: 
- **basic iframes**: these include [location-based modules](https://developer.atlassian.com/cloud/jira/platform/about-connect-modules-for-jira/#location-based-modules), 
[new Jira issue view modules](https://developer.atlassian.com/cloud/jira/platform/about-connect-modules-for-jira/#new-jira-issue-view-modules), 
and [pages and dialogs](https://developer.atlassian.com/cloud/jira/platform/about-connect-modules-for-jira/#pages-and-dialogs).
- [**advanced modules**](https://developer.atlassian.com/cloud/jira/platform/about-connect-modules-for-jira/#advanced-ui-modules): 
these allow you to extend specific Jira features such as the issue tab panel and dashboard
items.

Please refer to our documentation for more information on [Jira modules](https://developer.atlassian.com/cloud/jira/platform/about-connect-modules-for-jira/).
Connect modules
## 

Connect modules allow Connect apps to extend the Confluence user interface, create custom Macros or content, handle event 
listening (webhooks), and even run scripts or other code. For more information, please refer to our 
[Confluence modules](https://developer.atlassian.com/cloud/confluence/about-connect-modules-for-confluence/#add-modules-to-your-connect-app) 
documentation.

## A Module Example

One module that you may find valuable is the [Security Information module](https://developer.atlassian.com/cloud/jira/platform/modules/security-information/).
This module makes it possible to turn unplanned vulnerabilities into planned and tracked work.

```
{
  "modules": {
    "jiraSecurityInfoProvider": {
      "homeUrl": "https://mysecurityprovider.com",
      "logoUrl": "https://mysecurityprovider.com/images/logo.svg",
      "documentationUrl": "https://mysecurityprovider.com/docs/jira-integration",
      "actions": {
        "fetchWorkspaces": {
          "templateUrl": "https://mysecurityprovider.com/workspaces"
        },
        "fetchContainers": {
          "templateUrl": "https://mysecurityprovider.com/containers"
        },
        "searchContainers": {
          "templateUrl": "https://mysecurityprovider.com/containers/search"
        }
      },
      "name": {
        "value": "My Security Provider"
      },
      "key": "security-integration"
    }
  }
}
```

Please see our [Security Information](https://developer.atlassian.com/cloud/jira/software/rest/api-group-security-information/)
for details on our REST API.

