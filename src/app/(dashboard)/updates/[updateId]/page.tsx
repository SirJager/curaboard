import {getFormUpdate, getUser} from "@/db/queries";
import {parseDate} from "@/lib/utils";

export default async function VerifierPage({params}: {params: Promise<{updateId: string}>}) {
	const {updateId} = await params;
	const {data: update, ok, error} = await getFormUpdate(updateId);

	if (!ok) {
		return <div className="text-5xl">{error}</div>;
	}

	const {data: user, ...userRes} = await getUser(update.user_created ?? "");
	if (!userRes.ok || !user) {
		return <div className="text-5xl">{error}</div>;
	}

	const date = parseDate((update.date_created ?? new Date()).toISOString())!;

	return (
		<div className="w-full h-full overflow-auto space-y-4">
			<div className="prose mx-auto prose-2xl">
				<div id="update-header" className="">
					<div className="text-2xl font-semibold">
						{user.first_name} {user.last_name}
					</div>
					<div className="text-xl">
						{date.date} {date.month} {date.year}
					</div>
				</div>

				<h1 className="">{update.update_title}</h1>
				<div className="">{update.update_description}</div>
				<div
					id="update-content"
					dangerouslySetInnerHTML={{
						__html: update.update_content ?? "",
					}}
				/>
			</div>
		</div>
	);
}
