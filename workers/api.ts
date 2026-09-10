/**
 * Cloudflare Worker — 嘉兴浩天化工独立站
 * 静态资源 SPA + /api/health + /api/contact（询盘邮件）
 */

export interface Env {
  ASSETS: Fetcher
  /** Resend API Key（用 wrangler secret put RESEND_API_KEY 配置） */
  RESEND_API_KEY?: string
  /** 询盘收件邮箱（目标：ht13@jxhaote.cn） */
  CONTACT_TO_EMAIL?: string
  /**
   * 备用收件邮箱：域名未在 Resend 验证时，发往 @jxhaote.cn 会失败，
   * 自动改发到此邮箱，避免客户提交失败。
   */
  CONTACT_FALLBACK_EMAIL?: string
  /** 发件地址（须在 Resend 验证域名，如 noreply@jxhaote.cn） */
  CONTACT_FROM_EMAIL?: string
}

interface ContactPayload {
  name?: string
  email?: string
  company?: string
  product?: string
  message?: string
  /** 蜜罐：前端隐藏字段，机器人常会填 */
  website?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_LEN = {
  name: 100,
  email: 200,
  company: 200,
  product: 200,
  message: 5000,
} as const

function json(data: unknown, status = 200, extraHeaders: HeadersInit = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...extraHeaders,
    },
  })
}

function corsHeaders(request: Request): HeadersInit {
  const origin = request.headers.get('Origin') || ''
  const allowed =
    origin.endsWith('jxhaote.cn') ||
    origin.includes('localhost') ||
    origin.includes('127.0.0.1') ||
    origin.includes('workers.dev') ||
    origin.includes('github.io')

  return {
    'Access-Control-Allow-Origin': allowed ? origin || '*' : 'https://www.jxhaote.cn',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  }
}

function trim(value: unknown, max: number): string {
  return String(value ?? '')
    .trim()
    .slice(0, max)
}

function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  const headers = corsHeaders(request)

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers })
  }

  if (request.method !== 'POST') {
    return json({ ok: false, error: 'Method not allowed' }, 405, headers)
  }

  if (!env.RESEND_API_KEY) {
    return json(
      {
        ok: false,
        error: 'Email service is not configured. Please set RESEND_API_KEY.',
      },
      503,
      headers,
    )
  }

  let body: ContactPayload
  try {
    body = (await request.json()) as ContactPayload
  } catch {
    return json({ ok: false, error: 'Invalid JSON body' }, 400, headers)
  }

  // 蜜罐命中：假装成功，不真正发信
  if (body.website) {
    return json({ ok: true }, 200, headers)
  }

  const name = trim(body.name, MAX_LEN.name)
  const email = trim(body.email, MAX_LEN.email)
  const company = trim(body.company, MAX_LEN.company)
  const product = trim(body.product, MAX_LEN.product)
  const message = trim(body.message, MAX_LEN.message)

  if (!name || !email || !message) {
    return json({ ok: false, error: 'Name, email and message are required' }, 400, headers)
  }

  if (!EMAIL_RE.test(email)) {
    return json({ ok: false, error: 'Invalid email address' }, 400, headers)
  }

  const primaryTo = env.CONTACT_TO_EMAIL || 'ht13@jxhaote.cn'
  const fallbackTo = env.CONTACT_FALLBACK_EMAIL || 'huabo19990706@gmail.com'
  const from = env.CONTACT_FROM_EMAIL || 'Jiaxing Haote <noreply@jxhaote.cn>'
  const subject = `网站询盘：${name}${product ? ` — ${product}` : ''}`

  const buildBodies = (note?: string) => {
    const noteLine = note ? `\n\n【系统说明】${note}` : ''
    const text = [
      '收到一条来自官网的询盘：',
      '',
      `姓名：${name}`,
      `邮箱：${email}`,
      `公司：${company || '—'}`,
      `感兴趣的产品：${product || '—'}`,
      '',
      '留言：',
      message,
      '',
      `提交时间：${new Date().toISOString()}`,
      `来源：${request.headers.get('Referer') || 'unknown'}`,
      noteLine,
    ].join('\n')

    const html = `
    <h2>官网询盘</h2>
    <p><strong>姓名：</strong>${escapeHtml(name)}</p>
    <p><strong>邮箱：</strong>${escapeHtml(email)}</p>
    <p><strong>公司：</strong>${escapeHtml(company || '—')}</p>
    <p><strong>感兴趣的产品：</strong>${escapeHtml(product || '—')}</p>
    <p><strong>留言：</strong></p>
    <pre style="white-space:pre-wrap;font-family:inherit;">${escapeHtml(message)}</pre>
    <hr />
    <p style="color:#666;font-size:12px;">提交时间：${escapeHtml(new Date().toISOString())}</p>
    ${note ? `<p style="color:#c0392b;font-size:12px;">${escapeHtml(note)}</p>` : ''}
  `
    return { text, html }
  }

  async function sendViaResend(to: string, note?: string): Promise<{ ok: boolean; detail: string }> {
    const { text, html } = buildBodies(note)
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        text,
        html,
      }),
    })
    const detail = await resendRes.text()
    if (!resendRes.ok) {
      console.error('Resend error:', resendRes.status, detail, 'to=', to)
      return { ok: false, detail }
    }
    return { ok: true, detail }
  }

  // 1) 优先发到公司邮箱 ht13@jxhaote.cn
  const primary = await sendViaResend(primaryTo)
  if (primary.ok) {
    return json({ ok: true, deliveredTo: primaryTo }, 200, headers)
  }

  // 2) 域名未验证时 Resend 会拒绝 @jxhaote.cn → 自动改发备用邮箱，避免页面报错
  if (fallbackTo && fallbackTo !== primaryTo) {
    const fallback = await sendViaResend(
      fallbackTo,
      `本应发往 ${primaryTo}，因 Resend 未验证域名暂时发到备用邮箱。请尽快在 resend.com/domains 验证 jxhaote.cn。`,
    )
    if (fallback.ok) {
      return json({ ok: true, deliveredTo: fallbackTo, fallback: true }, 200, headers)
    }
  }

  return json(
    {
      ok: false,
      error: 'Failed to send inquiry email. Please try WhatsApp or email us directly.',
    },
    502,
    headers,
  )
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/api/health') {
      return json({
        ok: true,
        service: 'jxhaote-site',
        timestamp: Date.now(),
        contactConfigured: Boolean(env.RESEND_API_KEY),
      })
    }

    if (url.pathname === '/api/contact') {
      return handleContact(request, env)
    }

    if (env.ASSETS) {
      return env.ASSETS.fetch(request)
    }

    return new Response('jxhaote-site worker running.', { status: 200 })
  },
}
