"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useLanguage } from "@/app/language";
import ThemeSwitch from "@/app/theme-switch";
import BrandMark from "./BrandMark";

export default function LegalDocument({
	children,
	lang,
}: {
	children: ReactNode;
	lang?: string;
}) {
	const { language } = useLanguage();
	const back = {
		cn: "返回首页",
		tw: "返回首頁",
		en: "Back to home",
	}[language];

	return (
		<>
			<header className="header wrap">
				<Link className="wordmark" href="/" aria-label={back}>
					<BrandMark />
					PlayStats
				</Link>
				<ThemeSwitch />
			</header>
			<main className="legal-page wrap">
				<Link className="legal-back" href="/">
					← {back}
				</Link>
				<article className="legal-document" lang={lang}>
					{children}
				</article>
			</main>
		</>
	);
}
