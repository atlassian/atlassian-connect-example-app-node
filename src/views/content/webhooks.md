A webhook is an HTTP request, triggered by an event in a source system and sent to a destination system, often with a 
payload of data. Webhooks are automated, in other words they are automatically sent out when their event is fired in the 
source system.

To use webhooks in Jira, you'll need to register (create) a new webhook and provide the following:
- a **name**: the name of the webhook
- the **URL** where the callback should be sent: Ports must be in the range of 1 to 65535 (excluding for 80) and you must
use the HTTPS protocol. There is a limit of 5 redirects per url. 
- the **events** to post to the URL: this can be either "all events" or a specific set of events
- the **scope** of the webhook (optional): for example either "all issues" or a limited set of issues specified by JQL 
("project = TEST and fixVersion = future")

## Registering a webhook
Webhooks can be manually created in 
[Jira administration](https://support.atlassian.com/jira-cloud-administration/docs/manage-webhooks/), via
[registered by]() `/rest/webhooks/1.0/webhook`, or by declaring a 
[webhook module](https://developer.atlassian.com/cloud/jira/platform/modules/webhook/) in the app description.

For more information about webhooks, and for a full list of available webhooks, please refer to our
[documentation](https://developer.atlassian.com/cloud/jira/platform/webhooks/#registering-a-webhook-using-the-jira-rest-api--other-integrations-).
