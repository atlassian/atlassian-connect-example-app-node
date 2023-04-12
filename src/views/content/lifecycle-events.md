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

## A brief overview of the 4 lifecycle events
- `installed`: the installed lifecycle callback is an integral part of the installation process of an app, whereas the 
remaining lifecycle events are essentially webhooks. This event is triggered when an app is installed or upgraded, 
you rotate your shared secret, the baseUrl is changed (site rename), or after a site import. This is the only lifecycle
event provided by default. All other endpoints need to be implemented if needed in your app.
- `uninstalled`: this is fired when the app is uninstalled.
- `enabled`: the app is enabled and users can start using the app. This is triggered after a successful app installation 
or upgrade. This event will not be triggered for any other type of installed lifecycle events.
- `disabled`: the app is disabled before performing uninstallation.

[For more information on lifecycle events, please refer to our documentation](https://developer.atlassian.com/cloud/jira/platform/connect-app-descriptor/#lifecycle).

## Validating installation lifecycle requests
An installation secret will be exchanged every time your app is installed or updated. To secure this key exchange 
process, the `install` and `uninstall` lifecycle events include **JWT tokens** in the _Authorization header_. This **JWT token** 
will be signed with a private key using the _RS256(RSA-SHA256) algorithm_.

To retrieve the publicKey, make a request to the CDN with the kid parameter supplied in the **JWT token** header. For 
example, `https://connect-install-keys.atlassian.com/kid`

The best way to see how **JWT tokens** work with your lifecycle events is to use the [Connect inspector](http://go.atlassian.com/connect-inspector) 
to create a temporary app, install it in your cloud development environment and watch the lifecycle events.
