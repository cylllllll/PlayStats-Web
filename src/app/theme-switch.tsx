"use client";

import { useEffect, useState } from "react";
import { FiMonitor, FiMoon, FiSun } from "react-icons/fi";
import IconSelect from "./icon-select";
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
		<IconSelect
			label={language === "cn" ? "外观" : "Appearance"}
			Icon={choices.find((choice) => choice.key === theme)?.Icon ?? FiMonitor}
			value={theme}
			options={choices}
			onChange={(key) => {
				setTheme(key);
				try {
					localStorage.setItem("playstats-theme", key);
				} catch {}
				window.dispatchEvent(
					new CustomEvent("playstats-theme-change", { detail: key }),
				);
			}}
		/>
	);
}
