import {getFormUpdates} from "@/db/queries";
import FormUpdatesListCard from "./FormUpdatesListCard";

export default async function FormUpdatesList() {
	const {ok, data, error} = await getFormUpdates();
	if (!ok) {
		console.log(error);
		return null;
	}

	return (
		<div id="form-updates-list" className="flex-1 min-h-0">
			<ul className="list bg-base-100 rounded-box shadow-md h-full overflow-y-auto">
				{data.map((form, index) => {
					const key = `${form}-${index}-${form.id}`;
					return <FormUpdatesListCard key={key} form={form} index={index} />;
				})}
			</ul>
		</div>
	);
}
