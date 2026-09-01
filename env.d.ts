/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE: string
  readonly VITE_APP_TITLE: string
  readonly VITE_SITE_URL: string
  readonly VITE_WHATSAPP: string
  readonly VITE_CONTACT_EMAIL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
