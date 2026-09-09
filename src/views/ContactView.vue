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
  /** 蜜罐字段：对人不可见，机器人常会填写 */
  website: '',
})

const submitting = ref(false)
const submitted = ref(false)
const errorMsg = ref('')

async function handleSubmit() {
  if (submitting.value) return

  submitting.value = true
  submitted.value = false
  errorMsg.value = ''

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        company: form.company,
        product: form.product,
        message: form.message,
        website: form.website,
      }),
    })

    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }

    if (!res.ok || !data.ok) {
      throw new Error(data.error || `HTTP ${res.status}`)
    }

    submitted.value = true
    form.name = ''
    form.email = ''
    form.company = ''
    form.product = ''
    form.message = ''
    form.website = ''
  } catch {
    errorMsg.value = t.value.contact.formError
  } finally {
    submitting.value = false
  }
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
          <p class="contact__email-hint">
            {{ t.contact.email }}:
            <a :href="`mailto:${CONTACT_EMAIL}`">{{ CONTACT_EMAIL }}</a>
          </p>
        </div>

        <!-- 邮箱表单：提交到 Worker /api/contact，自动发信到 info@jxhaote.cn -->
        <form class="card contact__form" @submit.prevent="handleSubmit">
          <h2>{{ t.contact.email }}</h2>

          <label>
            {{ t.contact.formName }}
            <input v-model="form.name" type="text" required maxlength="100" autocomplete="name" />
          </label>
          <label>
            {{ t.contact.formEmail }}
            <input
              v-model="form.email"
              type="email"
              required
              maxlength="200"
              autocomplete="email"
            />
          </label>
          <label>
            {{ t.contact.formCompany }}
            <input v-model="form.company" type="text" maxlength="200" autocomplete="organization" />
          </label>
          <label>
            {{ t.contact.formProduct }}
            <input v-model="form.product" type="text" maxlength="200" />
          </label>
          <label>
            {{ t.contact.formMessage }}
            <textarea v-model="form.message" rows="4" required maxlength="5000" />
          </label>

          <!-- 蜜罐：隐藏，勿删 -->
          <label class="contact__hp" aria-hidden="true">
            Website
            <input v-model="form.website" type="text" tabindex="-1" autocomplete="off" />
          </label>

          <button type="submit" class="btn btn--primary" :disabled="submitting">
            {{ submitting ? t.contact.formSending : t.contact.formSubmit }}
          </button>
          <p v-if="submitted" class="contact__success">{{ t.contact.formSuccess }}</p>
          <p v-if="errorMsg" class="contact__error">{{ errorMsg }}</p>
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

  &__email-hint {
    margin-top: 16px !important;
    margin-bottom: 0 !important;
    font-size: 0.85rem !important;

    a {
      color: $primary-color;
      word-break: break-all;
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

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }
  }

  &__hp {
    position: absolute !important;
    left: -9999px !important;
    width: 1px !important;
    height: 1px !important;
    overflow: hidden !important;
  }

  &__success {
    margin-top: 12px;
    font-size: 0.9rem;
    color: $success-color;
    font-weight: 500;
  }

  &__error {
    margin-top: 12px;
    font-size: 0.9rem;
    color: #c0392b;
    font-weight: 500;
  }
}
</style>
