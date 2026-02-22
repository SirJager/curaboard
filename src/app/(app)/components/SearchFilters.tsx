import {getFormTypes} from "@/db/queries";

export default async function SearchFilters() {
	const filters = await getFormTypes();

	if (!filters.ok) {
		return (
			<div>
				{/**/}
				{filters.error}
			</div>
		);
	}

	return (
		<div id="forms-filters" className="max-h-30 h-30 overflow-auto my-2 bg-base-300 rounded-box">
			<form className="space-x-2 space-y-2 p-2 pt-4 pb-8 overflow-auto flex flex-wrap">
				<input className="btn btn-square" type="reset" value="×" />
				{filters.data.map((filter) => {
					return (
						<input key={filter.id} type="checkbox" name="form-types" aria-label={filter.form_code} className="btn" />
					);
				})}
			</form>
		</div>
	);
}
