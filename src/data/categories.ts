import type { ProductCategory } from '@/types/product'

export const productCategories: ProductCategory[] = [
  {
    id: 'ethanolamines',
    name: {
      en: 'Ethanolamines',
      vi: 'Ethanolamine',
      zh: '乙醇胺类',
    },
    description: {
      en: 'MEA and DEA for gas treatment, surfactants and chemical synthesis.',
      vi: 'MEA và DEA cho xử lý khí, chất hoạt động bề mặt và tổng hợp hóa học.',
      zh: 'MEA、DEA，用于气体处理、表面活性剂及化学合成。',
    },
  },
  {
    id: 'peg',
    name: {
      en: 'PEG Series',
      vi: 'Dòng PEG',
      zh: 'PEG 系列',
    },
    description: {
      en: 'Polyethylene glycols for cosmetics, pharmaceuticals and industrial applications.',
      vi: 'Polyethylene glycol cho mỹ phẩm, dược phẩm và ứng dụng công nghiệp.',
      zh: '聚乙二醇，用于日化、医药及工业领域。',
    },
  },
  {
    id: 'polyether-monomers',
    name: {
      en: 'Polyether Monomers',
      vi: 'Đơn thể polyether',
      zh: '聚醚单体',
    },
    description: {
      en: 'HPEG, TPEG and EPEG for PCE superplasticizer production.',
      vi: 'HPEG, TPEG và EPEG cho sản xuất phụ gia siêu dẻo PCE.',
      zh: 'HPEG、TPEG、EPEG，用于 PCE 减水剂单体方向。',
    },
  },
  {
    id: 'surfactants',
    name: {
      en: 'Surfactants',
      vi: 'Chất hoạt động bề mặt',
      zh: '表面活性剂',
    },
    description: {
      en: 'SLES and AEO series for detergents and personal care.',
      vi: 'SLES và dòng AEO cho chất tẩy rửa và chăm sóc cá nhân.',
      zh: 'SLES、AEO 系列，用于洗涤与日化。',
    },
  },
]
