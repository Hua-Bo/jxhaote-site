<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getProductBySlug } from '@/data/products'
import { getLocalized } from '@/types/product'
import { whatsappUrl } from '@/config/site'
import { useLocaleStore } from '@/stores/locale'

const route = useRoute()
const localeStore = useLocaleStore()
const t = computed(() => localeStore.t)

const product = computed(() => getProductBySlug(route.params['slug'] as string))

const name = computed(() =>
  product.value ? getLocalized(product.value.name, localeStore.locale) : '',
)
const specs = computed(() =>
  product.value ? getLocalized(product.value.specs, localeStore.locale) : [],
)
const applications = computed(() =>
  product.value ? getLocalized(product.value.applications, localeStore.locale) : [],
)
const moq = computed(() =>
  product.value ? getLocalized(product.value.moq, localeStore.locale) : '',
)
const packaging = computed(() =>
  product.value ? getLocalized(product.value.packaging, localeStore.locale) : '',
)
const aliasNote = computed(() =>
  product.value?.aliasNote
    ? getLocalized(product.value.aliasNote, localeStore.locale)
    : '',
)

const inquireUrl = computed(() =>
  whatsappUrl(`Hello, I am interested in ${product.value?.abbrev ?? name.value}. Please send me a quote.`),
)
</script>

<template>
  <div v-if="product" class="section">
    <div class="container detail">
      <RouterLink :to="`/products/${product.category}`" class="back">
        ← {{ t.common.back }}
      </RouterLink>

      <header class="detail__header">
        <span v-if="product.abbrev" class="detail__abbrev">{{ product.abbrev }}</span>
        <h1 class="detail__title">{{ name }}</h1>
        <p v-if="aliasNote" class="detail__alias">{{ aliasNote }}</p>
      </header>

      <div class="detail__grid">
        <div class="detail__main">
          <section class="detail__block card">
            <h2>{{ t.products.specs }}</h2>
            <ul>
              <li v-for="(s, i) in specs" :key="i">{{ s }}</li>
            </ul>
          </section>

          <section class="detail__block card">
            <h2>{{ t.products.applications }}</h2>
            <ul>
              <li v-for="(a, i) in applications" :key="i">{{ a }}</li>
            </ul>
          </section>
        </div>

        <aside class="detail__sidebar card">
          <dl class="detail__meta">
            <div>
              <dt>{{ t.products.hsCode }}</dt>
              <dd>{{ product.hsCode }}</dd>
            </div>
            <div>
              <dt>{{ t.products.moq }}</dt>
              <dd>{{ moq }}</dd>
            </div>
            <div>
              <dt>{{ t.products.packaging }}</dt>
              <dd>{{ packaging }}</dd>
            </div>
          </dl>

          <div class="detail__downloads">
            <a
              v-if="product.msdsUrl"
              :href="product.msdsUrl"
              class="btn btn--outline"
              target="_blank"
            >
              {{ t.products.downloadMsds }}
            </a>
            <a
              v-if="product.coaUrl"
              :href="product.coaUrl"
              class="btn btn--outline"
              target="_blank"
            >
              {{ t.products.downloadCoa }}
            </a>
          </div>

          <a :href="inquireUrl" target="_blank" rel="noopener" class="btn btn--whatsapp detail__cta">
            {{ t.products.inquire }}
          </a>
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.back {
  display: inline-block;
  font-size: 0.9rem;
  color: $primary-color;
  margin-bottom: 24px;
  font-weight: 500;

  &:hover { text-decoration: underline; }
}

.detail {
  max-width: 960px;

  &__header {
    margin-bottom: 32px;
  }

  &__abbrev {
    display: inline-block;
    background: rgba($primary-color, 0.1);
    color: $primary-color;
    font-weight: 700;
    font-size: 0.85rem;
    padding: 4px 10px;
    border-radius: 4px;
    margin-bottom: 8px;
  }

  &__title {
    font-size: 1.8rem;
    font-weight: 700;
    color: $text-primary;
    margin-bottom: 8px;
  }

  &__alias {
    font-size: 0.95rem;
    color: $text-secondary;
    line-height: 1.6;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 24px;
    align-items: start;

    @media (max-width: $breakpoint-md) {
      grid-template-columns: 1fr;
    }
  }

  &__block {
    margin-bottom: 20px;

    h2 {
      font-size: 1rem;
      font-weight: 600;
      color: $primary-color;
      margin-bottom: 12px;
    }

    ul {
      list-style: disc;
      padding-left: 20px;

      li {
        font-size: 0.95rem;
        color: $text-secondary;
        margin-bottom: 6px;
        line-height: 1.6;
      }
    }
  }

  &__meta {
    margin-bottom: 20px;

    div {
      margin-bottom: 14px;
    }

    dt {
      font-size: 0.8rem;
      color: $text-muted;
      margin-bottom: 2px;
    }

    dd {
      font-size: 0.95rem;
      font-weight: 600;
      color: $text-primary;
    }
  }

  &__downloads {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;

    .btn { width: 100%; font-size: 0.85rem; padding: 10px 16px; }
  }

  &__cta {
    width: 100%;
  }
}
</style>
