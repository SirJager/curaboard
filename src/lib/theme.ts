export function getThemeMode(theme: string | undefined): "dark" | "light" {
	switch (theme) {
		case "dracula":
		case "business":
		case "synthwave":
		case "halloween":
		case "forest":
		case "black":
		case "luxury":
		case "night":
		case "coffee":
		case "dark":
		case "dim":
		case "sunset":
		case "jager":
			return "dark";
		default:
			return "light";
	}
}

export const themes = [
	// "light",
	// "dark",
	"cupcake",
	// "business",
	// "bumblebee",
	// "emerald",
	// "corporate",
	// "synthwave",
	// "retro",
	// "cyberpunk",
	// "valentine",
	// "halloween",
	// "garden",
	// "forest",
	// "aqua",
	// "lofi",
	// "pastel",
	// "fantasy",
	// "wireframe",
	"black",
	// "luxury",
	// "dracula",
	// "cmyk",
	// "autumn",
	// "acid",
	// "lemonade",
	// "night",
	// "coffee",
	// "winter",
	// "dim",
	// "nord",
	// "sunset",
];

export type Theme = (typeof themes)[number];
export type ThemeMode = "light" | "dark";

export const defaultTheme: Theme = themes[0];
export const themeKey = "theme";
