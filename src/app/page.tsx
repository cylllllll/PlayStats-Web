"use client";

import { useRef, useState } from "react";
import { FaApple } from "react-icons/fa";
import {
	FiArrowLeft,
	FiArrowRight,
	FiArrowUpRight,
	FiGlobe,
} from "react-icons/fi";
import { RiTelegram2Fill } from "react-icons/ri";
import BrandMark from "@/components/BrandMark";
import { site } from "@/config";
import CoverWall from "./cover-wall";
import IconSelect from "./icon-select";
import { useLanguage } from "./language";
import ThemeSwitch from "./theme-switch";

const copy = {
	cn: {
		home: "PlayStats 首页",
		navigation: "导航与语言",
		language: "语言",
		swipe: "左右滑动查看更多",
		previous: "上一张截图",
		next: "下一张截图",
		telegram: "Telegram 社群",
		telegramLink: "Telegram 社群（新标签页）",
		explore: "探索 App",
		eyebrow: "为 PlayStation 玩家打造",
		intro: ["游戏库、", "游玩时长", "、奖杯与消费。"],
		introEnd: ["在 PlayStats，回顾你的", "游戏历程", "。"],
		download: "下载 iPhone 与 iPad App",
		beta: "抢先体验新功能",
		join: "加入 TestFlight",
		showcase: "你的游戏生活，一览无余。",
		more: "在 App 中探索更多",
		devices: "预览设备",
		footer: "每一场游戏，都有你的记录。",
		preview: "查看完整截图（新标签页）",
		insights: ["游玩统计", "游玩时长与 PSN 消费，一目了然。"],
		trophies: ["奖杯日历", "按日期回顾奖杯记录，收藏每一次达成。"],
		live: ["实时活动", "在锁屏和灵动岛，查看正在游玩的游戏。"],
		share: ["分享卡片", "把游玩时长与奖杯进度，变成值得分享的卡片。"],
		details: ["游戏详情", "查看单款游戏的游玩时长与奖杯进度。"],
	},
	tw: {
		home: "PlayStats 首頁",
		explore: "探索 App",
		eyebrow: "為 PlayStation 玩家打造",
		intro: ["遊戲庫、", "遊玩時長", "、獎盃與消費。"],
		introEnd: ["在 PlayStats，回顧你的", "遊戲歷程", "。"],
		download: "下載 iPhone 與 iPad App",
		beta: "搶先體驗新功能",
		join: "加入 TestFlight",
		showcase: "你的遊戲生活，一覽無遺。",
		more: "在 App 中探索更多",
		devices: "預覽裝置",
		footer: "每一場遊戲，都有你的記錄。",
		preview: "查看完整截圖（新分頁）",
		insights: ["遊玩統計", "遊玩時長與 PSN 消費，一目了然。"],
		trophies: ["獎盃日曆", "按日期回顧獎盃記錄，收藏每一次達成。"],
		live: ["即時動態", "在鎖定畫面和動態島，查看正在遊玩的遊戲。"],
		share: ["分享卡片", "把遊玩時長與獎盃進度，變成值得分享的卡片。"],
		details: ["遊戲詳情", "查看單款遊戲的遊玩時長與獎盃進度。"],
		navigation: "導覽與語言",
		language: "語言",
		swipe: "左右滑動查看更多",
		previous: "上一張截圖",
		next: "下一張截圖",
		telegram: "Telegram 社群",
		telegramLink: "Telegram 社群（新分頁）",
	},
	en: {
		home: "PlayStats home",
		navigation: "Navigation and language",
		language: "Language",
		swipe: "Swipe to explore",
		previous: "Previous screenshot",
		next: "Next screenshot",
		telegram: "Telegram community",
		telegramLink: "Telegram community (opens in a new tab)",
		explore: "Explore the app",
		eyebrow: "BUILT FOR PLAYSTATION PLAYERS",
		intro: ["Your library, ", "playtime", ", trophies and spending."],
		introEnd: ["Rediscover your ", "gaming journey", " with PlayStats."],
		download: "Download on the",
		beta: "Test it on",
		join: "TestFlight",
		showcase: "Your gaming life, at a glance.",
		more: "Discover more in the app",
		devices: "Preview device",
		footer: "Every game. Your story, in stats.",
		preview: "View full screenshot (opens in a new tab)",
		insights: [
			"Playtime Stats",
			"Your playtime and PSN spending, all in one place.",
		],
		trophies: [
			"Trophy Calendar",
			"Look back at your trophy history, day by day.",
		],
		live: [
			"Live Activities",
			"See what you’re playing on the Lock Screen and Dynamic Island.",
		],
		share: [
			"Share Cards",
			"Turn your playtime and trophy progress into shareable memories.",
		],
		details: [
			"Game Details",
			"Explore playtime and trophy progress for each game.",
		],
	},
};
type Device = "iphone" | "ipad";
const devices: { id: Device; label: string }[] = [
	{ id: "iphone", label: "iPhone" },
	{ id: "ipad", label: "iPad" },
];

