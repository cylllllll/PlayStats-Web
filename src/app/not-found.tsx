"use client";
import Link from "next/link";
import { useLanguage } from "./language";
export default function NotFound() {
	const { language } = useLanguage();
	const copy = {
		cn: {
			title: "页面不在这里。",
			intro: "回到 PlayStats，继续探索。",
			back: "返回首页 →",
		},
		tw: {
			title: "頁面不在這裡。",
			intro: "回到 PlayStats，繼續探索。",
			back: "返回首頁 →",
		},
		en: {
			title: "Page not found.",
			intro: "Head back to PlayStats and keep exploring.",
			back: "Back to home →",
		},
	}[language];
	return (
		<main className="hero wrap">
			<p className="eyebrow">404</p>
			<h1>{copy.title}</h1>
			<p className="intro">{copy.intro}</p>
			<Link className="nav-link" href="/">
				{copy.back}
			</Link>
		</main>
	);
}
