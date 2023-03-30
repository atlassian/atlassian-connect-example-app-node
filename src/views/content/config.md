When you create a Connect app you'll need to include an app descriptor JSON file. This is what you'll use to
provide information to Atlassian about your application, also known as an add-on. In this example app you'll find 
the configuration for this in src/config/index.ts which is what we are rendering below. Included in this project's 
app descriptor is:

- `name`: the name of the Connect app
- `description`: description for the Connect app
- `key`: a unique key to identify your Connect app. This key must be <= 64 characters
- `baseUrl`: The base url of the remote app, which is used for all communications back to the app instance. For this
  example app, this is the tunneled URL which is set in the `prestart.ts`
- `vendor`: the vendor who is offering this Connect app
- `authentication`: this defines the authentication type to use when signing requests between the host application 
and the Connect app. The supported types include `jwt`, `JWT`, `none`, `NONE`. We'll go into more detail around 
authentication in **Auth with JWT and Storage**
- `scopes`: sets the [scopes](https://developer.atlassian.com/cloud/jira/platform/scopes-for-connect-apps/) requested 
by the app
- `apiVersion`: the API version which is an OPTIONAL integer. If omitted we will infer an API version of 1.
- `lifecycle`: allows an app to register callbacks for events that occur in the lifecycle of an installation. When a 
lifecycle event is fired, a POST request will be made to the appropriate URL registered for the event. We'll go into
more detail in **Lifecycle Events**
- `modules`: extensions for the parts of Jira.
  - `postInstallPage`: this is the first page where the user lands after clicking on the `Get Started` link after 
  installing the app. You can think of this page as the main index page for the app.
  - `webhooks`: list of all the webhooks for the Connect app. For this example app, we've added some Jira webhooks 
  events. In our **Webhooks** page, we'll provide some webhook logs so you can get a better picture of what your app 
  will be listening to
  - `generalPages`: list of [pages/views](https://developer.atlassian.com/cloud/jira/software/modules/page/) within the app.
    - `url`: the url to retrieve the content from. This must be relative to your app's baseUrl.
    - `key`: a key to identify this module. The key is used to generate the url to your add-on's module e.g.
    The node app URL `https://<TUNNELED_URL>/config` is now mapped to 
    `https://<JIRAHOST_INSTANCE>/plugins/servlet/ac/com.example.node-connect-app/config`
    - `location`: defines the location in the application interface where the page's link should appear. For finding 
    locations, please use the linked web fragment finders for 
    [Jira](https://marketplace.atlassian.com/apps/1211656/web-fragment-finder?hosting=cloud&tab=overview)
    [Confluence](https://marketplace.atlassian.com/apps/1215092/web-fragment-finder-for-confluence?hosting=cloud&tab=overview)
    - `name`: a human-readable name for the page

Please see below for the app descriptor used in this example. Additionally, refer to our [documentation](https://developer.atlassian.com/cloud/jira/platform/connect-app-descriptor/#authentication) 
for more Connect app description information.

