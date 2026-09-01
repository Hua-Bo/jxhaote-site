<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { ProductCategory } from '@/types/product'
import { getLocalized } from '@/types/product'
import { useLocaleStore } from '@/stores/locale'

const props = defineProps<{ category: ProductCategory }>()
const localeStore = useLocaleStore()

const name = computed(() => getLocalized(props.category.name, localeStore.locale))
const desc = computed(() => getLocalized(props.category.description, localeStore.locale))
</script>

<template>
  <RouterLink :to="`/products/${category.id}`" class="category-card card">
    <h3 class="category-card__title">{{ name }}</h3>
    <p class="category-card__desc">{{ desc }}</p>
    <span class="category-card__link">→</span>
  </RouterLink>
</template>

<style scoped lang="scss">
.category-card {
  display: block;
  position: relative;

  &__title {
    font-size: 1.15rem;
    font-weight: 600;
    color: $primary-color;
    margin-bottom: 8px;
  }

  &__desc {
    font-size: 0.9rem;
    color: $text-secondary;
    line-height: 1.6;
    padding-right: 32px;
  }

  &__link {
    position: absolute;
    right: 24px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2rem;
    color: $primary-color;
    opacity: 0;
    transition: $transition-base;
  }

  &:hover &__link {
    opacity: 1;
    right: 20px;
  }
}
</style>
