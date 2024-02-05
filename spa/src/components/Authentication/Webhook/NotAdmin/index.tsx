/** @jsxImportSource @emotion/react */
import React from "react"; // useState // useRef, // useEffect, // useCallback, //RefObject,
import { css } from "@emotion/react";
import { token } from "@atlaskit/tokens";
import Button from "@atlaskit/button";
import CopyIcon from "@atlaskit/icon/glyph/copy";
import { InfoPanel } from "../../../InfoPanel";

const orderedList = css`
	padding-left: ${token("space.200")};
	list-style: none;
	counter-reset: item;

	#nested-list {
		margin-top: ${token("space.0")};
	}
`;

const orderedListItem = css`
	margin-bottom: ${token("space.200")};
	padding-left: ${token("space.200")};

	counter-increment: item;
	margin-bottom: ${token("space.075")};

	::before {
		background: #f7f8f9;
		border-radius: 50%;
		content: counter(item);
		display: inline-block;
		font-weight: bold;
		height: ${token("space.400")};
		line-height: ${token("space.400")};
		margin: 0 ${token("space.200")} 0 ${token("space.negative.400")};
		text-align: center;
		width: ${token("space.400")};
	}
`;

const setupContent = css`
	font-size: 14px;
	margin: ${token("space.300")} auto !important;
`;

const setupCopyContainer = css`
	border-top: 2px solid #dde0e5;
	margin-top: ${token("space.400")};

	[type="button"] {
		border-radius: 3px;
		width: 90px;
	}
`;

const setupOrderedList = css`
	margin-bottom: ${token("space.400")};
`;

const setupListItem = css`
	align-items: center;
	color: #182a4e;
	display: flex;
	font-weight: bold;

	[role="presentation"] {
		span {
			height: 15px;
			margin: ${token("space.025")} ${token("space.0")} ${token("space.0")}
				${token("space.050")};
		}
	}
`;

const setupButtonContainer = css`
	margin-left: auto;
	position: relative;
`;

//TODO: MOVE THIS TO THE TYPES FOLDER ONCE CONNECTED PAGE IS MERGED
export type NotAdminProps = {
	appName: string;
	webhookUrlRef: string; // Should be RefObject<HTMLDivElement>;
	secretRef: string; // Should be RefObject<HTMLDivElement>;
	connectionSettings: boolean;
};

export const NotAdmin = ({
	appName,
	webhookUrlRef,
	secretRef,
	connectionSettings,
}: NotAdminProps) => {
	return (
		<div css={setupCopyContainer}>
			<p css={setupContent}>
				Copy the items below and give them to your {appName} admin
			</p>

			<ol css={[orderedList, setupOrderedList]}>
				<li css={[orderedListItem, setupListItem]}>
					Webhook URL
					<div css={setupButtonContainer}>
						<Button iconBefore={<CopyIcon label="Copy" size="medium" />}>
							Copy
						</Button>
					</div>
				</li>
				<li css={[orderedListItem, setupListItem]}>
					Secret token
					<div css={setupButtonContainer}>
						<Button iconBefore={<CopyIcon label="Copy" size="medium" />}>
							Copy
						</Button>
					</div>
				</li>
			</ol>
			<InfoPanel
				content={`Your ${appName} admin may need your input as they set up this server.`}
			/>
		</div>
	);
};
