import Link from "@/components/Link";
import {Result} from "@/db/queries";
import {IFormUpdates} from "@/db/types";
import {ogParamsBuilder} from "@/lib/og";
import Image from "next/image";
import {use} from "react";

type Props = {
	resultPromise: any;
};

export default function UpdatesGrid(props: Props) {
	const result: Result<IFormUpdates[]> = use(props.resultPromise);
	if (!result.ok) return null;

	const data = result.data;

	return (
		<div className="grid grid-cols-3 gap-4 pt-8 px-0.5">
			{data.map((update) => {
				const image = "https://placehold.co/600x400";
				return (
					<div key={update.id} className="card bg-base-100 shadow-sm">
						{/* <Image src={image} alt={update.update_title ?? ""} width={600} height={400} /> */}
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
	);
}
