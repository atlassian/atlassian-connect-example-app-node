/** @jsxImportSource @emotion/react */
import React from "react";
import { ReactNode } from "react";

type Icon = React.ComponentType<any>;

export type RequirementType = {
	description: ReactNode;
	Icon: Icon;
};