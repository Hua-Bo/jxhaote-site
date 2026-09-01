<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { Product } from '@/types/product'
import { getLocalized } from '@/types/product'
import { useLocaleStore } from '@/stores/locale'

const props = defineProps<{ product: Product }>()
const localeStore = useLocaleStore()
const t = computed(() => localeStore.t)

const name = computed(() => getLocalized(props.product.name, localeStore.locale))
const displayName = computed(() =>
  props.product.abbrev ? `${props.product.abbrev} — ${name.value}` : name.value,
)
</script>

<template>
  <RouterLink
    :to="`/products/${product.category}/${product.slug}`"
    class="product-card card"
  >
    <div class="product-card__header">
      <h3 class="product-card__name">{{ displayName }}</h3>
      <span class="product-card__hs">HS {{ product.hsCode }}</span>
    </div>
    <span class="product-card__cta">{{ t.products.viewDetails }} →</span>
  </RouterLink>
</template>

<style scoped lang="scss">
.product-card {
  display: flex;
  flex-direction: column;
  gap: 12px;

  &__header {
    flex: 1;
  }

  &__name {
    font-size: 1rem;
    font-weight: 600;
    color: $text-primary;
    margin-bottom: 6px;
  }

  &__hs {
    font-size: 0.8rem;
    color: $text-muted;
    font-family: ui-monospace, monospace;
  }

  &__cta {
    font-size: 0.85rem;
    font-weight: 600;
    color: $primary-color;
  }
}
</style>
