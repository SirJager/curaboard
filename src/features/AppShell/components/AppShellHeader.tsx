import ThemeSwitcher from "@/components/ThemeSwitcher";
import {LucideHome} from "lucide-react";

export default function AppShellHeader() {
	return (
		<div id="app-name-and-logo" className="flex items-center justify-between gap-2">
			<div className="text-xl font-semibold">CuraBoard</div>
			<div className="flex items-center justify-center gap-2">
				<button className="btn btn-square">
					<LucideHome />
				</button>

				<ThemeSwitcher />
			</div>
		</div>
	);
}
