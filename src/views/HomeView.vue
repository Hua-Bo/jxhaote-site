<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import CategoryCard from '@/components/products/CategoryCard.vue'
import { productCategories } from '@/data/categories'
import { whatsappUrl } from '@/config/site'
import { useLocaleStore } from '@/stores/locale'

const localeStore = useLocaleStore()
const t = computed(() => localeStore.t)
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="hero">
      <div class="container hero__inner">
        <div class="hero__content">
          <p class="hero__tag">{{ t.meta.tagline }}</p>
          <h1 class="hero__title">{{ t.home.heroTitle }}</h1>
          <p class="hero__subtitle">{{ t.home.heroSubtitle }}</p>
          <div class="hero__actions">
            <RouterLink to="/products" class="btn btn--primary">{{ t.home.heroCta }}</RouterLink>
            <a :href="whatsappUrl()" target="_blank" rel="noopener" class="btn btn--whatsapp">
              {{ t.home.heroSecondary }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- 产品分类导航 -->
    <section class="section">
      <div class="container">
        <h2 class="section__title">{{ t.home.productsTitle }}</h2>
        <p class="section__subtitle">{{ t.home.productsSubtitle }}</p>
        <div class="grid">
          <CategoryCard
            v-for="cat in productCategories"
            :key="cat.id"
            :category="cat"
          />
        </div>
      </div>
    </section>

    <!-- 信任条 -->
    <section class="trust">
      <div class="container">
        <h2 class="trust__title">{{ t.home.trustTitle }}</h2>
        <ul class="trust__list">
          <li v-for="(item, i) in t.home.trustItems" :key="i" class="trust__item">
            <span class="trust__check">✓</span>
            {{ item }}
          </li>
        </ul>
      </div>
    </section>

    <!-- 实力证明 -->
    <section class="section section--alt">
      <div class="container">
        <h2 class="section__title">{{ t.home.proofTitle }}</h2>
        <p class="section__subtitle">{{ t.home.proofSubtitle }}</p>
        <div class="proof-grid">
          <div v-for="(item, i) in t.home.proofItems" :key="i" class="proof-card card">
            <div class="proof-card__icon">📄</div>
            <h3 class="proof-card__title">{{ item.title }}</h3>
            <p class="proof-card__desc">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.hero {
  background: linear-gradient(135deg, $primary-dark 0%, $primary-color 60%, $primary-light 100%);
  color: #fff;
  padding: 100px 0 80px;

  &__tag {
    font-size: 0.9rem;
    opacity: 0.8;
    margin-bottom: 16px;
    letter-spacing: 0.04em;
  }

  &__title {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 20px;
    max-width: 700px;
  }

  &__subtitle {
    font-size: 1.05rem;
    opacity: 0.88;
    line-height: 1.7;
    max-width: 640px;
    margin-bottom: 32px;
  }

  &__actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.trust {
  background: $bg-card;
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  padding: 48px 0;

  &__title {
    font-size: 1.25rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 28px;
    color: $text-primary;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
  }

  &__item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 0.95rem;
    color: $text-secondary;
  }

  &__check {
    color: $success-color;
    font-weight: 700;
    flex-shrink: 0;
  }
}

.section--alt {
  background: $bg-card;
}

.proof-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.proof-card {
  text-align: center;

  &__icon {
    font-size: 2rem;
    margin-bottom: 12px;
  }

  &__title {
    font-size: 1.05rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: $text-primary;
  }

  &__desc {
    font-size: 0.9rem;
    color: $text-secondary;
    line-height: 1.6;
  }
}
</style>
