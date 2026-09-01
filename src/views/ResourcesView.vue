<script setup lang="ts">
import { computed } from 'vue'
import { products } from '@/data/products'
import { getLocalized } from '@/types/product'
import { useLocaleStore } from '@/stores/locale'

const localeStore = useLocaleStore()
const t = computed(() => localeStore.t)
</script>

<template>
  <div class="section">
    <div class="container">
      <h1 class="section__title">{{ t.resources.title }}</h1>
      <p class="section__subtitle">{{ t.resources.subtitle }}</p>

      <div class="resources-grid">
        <section class="card resources-block">
          <h2>{{ t.resources.docsTitle }}</h2>
          <p>{{ t.resources.docsDesc }}</p>
          <ul class="doc-list">
            <li v-for="p in products" :key="p.id">
              <span class="doc-list__name">
                {{ p.abbrev ?? getLocalized(p.name, localeStore.locale) }}
              </span>
              <span class="doc-list__links">
                <a v-if="p.msdsUrl" :href="p.msdsUrl" target="_blank">MSDS</a>
                <a v-if="p.coaUrl" :href="p.coaUrl" target="_blank">COA</a>
              </span>
            </li>
          </ul>
        </section>

        <section class="card resources-block resources-block--soon">
          <h2>{{ t.resources.blogTitle }}</h2>
          <p>{{ t.resources.blogDesc }}</p>
          <span class="soon-badge">{{ t.resources.comingSoon }}</span>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.resources-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;

  @media (max-width: $breakpoint-md) {
    grid-template-columns: 1fr;
  }
}

.resources-block {
  h2 {
    font-size: 1.1rem;
    font-weight: 600;
    color: $primary-color;
    margin-bottom: 8px;
  }

  p {
    font-size: 0.9rem;
    color: $text-secondary;
    margin-bottom: 20px;
    line-height: 1.6;
  }

  &--soon {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}

.doc-list {
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid $border-color;
    font-size: 0.9rem;
    gap: 12px;
  }

  &__name {
    font-weight: 500;
    color: $text-primary;
  }

  &__links {
    display: flex;
    gap: 12px;
    flex-shrink: 0;

    a {
      color: $primary-color;
      font-weight: 600;
      font-size: 0.85rem;

      &:hover { text-decoration: underline; }
    }
  }
}

.soon-badge {
  margin-top: auto;
  padding: 6px 14px;
  background: $bg-page;
  border-radius: 20px;
  font-size: 0.85rem;
  color: $text-muted;
  font-weight: 500;
}
</style>
