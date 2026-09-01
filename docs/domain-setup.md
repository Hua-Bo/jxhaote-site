# 域名绑定指南 — www.jxhaote.cn

站点 Worker 名称：`jxhaote-site`  
目标域名：`www.jxhaote.cn`（根域 `jxhaote.cn` 一并绑定）

## 当前状态

| 项目 | 状态 |
|------|------|
| Worker 部署 | ✅ `https://jxhaote-site.huabo19990706.workers.dev` |
| `wrangler.jsonc` 自定义域配置 | ✅ 已写入 |
| `jxhaote.cn` 接入 Cloudflare | ❌ **未完成**（域名 NS 仍在 DNSPod） |

自定义域绑定 **必须** 先把域名接入 Cloudflare，无法仅在 DNSPod 上 CNAME 到 `workers.dev`。

---

## 第一步：将域名接入 Cloudflare

1. 打开 [Cloudflare 控制台](https://dash.cloudflare.com/)
2. 点击 **添加站点（Add a site）**
3. 输入 `jxhaote.cn`，选择 **Free** 计划
4. 记录 Cloudflare 分配的两条 **Nameserver**，例如：
   - `xxx.ns.cloudflare.com`
   - `yyy.ns.cloudflare.com`

## 第二步：在腾讯云修改 DNS 服务器

域名当前注册商/解析：腾讯云（DNSPod）

1. 登录 [腾讯云域名控制台](https://console.cloud.tencent.com/domain)
2. 找到 `jxhaote.cn` → **域名解析** 或 **DNS 服务器**
3. 将 DNS 服务器从：
   - `daisy.dnspod.net`
   - `index.dnspod.net`
   
   修改为 Cloudflare 提供的两条 NS
4. 等待生效（通常 10 分钟～24 小时），Cloudflare 控制台显示 **Active**

## 第三步：部署并绑定 Worker

域名在 Cloudflare 变为 Active 后，在项目目录执行：

```bash
npm run cf:deploy
```

成功后会自动创建 DNS 记录并将 Worker 绑定到：

- https://www.jxhaote.cn
- https://jxhaote.cn

## 第四步：验证

```bash
curl -I https://www.jxhaote.cn
curl https://www.jxhaote.cn/api/health
```

应返回 `200` 及 `{"ok":true,"service":"jxhaote-site",...}`

---

## 可选：根域跳转到 www

若希望 `jxhaote.cn` 自动跳转到 `www.jxhaote.cn`，可在 Cloudflare 控制台添加 **Redirect Rule**：

- If: Hostname equals `jxhaote.cn`
- Then: Dynamic redirect to `https://www.jxhaote.cn${http.request.uri.path}`

---

## 故障排查

| 问题 | 原因 | 处理 |
|------|------|------|
| `Can't infer zone from route` | 域名未接入 Cloudflare | 完成第一、二步 |
| 部署成功但域名无法访问 | NS 未生效 | 等待 DNS 传播，用 `dig NS jxhaote.cn` 检查 |
| HTTPS 证书错误 | 证书签发中 | 等待 15 分钟内自动签发 |
| workers.dev 无法访问 | 自定义域部署时关闭了 dev 路由 | `wrangler.jsonc` 已设置 `workers_dev: true` |

---

## 配置文件位置

自定义域配置在 `wrangler.jsonc`：

```jsonc
"routes": [
  { "pattern": "www.jxhaote.cn", "custom_domain": true, "zone_name": "jxhaote.cn" },
  { "pattern": "jxhaote.cn", "custom_domain": true, "zone_name": "jxhaote.cn" }
]
```

域名接入 Cloudflare 后无需再改代码，执行 `npm run cf:deploy` 即可。
