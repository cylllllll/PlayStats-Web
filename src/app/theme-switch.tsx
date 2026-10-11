"use client";

import { useEffect, useState } from "react";
import { FiMonitor, FiMoon, FiSun } from "react-icons/fi";
import { useLanguage } from "./language";

type Theme = "system" | "light" | "dark";
export default function ThemeSwitch() {
	const { language } = useLanguage();
	const [theme, setTheme] = useState<Theme>("system");
	useEffect(() => {
		let preference: Theme = "system";
		try {
			const saved = localStorage.getItem("playstats-theme");
			if (saved === "light" || saved === "dark") preference = saved;
		} catch {}
		setTheme(preference);
		const media = matchMedia("(prefers-color-scheme: dark)");
		const apply = () => {
			const resolved =
				preference === "system"
					? media.matches
						? "dark"
						: "light"
					: preference;
			document.documentElement.dataset.theme = resolved;
			document
				.querySelector('meta[name="theme-color"]')
				?.setAttribute("content", resolved === "dark" ? "#101113" : "#fafaf7");
		};
		apply();
		media.addEventListener("change", apply);
		const change = (event: Event) => {
			preference = (event as CustomEvent<Theme>).detail;
			apply();
		};
		window.addEventListener("playstats-theme-change", change);
		return () => {
			media.removeEventListener("change", apply);
			window.removeEventListener("playstats-theme-change", change);
		};
	}, []);
	const choices: { key: Theme; Icon: typeof FiSun; label: string }[] = [
		{ key: "light", Icon: FiSun, label: language === "cn" ? "亮色" : "Light" },
		{
			key: "system",
			Icon: FiMonitor,
			label: language === "cn" ? "跟随系统" : "System",
		},
		{ key: "dark", Icon: FiMoon, label: language === "cn" ? "暗色" : "Dark" },
	];
	return (
		<fieldset className="theme-toggle inline-flex items-center gap-0.5 rounded-xl border border-gray-200 bg-gray-100/60 p-1 dark:border-white/10 dark:bg-white/4">
			<legend className="sr-only">
				{language === "cn" ? "外观" : "Appearance"}
			</legend>
			{choices.map(({ key, Icon, label }) => (
				<label
					key={key}
					title={label}
					className={`theme-option relative flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all duration-200 ${theme === key ? "bg-white text-gray-900 shadow-sm shadow-black/8 dark:bg-white/10 dark:text-white" : "text-gray-500 hover:text-gray-700 dark:text-white/40 dark:hover:text-white/70"}`}
				>
					<input
						type="radio"
						name="color-theme"
						value={key}
						checked={theme === key}
						onChange={() => {
							setTheme(key);
							try {
								localStorage.setItem("playstats-theme", key);
							} catch {}
							window.dispatchEvent(
								new CustomEvent("playstats-theme-change", { detail: key }),
							);
						}}
						className="sr-only"
					/>
					<Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
					<span className="sr-only sm:not-sr-only">{label}</span>
				</label>
			))}
		</fieldset>
	);
}
