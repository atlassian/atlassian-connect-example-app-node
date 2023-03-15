### Lifecycle Events

As outlined in **Atlassian Connect JSON**, lifecycle events allow an app to register callbacks for events that occur 
in the lifecycle of an installation. These include:

```
{
  "installed": "/installed",
  "enabled": "/enabled",
  "disabled": "/disabled",
  "uninstalled": "/uninstalled"
}
```

#### A brief overview of the 4 lifecycle events
- `installed`: the installed lifecycle callback is an integral part of the installation process of an app, whereas the 
remaining lifecycle events are essentially webhooks. This event is triggered when an app is installed or upgraded, 
you rotate your shared secret, the baseUrl is changed (site rename), or after a site import. This is the only lifecycle
event provided by default. All other endpoints need to be implemented if needed in your app.
- `uninstalled`: this is fired when the app is uninstalled
- `enabled`: the app is enabled and users can start using the app. This is triggered after a successful app installation 
or upgrade. This event will not be triggered for any other type of installed lifecycle events.
- `disabled`: the app is disabled before performing uninstallation

For more information on lifecycle events, please refer to our [documentation](https://developer.atlassian.com/cloud/jira/platform/connect-app-descriptor/#lifecycle).