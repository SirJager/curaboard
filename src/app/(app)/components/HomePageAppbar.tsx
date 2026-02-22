"use client";

import Link from "@/components/Link";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import {getSession} from "@/lib/auth";
import {cn} from "@/lib/utils";
import site from "@constants";
import SignOutButton from "./SignOutButton";

export default async function HomePageAppbar() {
	const {ok, data} = await getSession();

	return (
		<div className={cn("px-2 py-4 w-full text-5x", "flex items-center gap-4 justify-end")}>
			<ThemeSwitcher />

			{ok ? (
				<div id="user-dropdown" className="dropdown dropdown-end z-99999999">
					<div id="user-avatar" tabIndex={0} role="btn" className="flex items-center justify-center gap-2 py-1">
						<div className="avatar avatar-placeholder">
							<div className="bg-neutral text-neutral-content w-10 rounded-full">
								<span className="text-xl">D</span>
							</div>
						</div>
					</div>
					<ul tabIndex={-1} className="dropdown-content bg-base-100 rounded-box z-1 w-80 px-8 py-4 shadow-sm space-y-3">
						<li className="">
							<div>
								{data.first_name} {data.last_name}
							</div>
							<div>{data.email}</div>
						</li>

						<li>
							<SignOutButton />
						</li>
					</ul>
				</div>
			) : (
				<Link href={site.pages.signIn} className="btn btn-neutral min-w-30">
					Sign In
				</Link>
			)}

			{/**/}
		</div>
	);
}
