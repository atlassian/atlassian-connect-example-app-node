/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { token } from "@atlaskit/tokens";
import PeopleGroup from "@atlaskit/icon/glyph/people-group";

const infoPanelContainer = css`
	background-color: #f7f8f9;
	border: 3px;
	display: flex;
	padding: ${token("space.250")};

	[role="img"] {
		margin-right: ${token("space.200")};
	}

	p {
		margin-top: ${token("space.0")};
	}
`;

type InfoPanelProps = {
	content: string;
};

export const InfoPanel = ({ content }: InfoPanelProps) => {
	return (
		<div css={infoPanelContainer}>
			<PeopleGroup label="people-group" />
			<p>{content}&nbsp;</p>
		</div>
	);
};
