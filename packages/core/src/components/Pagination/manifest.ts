import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { PaginationCommandMap, PaginationEventMap, PaginationRegionMap } from './contract';
import { paginationApiContract } from './contract';

export const paginationManifest = createComponentManifest({
  name: 'Pagination',
  category: 'navigation',
  description: {
    zh: '将大型数据集合拆分为可导航页面。',
    en: 'Splits a large data set into navigable pages.',
  },
  semantics: ['current page', 'page size', 'pager window', 'jump action', 'range summary'],
  accessibility: ['navigation landmark', 'native buttons', 'current page', 'disabled action'],
  testVectors: ['controlled state', 'page size', 'boundaries', 'collapsed pages', 'layout'],
  contract: {
    props: createPropManifestFields(paginationApiContract, {
      value: { type: 'number', description: { zh: '当前页', en: 'Current page' } },
      defaultValue: { type: 'number', description: { zh: '默认页', en: 'Default page' } },
      pageSize: { type: 'number', description: { zh: '每页数量', en: 'Page size' } },
      defaultPageSize: {
        type: 'number',
        description: { zh: '默认每页数量', en: 'Default page size' },
      },
      total: { type: 'number', description: { zh: '数据总数', en: 'Total items' } },
      pageSizes: {
        type: 'readonly number[]',
        description: { zh: '每页数量选项', en: 'Page-size options' },
      },
      pagerCount: { type: 'number', description: { zh: '页码数量', en: 'Pager count' } },
      layout: { type: 'PaginationLayout', description: { zh: '区域布局', en: 'Region layout' } },
      variant: { type: 'PaginationVariant', description: { zh: '展示模式', en: 'Variant' } },
      hideOnSinglePage: {
        type: 'boolean',
        description: { zh: '单页隐藏', en: 'Hide for one page' },
      },
      showRange: { type: 'boolean', description: { zh: '展示范围', en: 'Show range' } },
      align: { type: 'PaginationAlign', description: { zh: '对齐方式', en: 'Alignment' } },
      disabled: { type: 'boolean', description: { zh: '禁用', en: 'Disabled' } },
      size: { type: 'PaginationSize', description: { zh: '尺寸', en: 'Size' } },
      labels: {
        type: 'Partial<PaginationLabels>',
        description: { zh: '文案覆盖', en: 'Label overrides' },
      },
    }),
    emits: createManifestFields<PaginationEventMap>({
      change: {
        type: '[number, number]',
        description: { zh: '分页变化', en: 'Pagination changed' },
      },
      pageChange: { type: 'number', description: { zh: '页码变化', en: 'Page changed' } },
      pageSizeChange: {
        type: 'number',
        description: { zh: '每页数量变化', en: 'Page size changed' },
      },
      previous: { type: 'number', description: { zh: '上一页', en: 'Previous page' } },
      currentPageClick: {
        type: 'number',
        description: { zh: '再次点击当前页', en: 'Current page clicked' },
      },
      next: { type: 'number', description: { zh: '下一页', en: 'Next page' } },
      jump: { type: 'number', description: { zh: '跳转页', en: 'Jumped page' } },
    }),
    slots: createManifestFields<PaginationRegionMap>({
      prefix: { type: 'void', description: { zh: '前缀', en: 'Prefix' } },
      previous: { type: 'void', description: { zh: '上一页内容', en: 'Previous content' } },
      next: { type: 'void', description: { zh: '下一页内容', en: 'Next content' } },
      suffix: { type: 'void', description: { zh: '后缀', en: 'Suffix' } },
    }),
    exposes: createManifestFields<PaginationCommandMap>({
      focus: {
        type: '(page?: number) => void',
        description: { zh: '聚焦分页操作', en: 'Focuses a pagination action' },
      },
    }),
  },
});
