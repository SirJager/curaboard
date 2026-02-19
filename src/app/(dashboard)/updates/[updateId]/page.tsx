import {getFormUpdate} from "@/db/queries";

export default async function VerifierPage({params}: {params: Promise<{updateId: string}>}) {
	const {updateId} = await params;
	const {data, ok} = await getFormUpdate(updateId);

	return (
		<div className="p-4 w-full h-full text-5xl">
			<div>
				{!ok || !data ? (
					<div className="text-5xl">{updateId} not found</div>
				) : (
					<div className="text-5xl">
						{/**/}
						<div className="text-4xl">{data.update_title}</div>
						<div className="text-lg">{data.update_description}</div>
					</div>
				)}
			</div>
		</div>
	);
}
