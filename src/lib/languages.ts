export type Language = "cn" | "en";

export const languageTags: Record<Language, string> = {
	cn: "zh-CN",
	en: "en",
};

export function isLanguage(value: string | null): value is Language {
	return value === "cn" || value === "en";
}

export function detectLanguage(preferences: readonly string[]): Language {
	for (const preference of preferences) {
		try {
			const locale = new Intl.Locale(preference.trim().replaceAll("_", "-"));
			if (locale.language === "en") return "en";
			if (locale.language === "zh") {
				return locale.maximize().script === "Hans" ? "cn" : "en";
			}
		} catch {
			// Ignore invalid browser language tags and try the next preference.
		}
	}
	return "en";
}
