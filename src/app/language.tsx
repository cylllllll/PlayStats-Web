"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { site } from "@/config";

export type Language = "cn" | "en";
const LanguageContext = createContext<{
	language: Language;
	setLanguage: (language: Language) => void;
}>({ language: "cn", setLanguage: () => {} });
export function LanguageProvider({ children }: { children: React.ReactNode }) {
	const [language, updateLanguage] = useState<Language>("cn");
	useEffect(() => {
		let saved: string | null = null;
		try {
			saved = localStorage.getItem("playstats-language");
		} catch {}
		updateLanguage(
			saved === "cn" || saved === "en"
				? saved
				: navigator.language.toLowerCase().startsWith("zh")
					? "cn"
					: "en",
		);
	}, []);
	useEffect(() => {
		document.documentElement.lang = language === "cn" ? "zh-CN" : "en";
		document.title = site.titles[language];
		document
			.querySelector('meta[name="description"]')
			?.setAttribute("content", site.descriptions[language]);
	}, [language]);
	function setLanguage(value: Language) {
		updateLanguage(value);
		try {
			localStorage.setItem("playstats-language", value);
		} catch {}
	}
	return (
		<LanguageContext.Provider value={{ language, setLanguage }}>
			{children}
		</LanguageContext.Provider>
	);
}
export const useLanguage = () => useContext(LanguageContext);
