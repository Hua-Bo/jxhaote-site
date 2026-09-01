<script setup lang="ts">
import { computed } from 'vue'
import CategoryCard from '@/components/products/CategoryCard.vue'
import { productCategories } from '@/data/categories'
import { useLocaleStore } from '@/stores/locale'

const localeStore = useLocaleStore()
const t = computed(() => localeStore.t)
</script>

<template>
  <div class="section">
    <div class="container">
      <h1 class="section__title">{{ t.products.title }}</h1>
      <p class="section__subtitle">{{ t.products.subtitle }}</p>
      <div class="grid">
        <CategoryCard
          v-for="cat in productCategories"
          :key="cat.id"
          :category="cat"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}
</style>
