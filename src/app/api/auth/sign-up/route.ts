import directus from "@/lib/directus";
import {registerUser} from "@directus/sdk";
import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {
	const formData = await request.formData();

	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	if (!email || !password) {
		return NextResponse.json({error: "All fields are required"}, {status: 400});
	}

	try {
		await directus.request(registerUser(email, password));
		const url = request.nextUrl.clone();
		url.pathname = "/";
		return NextResponse.redirect(url);
	} catch {
		return NextResponse.json({error: "Registration failed"}, {status: 500});
	}
}
