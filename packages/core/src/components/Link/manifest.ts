import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { LinkEventMap, LinkRegionMap } from './contract';
import { linkApiContract } from './contract';

export const linkManifest = createComponentManifest({
  name: 'Link',
  category: 'navigation',
  description: { zh: '触发页面、路由或锚点导航。', en: 'Navigates to a page, route, or anchor.' },
  semantics: ['native href', 'action link', 'route navigation', 'anchor navigation', 'loading'],
  accessibility: ['native anchor', 'action role', 'keyboard activation', 'disabled semantics'],
  testVectors: ['href', 'action', 'route', 'anchor', 'disabled', 'loading', 'regions'],
  contract: {
    props: createPropManifestFields(linkApiContract, {
      variant: { type: 'LinkVariant', description: { zh: '语义颜色', en: 'Semantic variant' } },
      size: { type: 'ChoiceSize', description: { zh: '尺寸', en: 'Size' } },
      underline: {
        type: "boolean | 'always'",
        description: { zh: '下划线策略', en: 'Underline policy' },
      },
      disabled: { type: 'boolean', description: { zh: '禁用', en: 'Disabled' } },
      href: { type: 'string', description: { zh: '原生链接地址', en: 'Native link address' } },
      target: { type: 'LinkTarget', description: { zh: '链接打开目标', en: 'Browsing target' } },
      attribute: { type: 'boolean', description: { zh: '注释样式', en: 'Annotation style' } },
      anchor: { type: 'string', description: { zh: '锚点标识', en: 'Anchor identifier' } },
      anchorPosition: {
        type: 'LinkAnchorPosition',
        description: { zh: '锚点符号位置', en: 'Anchor marker position' },
      },
      anchorOffset: {
        type: 'number',
        description: { zh: '锚点滚动偏移', en: 'Anchor scroll offset' },
      },
      route: { type: 'unknown', description: { zh: '路由目标', en: 'Route target' } },
      replace: { type: 'boolean', description: { zh: '替换历史记录', en: 'Replaces history' } },
      loading: { type: 'boolean', description: { zh: '加载中', en: 'Loading' } },
    }),
    emits: createManifestFields<LinkEventMap>({
      click: { type: 'unknown', description: { zh: '点击', en: 'Clicked' } },
    }),
    slots: createManifestFields<LinkRegionMap>({
      content: { type: 'void', description: { zh: '主内容', en: 'Main content' } },
      prefix: { type: 'void', description: { zh: '前缀', en: 'Prefix' } },
      suffix: { type: 'void', description: { zh: '后缀', en: 'Suffix' } },
    }),
    exposes: [],
  },
});
