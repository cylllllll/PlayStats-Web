import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/config";
import "./globals.css";
import { LanguageProvider } from "./language";

const smileySans = localFont({
	src: "../../public/fonts/SmileySans-Oblique.woff2",
	variable: "--font-smiley-sans",
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL(site.url),
	title: {
		default: site.titles.cn,
		template: "%s — PlayStats",
	},
	description: site.descriptions.cn,
	applicationName: site.name,
	category: "technology",
	keywords: [
		"PlayStats",
		"PlayStation",
		"PSN",
		"游戏库",
		"游玩统计",
		"游玩时长",
		"奖杯日历",
		"PSN 消费",
		"iPhone",
		"iPad",
	],
	alternates: { canonical: "/" },
	manifest: "/manifest.json",
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	icons: {
		icon: [
			{ url: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
			{
				url: "/favicon-32.png",
				type: "image/png",
				sizes: "32x32",
				media: "(prefers-color-scheme: light)",
			},
			{
				url: "/favicon-dark-32.png",
				type: "image/png",
				sizes: "32x32",
				media: "(prefers-color-scheme: dark)",
			},
		],
		shortcut: "/favicon.ico",
		apple: {
			url: "/apple-touch-icon.png",
			sizes: "180x180",
			type: "image/png",
		},
	},
	openGraph: {
		type: "website",
		locale: "zh_CN",
		alternateLocale: ["en_US"],
		url: site.url,
		siteName: site.name,
		title: site.titles.cn,
		description: site.descriptions.cn,
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "PlayStats — 游戏库、游玩时长、奖杯与消费",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: site.titles.cn,
		description: site.descriptions.cn,
		images: [
			{ url: "/og-image.png", alt: "PlayStats — 游戏库、游玩时长、奖杯与消费" },
		],
	},
};

const structuredData = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "WebSite",
			"@id": `${site.url}/#website`,
			url: `${site.url}/`,
			name: site.name,
			description: site.descriptions.cn,
			inLanguage: ["zh-CN", "en"],
		},
		{
			"@type": "MobileApplication",
			"@id": `${site.url}/#app`,
			name: site.name,
			url: `${site.url}/`,
			description: site.descriptions.cn,
			operatingSystem: "iOS, iPadOS",
			applicationCategory: "UtilitiesApplication",
			image: `${site.url}/assets/brand/logo.svg`,
			screenshot: [
				"01-insights.jpg",
				"02-trophies.jpg",
				"03-live-activity.jpg",
				"04-share.jpg",
			].map((file) => `${site.url}/assets/screenshots/${file}`),
			downloadUrl: site.appStoreUrl,
			installUrl: site.appStoreUrl,
			sameAs: [site.appStoreUrl, site.telegramUrl],
			inLanguage: ["zh-CN", "en"],
		},
	],
};
export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	themeColor: "#101113",
};
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="zh-CN" suppressHydrationWarning>
			<head>
				<script
					id="structured-data"
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
					}}
				/>
				<script
					dangerouslySetInnerHTML={{
						__html: `(function(){var t='system';try{t=localStorage.getItem('playstats-theme')||'system'}catch(e){}document.documentElement.dataset.theme=t==='light'||t==='dark'?t:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'})();`,
					}}
				/>
			</head>
			<body className={smileySans.variable}>
				<LanguageProvider>{children}</LanguageProvider>
			</body>
		</html>
	);
}
