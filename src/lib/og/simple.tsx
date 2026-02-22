import {parseDate} from "../utils";
import {ogThemes, themeNames, type OGTheme} from "./theme";
import type {OGBuilderProps} from "./types";

const getTitle = (title: string, maxLength?: number | null) => {
	const len = maxLength || 56;
	return title.slice(0, len) + (title.length > len ? " ..." : "");
};

const simpleOGBuilder = (props: OGBuilderProps) => {
	// Astro doesn't support tsx endpoints so usign React-element objects
	// Every element must have "flex"

	const _theme = props.theme;
	const theme = themeNames.includes(_theme as any) ? (_theme as OGTheme) : "dark";

	const date = parseDate(props.date.toISOString());
	const styl = ogThemes[theme];
	const textColor = props.textColor ?? styl.color;
	const backgroundColor = props.backgroundColor ?? styl.backgroundColor;
	let backgroundImage = props.backgroundImage;

	const textStyle = {color: textColor, fontFamily: "Raleway"};
	const borderStyle = {...styl.border, borderColor: props.borderColor ?? styl.border.borderColor};

	const categories = props.categories || [];
	const tags = props.tags || [];

	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				fontFamily: textStyle.fontFamily,
				background: backgroundColor,
				color: textStyle.color,
				padding: "30px 20px",
			}}
		>
			<div
				style={{
					maxLines: 3,
					fontSize: 62,
				}}
			>
				{props.title}
			</div>
		</div>
	);
};

export default simpleOGBuilder;
