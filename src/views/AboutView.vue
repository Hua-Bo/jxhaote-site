<script setup lang="ts">
import { computed } from 'vue'
import { useLocaleStore } from '@/stores/locale'

const localeStore = useLocaleStore()
const t = computed(() => localeStore.t)
</script>

<template>
  <div class="section">
    <div class="container about">
      <h1 class="section__title">{{ t.about.title }}</h1>
      <p class="about__intro">{{ t.about.intro }}</p>

      <h2 class="about__heading">{{ t.about.advantagesTitle }}</h2>
      <div class="about__grid">
        <div v-for="(item, i) in t.about.advantages" :key="i" class="card about__card">
          <h3 class="about__card-title">{{ item.title }}</h3>
          <p class="about__card-desc">{{ item.desc }}</p>
        </div>
      </div>

      <p class="about__compliance">{{ t.about.compliance }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.about {
  max-width: 900px;

  &__intro {
    font-size: 1.05rem;
    color: $text-secondary;
    line-height: 1.8;
    margin-bottom: 48px;
  }

  &__heading {
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 24px;
    color: $text-primary;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
  }

  &__card-title {
    font-size: 1rem;
    font-weight: 600;
    color: $primary-color;
    margin-bottom: 8px;
  }

  &__card-desc {
    font-size: 0.9rem;
    color: $text-secondary;
    line-height: 1.7;
  }

  &__compliance {
    padding: 16px 20px;
    background: rgba($primary-color, 0.06);
    border-left: 3px solid $primary-color;
    border-radius: 0 $border-radius-base $border-radius-base 0;
    font-size: 0.9rem;
    color: $text-secondary;
    line-height: 1.7;
  }
}
</style>
