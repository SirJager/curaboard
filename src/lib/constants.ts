const pages = {
	home: "/",
	updates: "/updtes",
	signIn: "/sign-in",
	signUp: "/sign-up",
} as const;

export const apiRoutes = {
	signIn: "/api/auth/sign-in",
	signUp: "/api/auth/sign-in",
	ogImage: "/api/og",
} as const;

const info = {
	lang: "en-US",
	title: "Curaboard",
	description: "",
} as const;

const vars = {session: "ao663448UR36482opd8j"} as const;

export const site = {info, apiRoutes, pages, vars} as const;

export default site;
