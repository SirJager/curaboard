/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import db from "@/db";
import {IFormTypes, IFormUpdates} from "@/db/types";

type Result<T> = Promise<{ok: true; data: T; error?: null} | {ok: false; data?: null; error: string}>;

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
		const data = await db
			.selectFrom("form_updates")
			.selectAll()
			.innerJoin("form_types", "form_updates.id", "form_types.form_code")
			//
			.orderBy("date_created", "desc")
			.execute();
		console.log(data[0]);
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
