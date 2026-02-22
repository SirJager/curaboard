import {OGTheme} from "./theme";

export type OGBuilderProps = {
	title: string;
	date: Date;
	tags?: string[];
	categories?: string[];
	author: string;
	avatar: string;
	logo: string;
	theme?: string | null;
	footer?: string | null;
	length?: number;
	textColor?: string;
	borderColor?: string;
	backgroundColor?: string;
	backgroundImage: string;
};

type Colors = {
	textColor?: string | null;
	borderColor?: string | null;
	backgroundColor?: string | null;
};

type TextSize = {
	titleSize?: string | null;
	avatarSize?: string | null;
	dateSize?: string | null;
	categorySize?: string | null;
	tagSize?: string | null;
};

export type OGPropsData = {
	title: string;
	date: Date;
	author: string;
	tags: string[];
	categories: string[];
	logo: string;
	avatar: string;
	length: number;
	theme: OGTheme;
	colors: Colors;
	size: TextSize;
	footer?: string | null;
	backgroundImage: string;
};
