export const site = {
	name: "PlayStats",
	url: (
		process.env.NEXT_PUBLIC_SITE_URL || "https://playstats.pages.dev"
	).replace(/\/+$/, ""),
	titles: {
		cn: "PlayStats — PlayStation 游玩统计、奖杯与 PSN 消费",
		tw: "PlayStats — PlayStation 遊玩統計、獎盃與 PSN 消費",
		en: "PlayStats — PlayStation Stats, Trophies & PSN Spending",
	},
	descriptions: {
		cn: "PlayStats 是为 PlayStation 玩家打造的 iPhone 与 iPad 数据伴侣。查看游戏库、游玩时长、奖杯日历和 PSN 消费，使用实时活动、小组件与分享卡片，回顾你的游戏历程。",
		tw: "PlayStats 是為 PlayStation 玩家打造的 iPhone 與 iPad 數據伴侶。查看遊戲庫、遊玩時長、獎盃日曆和 PSN 消費，使用即時動態、小工具與分享卡片，回顧你的遊戲歷程。",
		en: "Your PlayStation companion for iPhone and iPad. Explore your library, playtime, trophies and PSN spending with Live Activities, widgets and share cards.",
	},
	telegramUrl: "https://t.me/PlayStatsApp",
	privacyPolicyUrl: "/privacy-policy/",
	shareImageUrl: "/og-image-v6.jpg",
	privacy: {
		titles: {
			cn: "隐私政策 — PlayStats",
			tw: "隱私政策 — PlayStats",
			en: "Privacy Policy — PlayStats",
		},
		descriptions: {
			cn: "阅读 PlayStats 隐私政策，了解个人信息的收集、使用和保护方式。",
			tw: "閱讀 PlayStats 隱私政策，瞭解個人資訊的收集、使用與保護方式。",
			en: "Read the PlayStats Privacy Policy, including how personal information is collected, used and protected.",
		},
	},
	description:
		"为 PlayStation 玩家打造的数据伴侣。游戏库、游玩时长、奖杯进度与 PSN 消费，记录你的游戏历程。",
	// Set the verified public URLs here or through the build environment.
	appStoreUrl:
		process.env.NEXT_PUBLIC_APP_STORE_URL ||
		"https://apps.apple.com/us/app/playstats/id6799940098",
	testFlightUrl:
		process.env.NEXT_PUBLIC_TESTFLIGHT_URL ||
		"https://testflight.apple.com/join/JAkUz1B6",
};
