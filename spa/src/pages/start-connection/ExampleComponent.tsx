/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { Interpolation, Theme, css } from "@emotion/react";
import { token } from "@atlaskit/tokens";
import Tooltip, { TooltipPrimitive } from "@atlaskit/tooltip";
import { JSX } from "@emotion/react/jsx-runtime";
import { ClassAttributes, AnchorHTMLAttributes } from "react";

const inlineDialogLinkStyle = css`
	cursor: pointer;
	color: blue;
    text-decoration: none;
	:hover {
		text-decoration: underline;
`;
const inlineDialogDivStyle = css`
	padding: ${token("space.200")} 0 0 ${token("space.150")};
	width: 300px;
`;

const InlineDialog = styled(TooltipPrimitive)`
	background: white;
	border-radius: ${token("space.050")};
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
	box-sizing: content-box;
	padding: ${token("space.100")} ${token("space.150")};
	position: absolute;
	top: -22px;
`;

// The ExampleComponent component displays a inline tooltip modal with custom text
// Content of the inline dialog can be defined here
export const ExampleComponent = () => {
	const InlineDialogContent = () => (
		<>
			<div css={inlineDialogDivStyle}>Custom text</div>
		</>
	);

	return (
		<>
			<span> Integration requirement with tooltip modal </span>
			<br />
			<Tooltip
				component={InlineDialog}
				position="right-end"
				content={InlineDialogContent}
			>
				{(
					props: JSX.IntrinsicAttributes & {
						css?: Interpolation<Theme>;
					} & ClassAttributes<HTMLAnchorElement> &
						AnchorHTMLAttributes<HTMLAnchorElement> & {
							css?: Interpolation<Theme>;
						}
				) => (
					<a css={inlineDialogLinkStyle} {...props}>
						Tooltip text
					</a>
				)}
			</Tooltip>
		</>
	);
};
