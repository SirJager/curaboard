"use client";

import {signIn} from "@/lib/auth";
import {useActionState} from "react";

export default function LoginPage() {
	const [_, action, pending] = useActionState(signIn, undefined);

	return (
		<form action={action} className="p-4">
			<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
				<legend className="fieldset-legend">Login</legend>

				<label className="label">Email</label>
				<input type="email" name="email" className="input" placeholder="Email" />

				<label className="label">Password</label>
				<input type="password" name="password" className="input" placeholder="Password" />

				<button disabled={pending} type="submit" className="btn btn-neutral mt-4">
					{pending ? "pending..." : "Sign in"}
				</button>
			</fieldset>
		</form>
	);
}
