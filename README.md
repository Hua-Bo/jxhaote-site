# 嘉兴浩天化工外贸独立站

**域名**：www.jxhaote.cn  
**定位**：面向海外采购商的 B2B 展示型独立站（非电商），核心目标为获取询盘 + 引导 WhatsApp 沟通。

## 技术栈

- Vue 3 + Vite 6 + TypeScript + SCSS
- Pinia（语言状态）
- 三语支持：英文（主推）、越南语（必配）、中文（可切换）
- 部署：GitHub Pages / Cloudflare Workers

## 快速开始

```bash
cp .env.example .env.development
npm install
npm run dev
```

访问 http://localhost:3000

## 环境变量

| 变量 | 说明 |
|------|------|
| `VITE_BASE` | 站点根路径 |
| `VITE_APP_TITLE` | 站点标题 |
| `VITE_SITE_URL` | 正式域名 `https://www.jxhaote.cn` |
| `VITE_WHATSAPP` | WhatsApp 号码 `8618767352698` |
| `VITE_CONTACT_EMAIL` | 联系邮箱 |

## 页面结构

| 路由 | 页面 |
|------|------|
| `/` | 首页：价值主张 + 产品导航 + 信任条 + 实力证明 |
| `/about` | 公司服务优势 |
| `/products` | 产品分类 |
| `/products/:category` | 分类产品列表 |
| `/products/:category/:slug` | 产品详情（规格/用途/HS/MSDS/COA/MOQ/包装） |
| `/resources` | MSDS/COA 资料库 |
| `/contact` | WhatsApp + 邮箱询盘表单 |

## 产品分类

1. **乙醇胺类** — MEA (HS 292211)、DEA (HS 292212)
2. **PEG 系列** — PEG-4000 / PEG-6000 (HS 34042000)
3. **聚醚单体** — HPEG / TPEG / EPEG (PCE 减水剂方向)
4. **表活类** — SLES、AEO-2/5/7/9

产品数据在 `src/data/products.ts`，多语言文案在 `src/data/i18n/`。

## 待办事项

- [ ] 上传 MSDS/COA PDF 到 `public/downloads/`
- [ ] 替换实力证明区块的真实图片（提单、装箱照、产地证）
- [ ] 配置域名 www.jxhaote.cn 指向 Cloudflare
- [ ] 文案英文版 AI 润色后替换 `src/data/i18n/en.ts`
- [ ] 初始化新 Git 仓库并推送

## 部署

### Cloudflare（推荐，绑定自定义域）

```bash
npx wrangler login
npm run cf:deploy
```

### GitHub Pages

推送到 `main` 后，在 Settings → Pages 选择 `gh-pages` 分支。

## 目录结构

```
src/
├── components/layout/    # 页头、页脚、WhatsApp 浮窗
├── components/products/  # 产品卡片
├── data/
│   ├── products.ts       # 产品数据
│   ├── categories.ts     # 分类数据
│   └── i18n/             # 英/越/中文案
├── stores/locale.ts      # 语言切换
├── views/                # 页面
└── config/site.ts        # 站点常量
```

## 重新初始化 Git

```bash
git init
git add .
git commit -m "init: 嘉兴浩天化工外贸独立站"
git remote add origin <你的仓库地址>
git push -u origin main
```
