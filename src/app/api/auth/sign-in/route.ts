import client from "@/lib/directus";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {
	const formData = await request.formData();

	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	if (!email || !password) {
		return NextResponse.json({error: "All fields are required"}, {status: 400});
	}

	try {
		const response = await client.login({email, password});
		if (response.access_token) {
			(await cookies()).set("directus_session_token", response.access_token, {
				path: "/",
				secure: true,
				httpOnly: true,
				sameSite: "strict",
				expires: 1000 * 60 * 15, // 1000ms(1sec) * 60 sec * [X] minutes
			});
		}
		const url = request.nextUrl.clone();
		url.pathname = "/";
		return NextResponse.redirect(url);
	} catch (error) {
		console.log(error);
		return NextResponse.json({error: "Login failed"}, {status: 500});
	}
}
