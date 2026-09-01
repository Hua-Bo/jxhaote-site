# WorkBuddy 任务书：配置 jxhaote-site 开发环境并完成首次运行

> 使用方法：打开 WorkBuddy → 新建任务 → 选择 **「代码开发」** → 授权访问 `C:\Users\<用户名>` 文件夹 → **全选本文件（Ctrl+A）→ 复制 → 粘贴到对话框发送**。无需删减任何内容。

---

你好，请按本任务书**全自动完成**以下所有工作。我是零基础用户，当前电脑**只有 WorkBuddy**，没有 Git、没有 Node.js、没有项目代码。请你**亲自在 PowerShell 中执行每一条命令**，不要只列出步骤让我自己做。每步用简短中文说明进展；出错时自动诊断、重试或换方案。

---

## 一、环境与账号信息

| 项目 | 值 |
|------|-----|
| 操作系统 | Windows 11 家庭版 23H2（中文版） |
| 已有软件 | 仅腾讯 WorkBuddy |
| 终端 | PowerShell（不要用 cmd） |
| Git 用户名 | `嘉兴浩天` |
| Git 邮箱 | `ht12@jxhaote.com.cn` |
| 仓库地址 | `https://github.com/Hua-Bo/jxhaote-site.git` |
| 工作分支 | `main`（推送到此分支会自动部署正式站） |
| Node.js 要求 | ≥ 22 |
| 项目目录 | `C:\Users\<当前用户名>\Projects\jxhaote-site` |
| 本地预览地址 | `http://localhost:3000` |
| 正式网站 | `https://www.jxhaote.cn` |
| 部署状态页 | `https://github.com/Hua-Bo/jxhaote-site/actions` |

---

## 二、项目说明

- 嘉兴浩天化工外贸展示站，技术栈：Vue 3 + Vite + TypeScript
- 本地预览命令：`npm run dev`（仅在自己电脑上看效果）
- **上线方式：不需要在我电脑上 build 或 deploy；只要把修改 `git push` 到 `main`，GitHub Actions 会自动部署到 www.jxhaote.cn，约 2～5 分钟生效**
- 本地环境文件：将 `.env.example` 复制为 `.env.development`（不要提交 `.env` 类文件）

---

## 三、你必须完成的任务（按顺序，不可跳过）

### 任务 1：确认文件夹授权

若尚未获得授权，请明确提示我：在 WorkBuddy 中授权访问 **`C:\Users\<当前用户名>`**（至少授权 `Projects` 子目录），否则无法安装软件和写入代码。

### 任务 2：安装运行环境（当前电脑没有任何开发环境）

1. 检查 `winget --version`；若不可用，提示我打开 Microsoft Store 更新「应用安装程序」后重试。
2. 依次安装（安装时若有 UAC 弹窗，提示我点「是」）：

```powershell
winget install Git.Git --accept-package-agreements --accept-source-agreements -e
winget install OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements -e
winget install GitHub.cli --accept-package-agreements --accept-source-agreements -e
```

- **Git**：拉取和推送代码  
- **Node.js LTS**：本地运行网站预览  
- **GitHub CLI**：登录 GitHub（推送必需）

3. 刷新当前会话 PATH：

```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

4. 验证安装成功：

```powershell
git --version
node -v
npm -v
gh --version
```

- `node -v` 必须 ≥ v22；若版本不够，用 winget 升级 Node.js LTS  
- 若命令仍提示「找不到」：明确告诉我**需要重启电脑**；重启后请我在新任务中让你从本任务第 2 步继续验证

### 任务 3：配置 Git 并登录 GitHub

```powershell
git config --global user.name "嘉兴浩天"
git config --global user.email "ht12@jxhaote.com.cn"
git config --global init.defaultBranch main
git config --global core.autocrlf true
```

登录 GitHub（拉取私有仓库和推送都需要）：

```powershell
gh auth login
```

请引导我选择：**GitHub.com** → **HTTPS** → **Login with a web browser**，在浏览器中完成登录。

验证登录：

```powershell
gh auth status
```

若 `gh` 不可用，则在 `git clone` / `git push` 时通过 Git 凭据管理器在浏览器登录 GitHub。

### 任务 4：拉取仓库代码

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\Projects" | Out-Null
cd "$HOME\Projects"
```

- 若 `jxhaote-site` **不存在**：

```powershell
git clone https://github.com/Hua-Bo/jxhaote-site.git
cd jxhaote-site
git checkout main
```

- 若**已存在**：

```powershell
cd jxhaote-site
git pull origin main
```

**若 clone 或 pull 失败：**

- 权限问题：说明需要管理员已将我的 GitHub 账号加入仓库 `Hua-Bo/jxhaote-site` 的 Collaborators；引导我确认 GitHub 已登录后重试  
- 网络问题：重试；必要时后续 npm 可使用国内镜像  
- **不要跳过本任务**

### 任务 5：安装项目依赖

