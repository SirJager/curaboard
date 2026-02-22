import Link from "@/components/Link";
import {getFormUpdates} from "@/db/queries";
import logger from "@/lib/logger";
import {ogParamsBuilder} from "@/lib/og";
import HomePageAppbar from "./components/HomePageAppbar";
import SearchFilters from "./components/SearchFilters";

export default async function HomePage() {
	const updates = await getFormUpdates();

	return (
		<div className="relative">
			<HomePageAppbar />
			<div className="mx-auto max-w-3/4 relative">
				<div className="sticky top-0 bg-base-300 z-9999 pt-14 pb-4">
					<div id="search" className="flex items-center justify-center">
						<input placeholder="Search anything..." className="input input-xl px-4 outline-none w-full" />
					</div>
					<SearchFilters />
				</div>
				{/**/}

				<div className="grid grid-cols-3 gap-4 pt-8 px-0.5">
					{updates.data!.map((update, index) => {
						const og = ogParamsBuilder({title: update.update_title});

						return (
							<div key={update.id} className="card bg-base-100 shadow-sm">
								<figure>
									<img src={og.url} alt="Shoes" />
								</figure>
								<div className="card-body">
									<Link href={`/updates/${update.id}`} className="hover:underline">
										<h2 className="card-title text-base">{update.update_title}</h2>
									</Link>
									<p className="prose prose-sm line-clamp-3">{update.update_description}</p>
								</div>
							</div>
						);
					})}
				</div>

				{/**/}
			</div>
		</div>
	);
}
