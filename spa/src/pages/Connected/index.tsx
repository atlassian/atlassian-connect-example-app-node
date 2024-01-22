/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useLocation } from "react-router-dom";
import { PageWrapper } from "../../common/PageWrapper";
import { token } from "@atlaskit/tokens";
import Heading from "@atlaskit/heading";
import Button from "@atlaskit/button";

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
const Connected = () => {
	const location = useLocation();
	const { orgLogin, requestId } = location.state;

	return (
		<PageWrapper AppMarketplaceUrl="afad" hideClosedBtn={true}>
			<div css={connectedContainerStyle}>
				<img
					css={headerImgStyle}
					src={"/public/assets/jira-github-connected.svg"}
					alt=""
				/>
				<h2 css={titleStyle}>{`${orgLogin} is now connected!`}</h2>
				<div css={flexWrapperStyle}>
					<div css={sectionStyle}>
						<img
							css={sectionImgStyle}
							src="/public/assets/github-integration.svg"
							alt=""
						/>
						<Heading level="h400">
							Your team needs to add issue keys in GitHub
						</Heading>
						<div css={paragraphStyle}>
							To import development work into Jira and track it in your issues,
							add issue keys to branches, pull request titles, and commit
							messages.
						</div>
						{!requestId && (
							<Button
								css={[buttonStyle, subtleBtnStyle]}
								appearance="subtle"
								// TODO onClick={() => navigate("/spa/steps")}
							>
								Add another organization
							</Button>
						)}
						<Button
							css={buttonStyle}
							appearance="primary"
							// onClick= TODO
						>
							How to add issue keys
						</Button>
					</div>
				</div>
			</div>
		</PageWrapper>
	);
};

export default Connected;
