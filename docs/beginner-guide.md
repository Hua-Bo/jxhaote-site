# 零基础入门指南 — 嘉兴浩天化工网站

本文档面向**完全没有编程经验**的同事，手把手教你：

1. 在电脑上安装运行环境
2. 把项目跑起来并在浏览器里预览
3. 修改网站上的文字、产品、图片
4. 从 GitHub 拉取最新代码、提交修改并推送上线

> **项目是什么？**  
> 这是嘉兴浩天化工的外贸展示网站（www.jxhaote.cn），用 Vue 3 编写。  
> 代码仓库：https://github.com/Hua-Bo/jxhaote-site

> **你用 WorkBuddy 改代码？** 日常请读：**`docs/workbuddy-使用手册.md`**（每次怎么运行、预览、修改、更新，都写在里面）  
> 喂给 AI 的任务书：  
> - **首次配环境：** `docs/ai-setup-prompt.md`（整份复制给 WorkBuddy）  
> - **改内容 + 预览：** `docs/workbuddy-daily.md`（写好需求后整份复制）  
> 本文档供想了解原理时阅读，不必全部看完。

---

## 目录

- [一、你需要准备什么](#一你需要准备什么)
- [二、安装运行环境（Mac）](#二安装运行环境mac)
- [三、安装运行环境（Windows）](#三安装运行环境windows)
- [四、获取代码并首次运行](#四获取代码并首次运行)
- [五、日常开发：启动与预览](#五日常开发启动与预览)
- [六、怎么改网站内容](#六怎么改网站内容)
- [七、Git 拉取与推送（必学）](#七git-拉取与推送必学)
- [八、常见问题](#八常见问题)
- [九、术语小词典](#九术语小词典)

---

## 一、你需要准备什么

| 项目 | 说明 |
|------|------|
| 电脑 | Mac 或 Windows 均可 |
| 网络 | 能访问 GitHub（首次安装依赖需要） |
| GitHub 账号 | 向管理员申请加入仓库 `Hua-Bo/jxhaote-site` 的协作权限 |
| 改代码工具 | **[WorkBuddy](https://www.workbuddy.cn/)**（用中文描述要改什么，由 AI 改文件） |
| 终端 | 一般由 WorkBuddy 自动执行；手动时用 PowerShell |

**不需要**提前会写代码。用 WorkBuddy 时：**用中文说清要改什么即可**，不必自己打开代码文件。

---

## 二、安装运行环境（Mac）

按顺序完成下面 3 步。

### 2.1 安装 Node.js（运行网站所必需）

Node.js 是运行本项目的「引擎」，本项目要求 **Node.js 22 或更高版本**。

1. 打开 https://nodejs.org/
2. 下载 **LTS（长期支持版）**，版本号需 ≥ 22
3. 双击安装包，一路「继续」完成安装

**验证是否安装成功：**

打开「终端」（应用程序 → 实用工具 → 终端），输入：

```bash
node -v
```

应显示类似 `v22.x.x`。再输入：

```bash
npm -v
```

应显示类似 `10.x.x`（npm 会随 Node 一起安装）。

### 2.2 安装 Git（管理代码版本）

1. 打开 https://git-scm.com/download/mac
2. 按提示安装（或使用 Homebrew：`brew install git`）

**验证：**

```bash
git --version
```

应显示 `git version 2.x.x`。

### 2.3 安装 Cursor 或 VS Code

- Cursor：https://cursor.com/
- VS Code：https://code.visualstudio.com/

安装后打开即可，后面用来编辑网站文件。

### 2.4（可选）安装 GitHub 桌面版

如果不习惯命令行，可以安装 [GitHub Desktop](https://desktop.github.com/)，拉取/推送可以用图形界面完成（下文第七节会同时讲命令行和图形界面两种方式）。

---

## 三、安装运行环境（Windows）

### 3.1 安装 Node.js

1. 打开 https://nodejs.org/
2. 下载 **LTS**，版本 ≥ 22
3. 运行安装程序，**勾选「Add to PATH」**，然后完成安装

打开 **PowerShell**（开始菜单搜索 PowerShell），输入：

```powershell
node -v
npm -v
```

两个命令都应显示版本号。

### 3.2 安装 Git

1. 打开 https://git-scm.com/download/win
2. 安装时保持默认选项即可

验证：

```powershell
git --version
```

### 3.3 安装 Cursor 或 VS Code

同 Mac 部分。

---

## 四、获取代码并首次运行

### 4.1 配置 Git 身份（只需做一次）

打开终端，把下面两行里的名字和邮箱改成你自己的（邮箱建议用 GitHub 注册邮箱）：

```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱@example.com"
```

### 4.2 克隆代码到本地

选一个你放项目的文件夹，例如桌面上的 `Projects`：

**Mac / Linux：**

```bash
cd ~/Desktop
mkdir -p Projects
cd Projects
git clone https://github.com/Hua-Bo/jxhaote-site.git
cd jxhaote-site
```

**Windows（PowerShell）：**

```powershell
cd $HOME\Desktop
mkdir Projects -ErrorAction SilentlyContinue
cd Projects
git clone https://github.com/Hua-Bo/jxhaote-site.git
cd jxhaote-site
```

> 如果提示需要登录 GitHub，按提示在浏览器里完成授权。  
> 私有仓库需要管理员先把你加为 Collaborator。

### 4.3 安装项目依赖

在项目文件夹里执行（**首次必须做，以后只有别人加了新依赖才需要重做**）：

```bash
npm install
```

等待几分钟，出现类似 `added xxx packages` 即表示成功。

### 4.4 配置本地环境变量

```bash
cp .env.example .env.development
```

Mac 和 Windows（Git Bash）都可以用上面这条命令。  
Windows PowerShell 用：

```powershell
Copy-Item .env.example .env.development
```

一般**不用改**里面的内容，除非要改 WhatsApp 号码或邮箱（见第六节）。

### 4.5 启动网站

```bash
npm run dev
```

看到类似下面的输出就说明成功了：

```
  VITE v6.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.x.x:3000/
```

用浏览器打开 **http://localhost:3000** ，就能看到网站。

**停止运行：** 在终端里按 `Ctrl + C`。

---

## 五、日常开发：启动与预览

以后每次改网站，流程都是：

```bash
# 1. 进入项目文件夹
cd ~/Desktop/Projects/jxhaote-site    # 路径按你实际存放位置改

# 2.（推荐）先拉取别人最新的修改
git pull

# 3. 启动开发服务器
npm run dev

# 4. 浏览器打开 http://localhost:3000
# 5. 用 Cursor 改文件，保存后浏览器会自动刷新
```

### 常用命令速查

| 命令 | 作用 |
|------|------|
| `npm run dev` | 本地开发预览（最常用） |
| `npm run build` | 打包生产版本（检查能否正常构建） |
| `npm run preview` | 本地预览打包后的效果（端口 4173） |

> **注意：** `npm run dev` 运行期间，这个终端窗口要一直开着。想输入新命令，请再开一个终端窗口。

---

## 六、怎么改网站内容

用 Cursor 打开项目文件夹：**文件 → 打开文件夹 → 选择 `jxhaote-site`**。

左侧文件树里，最常改的是下面这些：

```
jxhaote-site/
├── src/
│   ├── data/
│   │   ├── products.ts      ← 产品信息（名称、规格、HS 编码等）
│   │   ├── categories.ts    ← 产品分类
│   │   └── i18n/
│   │       ├── en.ts        ← 英文页面文案
│   │       ├── vi.ts        ← 越南语文案
│   │       └── zh.ts        ← 中文文案
│   ├── config/
│   │   └── site.ts          ← WhatsApp、邮箱、域名（也可走环境变量）
│   └── views/               ← 各页面布局（一般少改）
├── public/
│   ├── downloads/           ← 放 MSDS、COA 的 PDF 文件
│   └── （图片等静态资源）
└── .env.development         ← 本地环境变量（WhatsApp、邮箱等）
```

### 6.1 改页面上的普通文字（导航、首页标语等）

打开 `src/data/i18n/zh.ts`（中文）、`en.ts`（英文）、`vi.ts`（越南语）。

**三个语言文件要一起改**，保持结构一致，只改引号里的文字。例如改首页标题：

```ts
// src/data/i18n/zh.ts
home: {
  heroTitle: '面向全球买家的优质化工产品',  // ← 改这里
  ...
}
```

保存文件后，浏览器会自动刷新显示新内容。

### 6.2 改产品信息

打开 `src/data/products.ts`。

每个产品是一段 `{ ... }`，主要字段：

| 字段 | 含义 |
|------|------|
| `abbrev` | 产品简称，如 `MEA` |
| `hsCode` | 海关编码 |
| `name` | 中/英/越产品名 |
| `specs` | 规格参数（数组，每种语言一份） |
| `applications` | 用途 |
| `moq` | 最小起订量 |
| `packaging` | 包装方式 |
| `msdsUrl` / `coaUrl` | PDF 下载路径 |

**新增产品：** 复制一段现有产品，改 `id`、`slug`、内容，并确保 `category` 与 `src/data/categories.ts` 里的分类 id 一致。

**删除产品：** 删掉对应那一段即可（改前建议先 `git pull`，改完及时提交）。

### 6.3 改 WhatsApp 号码或联系邮箱

方式一（推荐）：编辑 `.env.development`：

```env
VITE_WHATSAPP=8618767352698
VITE_CONTACT_EMAIL=info@jxhaote.cn
```

方式二：直接改 `src/config/site.ts` 里的默认值。

改完 `.env` 后需要**重启** `npm run dev`（先 `Ctrl+C` 停止，再重新运行）。

### 6.4 上传 MSDS / COA 文件

1. 把 PDF 文件放进 `public/downloads/`
2. 文件名要和 `products.ts` 里写的路径一致，例如：
   - `public/downloads/msds-mea.pdf`
   - `products.ts` 里：`msdsUrl: '/downloads/msds-mea.pdf'`

### 6.5 换图片

把图片放到 `public/` 下的某个文件夹（可自建，如 `public/images/`），在 Vue 文件或数据里用路径 `/images/你的图片.jpg` 引用。

> 如果不确定改哪个文件，把要改的文字在 Cursor 里 **全局搜索**（`Cmd+Shift+F` / `Ctrl+Shift+F`），找到后再编辑。

### 6.6 修改时注意

- 只改**引号里**的文案，不要随意删逗号、`}` 等符号，否则网站可能报错
- 改完先在本地 `http://localhost:3000` 看效果
- 一次改一类内容（比如只改文案），方便提交和回退

---

## 七、Git 拉取与推送（必学）

Git 用来：**下载别人改的代码（pull）** 和 **上传你改的代码（push）**。

### 7.1 推荐工作流程（每次改网站前先看）

```
拉取最新代码 → 本地修改 → 本地预览确认 → 提交 → 推送到 GitHub
```

### 7.2 命令行方式（Mac / Windows 通用）

在项目文件夹里：

**① 拉取最新代码（开始工作前先做）**

```bash
git pull
```

**② 查看你改了哪些文件**

```bash
git status
```

**③ 把修改加入「待提交」**

```bash
# 提交所有改过的文件
git add .

# 或者只提交某个文件
git add src/data/i18n/zh.ts
```

**④ 写一句说明并提交**

```bash
git commit -m "更新首页中文标语"
```

说明要写清楚做了什么，方便以后查找，例如：

- `更新 MEA 产品规格`
- `上传 msds-mea.pdf`
- `修改联系邮箱`

**⑤ 推送到 GitHub**

```bash
git push
```

第一次 push 如果提示设置上游分支：

```bash
git push -u origin main
```

### 7.3 用 GitHub Desktop（图形界面）

1. 打开 GitHub Desktop，**File → Clone repository**，选 `Hua-Bo/jxhaote-site`
2. 开始工作前点 **Fetch origin** / **Pull origin**
3. 用 Cursor 改文件并保存
4. 回到 GitHub Desktop，左侧会显示改动的文件
5. 左下角写 **Summary**（提交说明），点 **Commit to main**
6. 点 **Push origin** 上传到 GitHub

### 7.4 推送之后会发生什么？

| 目标 | 说明 |
|------|------|
| GitHub 仓库 | 代码立即更新 |
| GitHub Pages | 推送到 `main` 后自动构建（约 1～3 分钟） |
| 正式站 www.jxhaote.cn | 若已配置 Cloudflare 自动部署，推送后也会更新；否则需管理员手动 `npm run cf:deploy` |

预览地址（GitHub Pages）：https://hua-bo.github.io/jxhaote-site/

### 7.5 发生冲突怎么办？

如果 `git pull` 时提示 **conflict（冲突）**：

1. **不要慌**，说明你和别人改了同一处
2. 用 Cursor 打开提示冲突的文件，搜索 `<<<<<<<`
3. 保留正确内容，删掉冲突标记行
4. 保存后执行：

```bash
git add .
git commit -m "解决合并冲突"
git push
```

拿不准就先联系管理员，**不要强行 push**。

---

## 八、常见问题

### Q1：`npm install` 很慢或失败

- 检查网络，多试几次
- 确保 Node 版本 ≥ 22：`node -v`
- 仍失败可截图错误信息发给管理员

### Q2：`npm run dev` 报错 `port 3000 is in use`

3000 端口被占用。关掉之前没关的开发服务器，或临时换端口：

```bash
npx vite --port 3001
```

### Q3：改了 `.env.development` 没生效

环境变量修改后必须**重启** `npm run dev`。

### Q4：浏览器打开是白屏或报错

1. 看终端里有没有红色报错
2. 检查刚改的文件是否少了引号、逗号
3. 在终端按 `Ctrl+C` 停止，再 `npm run dev` 重启

### Q5：`git push` 提示没有权限

让管理员在 GitHub 仓库 **Settings → Collaborators** 里添加你的账号。

### Q6：我不小心改坏了怎么办？

如果还没提交：

```bash
git checkout -- 文件名
```

恢复整个项目到上次提交状态（**会丢失所有未提交修改，慎用**）：

```bash
git reset --hard HEAD
git pull
```

### Q7：怎么确认我的修改已经上线？

1. 打开 https://github.com/Hua-Bo/jxhaote-site/commits/main 看最新提交是不是你的
2. 等几分钟后访问 https://www.jxhaote.cn 强制刷新（`Cmd+Shift+R` / `Ctrl+F5`）

---

## 九、术语小词典

| 术语 | 通俗解释 |
|------|----------|
| **终端 / Terminal** | 用文字输入命令的黑窗口 |
| **Node.js** | 让网站代码能在你电脑上运行的环境 |
| **npm** | Node 自带的「应用商店」，用来安装项目依赖 |
| **依赖** | 项目运行需要的一堆第三方代码，装在 `node_modules` 里 |
| **Git** | 记录代码每次修改的工具 |
| **GitHub** | 存放代码的云端网站 |
| **clone** | 第一次把仓库下载到本地 |
| **pull** | 把云端最新代码拉到本地 |
| **commit** | 在本地保存一次「修改快照」 |
| **push** | 把本地提交上传到 GitHub |
| **分支 main** | 主分支，日常就在这个分支上改 |
| **localhost:3000** | 只在你自己电脑上能访问的预览地址 |

---

## 附录：一张图看懂日常流程

```
┌─────────────────────────────────────────────────────────┐
│  1. git pull          拉取最新代码                        │
│  2. npm run dev       启动本地预览                        │
│  3. 用 Cursor 改文件   保存后浏览器自动刷新                 │
│  4. git add .         选中要提交的修改                    │
│  5. git commit -m ""  写清楚改了什么                      │
│  6. git push          上传到 GitHub → 网站自动/手动部署      │
└─────────────────────────────────────────────────────────┘
```

---

**遇到问题？** 把终端里的报错原文复制下来，连同你正在做的操作，发给技术同事即可。
