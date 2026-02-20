/* eslint-disable @typescript-eslint/no-explicit-any */
import "server-only";
import db from "@/db";
import {IFormTypes, IFormUpdates, IUser, UserFields} from "@/db/types";
import client from "@/lib/directus";
import {readMe} from "@directus/sdk";
import {cookies} from "next/headers";

type Result<T> = Promise<{ok: true; data: T; error?: null} | {ok: false; data?: null; error: string}>;

export async function getUser(id: string): Result<IUser> {
	try {
		const data = await db
			.selectFrom("directus_users")
			.select(UserFields)
			.where("id", "=", id)
			.limit(1)
			//
			.execute();
		if (data.length === 1) {
			return {ok: true, data: data[0]};
		}

		// could be none results
		return {ok: false, error: "user not found"};
	} catch (e: any) {
		return {ok: false, error: e.message ?? "failed to fetch data"};
	}
}

export async function getFormTypes(): Result<IFormTypes[]> {
	try {
		const data = await db.selectFrom("form_types").selectAll().orderBy("date_created", "desc").execute();
		return {ok: true, data};
	} catch (e: any) {
		return {ok: false, error: e.message ?? "failed to fetch data"};
	}
}

export async function getFormTypeByID(formTypeID: string): Result<IFormTypes> {
	try {
		const res = await db.selectFrom("form_types").selectAll().where("id", "=", formTypeID).execute();
		if (res.length === 1) {
			const data = res[0];
			return {ok: true, data};
		}
		// could be none results
		return {ok: false, error: "update not found"};
	} catch (e: any) {
		return {ok: false, error: e.message ?? "failed to fetch data"};
	}
}

export async function getFormUpdates(): Result<IFormUpdates[]> {
	try {
		const data = await db.selectFrom("form_updates").selectAll().orderBy("date_created", "desc").execute();
		return {ok: true, data};
	} catch (e: any) {
		return {ok: false, error: e.message ?? "failed to fetch data"};
	}
}

export async function getFormUpdate(id: string): Result<IFormUpdates> {
	try {
		const res = await db.selectFrom("form_updates").selectAll().where("id", "=", id).limit(1).execute();
		if (res.length === 1) {
			const data = res[0];
			return {ok: true, data};
		}
		// could be none results
		return {ok: false, error: "update not found"};
	} catch (e: any) {
		return {ok: false, error: e.message ?? "failed to fetch data"};
	}
}

export async function getFormUpdatesForFormID(formID: string): Result<IFormUpdates[]> {
	try {
		const data = await db.selectFrom("form_updates").selectAll().orderBy("date_created", "desc").execute();
		return {ok: true, data};
	} catch (e: any) {
		return {ok: false, error: e.message ?? "failed to fetch data"};
	}
}

export async function getAuthenticatedUser() {
	try {
		const token = (await cookies()).get("directus_session_token")?.value;
		if (!token) {
			console.log("no access token");
			return {ok: false, data: null, error: "user not authenticated"};
		}

		client.setToken(token);
		const user = await client.request(readMe());
		if (!user) {
			return {ok: false, data: null, error: "failed to fetch user"};
		}

		return {ok: true, data: user, error: null};
	} catch (err: any) {
		return {ok: false, data: null, error: err.message ?? "failed to fetch user data"};
	}
}
