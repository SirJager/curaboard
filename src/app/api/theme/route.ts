import "server-only";
import {themeKey, themes} from "@/lib/theme";
import {cycleStrings} from "@/lib/utils";
import {cookies} from "next/headers";

const maxAge = 365 * 24 * 60 * 60; // 1 year in seconds
export async function GET(request: Request) {
	const {searchParams} = new URL(request.url);
	let theme = searchParams.get("set");
	const cycle = searchParams.get("cycle");
	if (cycle !== null && cycle !== undefined) {
		const cookieStore = await cookies();
		const stored = cookieStore.get(themeKey)?.value;
		if (stored) {
			theme = cycleStrings(themes, stored);
		}
	}
	const headers = new Headers({"Content-Type": "application/json"});
	headers.append("Set-Cookie", `${themeKey}=${theme}; Path=/; Max-Age=${maxAge};`);
	return new Response(JSON.stringify({theme}), {status: 200, headers});
}
