import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type {
  CollapseCommandMap,
  CollapseEventMap,
  CollapseItemRegionMap,
  CollapseRegionMap,
} from './contract';
import { collapseApiContract, collapseItemApiContract } from './contract';

export const collapseManifest = createComponentManifest({
  name: 'Collapse',
  category: 'navigation',
  description: { zh: '按需展开或收起内容面板。', en: 'Reveals or hides content panels on demand.' },
  semantics: ['expanded panels', 'accordion', 'persistent body', 'panel key'],
  accessibility: ['native button', 'expanded state', 'controlled region', 'keyboard activation'],
  testVectors: ['controlled state', 'accordion', 'expand all', 'disabled', 'body persistence'],
  contract: {
    props: createPropManifestFields(collapseApiContract, {
      value: { type: 'CollapseValue', description: { zh: '展开项', en: 'Expanded panels' } },
      defaultValue: {
        type: 'CollapseValue',
        description: { zh: '默认展开项', en: 'Default expanded panels' },
      },
      accordion: { type: 'boolean', description: { zh: '手风琴模式', en: 'Accordion mode' } },
      border: { type: 'boolean', description: { zh: '边框外观', en: 'Bordered appearance' } },
      filled: { type: 'boolean', description: { zh: '填充外观', en: 'Filled appearance' } },
      expandIconPosition: {
        type: 'CollapseIconPosition',
        description: { zh: '图标位置', en: 'Icon position' },
      },
      size: { type: 'CollapseSize', description: { zh: '尺寸', en: 'Size' } },
      expandAll: { type: 'boolean', description: { zh: '展开全部', en: 'Expand all' } },
    }),
    emits: createManifestFields<CollapseEventMap>({
      change: {
        type: 'CollapseValue',
        description: { zh: '展开项变化', en: 'Expanded panels changed' },
      },
    }),
    slots: createManifestFields<CollapseRegionMap>({
      content: { type: 'void', description: { zh: '面板条目', en: 'Panel items' } },
    }),
    exposes: createManifestFields<CollapseCommandMap>({
      focus: {
        type: '(key?: CollapseKey) => void',
        description: { zh: '聚焦面板标题', en: 'Focuses a panel header' },
      },
    }),
  },
});

export const collapseItemManifest = createComponentManifest({
  name: 'CollapseItem',
  category: 'navigation',
  description: { zh: '折叠面板中的单个内容项。', en: 'A single panel within Collapse.' },
  semantics: ['panel key', 'header', 'body', 'persistence'],
  accessibility: ['labelled region', 'disabled header'],
  testVectors: ['title', 'disabled', 'directive', 'custom icon'],
  contract: {
    props: createPropManifestFields(collapseItemApiContract, {
      name: { type: 'CollapseKey', description: { zh: '唯一标识', en: 'Unique key' } },
      title: { type: 'string', description: { zh: '标题', en: 'Title' } },
      disabled: { type: 'boolean', description: { zh: '禁用', en: 'Disabled' } },
      expandIcon: { type: 'string', description: { zh: '展开图标', en: 'Expand icon' } },
      color: { type: 'string', description: { zh: '分隔线颜色', en: 'Divider color' } },
      background: { type: 'string', description: { zh: '标题背景', en: 'Header background' } },
      directive: {
        type: 'CollapseDirective',
        description: { zh: '正文挂载策略', en: 'Body persistence' },
      },
    }),
    emits: [],
    slots: createManifestFields<CollapseItemRegionMap>({
      content: { type: 'void', description: { zh: '正文', en: 'Body' } },
      title: { type: 'void', description: { zh: '标题', en: 'Title' } },
      icon: { type: 'void', description: { zh: '图标', en: 'Icon' } },
    }),
    exposes: [],
  },
});
