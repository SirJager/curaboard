import UpdatesGrid from "@/components/UpdatesGrid";
import {getFormUpdates} from "@/db/queries";
import {Suspense} from "react";
import HomePageAppbar from "./components/HomePageAppbar";
import SearchFilters from './components/SearchFilters';

export default function Page() {
	const updatesPromise = getFormUpdates();

	return (
		<div className="relative">
			<HomePageAppbar />
			<div className="mx-auto max-w-3/4 relative">
				<div className="sticky top-0 bg-base-300 z-9999 pt-14 pb-4">
					<div id="search" className="flex items-center justify-center">
						<input placeholder="Search anything..." className="input input-xl px-4 outline-none w-full" />
					</div>
          <SearchFilters />
					<UpdatesGrid resultPromise={updatesPromise} />
				</div>

				<Suspense fallback={<div>Loading...</div>}>
					<UpdatesGrid resultPromise={updatesPromise} />
				</Suspense>
			</div>
		</div>
	);
}
