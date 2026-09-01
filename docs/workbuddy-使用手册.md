# WorkBuddy 使用手册 — 嘉兴浩天网站

> **给谁用：** 用 WorkBuddy 维护网站、不会写代码的同事。  
> **项目文件夹：** `C:\Users\<你的用户名>\Projects\jxhaote-site`  
> **本地预览：** http://localhost:3000  
> **正式网站：** https://www.jxhaote.cn  

---

## 一图看懂（收藏这一张）

```
┌─────────────────────────────────────────────────────────────────┐
│  每次打开电脑                                                    │
│    → WorkBuddy「代码开发」→ 说：pull 并 dev → 浏览器看 localhost   │
├─────────────────────────────────────────────────────────────────┤
│  要改内容                                                        │
│    → 中文告诉 WorkBuddy 改什么 → 它改文件 → 浏览器自动/手动刷新看   │
├─────────────────────────────────────────────────────────────────┤
│  改完要上线                                                      │
│    → 对 WorkBuddy 说：push 上线 → 等 5 分钟 → 打开 www.jxhaote.cn │
├─────────────────────────────────────────────────────────────────┤
│  别人改过代码 / 换电脑后                                         │
│    → 先 git pull 拉最新，再 dev 预览                              │
└─────────────────────────────────────────────────────────────────┘
```

| 我想做什么 | 对 WorkBuddy 说什么（复制即用） |
|------------|--------------------------------|
| **每次开工、运行网站** | 「在 jxhaote-site 里 git pull，然后 npm run dev，用浏览器打开 localhost:3000。」 |
| **只看效果、不改内容** | 同上 |
| **改文案 / 产品** | 「请把首页中文标题改成：……，英越文一起改，改完 dev 跑着，打开浏览器让我预览。」 |
| **继续改** | 「再把关于我们页面的第一段改成：……」（同一对话里继续说） |
| **更新到正式站** | 「localhost 我看过了，请 git add、commit 写：更新了某某，push 到 main。」 |
| **拉别人最新修改** | 「在 jxhaote-site 执行 git pull origin main。」 |

---

## 第一次使用（只做一次）

电脑里还没有项目、没有 Git/Node 时：

1. 打开 WorkBuddy → **新建任务** → 选 **「代码开发」**
2. **授权**访问 `C:\Users\你的用户名` 文件夹
3. 打开文件 **`docs/ai-setup-prompt.md`**（管理员微信发你，或 GitHub 下载）
4. **Ctrl+A 全选 → 复制 → 粘贴给 WorkBuddy → 发送**
5. 按提示：允许装软件、浏览器登录 GitHub
6. 完成后浏览器打开 http://localhost:3000

> 详细任务书：`docs/ai-setup-prompt.md`

---

## 1. 每次打开怎么运行代码

### 你要做什么

1. 打开 **WorkBuddy**
2. **新建任务**（或打开昨天的任务）→ 模式选 **「代码开发」**
3. 在对话框粘贴下面这句话，回车：

```text
请在 C:\Users\我的用户名\Projects\jxhaote-site 执行：先 git pull origin main，再 npm run dev。保持 dev 运行，用浏览器打开 http://localhost:3000，并告诉我各页面链接。
```

（把 `我的用户名` 换成你电脑登录名；不知道就问 WorkBuddy：「我的 Projects 路径是什么？」）

### WorkBuddy 会做什么

- 进入项目文件夹
- **拉取 GitHub 上最新代码**（`git pull`）
- **启动开发服务器**（`npm run dev`）
- 终端里出现类似：`Local: http://localhost:3000/`
- 帮你用浏览器打开网站

### 你要注意

- **dev 运行期间不要关 WorkBuddy 这个任务**（关了网站就停了）
- 终端窗口要留着；想干别的可以再开一个新任务
- 若提示「找不到 node/git」→ 重启电脑后再试，或重新做「第一次使用」

### 关电脑 / 下班前

- 在 WorkBuddy 里停止任务，或终端按 **Ctrl+C** 停止 dev  
- **不用 push** 也可以关电脑；没 push 的修改只在本地，正式站不会变

---

## 2. 怎么预览

### 本地预览（改完后在自己电脑上看）

| 项目 | 说明 |
|------|------|
| **地址** | http://localhost:3000 |
| **怎么打开** | WorkBuddy 跑完 `npm run dev` 后会自动打开；没打开就自己在 Edge 地址栏输入 |
| **什么时候用** | 每次改内容后，**上线前必看** |

**常用页面：**

| 页面 | 地址 |
|------|------|
| 首页 | http://localhost:3000/ |
| 关于我们 | http://localhost:3000/about |
| 产品中心 | http://localhost:3000/products |
| 联系我们 | http://localhost:3000/contact |
| 资料库 | http://localhost:3000/resources |

### 预览时的小技巧

- WorkBuddy 改完文件并保存后，浏览器**多数会自动刷新**；没变就按 **Ctrl + F5** 强制刷新
- 一次多改几处：改完都在 localhost 上逐页点一点
- **localhost 只有你自己电脑能打开**，别人看不到

### 正式站预览（上线后看真网站）

| 项目 | 说明 |
|------|------|
| **地址** | https://www.jxhaote.cn |
| **什么时候用** | **push 上线之后** 等 2～5 分钟再看 |
| **怎么刷新** | **Ctrl + F5** 强制刷新，避免看到旧页面 |

部署有没有成功：https://github.com/Hua-Bo/jxhaote-site/actions（绿色 ✓ 表示成功）

---

## 3. 怎么修改