```powershell
cd "$HOME\Projects\jxhaote-site"
npm install
```

若失败可重试 2 次；仍慢或失败可尝试：

```powershell
npm install --registry=https://registry.npmmirror.com
```

创建本地环境配置：

```powershell
if (-not (Test-Path .env.development)) { Copy-Item .env.example .env.development }
```

### 任务 6：启动本地预览并验证

```powershell
cd "$HOME\Projects\jxhaote-site"
npm run dev
```

- 确认终端输出包含 `http://localhost:3000`（若 3000 端口被占用，改用 `npx vite --port 3001` 并告知我）  
- 请我用浏览器打开对应地址，首页应显示 **Jiaxing Haotian Chemical** 外贸站

### 任务 7：教会我如何修改网站并推送上线

请用通俗中文向我说明以下内容（必须输出）：

#### 常改文件

| 要改的内容 | 文件路径 |
|------------|----------|
| 中文页面文字 | `src/data/i18n/zh.ts` |
| 英文页面文字 | `src/data/i18n/en.ts` |
| 越南文页面文字 | `src/data/i18n/vi.ts` |
| 产品名称、规格、HS 编码等 | `src/data/products.ts` |
| MSDS / COA 等 PDF 文件 | `public/downloads/` 目录 |

改文案时，中 / 英 / 越三个语言文件通常要一起改。

#### 每次改完并上线的标准流程

```powershell
cd "$HOME\Projects\jxhaote-site"
git pull origin main
```

（我在编辑器或 WorkBuddy 中修改并保存文件）

```powershell
git status
git add .
git commit -m "用中文写清楚本次改了什么"
git push origin main
```

说明：

- **push 成功后无需我做其他操作**，GitHub 会自动构建并部署  
- 等待 **2～5 分钟** 后，打开 https://www.jxhaote.cn 并按 **Ctrl + F5** 强制刷新查看线上效果  
- 部署是否成功可到 https://github.com/Hua-Bo/jxhaote-site/actions 查看（绿色为成功）

#### 以后每天开工（仅本地预览、不上线）

对 WorkBuddy 说，或执行：

```powershell
cd "$HOME\Projects\jxhaote-site"
git pull origin main
npm run dev
```

### 任务 8：输出最终报告

全部完成后，请输出一份报告，必须包含：

1. `git`、`node`、`npm`、`gh` 的版本号  
2. 项目完整路径  
3. GitHub 是否已成功登录  
4. 本地开发服务器是否在运行、访问地址  
5. 上面「常改文件」表格  
6. 上面「推送上线」命令（可复制版）  
7. 下面「日常备忘」全文  

---

## 四、安全约束（必须遵守）

- **不要**执行 `git push --force`、`git reset --hard`（除非我之后明确要求）  
- **不要**提交 `.env`、`.env.development` 等可能含私密信息的文件  
- **不要**在我电脑上执行 `npm run cf:deploy`（上线由 GitHub Actions 自动完成）  
- **不要**修改 git 全局配置中本任务书未提及的项  

---

## 五、完成后请原样输出「日常备忘」给我保存

```text
═══════════════════════════════════════
  嘉兴浩天网站 — 日常备忘
═══════════════════════════════════════

【项目文件夹】
C:\Users\<我的用户名>\Projects\jxhaote-site

【每天开工 — 对 WorkBuddy 说】
「在 jxhaote-site 项目里执行 git pull，然后 npm run dev，告诉我本地预览地址。」

【改网站内容】
· 中文文案：src/data/i18n/zh.ts
· 英文文案：src/data/i18n/en.ts
· 越南文文案：src/data/i18n/vi.ts
· 产品信息：src/data/products.ts
· PDF 资料：放到 public/downloads/

【改完要上线 — 对 WorkBuddy 说】
「在 jxhaote-site 里先 git pull，然后 git add .，commit 说明写：本次改了什么，再 git push origin main。」

【看线上是否更新】
1. 等 2～5 分钟
2. 打开 https://www.jxhaote.cn ，按 Ctrl+F5 强制刷新
3. 部署进度：https://github.com/Hua-Bo/jxhaote-site/actions

【本地预览（仅看自己改的，不是上线）】
http://localhost:3000

【仓库地址】
https://github.com/Hua-Bo/jxhaote-site

【遇到问题】
把 WorkBuddy 终端里的红色报错原文复制，新建任务再发给 WorkBuddy。
═══════════════════════════════════════
```

---

## 六、补充说明（供你参考）

- 若 WorkBuddy 只回复文字、不执行命令：请改用 PowerShell 实际执行，并提示我确认已选择「代码开发」模式且已授权文件夹  
- 若 push 失败：检查 `gh auth status`，必要时重新 `gh auth login`  
- 若 commit 说明不会写：可根据 `git status` 和文件变更帮我拟一句简短中文说明再 push  

**请从「任务 1：确认文件夹授权」开始执行。**
