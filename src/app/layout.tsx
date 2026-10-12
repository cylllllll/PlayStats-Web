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
	applicationName: site.name,
	icons: {
		icon: { url: "/assets/app-icon.jpg", type: "image/jpeg" },
		apple: "/assets/app-icon.jpg",
	},
	openGraph: {
		type: "website",
		locale: "zh_CN",
		title: site.name,
		description: site.description,
	},
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
