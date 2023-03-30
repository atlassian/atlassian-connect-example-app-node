Connect apps extend Jira and Confluence by adding a custom iframe into the products' web pages. This iframe instance is 
on a different domain or hostname from the parent page and so is a 
[sandboxed environment](https://en.wikipedia.org/wiki/Sandbox_%28computer_security%29). The browser's same origin policy 
applies to this sandboxed environment, meaning that there are several limitations:

- Stylesheet properties from the page don't cascade to the iframe
- The iframe has no access to its parent's DOM and JavaScript properties
- The page has no access to the iframe's DOM or JavaScript properties

To overcome this, Atlassian built the Atlassian Connect JavaScript API which enables JavaScript code in a Connect app's
iframe to interact with the underlying platform APIs.

> **_iframes and 3rd party cookies:_** Since the app is sandboxed in an iframe, and most browsers are now blocking 3rd party cookies, you shouldn't rely on cookies within your app.

You'll need to include the following in any JS file you wish to have access to the API:

```
<script src="https://connect-cdn.atl-paas.net/all.js"></script>
```

Once this has been added you'll be able to access the following features:
- Context—retrieve the product context as an object or JWT token
- Confluence (Confluence only)—interact with Confluence features
- Cookie—save, retrieve, and delete cookies
- Custom content (Confluence only)—interact with the custom content
- Dialog—create and manipulate dialogues
- Events—create listeners for and emit events to communicate within and between apps
- Flag—provide system feedback in the product UI
- History—navigate and manipulate a page's browsing history stack
- Host—retrieve selected text from the host page
- iframe—resize the app's iframe
- Inline dialog—hide an inline dialog
- Jira (Jira only)—interact with Jira features
- Navigator—get webpage location, and navigate to a and reload a webpage
- Request—make an XMLHttpRequest to the host product
- User—obtain the user's Atlassian account ID, time zone, and locale

In this example app you'll see that in our views, we're using the navigator feature to navigate from one page to the next:

```
document.getElementById('homePage').addEventListener('click', () => {
  AP.navigator.go('addonmodule', { moduleKey: 'introduction' });
});
```

Please refer to our documentation for more details on the [Connect JavaScript API](https://developer.atlassian.com/cloud/jira/platform/about-the-connect-javascript-api/).