<script setup lang="ts">
import { computed } from 'vue'
import { useLocaleStore } from '@/stores/locale'
import { CONTACT_EMAIL, SITE_URL } from '@/config/site'

const localeStore = useLocaleStore()
const t = computed(() => localeStore.t)
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <p class="footer__company">{{ t.footer.company }}</p>
        <p class="footer__note">{{ t.footer.supplierNote }}</p>
      </div>
      <div class="footer__links">
        <a :href="SITE_URL">{{ SITE_URL.replace('https://', '') }}</a>
        <a :href="`mailto:${CONTACT_EMAIL}`">{{ CONTACT_EMAIL }}</a>
      </div>
      <p class="footer__copy">© {{ year }} {{ t.footer.company }} {{ t.footer.rights }}</p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  margin-top: auto;
  background: $primary-dark;
  color: rgba(255, 255, 255, 0.85);
  padding: 40px 0 32px;

  &__inner {
    display: flex;
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }

  &__company {
    font-weight: 600;
    font-size: 1rem;
  }

  &__note {
    font-size: 0.85rem;
    opacity: 0.7;
    margin-top: 4px;
  }

  &__links {
    display: flex;
    justify-content: center;
    gap: 24px;
    font-size: 0.9rem;

    a:hover {
      color: #fff;
      text-decoration: underline;
    }
  }

  &__copy {
    font-size: 0.8rem;
    opacity: 0.5;
    margin-top: 8px;
  }
}
</style>
