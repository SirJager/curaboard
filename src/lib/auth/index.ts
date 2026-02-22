"use server";

import {IUser} from "@/db/types";
/* eslint-disable @typescript-eslint/no-explicit-any */
import {toUser} from "@/lib/auth/parser";
import {FormState, SignupFormSchema} from "@/lib/auth/schema";
import directus from "@/lib/directus";
import site from "@constants";
import {readMe} from "@directus/sdk";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export async function signOut() {
	await directus.setToken("");
	(await cookies()).set(site.vars.session, "", {path: "/", maxAge: 0});
	return {ok: true, data: true, error: null};
}

export async function signIn(state: FormState, formData: FormData) {
	// Validate form fields
	const validatedFields = SignupFormSchema.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
	});

	// If any form fields are invalid, return early
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	const authResult = await directus.login(validatedFields.data);

	(await cookies()).set({
		name: site.vars.session,
		value: authResult.access_token ?? "",
		path: "/",
		httpOnly: true,
		sameSite: true,
		maxAge: 60 * 15,
	});

	await directus.setToken(authResult.access_token);
	const user = toUser(await directus.request(readMe()));

	redirect(site.pages.home);

	return {ok: true, data: user, error: null};
}

export type User = Record<string, any>;

type SessionResult = Promise<{ok: true; data: IUser; error?: null} | {ok: false; data?: null; error: string}>;

export const getSession = async (): SessionResult => {
	try {
		const token = (await cookies()).get(site.vars.session)?.value;
		if (!token) {
			return {ok: false, error: "User not authenticated", data: null};
		}
		directus.setToken(token);
		const rawUser = await directus.request(readMe());
		return {ok: true, data: toUser(rawUser), error: null};
	} catch (e: any) {
		return {ok: false, error: e.message ?? "Something went wrong while checking session", data: null};
	}
};
