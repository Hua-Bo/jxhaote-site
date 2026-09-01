/** WhatsApp 号码（国际格式，不含 +） */
export const WHATSAPP_NUMBER =
  import.meta.env.VITE_WHATSAPP || '8618767352698'

export const CONTACT_EMAIL =
  import.meta.env.VITE_CONTACT_EMAIL || 'info@jxhaote.cn'

export const SITE_URL =
  import.meta.env.VITE_SITE_URL || 'https://www.jxhaote.cn'

/** 生成 WhatsApp 聊天链接 */
export function whatsappUrl(message?: string): string {
  const text = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${WHATSAPP_NUMBER}${text}`
}
