/* eslint-disable @typescript-eslint/no-explicit-any */
import "server-only";
import db from "@/db";
import {IFormTypes, IFormUpdates, IUser, UserFields} from "@/db/types";

type Result<T> = Promise<{ok: true; data: T; error?: null} | {ok: false; data?: null; error: string}>;

type UserIdentitiyParams = {id: string; email?: null} | {id?: null; email: string};
export async function getUser({email, id}: UserIdentitiyParams): Result<IUser> {
	try {
		if (!id && !email) {
			return {ok: false, error: "Either provide id or email"};
		}
		console.log(email);
		let query = db.selectFrom("directus_users").select(UserFields);

		if (id) query = query.where("id", "=", id).limit(1);
		if (email) query = query.where("email", "=", email).limit(1);

		const data = await query.execute();

		if (data.length === 1) {
			return {ok: true, data: data[0]};
		}

		// could be none results
		return {ok: false, error: "User dosen't exists."};
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
