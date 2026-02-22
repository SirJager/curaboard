"use client";

import {signOut} from "@/lib/auth";

export default function SignOutButton() {
	const handleSignOut = async () => {
		signOut();
	};

	return (
		<button onClick={handleSignOut} className="btn btn-wide w-full">
			Logout
		</button>
	);
}
