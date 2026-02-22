import "server-only";
import directus from "@/lib/directus";
import {readItems} from "@directus/sdk";
import {IFormUpdates} from "../types";

type Result<T> = Promise<{ok: true; data: T; error?: null} | {ok: false; data?: null; error: string}>;

interface Filters {
	query: string;
}

export async function getFormUpdates(filters?: Filters): Result<IFormUpdates[]> {
	try {
		const result = await directus.request(readItems("form_updates", {search: filters?.query}));
		console.log(result);
		return {ok: true, data: []};
	} catch (e: any) {
		return {ok: false, error: e.message ?? "failed to fetch data"};
	}
}
