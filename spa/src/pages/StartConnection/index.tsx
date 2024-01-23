/** @jsxImportSource @emotion/react */
import Button from "@atlaskit/button";
import ArrowRightIcon from "@atlaskit/icon/glyph/arrow-right";
import { css } from "@emotion/react";
import { token } from "@atlaskit/tokens";
import { PageWrapper } from "../../common/PageWrapper";
import { startConnectionProps } from "../../pagesData/startConnectionData";
import { SyncHeader, RequirementComponent } from "../../components";

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

const StartConnection: React.FC<startConnectionProps> = ({
	appName,
	appLogoPath,
	AppMarketplaceUrl,
	integrationRequirements,
}) => {
	return (
		<PageWrapper AppMarketplaceUrl={AppMarketplaceUrl}>
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
						// TODO: navigate to next page
					}}
				>
					Continue
				</Button>
			</div>
		</PageWrapper>
	);
};

export default StartConnection;
