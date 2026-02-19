import {cn} from "@/lib/utils";
import AppShellHeader from "./components/AppShellHeader";
import AppShellMenubar from "./components/AppShellMenubar";
import FormFilters from "./components/FormFilters";
import FormUpdatesList from "./components/FormUpdatesList";
import FormSearchBar from "./components/Searchbar";

export default function AppShell({children}: {children: React.ReactNode}) {
	return (
		<div className="h-screen w-full flex items-stretch justify-stretch overflow-hidden">
			<AppShellMenubar />
			<div id="sidebar" className={cn("relative h-full p-4 max-w-120 w-120 min-w-120 bg-base-200", "flex flex-col")}>
				<AppShellHeader />
				<FormSearchBar />
				<FormFilters />
				<FormUpdatesList />
			</div>

			<div className="flex-1 relative p-4 bg-base-300 overflow-hidden">
				{/**/}
				{children}
				<div id="message-bar" className="absolute bottom-4">
					<label className="input input-lg outline-none">
						<svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
								<circle cx="11" cy="11" r="8"></circle>
								<path d="m21 21-4.3-4.3"></path>
							</g>
						</svg>
						<input type="search" required placeholder="Write message" />
					</label>
				</div>
				{/**/}
			</div>
		</div>
	);
}
