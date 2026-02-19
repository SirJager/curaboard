import Link from "@/components/Link";
import {getFormUpdatesForFormID} from "@/db/queries";
import {cn} from "@/lib/utils";

export default async function UpdatesByFormIDPage({params}: {params: Promise<{formID: string}>}) {
	const {formID} = await params;
	const {data, ok} = await getFormUpdatesForFormID(formID);

	return (
		<div className="p-4 w-full h-full text-5xl">
			{!ok || !data ? (
				<div className="text-5xl">{formID} not found</div>
			) : (
				<div className="">
					{data.map((update) => {
						return (
							<Link key={update.id} href={`/updates/${update.id}`}>
								<li className={cn("list-row brightness-90 hover:brightness-125", "hover:bg-base-300")}>
									<div className="list-col-grow space-y-2">
										<div className="flex flex-wrap items-center gap-2"></div>
										<div className="text-base">{update.update_title}</div>
										<div className="opacity-60 mt-1">{update.update_description}</div>
									</div>
								</li>
							</Link>
						);
					})}
				</div>
			)}
		</div>
	);
}
