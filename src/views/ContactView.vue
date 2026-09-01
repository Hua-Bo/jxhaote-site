<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { CONTACT_EMAIL, whatsappUrl } from '@/config/site'
import { useLocaleStore } from '@/stores/locale'

const localeStore = useLocaleStore()
const t = computed(() => localeStore.t)

const form = reactive({
  name: '',
  email: '',
  company: '',
  product: '',
  message: '',
})

const submitted = ref(false)

function handleSubmit() {
  // 展示型站点：通过 mailto 发送询盘（后续可对接后端 API）
  const subject = encodeURIComponent(`Inquiry from ${form.name} — ${form.product}`)
  const body = encodeURIComponent(
    `Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nProduct: ${form.product}\n\n${form.message}`,
  )
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
  submitted.value = true
}
</script>

<template>
  <div class="section">
    <div class="container contact">
      <h1 class="section__title">{{ t.contact.title }}</h1>
      <p class="section__subtitle">{{ t.contact.subtitle }}</p>

      <div class="contact__grid">
        <!-- WhatsApp -->
        <div class="card contact__whatsapp">
          <h2>{{ t.contact.whatsapp }}</h2>
          <p>{{ t.contact.whatsappHint }}</p>
          <a :href="whatsappUrl()" target="_blank" rel="noopener" class="btn btn--whatsapp">
            +86-18767352698
          </a>
        </div>

        <!-- 邮箱表单 -->
        <form class="card contact__form" @submit.prevent="handleSubmit">
          <h2>{{ t.contact.email }}</h2>

          <label>
            {{ t.contact.formName }}
            <input v-model="form.name" type="text" required />
          </label>
          <label>
            {{ t.contact.formEmail }}
            <input v-model="form.email" type="email" required />
          </label>
          <label>
            {{ t.contact.formCompany }}
            <input v-model="form.company" type="text" />
          </label>
          <label>
            {{ t.contact.formProduct }}
            <input v-model="form.product" type="text" />
          </label>
          <label>
            {{ t.contact.formMessage }}
            <textarea v-model="form.message" rows="4" required />
          </label>

          <button type="submit" class="btn btn--primary">{{ t.contact.formSubmit }}</button>
          <p v-if="submitted" class="contact__success">{{ t.contact.formSuccess }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.contact {
  max-width: 800px;

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 24px;
    align-items: start;

    @media (max-width: $breakpoint-sm) {
      grid-template-columns: 1fr;
    }
  }

  &__whatsapp {
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
  }

  &__form {
    h2 {
      font-size: 1.1rem;
      font-weight: 600;
      color: $primary-color;
      margin-bottom: 16px;
    }

    label {
      display: block;
      font-size: 0.85rem;
      font-weight: 500;
      color: $text-secondary;
      margin-bottom: 14px;
    }

    input,
    textarea {
      display: block;
      width: 100%;
      margin-top: 4px;
      padding: 10px 12px;
      border: 1px solid $border-color;
      border-radius: $border-radius-base;
      background: $bg-page;
      transition: $transition-base;

      &:focus {
        border-color: $primary-color;
        outline: none;
        background: #fff;
      }
    }

    .btn {
      width: 100%;
      margin-top: 8px;
    }
  }

  &__success {
    margin-top: 12px;
    font-size: 0.9rem;
    color: $success-color;
    font-weight: 500;
  }
}
</style>
