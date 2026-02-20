import "server-only";
import client from "@/lib/directus";
import {readMe} from "@directus/sdk";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type User = Record<string, any>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withAuth<T extends any[], R>(handler: (user: User, ...args: T) => Promise<R> | R) {
	return async (...args: T): Promise<R | never> => {
		try {
			const token = (await cookies()).get("directus_session_token")?.value;

			if (!token) {
				redirect("/login");
				throw new Error("User not authenticated");
			}

			client.setToken(token);
			const user = await client.request(readMe());

			// Execute original function ONLY after auth
			return await handler(user, ...args);
		} catch (error) {
			console.log(error);
			redirect("/login");
			throw error; // keeps TS happy
		}
	};
}
