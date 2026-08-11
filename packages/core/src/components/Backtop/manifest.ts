import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { BacktopCommandMap, BacktopEventMap, BacktopRegionMap } from './contract';
import { backtopApiContract } from './contract';

export const backtopManifest = createComponentManifest({
  name: 'Backtop',
  category: 'navigation',
  description: {
    zh: '在长页面或滚动容器中提供快速返回顶部的操作。',
    en: 'Provides a quick return-to-top action for long pages or scrolling containers.',
  },
  semantics: ['scroll threshold visibility', 'page or element target', 'smooth return to top'],
  accessibility: ['button semantics', 'accessible name', 'keyboard activation'],
  testVectors: ['threshold boundary', 'element target', 'window fallback', 'animation cleanup'],
  contract: {
    props: createPropManifestFields(backtopApiContract, {
      visibilityHeight: {
        type: 'number',
        description: { zh: '显示阈值', en: 'Visibility threshold' },
      },
      bottom: { type: 'number', description: { zh: '底部偏移', en: 'Bottom offset' } },
      right: { type: 'number', description: { zh: '右侧偏移', en: 'Right offset' } },
      target: { type: 'unknown', description: { zh: '滚动目标', en: 'Scroll target' } },
    }),
    emits: createManifestFields<BacktopEventMap>({
      click: { type: 'unknown', description: { zh: '按钮激活', en: 'Action activated' } },
    }),
    slots: createManifestFields<BacktopRegionMap>({
      content: { type: 'void', description: { zh: '按钮内容', en: 'Action content' } },
    }),
    exposes: createManifestFields<BacktopCommandMap>({
      scrollToTop: {
        type: '() => void',
        description: { zh: '滚动到顶部', en: 'Scrolls to the top' },
      },
      focus: { type: '() => void', description: { zh: '聚焦按钮', en: 'Focuses the action' } },
    }),
  },
});
