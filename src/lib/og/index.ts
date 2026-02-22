import site from "../constants";
import {OGTheme, themeNames} from "./theme";
import {OGPropsData} from "./types";

export type Result = {error: string; data?: null} | {error?: null; data: OGPropsData};

const defaultValues = {
	title: "This is sample title",
	date: new Date().toISOString(),
	author: "John Doe",
	avatar: "https://img.daisyui.com/images/daisyui/horizontal-light.svg",
};

type ogUrlBuilderProps = {
	title?: string | null;
	avatar?: string | null;
	author?: string | null;
	date?: Date | null;
};

export function ogParamsBuilder(props: ogUrlBuilderProps) {
	const str: string[] = ["?"];
	if (props.title) str.push(`title=${props.title}`);
	if (props.author) str.push(`author=${props.author}`);
	if (props.avatar) str.push(`avatar=${props.avatar}`);
	if (props.date) str.push(`date=${props.date?.toISOString()}`);
	const params = str.join("&");
	const url = `${site.apiRoutes.ogImage}${params}`;
	return {params, url};
}

export const extractOGProps = (_url: string): Result => {
	const url = new URL(_url);
	const title = url.searchParams.get("title") ?? defaultValues.title;
	if (!title) return {error: "title is required"};

	const length = Number(url.searchParams.get("length") || "100");

	const datePublished = url.searchParams.get("date") ?? defaultValues.date;
	if (!datePublished) return {error: "date is required"};
	const date = new Date(datePublished);

	const author = url.searchParams.get("author") ?? defaultValues.author;
	if (!author) return {error: "author is required"};

	const avatar = url.searchParams.get("avatar") ?? defaultValues.avatar;
	if (!avatar) return {error: "avatar is required"};

	const _tags = url.searchParams.get("tags");
	const tags = (_tags ? _tags.split(",") : []).filter((s) => s.length > 0);

	const _categories = url.searchParams.get("categories");
	const categories = (_categories ? _categories.split(",") : []).filter((s) => s.length > 0);

	const footer = url.searchParams.get("button");
	const logo = `${url.origin}/icons/android-chrome-512x512.png`;

	const _theme = url.searchParams.get("theme") || "dark";
	const theme = themeNames.includes(_theme as any) ? (_theme as OGTheme) : "dark";

	const backgroundColor = url.searchParams.get("backgroundColor");
	const borderColor = url.searchParams.get("borderColor");
	const textColor = url.searchParams.get("textColor");
	const titleSize = url.searchParams.get("titleSize");
	const avatarSize = url.searchParams.get("avatarSize");
	const dateSize = url.searchParams.get("dateSize");
	const categorySize = url.searchParams.get("categorySize");
	const tagSize = url.searchParams.get("tagSize");

	let backgroundImage = url.searchParams.get("backgroundImage");
	if (!backgroundImage) {
		backgroundImage = `${url.origin}/images/grid.png`;
		if (theme === "dark") backgroundImage = `${url.origin}/images/grid-dark.png`;
	}

	const colors = {borderColor, backgroundColor, textColor};
	const size = {titleSize, avatarSize, dateSize, categorySize, tagSize};

	const props: OGPropsData = {
		title,
		date,
		author,
		tags,
		categories,
		footer,
		logo,
		length,
		avatar: avatar ?? "",
		theme,
		colors,
		size,
		backgroundImage,
	};

	return {data: props, error: null};
};
