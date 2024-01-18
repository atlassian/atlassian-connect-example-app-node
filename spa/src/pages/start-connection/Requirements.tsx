/** @jsxImportSource @emotion/react */
import React from "react";
import { ReactNode } from "react";
import { css } from "@emotion/react";
import { token } from "@atlaskit/tokens";

const listItemStyle = css`
	display: flex;
`;
const logoStyle = css`
	margin: ${token("space.025")} ${token("space.075")} 0 0;
`;

type Icon = React.ComponentType<any>;

interface RequirementComponentProps {
	description: ReactNode;
	Icon: Icon;
}

export const RequirementComponent = ({
	Icon,
	description,
}: RequirementComponentProps) => {
	return (
		<div css={listItemStyle}>
			<div css={logoStyle}>
				<Icon size="small" />
			</div>
			<span> {description} </span>
		</div>
	);
};
