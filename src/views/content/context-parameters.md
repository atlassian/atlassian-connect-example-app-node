To further extend the capability of [Modules](~modules), context parameters can be used to inject certain information 
into the url of pages based on static strings, user input or based on the user location in the product. Some context 
parameters come as standard and will always be available in the query string, like:

* lic: the license status
* cp: the context path of the instance (eg: /wiki)
* xdm_e: the base URL of the host application, used for the JavaScript bridge (xdm - cross domain messaging)
* xdm_c: the xdm channel to establish communication over
* cv: the version of Atlassian Connect that made the HTTP request to your app.

Others are specific to the area of the product the user is in, for instance this module is based on the Jira 
project id and issue key that the user is currently looking at:

```json
{
    "url": "/myPage/projects/{project.id}?issueKey={issue.key}"
}
```

Furthermore, apps can also inject their own custom context parameters into their URLs.  For example, a module with this 
url 
specified:

```json
{
    "key": "user-events",
    "url": "/user/{ac.userId}/events?from={ac.timestamp}"
}
```

Could be navigated to using the [Atlassian Connect Javascript Library](~js-library) by doing the following:

```js
AP.navigator.go('addonmodule', { 
	moduleKey: 'user-events', 
    customData: {
		userId: 1234, 
        timestamp: Date.now()
	}
});
```

To show this behaviour in action, enter something below and press "Go", the value will be appended to the URL in the 
iframe and we can then show what you inputted below:

<div id="context-input">
</div>
<form class="aui" onsubmit="event.preventDefault(); showContextExample()">
    <input class="text medium-field" type="text" id="form-input" name="input" placeholder="Enter something here">
    <input class="button submit aui-button-primary" type="submit" value="Go">
</form>
<script>
var value = new URLSearchParams(window.location.search).get('input');
if(value) {
    var el = document.querySelector('#context-input');
    el.innerHTML = "You inputted: " + value;
    document.querySelector('#form-input').value = value;
    el.className = "aui-message aui-message-info";
}
</script>

Please see our [Connect Context Parameters](https://developer.atlassian.com/cloud/confluence/context-parameters/) 
docmentation for more information.

