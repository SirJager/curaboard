import "@/styles/globals.css";
import {defaultTheme, getThemeMode} from "@/lib/theme";
import {LayoutProps} from "@/lib/types";
import type {Metadata} from "next";
import {Noto_Sans} from "next/font/google";
import {cookies} from "next/headers";
import {Toaster} from "sonner";

const notoSans = Noto_Sans({variable: "--font-sans"});

export const metadata: Metadata = {
	title: "Curaboard",
	description: "Created using Next-Js",
};

export default async function RootLayout({children}: LayoutProps) {
	const cookieStore = await cookies();
	const theme = cookieStore.get("theme")?.value ?? defaultTheme;
	const mode = getThemeMode(theme);

	return (
		<html lang="en" className={notoSans.variable} data-theme={theme}>
			<body className="bg-background text-foreground antialiased">
				{/**/}
				{children}
				<Toaster richColors position="top-center" theme={mode} />
			</body>
		</html>
	);
}
