import directus from "@/lib/directus";
import {readItems} from "@directus/sdk";

export default function SearchInput() {
	const [query, setQuery] = useState("");

	const handleSearch = async () => {
		const result = await directus.request(
			readItems("form_updates`", {
				search: query,
			}),
		);
	};

	return (
		<div id="search" className="flex items-center justify-center">
			<input placeholder="Search anything..." className="input input-xl px-4 outline-none w-full" />
		</div>
	);
}
