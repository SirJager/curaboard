"use client";

import {useSearchParams} from "next/navigation";
import HomePageAppbar from "./components/HomePageAppbar";

export default function Page() {
	const searchParams = useSearchParams();
	const query = searchParams.get("search") ?? "";
	const form = searchParams.get("form") ?? "";
	const tags = searchParams.get("tags") ?? "";
	const date = searchParams.get("date") ?? "";

	const filters = {query, form, tags, date};

	return (
		<div className="relative">
			<HomePageAppbar />
			<div className="mx-auto max-w-3/4 relative">
				<div className="sticky top-0 bg-base-300 z-9999 pt-14 pb-4">
					<div id="search" className="flex items-center justify-center">
						<input placeholder="Search anything..." className="input input-xl px-4 outline-none w-full" />
					</div>
				</div>
			</div>
		</div>
	);
}
