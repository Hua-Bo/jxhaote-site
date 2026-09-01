<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import ProductCard from '@/components/products/ProductCard.vue'
import { productCategories } from '@/data/categories'
import { getProductsByCategory } from '@/data/products'
import { getLocalized } from '@/types/product'
import { useLocaleStore } from '@/stores/locale'

const route = useRoute()
const localeStore = useLocaleStore()
const t = computed(() => localeStore.t)

const categoryId = computed(() => route.params['category'] as string)
const category = computed(() => productCategories.find((c) => c.id === categoryId.value))
const products = computed(() => getProductsByCategory(categoryId.value))

const categoryName = computed(() =>
  category.value ? getLocalized(category.value.name, localeStore.locale) : '',
)
const categoryDesc = computed(() =>
  category.value ? getLocalized(category.value.description, localeStore.locale) : '',
)
</script>

<template>
  <div class="section">
    <div class="container">
      <RouterLink to="/products" class="back">← {{ t.common.back }}</RouterLink>
      <h1 class="section__title">{{ categoryName }}</h1>
      <p class="section__subtitle">{{ categoryDesc }}</p>
      <div class="grid">
        <ProductCard v-for="p in products" :key="p.id" :product="p" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.back {
  display: inline-block;
  font-size: 0.9rem;
  color: $primary-color;
  margin-bottom: 20px;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}
</style>
