"use client";

import { createContext, useContext, useEffect, useState } from "react";

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
	}, [language]);
	function setLanguage(value: Language) {
		updateLanguage(value);
		try {
			localStorage.setItem("playstats-language", value);
		} catch {}
	}
	return (
		<LanguageContext.Provider value={{ language, setLanguage }}>
			<title>
				{language === "cn"
					? "PlayStats — 记录你的游戏历程"
					: "PlayStats — Your gaming story, in stats"}
			</title>
			<meta
				name="description"
				content={
					language === "cn"
						? "为 PlayStation 玩家打造的数据伴侣。游戏库、游玩时长、奖杯进度与 PSN 消费，记录你的游戏历程。"
						: "Your independent PlayStation companion. Explore your library, playtime, trophies and PSN spending in PlayStats."
				}
			/>
			{children}
		</LanguageContext.Provider>
	);
}
export const useLanguage = () => useContext(LanguageContext);
