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
				{/* <FormSearchBar /> */}
				{/* <FormFilters /> */}
				{/* <FormUpdatesList /> */}
			</div>

			<div className="flex-1 relative overflow-auto bg-base-300">
				{/**/}
				{children}
				{/**/}

				{/**/}
			</div>
		</div>
	);
}
