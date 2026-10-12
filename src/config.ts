export const site = {
	name: "PlayStats",
	telegramUrl: "https://t.me/PlayStatsApp",
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
