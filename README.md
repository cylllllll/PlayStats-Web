# PlayStats 网站

简洁的 PlayStats App 展示页：产品介绍、App Store / TestFlight 入口和中英文应用截图，支持 iPhone、iPad、Duo 预览切换。使用 Next.js 静态导出。

## 开发

```sh
pnpm install
pnpm dev
```

## 下载链接

`src/config.ts` 已配置官方 App Store 地址与 TestFlight 邀请链接。需要覆盖时，复制 `.env.example` 为 `.env.local` 并修改地址。环境变量在构建时写入，修改后须重新构建。

## 构建

```sh
pnpm build
```

将 `out/` 目录部署到静态托管服务。截图来自 PlayStats-AppStore-Titles-Yellow 的 iphone、ipad、duo 中英文素材，按原比例转成 JPEG；网站不展示模板中的虚构评分、价格或评论。

首次访问按浏览器语言选择中文或英文；右上角可手动切换并在本机记住选择。品牌图标使用用户提供的图片；TestFlight 图标来自 cylllllll/zilazila 的 public/assets/TestFlight.png，App Store 使用与该项目相同的 FaApple。

外观支持跟随系统、亮色、暗色。手动选择保存在本机；跟随系统时会响应系统外观变化。

VPS 部署准备参见 [deploy/README.md](deploy/README.md)，附独立 Nginx 站点配置示例。
