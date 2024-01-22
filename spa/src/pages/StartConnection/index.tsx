/** @jsxImportSource @emotion/react */
import Button from "@atlaskit/button";
import ArrowRightIcon from "@atlaskit/icon/glyph/arrow-right";
import InfoIcon from "@atlaskit/icon/glyph/info";
import { css } from "@emotion/react";
import { token } from "@atlaskit/tokens";
import SyncHeader from "../../components/SyncHeader";
import { PageWrapper } from "../../common/PageWrapper";
import { RequirementComponent } from "./Requirements";
import { RequirementType } from "../../common/constants";
import { ExampleComponent } from "./ExampleComponent";

const beforeTextStyle = css`
	color: ${token("color.text.subtle")};
	margin: 0 0 ${token("space.300")};
	text-align: center;
`;
const listContainerStyle = css`
	background: ${token("color.background.input.hovered")};
	max-width: 368px;
	padding: ${token("space.250")};
	border-radius: ${token("space.050")};
	margin: 0 auto;
`;

const buttonContainerStyle = css`
	text-align: center;
	margin: ${token("space.300")} 0 0;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

// 'data' is an array of objects, with app specific integration requirements and a corresponding bullet icon.
// 'description' is a element that describes and integration requirement.
// 'Icon' is an atlaskit compnent and represents the icon associated with the requirement.
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

type Props = {
	appName: string;
	appLogoPath: string;
	integrationRequirements: RequirementType[];
};

const StartConnection: React.FC<Props> = ({
	appName,
	appLogoPath,
	integrationRequirements,
}) => {
	return (
		<PageWrapper AppMarketplaceUrl="com.github.integration.production">
			<SyncHeader appName={appName} appLogoPath={appLogoPath} />
			<div css={beforeTextStyle}>Before you start, you should have:</div>
			<div css={listContainerStyle}>
				{integrationRequirements.map((requirement) => (
					<RequirementComponent
						description={requirement.description}
						Icon={requirement.Icon}
					/>
				))}
			</div>
			<div css={buttonContainerStyle}>
				<Button
					iconAfter={<ArrowRightIcon label="continue" size="medium" />}
					appearance="primary"
					aria-label="continue"
					onClick={() => {
						// TODO: send event to analytics client and navigate to next pages
					}}
				>
					Continue
				</Button>
			</div>
		</PageWrapper>
	);
};

export default StartConnection;
