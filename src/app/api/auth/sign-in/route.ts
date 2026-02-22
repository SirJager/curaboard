/* eslint-disable @typescript-eslint/no-explicit-any */
import "server-only";
import {toUser} from "@/lib/auth/parser";
import {SignupFormSchema} from "@/lib/auth/schema";
import directus from "@/lib/directus";
import site from "@constants";
import {readMe} from "@directus/sdk";
import {cookies} from "next/headers";
import type {NextRequest} from "next/server";

export async function POST(request: NextRequest) {
	const headers = new Headers({"Content-Type": "application/json"});
	try {
		const formData = await request.formData();
		const validated = SignupFormSchema.safeParse({
			email: formData.get("email"),
			password: formData.get("password"),
		});
		const {success: ok, data, error} = validated;

		// If any form fields are invalid, return early
		if (!ok) {
			return new Response(JSON.stringify({error: error.message}), {status: 400, headers});
		}

		const authResult = await directus.login(data);

		if (authResult.access_token) {
			(await cookies()).set(site.vars.session, authResult.access_token, {
				path: "/",
				httpOnly: true,
				sameSite: "strict",
				maxAge: 60 * 30,
			});

			const response = toUser(await directus.request(readMe()));
			return new Response(JSON.stringify(response), {status: 200, headers});
		}

		const response = {ok: false, error: "Invalid email or password"};
		return new Response(JSON.stringify(response), {status: 401, headers});
	} catch (error: any) {
		const response = {ok: false, error: error.message ?? "Something went wrong"};
		return new Response(JSON.stringify(response), {status: 500, headers});
	}
}
