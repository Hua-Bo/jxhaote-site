/** 支持的语言：英文主推，越南语必配，中文可切换 */
export type Locale = 'en' | 'vi' | 'zh'

export const LOCALES: { code: Locale; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'zh', label: '中文' },
]

export const DEFAULT_LOCALE: Locale = 'en'
