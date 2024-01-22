import { RequirementType } from "../common/constants";
import { ExampleComponent } from "../pages/StartConnection/ExampleComponent";
import InfoIcon from "@atlaskit/icon/glyph/info";

// 'data' is an array of objects, each containing specific app integration requirements and a corresponding bullet icon.
// 'description' is an element that describes an integration requirement.
// 'Icon' is an Atlaskit component and represents the icon associated with the requirement.
export const data: RequirementType[] = [
	{
		description: "Integration requirement",
		Icon: InfoIcon,
	},
	{
		description: <ExampleComponent />,
		Icon: InfoIcon,
	},
];

export interface startConnectionProps {
	appName: string;
	appLogoPath: string;
	AppMarketplaceUrl: string;
	integrationRequirements: RequirementType[];
}

export const startConnectionData = {
	appName: "Your App",
	appLogoPath: "/public/assets/jira-logo.svg", // Replace 'appLogoPath' with the path to your application's logo.
	AppMarketplaceUrl: "",
	integrationRequirements: data,
};
