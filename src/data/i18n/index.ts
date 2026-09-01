import type { Locale } from '@/types/locale'
import type { I18nMessages } from '@/types/i18n'
import en from './en'
import vi from './vi'
import zh from './zh'

const messages: Record<Locale, I18nMessages> = { en, vi, zh }

export function getMessages(locale: Locale): I18nMessages {
  return messages[locale] ?? en
}
