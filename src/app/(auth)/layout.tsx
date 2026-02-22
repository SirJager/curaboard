import {getSession} from "@/lib/auth";
import site from "@/lib/constants";
import {redirect} from "next/navigation";

export default async function AuthLayout({children}: {children: React.ReactNode}) {
	const {ok, data} = await getSession();
	if (ok && data.email) {
		redirect(site.pages.home);
	}

	return <div className="grid place-items-center h-screen w-full">{children}</div>;
}
