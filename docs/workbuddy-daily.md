# WorkBuddy 任务书：改网站 + 本地预览

> **给她看：** 日常操作（每次怎么运行、预览、修改、更新）请看 **`docs/workbuddy-使用手册.md`**。  
> **本文件：** 在文末写好「我要改的内容」→ **Ctrl+A 全选 → 复制 → 粘贴给 WorkBuddy**。  
> **首次配环境** 请用 `docs/ai-setup-prompt.md`。

---

你好。我用 **WorkBuddy** 改嘉兴浩天化工网站，**不会写代码、不用其他软件**。请你完成：**改文件 → 启动预览 → 告诉我去浏览器哪里看**。  
**本次任务只做「改 + 预览」，不要 push**（除非我在「我要改的内容」里明确写了要上线）。

## 项目信息

| 项目 | 值 |
|------|-----|
| 项目目录 | `C:\Users\<当前用户名>\Projects\jxhaote-site` |
| 本地预览命令 | `npm run dev` |
| 预览地址 | `http://localhost:3000` |
| 分支 | `main` |

## 你必须按顺序完成

### 第 1 步：进入项目并拉最新代码

```powershell
cd "$HOME\Projects\jxhaote-site"
git pull origin main
```

若目录不存在，说明环境未配置好，提示我先用 `docs/ai-setup-prompt.md` 完成首次配置。

### 第 2 步：按「我要改的内容」修改文件

- **你必须直接编辑并保存文件**，不要只告诉我怎么改
- 改文案时：`src/data/i18n/zh.ts`、`en.ts`、`vi.ts` **三个一起改**
- 改产品：`src/data/products.ts`
- 放 PDF：复制到 `public/downloads/` 并更新 `products.ts` 里的链接
- 改完列出：改了哪些文件、各改了什么（一句话）

### 第 3 步：启动本地预览（必做）

先检查 3000 端口是否已有 dev 在跑；若没有或不确定，执行：

```powershell
cd "$HOME\Projects\jxhaote-site"
npm run dev
```

要求：

1. **保持 dev 进程运行**，不要启动后立刻结束任务  
2. 确认终端里出现 `Local: http://localhost:3000/`（占用则改用 3001 并告诉我）  
3. **帮我用浏览器打开预览**（Windows）：

```powershell
Start-Process "http://localhost:3000"
```

4. 用中文告诉我：
   - 预览地址（完整 URL）
   - **我该点哪些页面看效果**（见下表）
   - 保存文件后浏览器一般会**自动刷新**；若没有，让我按 **Ctrl+F5** 强刷

### 网站页面对照（告诉我去点哪里）

| 想看的页面 | 浏览器地址 |
|------------|------------|
| 首页 | http://localhost:3000/ |
| 关于我们 | http://localhost:3000/about |
| 产品列表 | http://localhost:3000/products |
| 联系我们 | http://localhost:3000/contact |
| 资料库 | http://localhost:3000/resources |

改产品详情时，告诉我具体产品链接，例如：`/products/ethanolamines/mea`

### 第 4 步：汇报给我（必做）

请用下面格式回复：

```text
✅ 已修改：（列出文件和改动摘要）
✅ 预览已启动：http://localhost:3000
✅ 请打开浏览器查看：（列出建议打开的页面链接）
💡 若要继续改：在同一任务里直接说还要改什么，预览会热更新
💡 若要上线：对我说「push 上线」
```

### 若预览打不开

自动排查并修复：

- `node -v` 是否 ≥ 22；没有则提示重装环境  
- 是否在项目目录执行了 `npm install`  
- 3000 被占用：换端口 `npx vite --port 3001` 并 `Start-Process` 打开新地址  
- 终端有红色报错：解释原因并尝试修复  

## 我会这样对你说（供你理解）

- 「把首页中文标题改成：……」
- 「产品 MEA 的 MOQ 改成 2 吨」
- 「先 pull，dev 跑起来，我先看看网站长什么样」
- 「刚才改的/about 页面再改一下……」（同一任务继续改，保持 dev 运行）
- 「可以了，push 上线」（仅当我明确说时才 push）

## 仅当我写了「push 上线」时才执行

```powershell
cd "$HOME\Projects\jxhaote-site"
git add .
git commit -m "根据改动拟一句中文说明"
git push origin main
```

push 后提醒我：等 2～5 分钟打开 https://www.jxhaote.cn 按 Ctrl+F5；部署见 https://github.com/Hua-Bo/jxhaote-site/actions

## 安全约束

- 不要 `git push --force`、`git reset --hard`  
- 不要提交 `.env`、`.env.development`  
- 不要 `npm run cf:deploy`  
- 未要求上线时 **不要 push**

---

## 我要改的内容

（用中文写。示例：「把首页中文主标题改成：面向全球买家的优质化工产品，英越文一起改。」）  
（若只想先看看网站、不改内容，写：「今天开工，pull 并 dev，打开浏览器让我预览各页面。」）

---

**请从第 1 步 `git pull` 开始，完成后必须启动预览并用浏览器打开给我查看。**
