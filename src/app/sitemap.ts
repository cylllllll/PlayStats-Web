import type { MetadataRoute } from "next";
import { site } from "@/config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: `${site.url}/`,
			changeFrequency: "monthly",
			priority: 1,
			images: [
				"01-insights.jpg",
				"02-trophies.jpg",
				"03-live-activity.jpg",
				"04-share.jpg",
			].map((file) => `${site.url}/assets/screenshots/${file}`),
		},
		{
			url: `${site.url}${site.privacyPolicyUrl}`,
			lastModified: "2026-09-12",
			changeFrequency: "yearly",
			priority: 0.3,
		},
	];
}
