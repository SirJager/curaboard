import Link from "@/components/Link";
import {getFormUpdatesForFormID} from "@/db/queries";
import {cn} from "@/lib/utils";

export default async function UpdatesByFormIDPage({params}: {params: Promise<{formID: string}>}) {
	const {formID} = await params;
	const {data, ok} = await getFormUpdatesForFormID(formID);

	if (!ok) return null;

	return (
		<div className="h-full min-h-0 overflow-auto rounded-box pr-2">
			<ul className="list gap-8 bg-base-100 rounded-box shadow-md pb-40">
				{data.map((update) => {
					return (
						<Link
							key={update.id}
							href={`/updates/${update.id}`}
							className="p-2"
						>
							<li className="list-row  hover:shadow-lg hover:drop-shadow-2xl rounded-box">
								<div>
									<img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp" />
								</div>
								<div>
									<div>{update.update_title}</div>
								</div>
								<p className="list-col-wrap text-xs">{update.update_description}</p>
								<button className="btn btn-square btn-ghost">
									<svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
										<g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
											<path d="M6 3L20 12 6 21 6 3z"></path>
										</g>
									</svg>
								</button>

								<button className="btn btn-square btn-ghost">
									<svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
										<g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
											<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
										</g>
									</svg>
								</button>
							</li>
						</Link>
					);
				})}
			</ul>
		</div>
	);
}
