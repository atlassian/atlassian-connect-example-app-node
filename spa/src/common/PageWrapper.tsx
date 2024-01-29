/** @jsxImportSource @emotion/react */
import { ReactNode } from "react";
import { css } from "@emotion/react";
import Button from "@atlaskit/button";
import CrossIcon from "@atlaskit/icon/glyph/cross";

const navHeight = 56;
const wrapperStyle = css`
	padding: 20px 40px 0px 40px;
`;
const wrapperCenterStyle = css`
	margin: 0 auto;
	max-width: 580px;
	height: calc(100vh - ${navHeight * 2}px);
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

export const PageWrapper = ({
	AppMarketplaceUrl,
	hideClosedBtn,
	children,
}: {
	AppMarketplaceUrl: string;
	hideClosedBtn?: boolean;
	children?: ReactNode | undefined;
}) => {
	const navigateToHomePage = () => {
		AP.getLocation((location: string) => {
			const locationUrl = new URL(location);
			AP.navigator.go("site", {
				absoluteUrl: `${locationUrl.origin}/jira/marketplace/discover/app/${AppMarketplaceUrl}`,
			});
		});
	};
	return (
		<div css={wrapperStyle}>
			{!hideClosedBtn && (
				<Button
					style={{ float: "right" }}
					iconBefore={<CrossIcon label="Close" size="medium" />}
					appearance="subtle"
					onClick={navigateToHomePage}
				/>
			)}

			<div css={wrapperCenterStyle}>{children}</div>
		</div>
	);
};
