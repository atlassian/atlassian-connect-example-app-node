import { WebhookConnectionSetupProps } from "../components/Authentication/Webhook";
import { WebhookConnectionSetup } from "../components/Authentication/Webhook";
import { globalData } from "./globalData";

// Use if using webhook authentication
const data: WebhookConnectionSetupProps = {
	appName: globalData.appName,
	webhookUrlRef: "webhook",
	secretRef: "secret",
	connectionSettings: true,
};

export interface connectAppProps {
	appName: string;
	appLogoPath: string;
	AppMarketplaceUrl: string;
	authentication: JSX.Element;
}

export const connectAppData = {
	appName: globalData.appName,
	appLogoPath: globalData.appLogoPath, // Replace 'appLogoPath' with the path to your application's logo.
	AppMarketplaceUrl: globalData.AppMarketplaceUrl,
	authentication: <WebhookConnectionSetup {...data} />,
};
