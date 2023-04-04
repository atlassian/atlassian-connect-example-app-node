If you need to make API requests, this can be easily achieved via any HTTP client library or API designed
for making API requests. The key to successfully making API requests from your Connect add-on is ensuring
you create a JWT token based on the `sharedSecret`, and include this token in your header. Please refer
to our documentation for more information on 
[JWTs for Connect app](https://developer.atlassian.com/cloud/jira/platform/understanding-jwt-for-connect-apps/).

## Jira and Confluence REST APIs

Both [Jira](https://developer.atlassian.com/cloud/jira/software/rest/intro/#introduction) 
and [Confluence](https://developer.atlassian.com/cloud/confluence/using-the-rest-api/) provide an extensive 
REST API to build add-ons. 

## Example

Here's an example of calling the [User Get Jira REST API](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-users/#api-rest-api-3-user-get) 
via our app's own API.

<button class="aui-button aui-primary-button" onclick="callAPI()">Get current user information from Jira API</button>
<pre id="api-results" class="aui-message aui-message-info">
    Results will show here
</pre>