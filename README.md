<div align="center">
  <img src="public/assets/brand/logo.svg" alt="PlayStats" width="96" />
  <h1>PlayStats</h1>
  <p><strong>每一场游戏，都有你的记录。</strong></p>
  <p>为 PlayStation 玩家打造的数据伴侣，回顾、整理和分享你的游戏历程。</p>
  <p>
    <a href="https://apps.apple.com/us/app/playstats/id6799940098">App Store 下载</a> ·
    <a href="https://testflight.apple.com/join/JAkUz1B6">加入 TestFlight</a>
  </p>
  <p>iPhone · iPad · 中文 / English</p>
</div>

## 让你的游戏历程清晰可见

- **游玩统计**：浏览游戏库、最近游玩与累计时长，了解自己的游戏足迹。
- **PSN 消费**：查看消费记录与年度趋势，回顾每一份游戏投入。
- **奖杯日历**：按日期查看奖杯记录，整理白金收藏与解锁进度。
- **实时活动与小组件**：在锁定屏幕、灵动岛和主屏幕查看游戏信息。
- **分享卡片**：将游玩时长和奖杯进度生成图片，分享值得纪念的时刻。

## App 预览

<p align="center">
  <img src="public/assets/screenshots/01-insights.jpg" alt="PlayStats 游玩统计" width="23%" />
  <img src="public/assets/screenshots/02-trophies.jpg" alt="PlayStats 奖杯日历" width="23%" />
  <img src="public/assets/screenshots/03-live-activity.jpg" alt="PlayStats 实时活动" width="23%" />
  <img src="public/assets/screenshots/04-share.jpg" alt="PlayStats 分享卡片" width="23%" />
</p>

## Your gaming story, in stats

PlayStats is an independent companion app for PlayStation players. Bring your library, playtime, trophies and PSN spending together to explore and share your gaming journey.

- **Playtime stats** — Explore your library, recently played games and total hours.
- **PSN spending** — Review your transactions and annual spending trends.
- **Trophy calendar** — Look back at unlocks by date and explore your platinum collection.
- **Live Activities & widgets** — Keep your gaming information on the Lock Screen, Dynamic Island and Home Screen.
- **Share cards** — Turn playtime and trophy progress into images to save and share.

[Download on the App Store](https://apps.apple.com/us/app/playstats/id6799940098) · [Join TestFlight](https://testflight.apple.com/join/JAkUz1B6)

---

PlayStats 是独立的第三方应用，与 Sony Interactive Entertainment Inc. 无官方关联。

PlayStats is an independent third-party app and is not affiliated with Sony Interactive Entertainment Inc.

## SEO 与分享预览

默认正式地址为 `https://playstats.pages.dev`。更换域名时，在构建前设置 `NEXT_PUBLIC_SITE_URL`（参考 `.env.example`）；canonical、robots.txt、sitemap.xml、Open Graph、Twitter Card 和结构化数据会使用同一个地址。

- 标题与描述在静态 HTML 中输出，语言切换后更新浏览器标题和描述。
- 分享图片为 `public/og-image-v2.jpg`（轻量 JPG，旧 PNG 地址仍保留），尺寸 1200 × 630；分享卡片默认使用中文描述。
- Logo 与 favicon 使用透明矢量图，SVG favicon 自动适配浏览器的亮暗配色，并提供透明 PNG、ICO 和 Apple Touch Icon。
- JSON-LD 包含 WebSite 与 MobileApplication 的真实应用信息；未添加未核实的评分或价格。

发布后可向搜索引擎提交 `https://playstats.pages.dev/sitemap.xml`。社交平台的旧预览可能需要刷新其缓存。

Telegram 使用静态 HTML 内的 Open Graph 信息，不依赖 JavaScript。部署完成后可发送 `https://playstats.pages.dev/?preview=2` 测试新链接的预览；已发送的链接可能仍使用 Telegram 的缓存。若新链接也没有预览，需检查正式站点与图片是否能被公开抓取，以及 Cloudflare 的访问或机器人拦截设置。
