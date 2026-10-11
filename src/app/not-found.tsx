"use client";
import Link from "next/link";
import { useLanguage } from "./language";
export default function NotFound() {
	const { language } = useLanguage();
	const chinese = language === "cn";
	return (
		<main className="hero wrap">
			<p className="eyebrow">404</p>
			<h1>{chinese ? "页面不在这里。" : "Page not found."}</h1>
			<p className="intro">
				{chinese
					? "回到 PlayStats，继续探索。"
					: "Head back to PlayStats and keep exploring."}
			</p>
			<Link className="nav-link" href="/">
				{chinese ? "返回首页 →" : "Back to home →"}
			</Link>
		</main>
	);
}
