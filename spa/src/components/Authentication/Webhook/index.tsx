/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import { token } from "@atlaskit/tokens";
import { IsAdmin } from "./IsAdmin";
import { NotAdmin } from "./NotAdmin";
import Button, { ButtonGroup } from "@atlaskit/button";

const connectionFlowInnerContainer = css`
	margin: ${token("space.400")} auto;
	width: 420px;
`;

const setupContainer = css`
	margin-bottom: ${token("space.400")};

	[type="button"] {
		border-radius: 100px;
	}
`;

const setupContent = css`
	font-size: 14px;
	margin: ${token("space.300")} auto !important;
`;

export type WebhookConnectionSetupProps = {
	appName: string;
	webhookUrlRef: string; // Will be RefObject<HTMLDivElement>;
	secretRef: string; // Will be RefObject<HTMLDivElement>;
	connectionSettings: boolean;
};

export const WebhookConnectionSetup = ({
	appName,
	webhookUrlRef,
	secretRef,
	connectionSettings,
}: WebhookConnectionSetupProps) => {
	const [showNotAdmin, setShowNotAdmin] = useState(false);
	const [showIsAdmin, setShowIsAdmin] = useState(false);

	const handleNotAdminClick = async (e: React.MouseEvent) => {
		e.preventDefault();

		setShowNotAdmin(true);
		setShowIsAdmin(false);
	};

	const handleIsAdminClick = async (e: React.MouseEvent) => {
		e.preventDefault();

		setShowIsAdmin(true);
		setShowNotAdmin(false);
	};

	return (
		<>
			{/* <div css={serverNameFormOuterContainer}> */}
			<div css={connectionFlowInnerContainer}>
				<div css={setupContainer}>
					{/* <h3 css={setupHeader}>Set up </h3> */}
					<p css={setupContent}>
						A {appName} admin needs to set up your server to establish this
						connection.
					</p>
					<p css={setupContent}>Select the appropriate option:</p>
					<ButtonGroup>
						<Button
							onClick={(e) => handleNotAdminClick(e)}
							appearance={showNotAdmin ? "primary" : "default"}
							testId="my--admin"
						>
							A {appName} admin is helping me
						</Button>
						<Button
							onClick={(e) => handleIsAdminClick(e)}
							appearance={showIsAdmin ? "primary" : "default"}
							testId="i-am-the--admin"
						>
							I am a {appName} admin
						</Button>
					</ButtonGroup>

					{showNotAdmin ? (
						<NotAdmin
							//handleCopyToClipboard={handleCopyToClipboard}
							appName={appName}
							webhookUrlRef=""
							secretRef=""
							connectionSettings={connectionSettings}
						/>
					) : null}

					{showIsAdmin ? (
						<IsAdmin
							//handleCopyToClipboard={handleCopyToClipboard}
							appName={appName}
							webhookUrlRef=""
							secretRef=""
							connectionSettings={connectionSettings}
						/>
					) : null}
				</div>

				{showNotAdmin || showIsAdmin ? (
					<Button
						type="button"
						appearance="primary"
						//onClick={(e) => handleNavigateToConnectionCompleteScreen(e)}
					>
						{connectionSettings ? "Finish" : "Next"}
					</Button>
				) : null}
			</div>
			{/* </div> */}
		</>
	);
};
