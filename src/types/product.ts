import type { Locale } from '@/types/locale'
import type { LocalizedList, LocalizedText } from '@/types/i18n'

/** 产品分类 ID */
export type ProductCategoryId =
  | 'ethanolamines'
  | 'peg'
  | 'polyether-monomers'
  | 'surfactants'

/** 单款产品数据结构 */
export interface Product {
  id: string
  slug: string
  category: ProductCategoryId
  abbrev?: string
  hsCode: string
  name: LocalizedText
  /** 附常用缩写说明，如 PCE 替代 polycarboxylate superplasticizers */
  aliasNote?: LocalizedText
  specs: LocalizedList
  applications: LocalizedList
  moq: LocalizedText
  packaging: LocalizedText
  msdsUrl?: string
  coaUrl?: string
}

export interface ProductCategory {
  id: ProductCategoryId
  name: LocalizedText
  description: LocalizedText
}

export function getLocalized<T extends string | string[]>(
  field: Record<Locale, T>,
  locale: Locale,
): T {
  return field[locale] ?? field.en
}
