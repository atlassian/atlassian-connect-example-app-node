import { ConnectedInformationType } from "../common/types/constants";

export const data: ConnectedInformationType = {
	header: "Provide information about next steps",
	graphic: "/public/assets/integration.svg", // Replace with the path to your image or illustration.
	information: "Further guidance",
};

export interface connectedProps {
	appName: string;
	appLogoPath: string;
	AppMarketplaceUrl: string;
	connectedNextSteps: ConnectedInformationType;
}

export const connectedData = {
	appName: "Your App",
	appLogoPath: "/public/assets/3P-logo-placeholder.svg", // Replace 'appLogoPath' with the path to your application's logo.
	AppMarketplaceUrl: "com.github.integration.production", // Replace 'AppMarketplaceUrl' with the url to your app's marketplace url.
	connectedNextSteps: data,
};
