# Cloudflare Workers 部署

此项目使用 Next.js 静态导出，构建产物为 `out/`，不是 `.next/`。仓库中的 `wrangler.jsonc` 将 `out/` 作为 Workers 静态资源发布，无需 OpenNext 或服务器端 Worker 代码；不存在的路径使用导出的 `404.html` 返回 404。

Cloudflare Workers Builds 设置：

- 构建命令：`pnpm run build`
- 部署命令：`pnpm run deploy`
- Worker 名称：`playstats`（与 `wrangler.jsonc` 一致）
- 如界面要求填写构建输出目录，使用 `out`。

Wrangler 已作为开发依赖锁定，`pnpm-workspace.yaml` 的 `allowBuilds` 允许 `esbuild`、`workerd` 和 `sharp` 的安装脚本，避免非交互 CI 中出现 `ERR_PNPM_IGNORED_BUILDS`。不要在部署阶段自动迁移或安装依赖。

本地构建与预览：

```sh
pnpm install --frozen-lockfile
pnpm run build
pnpm run preview
```

已配置 Cloudflare 认证后，使用 `pnpm run deploy` 发布。仅验证配置时使用 `pnpm exec wrangler deploy --dry-run`。

Workers 的默认域名与 Pages 的 `playstats.pages.dev` 不同。若正式站点地址发生变化，构建前设置 `NEXT_PUBLIC_SITE_URL` 为实际域名，确保 canonical、robots.txt、sitemap.xml 与分享信息使用正确地址。

# VPS 部署准备

服务器地址和 SSH 账号仅在部署时通过本地配置提供，不写入仓库。部署前确认域名、现有 Web 服务及站点目录。

此项目使用 Next.js 静态导出，Nginx 直接服务 `out/`。不需要 PM2、`next start` 或服务器端 Node.js 进程。

## 本地构建

```sh
pnpm install --frozen-lockfile
pnpm exec next build --webpack
COPYFILE_DISABLE=1 tar -czf /tmp/playstats-web.tar.gz -C out .
shasum -a 256 /tmp/playstats-web.tar.gz
```

使用已经验证可用的 Webpack 构建，规避本地沙箱中的 Turbopack 端口限制。下载链接默认已写入 `src/config.ts`，也可在构建前设置 `.env.local`。

## 服务器准备

1. 确认 SSH 登录账号和密钥、Nginx 是否已安装、80/443 端口上现有服务，以及域名的 DNS 记录。
2. 将压缩包上传到服务器临时目录，校验 SHA-256，再解压至新的版本目录，例如 `/var/www/playstats/releases/<commit>/`。
3. 将 `/var/www/playstats/current` 指向新版本目录。保留上一版目录及链接目标，便于回滚。
4. 根据服务器实际环境，将 `nginx.conf.example` 设置为独立站点配置，替换域名和站点路径；不要覆盖已有站点或默认配置。
5. 执行 `nginx -t`，通过后 reload Nginx。
6. 域名解析生效后，使用服务器现有的证书管理方式配置 HTTPS，并将 HTTP 重定向到 HTTPS。

## 上线验证

- 首页、App 图标和截图返回 200，不存在的路径返回 404。
- App Store / TestFlight 指向正确地址。
- 中英文、三种设备预览、截图横向滚动和亮暗外观正常。
- 验证域名的 HTTPS 证书和 HTTP 跳转。

## 回滚

将 `current` 链接恢复至上一版目录。保留或恢复与该版本匹配的 Nginx 配置；配置有变更时先 `nginx -t`，再 reload。不要删除正在使用或用于回滚的版本目录。

## SEO 与分享预览

默认正式地址为 `https://playstats.pages.dev`。更换域名时，在构建前设置 `NEXT_PUBLIC_SITE_URL`（参考 `.env.example`）；canonical、robots.txt、sitemap.xml、Open Graph、Twitter Card 和结构化数据会使用同一个地址。

- 标题与描述在静态 HTML 中输出，语言切换后更新浏览器标题和描述。
- 分享图片为 `public/og-image-v2.jpg`（轻量 JPG，旧 PNG 地址仍保留），尺寸 1200 × 630；分享卡片默认使用中文描述。
- Logo 与 favicon 使用透明矢量图，SVG favicon 自动适配浏览器的亮暗配色，并提供透明 PNG、ICO 和 Apple Touch Icon。
- JSON-LD 包含 WebSite 与 MobileApplication 的真实应用信息；未添加未核实的评分或价格。

发布后可向搜索引擎提交 `https://playstats.pages.dev/sitemap.xml`。社交平台的旧预览可能需要刷新其缓存。

Telegram 使用静态 HTML 内的 Open Graph 信息，不依赖 JavaScript。部署完成后可发送 `https://playstats.pages.dev/?preview=2` 测试新链接的预览；已发送的链接可能仍使用 Telegram 的缓存。若新链接也没有预览，需检查正式站点与图片是否能被公开抓取，以及 Cloudflare 的访问或机器人拦截设置。
