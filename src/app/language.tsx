"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { site } from "@/config";
import {
	detectLanguage,
	isLanguage,
	type Language,
	languageTags,
} from "@/lib/languages";

export type { Language } from "@/lib/languages";

const LanguageContext = createContext<{
	language: Language;
	setLanguage: (language: Language) => void;
}>({ language: "en", setLanguage: () => {} });
export function LanguageProvider({ children }: { children: React.ReactNode }) {
	const [language, updateLanguage] = useState<Language>("en");
	useEffect(() => {
		let saved: string | null = null;
		try {
			saved = localStorage.getItem("playstats-language");
			if (saved === "tw") {
				saved = "en";
				localStorage.setItem("playstats-language", saved);
			}
		} catch {}
		updateLanguage(
			isLanguage(saved)
				? saved
				: detectLanguage([...(navigator.languages ?? []), navigator.language]),
		);
	}, []);
	useEffect(() => {
		document.documentElement.lang = languageTags[language];
	}, [language]);
	function setLanguage(value: Language) {
		updateLanguage(value);
		try {
			localStorage.setItem("playstats-language", value);
		} catch {}
	}
	return (
		<LanguageContext.Provider value={{ language, setLanguage }}>
			<title>{site.titles[language]}</title>
			<meta name="description" content={site.descriptions[language]} />
			{children}
		</LanguageContext.Provider>
	);
}
export const useLanguage = () => useContext(LanguageContext);
