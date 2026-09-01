/**
 * Cloudflare Worker — 嘉兴浩天化工独立站
 * 静态资源 SPA + /api/health 健康检查
 */

export interface Env {
  ASSETS: Fetcher
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/api/health') {
      return Response.json({
        ok: true,
        service: 'jxhaote-site',
        timestamp: Date.now(),
      })
    }

    if (env.ASSETS) {
      return env.ASSETS.fetch(request)
    }

    return new Response('jxhaote-site worker running.', { status: 200 })
  },
}
