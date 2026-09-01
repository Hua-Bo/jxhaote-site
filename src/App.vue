<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat.vue'
import { useLocaleStore } from '@/stores/locale'

const route = useRoute()
const localeStore = useLocaleStore()

/** 路由切换时更新页面标题 */
watch(
  () => [route.name, localeStore.locale],
  () => {
    const key = route.meta['titleKey'] as string | undefined
    const t = localeStore.t
    const pageTitles: Record<string, string> = {
      home: t.meta.siteName,
      about: t.nav.about,
      products: t.nav.products,
      resources: t.nav.resources,
      contact: t.nav.contact,
    }
    const page = key ? pageTitles[key] : ''
    document.title = page ? `${page} | ${t.meta.siteName}` : t.meta.siteName
  },
  { immediate: true },
)
</script>

<template>
  <SiteHeader />
  <main class="main">
    <RouterView />
  </main>
  <SiteFooter />
  <WhatsAppFloat />
</template>

<style scoped lang="scss">
.main {
  flex: 1;
}
</style>
