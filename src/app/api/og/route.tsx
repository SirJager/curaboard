import logger from "@/lib/logger";
import {extractOGProps} from "@/lib/og";
import simpleOGBuilder from "@/lib/og/simple";
import {getThemeMode, themeKey, ThemeMode} from "@/lib/theme";
import {ImageResponse} from "@vercel/og";
import {cookies} from "next/headers";

export const runtime = "edge";

export const alt = "Blog post preview";
export const size = {width: 1200, height: 630};
export const contentType = "image/png";

const data = {
	title: "Blog Post Preview",
	description: "some descr update_description",
} as const;

export async function GET(request: Request) {
	try {
		const {error, data} = extractOGProps(request.url);
		if (error || !data) {
			return Response.json({error: error}, {status: 400});
		}

		const cookieStore = await cookies();
		const stored = cookieStore.get(themeKey)?.value;

		let theme;
		if (stored) {
			theme = getThemeMode(stored);
			console.log(theme);
		}

		const html = simpleOGBuilder({...data, theme: data.theme ?? theme});

		return new ImageResponse(html);
	} catch (e: any) {
		logger.log(e);
		return new Response("Failed to generate OG image", {status: 500});
	}
}
