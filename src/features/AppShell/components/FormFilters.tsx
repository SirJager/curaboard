import Link from "@/components/Link";
import {getFormTypes} from "@/db/queries";

export default async function FormFilters() {
	const {data, ok, error} = await getFormTypes();
	if (!ok) {
		console.log(error);
		return null;
	}

	return (
		<div id="forms-filters" className="max-h-30 h-30 overflow-auto my-2">
			<form className="space-x-2 space-y-2 pt-4 px-1 overflow-auto">
				<input className="btn btn-square" type="reset" value="×" />
				{data.map((form, index) => {
					const key = form.id;
					return (
						<Link key={`${key}-${index}`} href={`/forms/${form.id}`}>
							<input type="checkbox" name="form-types" aria-label={form.form_code} className="btn" />
						</Link>
					);
				})}
			</form>
		</div>
	);
}
