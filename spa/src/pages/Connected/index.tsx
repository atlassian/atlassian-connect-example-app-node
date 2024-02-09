/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PageWrapper } from "../../common/PageWrapper";
import { token } from "@atlaskit/tokens";
import Heading from "@atlaskit/heading";
import Button from "@atlaskit/button";
import { connectedProps } from "../../pagesData/connectedData";

const connectedContainerStyle = css`
	margin: 0 auto;
	text-align: center;
	width: 100%;
	min-height: 364px;
`;
const headerImgStyle = css`
	height: 96px;
`;
const titleStyle = css`
	margin: ${token("space.400")} ${token("space.0")} ${token("space.0")};
`;
const paragraphStyle = css`
	color: ${token("color.text.subtle")};
	margin: ${token("space.100")} ${token("space.0")} ${token("space.300")}
		${token("space.0")};
	padding: 0px ${token("space.600")};
`;
const flexWrapperStyle = css`
	padding: ${token("space.400")} ${token("space.0")};
	display: flex;
	justify-content: space-between;
	margin: 0 auto;
`;
const sectionStyle = css`
	background: ${token("elevation.surface.sunken")};
	border-radius: 3px;
	width: 100%;
	padding: ${token("space.200")} ${token("space.0")};
	&:first-of-type {
		margin-right: ${token("space.200")};
	}
`;
const sectionImgStyle = css`
	height: 100px;
	margin-bottom: ${token("space.300")};
`;

const buttonStyle = css`
	margin: 0px 10px;
`;
const subtleBtnStyle = css`
	color: ${token("color.text.subtle")} !important;
`;

const Connected: React.FC<connectedProps> = ({
	appName,
	appLogoPath,
	AppMarketplaceUrl,
	connectedNextSteps,
}) => {
	return (
		<PageWrapper AppMarketplaceUrl={AppMarketplaceUrl} hideClosedBtn={true}>
			<div css={connectedContainerStyle}>
				<img css={headerImgStyle} src={appLogoPath} alt="" />
				<h2 css={titleStyle}>{`${appName} is now connected!`}</h2>
				<div css={flexWrapperStyle}>
					<div css={sectionStyle}>
						<img
							css={sectionImgStyle}
							src={connectedNextSteps.graphic}
							alt=""
						/>
						<Heading level="h400">{connectedNextSteps.header}</Heading>
						<div css={paragraphStyle}>{connectedNextSteps.information}</div>
						{
							<Button
								css={[buttonStyle, subtleBtnStyle]}
								appearance="subtle"
								// TODO navigate to next steps
							>
								Button
							</Button>
						}
						<Button
							css={buttonStyle}
							appearance="primary"
							//TODO navigate to new page
						>
							Button
						</Button>
					</div>
				</div>
			</div>
		</PageWrapper>
	);
};

export default Connected;
