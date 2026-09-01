import type { Locale } from '@/types/locale'

/** 多语言文案结构 */
export interface I18nMessages {
  meta: {
    siteName: string
    tagline: string
  }
  nav: {
    home: string
    about: string
    products: string
    resources: string
    contact: string
  }
  home: {
    heroTitle: string
    heroSubtitle: string
    heroCta: string
    heroSecondary: string
    productsTitle: string
    productsSubtitle: string
    trustTitle: string
    trustItems: string[]
    proofTitle: string
    proofSubtitle: string
    proofItems: { title: string; desc: string }[]
  }
  about: {
    title: string
    intro: string
    advantagesTitle: string
    advantages: { title: string; desc: string }[]
    compliance: string
  }
  products: {
    title: string
    subtitle: string
    viewAll: string
    viewDetails: string
    specs: string
    applications: string
    hsCode: string
    moq: string
    packaging: string
    downloadMsds: string
    downloadCoa: string
    inquire: string
    categories: Record<string, string>
  }
  resources: {
    title: string
    subtitle: string
    docsTitle: string
    docsDesc: string
    blogTitle: string
    blogDesc: string
    comingSoon: string
  }
  contact: {
    title: string
    subtitle: string
    whatsapp: string
    whatsappHint: string
    email: string
    formName: string
    formEmail: string
    formCompany: string
    formProduct: string
    formMessage: string
    formSubmit: string
    formSuccess: string
  }
  footer: {
    company: string
    rights: string
    supplierNote: string
  }
  common: {
    learnMore: string
    back: string
    notFound: string
  }
}

export type LocalizedText = Record<Locale, string>
export type LocalizedList = Record<Locale, string[]>
