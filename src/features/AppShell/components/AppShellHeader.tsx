import ThemeSwitcher from "@/components/ThemeSwitcher";
import Link from "next/link";

export default async function AppShellHeader() {
	return (
		<div id="app-name-and-logo" className="flex items-center justify-between gap-2">
			<Link href="/">
				<div className="text-2xl font-semibold">CuraBoard</div>
			</Link>

			<div className="flex items-center justify-center gap-2">
				<div className="avatar avatar-placeholder">
					<div className="bg-neutral text-neutral-content w-16 rounded-full">
						<span className="text-3xl">D</span>
					</div>
				</div>

				<ThemeSwitcher />
			</div>
		</div>
	);
}