export default function HomePage() {
	const { language, setLanguage } = useLanguage();
	const [device, setDevice] = useState<Device>("iphone");
	const galleryRef = useRef<HTMLElement>(null);
	function scrollGallery(direction: number) {
		const gallery = galleryRef.current;
		if (!gallery) return;
		const card = gallery.querySelector("figure");
		const step =
			(card?.getBoundingClientRect().width ?? gallery.clientWidth) +
			(parseFloat(getComputedStyle(gallery).columnGap) || 0);
		gallery.scrollBy({
			left: direction * step,
			behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
				? "instant"
				: "smooth",
		});
	}
	const t = copy[language];
	const shots =
		device === "iphone"
			? [
					{ file: "01-insights.jpg", text: t.insights },
					{ file: "02-trophies.jpg", text: t.trophies },
					{ file: "03-live-activity.jpg", text: t.live },
					{ file: "04-share.jpg", text: t.share },
				]
			: [
					{ file: "01-insights.jpg", text: t.insights },
					{ file: "02-game-details.jpg", text: t.details },
					{ file: "03-share.jpg", text: t.share },
				];
	// Traditional Chinese screenshots are not available yet; use the Chinese assets.
	const screenshotLanguage = language === "en" ? "en" : "cn";
	const directory =
		device === "iphone"
			? `/assets/screenshots/${language === "en" ? "en/" : ""}`
			: `/assets/screenshots/${device}/${screenshotLanguage}/`;
	const dimensions = device === "iphone" ? [1284, 2778] : [2048, 2732];
	return (
		<>
			<header className="header wrap">
				<a className="wordmark" href="/" aria-label={t.home}>
					<BrandMark />
					PlayStats
				</a>
				<nav className="header-actions" aria-label={t.navigation}>
					<a className="nav-link" href="#screenshots">
						{t.explore} <span aria-hidden="true">↗</span>
					</a>
					<IconSelect
						label={t.language}
						Icon={FiGlobe}
						value={language}
						options={[
							{ key: "cn", label: "简体中文", lang: "zh-CN" },
							{ key: "tw", label: "繁體中文", lang: "zh-TW" },
							{ key: "en", label: "English", lang: "en" },
						]}
						onChange={setLanguage}
					/>
					<ThemeSwitch />
				</nav>
			</header>
			<main className="wrap">
				<section className="hero" aria-labelledby="hero-title">
					<div className="hero-copy">
						<p className="eyebrow">
							<span />
							{t.eyebrow}
						</p>
						<h1 id="hero-title" className="hero-description">
							{t.intro[0]}
							<em>{t.intro[1]}</em>
							{t.intro[2]}
							<span>
								{t.introEnd[0]}
								<em>{t.introEnd[1]}</em>
								{t.introEnd[2]}
							</span>
						</h1>
						<div className="downloads">
							<a
								className="download primary"
								href={site.appStoreUrl}
								target="_blank"
								rel="noopener noreferrer"
							>
								<FaApple aria-hidden="true" />
								<span>
									<small>{t.download}</small>
									<strong>App Store</strong>
								</span>
								<FiArrowUpRight className="arrow" aria-hidden="true" />
							</a>
							<a
								className="download secondary"
								href={site.testFlightUrl}
								target="_blank"
								rel="noopener noreferrer"
							>
								<img
									className="store-icon"
									src="/assets/TestFlight.png"
									alt=""
									width={28}
									height={28}
								/>
								<span>
									<small>{t.beta}</small>
									<strong>{t.join}</strong>
								</span>
								<FiArrowUpRight className="arrow" aria-hidden="true" />
							</a>
						</div>
						<p className="platforms">iPhone · iPad</p>
					</div>
					<CoverWall />
				</section>
				<section
					className="showcase"
					id="screenshots"
					aria-labelledby="screenshots-title"
				>
					<div className="section-top">
						<h2 id="screenshots-title">{t.showcase}</h2>
						<span>{t.more}</span>
					</div>
					<div className="gallery-toolbar">
						<fieldset className="device-switch" aria-label={t.devices}>
							{devices.map((item) => (
								<button
									type="button"
									key={item.id}
									aria-pressed={device === item.id}
									aria-controls="device-previews"
									onClick={() => setDevice(item.id)}
								>
									{item.label}
								</button>
							))}
						</fieldset>
						<div className="gallery-controls">
							<span>{t.swipe}</span>
							<button
								type="button"
								onClick={() => scrollGallery(-1)}
								aria-label={t.previous}
								aria-controls="device-previews"
							>
								<FiArrowLeft aria-hidden="true" />
							</button>
							<button
								type="button"
								onClick={() => scrollGallery(1)}
								aria-label={t.next}
								aria-controls="device-previews"
							>
								<FiArrowRight aria-hidden="true" />
							</button>
						</div>
					</div>
					<section
						className={`screenshots screenshots-${device}`}
						ref={galleryRef}
						key={`${device}-${language}`}
						id="device-previews"
						aria-label={`${devices.find((item) => item.id === device)?.label} ${t.devices}`}
					>
						{shots.map((shot, index) => (
							<figure key={`${device}-${language}-${shot.file}`}>
								<a
									className="screenshot-link"
									href={`${directory}${shot.file}`}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={`${shot.text[0]} — ${t.preview}`}
								>
									<img
										src={`${directory}${shot.file}`}
										alt={`PlayStats ${shot.text[0]} — ${shot.text[1]}`}
										width={dimensions[0]}
										height={dimensions[1]}
										loading={index < 2 ? "eager" : "lazy"}
									/>
								</a>
								<figcaption>
									<span className="number">0{index + 1}</span>
									<div>
										<h3>{shot.text[0]}</h3>
										<p>{shot.text[1]}</p>
									</div>
								</figcaption>
							</figure>
						))}
					</section>
				</section>
			</main>
			<footer className="footer wrap">
				<a className="footer-brand" href="/">
					PlayStats
				</a>
				<div className="footer-row">
					<p>{t.footer}</p>
					<a
						className="icon-control"
						href={site.telegramUrl}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={t.telegramLink}
						title={t.telegram}
					>
						<RiTelegram2Fill aria-hidden="true" />
					</a>
				</div>
			</footer>
		</>
	);
}
