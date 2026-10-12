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
import { site } from "@/config";
import IconSelect from "./icon-select";
import { useLanguage } from "./language";
import ThemeSwitch from "./theme-switch";

const copy = {
	cn: {
		home: "PlayStats 首页",
		explore: "探索 App",
		eyebrow: "为 PlayStation 玩家打造",
		heading: "每一场游戏，",
		accent: "都有你的记录。",
		intro: "游戏库、游玩时长、奖杯与消费。",
		introEnd: "在 PlayStats，回顾你的游戏历程。",
		download: "下载 iPhone 与 iPad App",
		beta: "抢先体验新功能",
		join: "加入 TestFlight",
		showcase: "你的游戏生活，一览无余。",
		more: "在 App 中探索更多",
		devices: "预览设备",
		footer: "记录热爱，继续下一场。",
		disclaimer: "PlayStats 是独立的第三方应用，",
		disclaimerEnd: "与 Sony Interactive Entertainment Inc. 无官方关联。",
		preview: "查看完整截图（新标签页）",
		insights: ["游玩统计", "游玩时长与 PSN 消费，一目了然。"],
		trophies: ["奖杯日历", "按日期回顾奖杯记录，收藏每一次达成。"],
		live: ["实时活动", "在锁屏和灵动岛，查看正在游玩的游戏。"],
		share: ["分享卡片", "把游玩时长与奖杯进度，变成值得分享的卡片。"],
		details: ["游戏详情", "查看单款游戏的游玩时长与奖杯进度。"],
	},
	en: {
		home: "PlayStats home",
		explore: "Explore the app",
		eyebrow: "BUILT FOR PLAYSTATION PLAYERS",
		heading: "Every game.",
		accent: "Your story, in stats.",
		intro: "Your library, playtime, trophies and spending.",
		introEnd: "Rediscover your gaming journey with PlayStats.",
		download: "Download on the",
		beta: "Test it on",
		join: "TestFlight",
		showcase: "Your gaming life, at a glance.",
		more: "Discover more in the app",
		devices: "Preview device",
		footer: "Keep the memories. Play the next game.",
		disclaimer: "PlayStats is an independent third-party app.",
		disclaimerEnd: "Not affiliated with Sony Interactive Entertainment Inc.",
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
type Device = "iphone" | "ipad" | "duo";
const devices: { id: Device; label: string }[] = [
	{ id: "iphone", label: "iPhone" },
	{ id: "ipad", label: "iPad" },
	{ id: "duo", label: "Duo" },
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
	const directory =
		device === "iphone"
			? `/assets/screenshots/${language === "en" ? "en/" : ""}`
			: `/assets/screenshots/${device}/${language}/`;
	const dimensions =
		device === "iphone"
			? [1284, 2778]
			: device === "ipad"
				? [2048, 2732]
				: [2007, 2853];
	return (
		<>
			<header className="header wrap">
				<a className="wordmark" href="/" aria-label={t.home}>
					<img
						className="app-icon"
						src="/assets/app-icon.jpg"
						alt=""
						width={40}
						height={40}
					/>
					PlayStats
				</a>
				<nav
					className="header-actions"
					aria-label={
						language === "cn" ? "导航与语言" : "Navigation and language"
					}
				>
					<a className="nav-link" href="#screenshots">
						{t.explore} <span aria-hidden="true">↗</span>
					</a>
					<IconSelect
						label={language === "cn" ? "语言" : "Language"}
						Icon={FiGlobe}
						value={language}
						options={[
							{ key: "cn", label: "中文", lang: "zh-CN" },
							{ key: "en", label: "English", lang: "en" },
						]}
						onChange={setLanguage}
					/>
					<ThemeSwitch />
				</nav>
			</header>
			<main className="wrap">
				<section className="hero" aria-labelledby="hero-title">
					<p className="eyebrow">
						<span />
						{t.eyebrow}
					</p>
					<h1 id="hero-title">
						{t.heading}
						<br />
						<em>{t.accent}</em>
					</h1>
					<p className="intro">
						{t.intro} <br className="mobile-break" />
						{t.introEnd}
					</p>
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
							<span>
								{language === "cn" ? "左右滑动查看更多" : "Swipe to explore"}
							</span>
							<button
								type="button"
								onClick={() => scrollGallery(-1)}
								aria-label={
									language === "cn" ? "上一张截图" : "Previous screenshot"
								}
								aria-controls="device-previews"
							>
								<FiArrowLeft aria-hidden="true" />
							</button>
							<button
								type="button"
								onClick={() => scrollGallery(1)}
								aria-label={
									language === "cn" ? "下一张截图" : "Next screenshot"
								}
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
				<div>
					<a className="footer-brand" href="/">
						PlayStats
					</a>
					<p>{t.footer}</p>
				</div>
				<div className="footer-right">
					<p className="disclaimer">
						{t.disclaimer}
						<br />
						{t.disclaimerEnd}
					</p>
					<a
						className="icon-control"
						href={site.telegramUrl}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={
							language === "cn"
								? "Telegram 社群（新标签页）"
								: "Telegram community (opens in a new tab)"
						}
						title={language === "cn" ? "Telegram 社群" : "Telegram community"}
					>
						<RiTelegram2Fill aria-hidden="true" />
					</a>
				</div>
			</footer>
		</>
	);
}
