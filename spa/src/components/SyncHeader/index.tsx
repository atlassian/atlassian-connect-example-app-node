/** @jsxImportSource @emotion/react */
import { token } from "@atlaskit/tokens";
import { css } from "@emotion/react";

const headerWrapperStyle = css`
	text-align: center;
`;

const logoContainerStyle = css`
	display: inline-flex;
	align-items: center;
`;

const logoImgStyle = css`
	height: ${token("space.800")};
	padding: ${token("space.100")};
`;

const syncLogoImg = css`
	height: ${token("space.500")};
	padding: ${token("space.100")};
`;

const titleStyle = css`
	margin: ${token("space.400")} ${token("space.0")} ${token("space.300")};
`;

type Props = {
	appName: string;
	appLogoPath: string;
};

const SyncHeader: React.FC<Props> = ({ appName, appLogoPath }) => {
	return (
		<div css={headerWrapperStyle}>
			<div css={logoContainerStyle}>
				<img
					css={logoImgStyle}
					className="logo"
					src="/public/assets/jira-logo.svg"
					alt="Jira"
				/>
				<img
					css={syncLogoImg}
					className="sync-logo"
					src="/public/assets/sync.svg"
					alt="Syncing"
				/>
				<img
					css={logoImgStyle}
					className="logo"
					src={appLogoPath}
					alt={appName}
				/>
			</div>
			<h2 css={titleStyle}>Connect {appName} to Jira</h2>
		</div>
	);
};

export default SyncHeader;
