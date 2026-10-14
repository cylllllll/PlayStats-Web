export type Language = "cn" | "tw" | "en";

export const languageTags: Record<Language, string> = {
	cn: "zh-CN",
	tw: "zh-TW",
	en: "en",
};

export function isLanguage(value: string | null): value is Language {
	return value === "cn" || value === "tw" || value === "en";
}

export function detectLanguage(preferences: readonly string[]): Language {
	for (const preference of preferences) {
		try {
			const locale = new Intl.Locale(preference.trim().replaceAll("_", "-"));
			if (locale.language === "en") return "en";
			if (locale.language !== "zh") continue;
			if (locale.script === "Hant") return "tw";
			if (locale.script === "Hans") return "cn";
			return ["TW", "HK", "MO"].includes(locale.region ?? "") ? "tw" : "cn";
		} catch {
			// Ignore invalid browser language tags and try the next preference.
		}
	}
	return "en";
}
