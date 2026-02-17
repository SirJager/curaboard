/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {defaultTheme, getThemeMode, Theme, ThemeMode} from "@/lib/theme";
import {Moon, Sun} from "lucide-react";
import {useEffect, useState} from "react";

export const ThemeSwitcher = ({theme}: {theme?: Theme}) => {
	const [mode, setMode] = useState<ThemeMode>();
	const applyTheme = (theme: Theme) => {
		const updatedMode = getThemeMode(theme);
		document.documentElement.setAttribute("data-theme", theme);
		setMode(updatedMode);
	};

	useEffect(() => {
		const currentTheme = document.documentElement.getAttribute("data-theme") ?? defaultTheme;
		applyTheme(currentTheme as Theme);
	}, [theme]);

	const switchTheme = async () => {
		const res = await fetch("/api/theme?cycle");
		if (res.ok) {
			const {theme} = await res.json();
			console.log(theme);
			applyTheme(theme);
		}
	};

	return (
		<button onClick={switchTheme} className="btn btn-square">
			{mode === "light" ? (
				<Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
			) : (
				<Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
			)}
			<span className="sr-only">Toggle theme</span>
		</button>
	);
};

export default ThemeSwitcher;
