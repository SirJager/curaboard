import Link from "@/components/Link";
import {getFormTypeByID} from "@/db/queries";
import {IFormTypes, IFormUpdates} from "@/db/types";
import {cn, parseDate} from "@/lib/utils";

type Props = {
	form: IFormUpdates;
	index?: number;
};

export default async function FormUpdatesListCard({form}: Props) {
	const date = parseDate((form.date_effective ?? new Date()).toISOString());
	let formType: IFormTypes | null = null;
	if (form.form_type) {
		const res = await getFormTypeByID(form.form_type);
		if (res.ok) {
			formType = res.data;
		}
	}

	return (
		<Link href={`/updates/${form.id}`}>
			<li className={cn("list-row brightness-90 hover:brightness-125", "hover:bg-base-300")}>
				<div className="list-col-grow space-y-2">
					<div className="flex flex-wrap items-center gap-2">
						{formType && <div className="badge badge-xs badge-outline">{formType?.form_name}</div>}
						<div className="text-xs">
							Date Effective: {date?.date} {date?.month} {date?.year}
						</div>
					</div>
					<div className="text-base">{form.update_title}</div>
					<div className="opacity-60 mt-1">{form.update_description}</div>
				</div>
			</li>
		</Link>
	);
}