### 原则

- **你不用打开代码文件**，不用装 Cursor / VS Code
- **用中文告诉 WorkBuddy 要改什么**，由它改文件并保存
- 改完必须 **本地预览（localhost）** 确认，再决定是否上线

### 方式 A：直接说话（最快）

在 WorkBuddy「代码开发」任务里输入，例如：

```text
请先 git pull。然后把首页中文主标题改成：面向全球买家的优质化工产品。英文和越南文对应文件一起改。改完后确保 npm run dev 在运行，打开浏览器让我预览首页。
```

```text
请修改 products.ts 里 MEA 产品的 MOQ：中文 2 吨，英文 2 MT，越南文 2 tấn。改完告诉我去哪个链接预览。
```

```text
请把联系邮箱改成 info@jxhaote.cn（改 .env.development 或 site.ts）。改完打开联系页面让我看。
```

### 方式 B：用任务书（改的内容较多时）

1. 打开项目里的 **`docs/workbuddy-daily.md`**
2. 滚到最下面 **「我要改的内容」**，用中文写好
3. **Ctrl+A 全选整个文件** → 复制 → 粘贴给 WorkBuddy → 发送

### 常改内容对照表

| 想改什么 | 怎么说 / 改哪个文件 |
|----------|---------------------|
| 中文页面文字 | 「改 zh.ts 里……」或描述页面位置 |
| 英文 / 越南文 | 记得说 **「英越文一起改」** |
| 产品名称、规格、HS、MOQ | 「改 products.ts 里 MEA/DEA/……」 |
| MSDS、COA 文件 | 把 PDF 给 WorkBuddy 路径，说「放到 downloads 并关联到产品」 |
| WhatsApp、邮箱 | 「改联系邮箱 / WhatsApp 为……」 |

### 改完怎么确认

1. 浏览器打开 localhost 对应页面  
2. 不对就**在同一对话**继续说：「再把刚才那句改成……」  
3. **满意了**再进行下一节「更新上线」

---

## 4. 怎么更新

「更新」分两种：**拉取别人的最新代码**，和 **把你改的推上线**。

### 4.1 拉取最新代码（git pull）

**什么时候做：**

- 每天**第一次**开工（运行 dev 之前）
- 管理员说「我网上改过了，你 pull 一下」
- push 之前（避免和别人冲突）

**对 WorkBuddy 说：**

```text
在 jxhaote-site 里执行 git pull origin main，告诉我有没有新内容。
```

有冲突或报错 → 把红色报错复制给 WorkBuddy 或管理员。

---

### 4.2 推送到 GitHub并自动部署（git push）

**什么时候做：**

- localhost **预览确认无误**之后
- 需要让 **www.jxhaote.cn 正式站更新**时

**对 WorkBuddy 说：**

```text
localhost 上的修改我确认没问题了。请在 jxhaote-site 里执行：git status，然后 git add .，git commit -m "这里写清楚改了什么"，git push origin main。
```

commit 说明示例：

- `更新首页中文标语`
- `修改 MEA 产品 MOQ`
- `上传 msds-mea.pdf`

**push 之后：**

1. **不用**在自己电脑 build 或点部署  
2. GitHub 会自动构建并发布（约 **2～5 分钟**）  
3. 打开 https://www.jxhaote.cn ，按 **Ctrl+F5**  
4. 看进度：https://github.com/Hua-Bo/jxhaote-site/actions  

---

### 4.3 完整「改 → 预览 → 上线」流程（推荐顺序）

```text
第 1 步  对 WorkBuddy：git pull，npm run dev，打开 localhost
第 2 步  对 WorkBuddy：用中文说清要改什么（它改文件）
第 3 步  你自己：浏览器看 localhost，不对就继续让它改
第 4 步  对 WorkBuddy：push 上线（附 commit 说明）
第 5 步  你自己：等 5 分钟，打开 www.jxhaote.cn 按 Ctrl+F5
```

---

## 常见问题

### WorkBuddy 只说话、不执行命令？

- 确认模式是 **「代码开发」**
- 确认已 **授权文件夹**
- 补一句：**「请用 PowerShell 实际执行，不要只给步骤。」**

### localhost 打不开？

- 确认 WorkBuddy 里 `npm run dev` 还在运行（终端没关）
- 地址栏输入：http://localhost:3000
- 让 WorkBuddy：「检查 dev 是否在跑，没跑就重新 npm run dev」

### push 失败？

- 是否登录 GitHub：让 WorkBuddy 执行 `gh auth status`
- 是否被加入仓库协作者（找管理员）
- 先 `git pull` 再 push

### 改了 localhost 有，正式站没有？

- 是否执行了 **push**？
- push 后是否等了 **5 分钟**？
- Actions 是否绿色：https://github.com/Hua-Bo/jxhaote-site/actions

---

## 文档索引

| 文件 | 用途 |
|------|------|
| **workbuddy-使用手册.md**（本文） | 日常怎么看、怎么改、怎么更新 |
| **ai-setup-prompt.md** | 第一次：整份复制给 WorkBuddy 装环境 |
| **workbuddy-daily.md** | 改内容时：写好需求，整份复制给 WorkBuddy |
| **beginner-guide.md** | 想了解原理时阅读（可选） |

---

## 微信收藏版（最短）

**每天开工：**  
`pull + dev + 打开 localhost`

**改内容：**  
中文说改什么 → 看 localhost → 满意再说 push

**上线：**  
`push 到 main` → 等 5 分钟 → 打开 www.jxhaote.cn 按 Ctrl+F5
