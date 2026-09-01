<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useLocaleStore } from '@/stores/locale'
import { LOCALES } from '@/types/locale'

const localeStore = useLocaleStore()
const route = useRoute()
const t = computed(() => localeStore.t)

const navItems = computed(() => [
  { to: '/', label: t.value.nav.home },
  { to: '/about', label: t.value.nav.about },
  { to: '/products', label: t.value.nav.products },
  { to: '/resources', label: t.value.nav.resources },
  { to: '/contact', label: t.value.nav.contact },
])

function isActive(path: string) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<template>
  <header class="header">
    <div class="container header__inner">
      <RouterLink to="/" class="header__logo">
        <span class="header__logo-mark">HT</span>
        <span class="header__logo-text">{{ t.meta.siteName }}</span>
      </RouterLink>

      <nav class="header__nav">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="header__link"
          :class="{ 'header__link--active': isActive(item.to) }"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="header__lang">
        <button
          v-for="loc in LOCALES"
          :key="loc.code"
          class="header__lang-btn"
          :class="{ 'header__lang-btn--active': localeStore.locale === loc.code }"
          @click="localeStore.setLocale(loc.code)"
        >
          {{ loc.label }}
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: sticky;
  top: 0;
  z-index: $z-index-header;
  height: $header-height;
  background: $bg-card;
  border-bottom: 1px solid $border-color;
  box-shadow: $box-shadow-sm;

  &__inner {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 32px;
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }

  &__logo-mark {
    width: 36px;
    height: 36px;
    background: $primary-color;
    color: #fff;
    border-radius: $border-radius-base;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.85rem;
  }

  &__logo-text {
    font-weight: 700;
    font-size: 0.95rem;
    color: $text-primary;

    @media (max-width: $breakpoint-sm) {
      display: none;
    }
  }

  &__nav {
    display: flex;
    gap: 4px;
    flex: 1;

    @media (max-width: $breakpoint-md) {
      display: none;
    }
  }

  &__link {
    padding: 8px 14px;
    border-radius: $border-radius-base;
    font-size: 0.9rem;
    font-weight: 500;
    color: $text-secondary;
    transition: $transition-base;

    &:hover,
    &--active {
      color: $primary-color;
      background: rgba($primary-color, 0.06);
    }
  }

  &__lang {
    display: flex;
    gap: 2px;
    margin-left: auto;
    background: $bg-page;
    border-radius: $border-radius-base;
    padding: 3px;
  }

  &__lang-btn {
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 0.78rem;
    font-weight: 500;
    color: $text-muted;
    transition: $transition-base;

    &--active {
      background: $bg-card;
      color: $primary-color;
      box-shadow: $box-shadow-sm;
    }
  }
}
</style>
