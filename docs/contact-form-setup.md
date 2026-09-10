# 询盘表单自动发信配置

客户在「联系我们」提交表单后，由 Cloudflare Worker 调用 **Resend**，自动发邮件到 **`ht13@jxhaote.cn`**，不再依赖客户本机邮箱软件。

## 工作原理

```
客户填表 → POST /api/contact → Cloudflare Worker → Resend → ht13@jxhaote.cn
                                              ↖ Reply-To = 客户邮箱（你可直接回复）
```

### 当前收件地址

线上配置为：`ht13@jxhaote.cn`

若提交失败，多半是 **Resend 尚未验证域名**。请到 https://resend.com/domains 添加 `jxhaote.cn`，按提示在 Cloudflare DNS 加记录；验证通过后发件人改为 `noreply@jxhaote.cn` 并重新 `npm run cf:deploy`。

## 一次性配置（管理员）

### 1. 注册 Resend

1. 打开 https://resend.com 注册并登录  
2. **API Keys** → 创建密钥，复制（只显示一次）

### 2. 写入 Cloudflare Secret

在项目根目录执行：

```bash
npx wrangler secret put RESEND_API_KEY
```

粘贴刚才的 API Key 回车。

### 3.（推荐）验证发信域名

未验证域名时，发件人只能是 `onboarding@resend.dev`，且 **收件人往往只能是你在 Resend 注册的那个邮箱**，不能随意发到 `ht13@jxhaote.cn`。

要真正发到公司邮箱，请在 Resend：

1. **Domains** → **Add Domain** → 填 `jxhaote.cn`  
2. 按提示在 Cloudflare DNS 添加 TXT / MX / CNAME 记录  
3. 状态变为 **Verified** 后，改 `wrangler.jsonc`：

```jsonc
"vars": {
  "CONTACT_TO_EMAIL": "ht13@jxhaote.cn",
  "CONTACT_FROM_EMAIL": "Jiaxing Haote <noreply@jxhaote.cn>"
}
```

再部署：

```bash
npm run cf:deploy
```

### 4. 确认收件邮箱可用

确保 `ht13@jxhaote.cn` 已开通，且你能登录查收（企业邮箱 / 腾讯企业邮 / 转发到个人邮箱均可）。

## 验证是否生效

```bash
# 健康检查（contactConfigured 应为 true）
curl https://www.jxhaote.cn/api/health

# 测试提交（部署后）
curl -X POST https://www.jxhaote.cn/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"you@example.com","company":"Demo","product":"MEA","message":"hello"}'
```

然后查 `ht13@jxhaote.cn` 收件箱（含垃圾箱）。

## 本地开发联调

终端 1：

```bash
npx wrangler secret put RESEND_API_KEY   # 若本地 .dev.vars 未配置
# 或在项目根创建 .dev.vars：
# RESEND_API_KEY=re_xxxx
npx wrangler dev
```

终端 2：

```bash
npm run dev
```

Vite 已把 `/api` 代理到 `8787`，本地表单可联调。

`.dev.vars` 示例（勿提交到 Git）：

```env
RESEND_API_KEY=re_xxxxxxxx
CONTACT_TO_EMAIL=ht13@jxhaote.cn
CONTACT_FROM_EMAIL=Jiaxing Haote <onboarding@resend.dev>
```

## 常见问题

| 现象 | 原因 | 处理 |
|------|------|------|
| 提交失败 / 503 | 未配置 `RESEND_API_KEY` | `wrangler secret put RESEND_API_KEY` |
| Resend 报错只能发给自己 | 域名未验证 | 验证 `jxhaote.cn` 并改 `CONTACT_FROM_EMAIL` |
| 正式站提交失败、本地 OK | 线上未写 Secret | 对生产环境再 put 一次 secret |
| 邮件进垃圾箱 | 未验证域名 / SPF | 按 Resend 完成 DNS 验证 |

## 相关文件

- 前端表单：`src/views/ContactView.vue`
- Worker 接口：`workers/api.ts` → `POST /api/contact`
- 环境变量：`wrangler.jsonc` → `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL`
