import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { getMessages } from '@/data/i18n'
import { DEFAULT_LOCALE, type Locale } from '@/types/locale'

const STORAGE_KEY = 'jxhaote-locale'

function loadLocale(): Locale {
  const saved = localStorage.getItem(STORAGE_KEY) as Locale | null
  if (saved === 'en' || saved === 'vi' || saved === 'zh') return saved
  return DEFAULT_LOCALE
}

export const useLocaleStore = defineStore('locale', () => {
  const locale = ref<Locale>(loadLocale())

  const t = computed(() => getMessages(locale.value))

  function setLocale(code: Locale) {
    locale.value = code
    document.documentElement.lang = code === 'zh' ? 'zh-CN' : code
  }

  watch(locale, (val) => {
    localStorage.setItem(STORAGE_KEY, val)
    document.documentElement.lang = val === 'zh' ? 'zh-CN' : val
  }, { immediate: true })

  return { locale, t, setLocale }
})
