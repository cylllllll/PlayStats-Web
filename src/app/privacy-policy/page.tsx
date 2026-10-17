import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { site } from "@/config";

export const metadata: Metadata = {
	alternates: { canonical: site.privacyPolicyUrl },
	openGraph: {
		type: "website",
		url: site.privacyPolicyUrl,
		siteName: site.name,
		locale: "en_US",
		title: site.privacy.titles.en,
		description: site.privacy.descriptions.en,
		images: [{ url: site.shareImageUrl, width: 1200, height: 630 }],
	},
	twitter: {
		card: "summary_large_image",
		title: site.privacy.titles.en,
		description: site.privacy.descriptions.en,
		images: [site.shareImageUrl],
	},
};

const headings: Record<string, "h2" | "h3" | "h4"> = {
	"Interpretation and Definitions": "h2",
	Interpretation: "h3",
	Definitions: "h3",
	"Collecting and Using Your Personal Information": "h2",
	"Types of Data Collected": "h3",
	"Personal Data": "h4",
	"Usage Data": "h4",
	"Tracking Technologies and Cookies": "h3",
	"Use of Your Personal Data": "h3",
	"Retention of Your Personal Data": "h3",
	"Account Information": "h4",
	"Transfer of Your Personal Data": "h3",
	"Delete Your Personal Data": "h3",
	"Disclosure of Your Personal Data": "h3",
	"Business Transactions": "h4",
	"Law Enforcement": "h4",
	"Other Legal Requirements": "h4",
	"Security of Your Personal Data": "h3",
	"Children's and Minors' Privacy": "h2",
	"Links to Other Websites": "h2",
	"Changes to this Privacy Policy": "h2",
	"Contact Us": "h2",
};

export default function PrivacyPolicyPage() {
	const lines = readFileSync(
		path.join(process.cwd(), "src/content/privacy-policy.txt"),
		"utf8",
	)
		.split(/\r?\n/)
		.map((line) => line.trim())
		.filter(Boolean);

	return (
		<LegalDocument lang="en">
			{lines.map((line, index) => {
				const key = `${index}-${line.slice(0, 40)}`;
				if (index === 0) return <h1 key={key}>{line}</h1>;
				if (index === 1)
					return (
						<p className="legal-subtitle" key={key}>
							{line}
						</p>
					);
				if (line.startsWith("Last updated:")) {
					return (
						<p className="legal-updated" key={key}>
							<time dateTime="2026-09-12">{line}</time>
						</p>
					);
				}
				const Heading = headings[line];
				if (Heading) return <Heading key={key}>{line}</Heading>;
				if (line === "By mail: ycyapps@gmail.com") {
					return (
						<p key={key}>
							By mail: <a href="mailto:ycyapps@gmail.com">ycyapps@gmail.com</a>
						</p>
					);
				}
				return <p key={key}>{line}</p>;
			})}
		</LegalDocument>
	);
}
