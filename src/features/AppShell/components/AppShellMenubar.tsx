import ThemeSwitcher from "@/components/ThemeSwitcher";
import {LucideHome} from "lucide-react";

export default function AppShellMenubar() {
	return (
		<div id="menu-buttons" className="p-2 flex flex-col justify-start gap-2">
			<button className="btn btn-square">
				<LucideHome />
			</button>
			<ThemeSwitcher />
		</div>
	);
}
