import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type {
  TabEventMap,
  TabRegionMap,
  TabsCommandMap,
  TabsEventMap,
  TabsRegionMap,
} from './contract';
import { tabApiContract, tabsApiContract } from './contract';

export const tabsManifest = createComponentManifest({
  name: 'Tabs',
  category: 'navigation',
  description: { zh: '在同级内容间快速切换。', en: 'Switches between peer views.' },
  semantics: ['selected tab', 'roving focus', 'editable actions', 'reorder'],
  accessibility: ['tablist', 'tab', 'selected state', 'keyboard navigation'],
  testVectors: ['controlled state', 'guard', 'close fallback', 'keyboard', 'reorder'],
  contract: {
    props: createPropManifestFields(tabsApiContract, {
      value: { type: 'TabsKey', description: { zh: '选中项', en: 'Selected tab' } },
      defaultValue: {
        type: 'TabsKey',
        description: { zh: '默认选中项', en: 'Default selected tab' },
      },
      size: { type: 'TabsSize', description: { zh: '尺寸', en: 'Size' } },
      draggable: { type: 'boolean', description: { zh: '拖拽排序', en: 'Drag reordering' } },
      scrollable: { type: 'boolean', description: { zh: '溢出滚动', en: 'Overflow navigation' } },
      focusable: {
        type: 'boolean',
        description: { zh: '选中项入视口', en: 'Selected tab visibility' },
      },
      arrow: { type: 'boolean', description: { zh: '导航箭头', en: 'Navigation arrows' } },
      variant: { type: 'TabsVariant', description: { zh: '外观', en: 'Variant' } },
      underline: { type: 'boolean', description: { zh: '分割线', en: 'Bottom divider' } },
      indicator: { type: 'boolean', description: { zh: '指示器', en: 'Selection indicator' } },
      editable: { type: 'boolean', description: { zh: '新增操作', en: 'Add action' } },
      beforeChange: {
        type: 'TabsBeforeChange',
        description: { zh: '切换守卫', en: 'Selection guard' },
      },
    }),
    emits: createManifestFields<TabsEventMap>({
      change: { type: 'TabsKey', description: { zh: '选中项变化', en: 'Selected tab changed' } },
      add: { type: 'void', description: { zh: '请求新增', en: 'Add requested' } },
      close: {
        type: 'TabsKey | undefined',
        description: { zh: '请求关闭', en: 'Close requested' },
      },
      sort: {
        type: '[number, number, readonly TabsKey[]]',
        description: { zh: '排序变化', en: 'Order changed' },
      },
    }),
    slots: createManifestFields<TabsRegionMap>({
      content: { type: 'void', description: { zh: '条目', en: 'Tabs' } },
      extra: {
        type: 'TabsExtraRegionContext',
        description: { zh: '额外操作', en: 'Extra actions' },
      },
    }),
    exposes: createManifestFields<TabsCommandMap>({
      focus: {
        type: '(key?: TabsKey) => void',
        description: { zh: '聚焦条目', en: 'Focuses a tab' },
      },
    }),
  },
});

export const tabManifest = createComponentManifest({
  name: 'Tab',
  category: 'navigation',
  description: { zh: '页签中的单个条目。', en: 'A single item within Tabs.' },
  semantics: ['tab identity', 'label', 'icon', 'close action'],
  accessibility: ['tab role', 'selected state', 'disabled state'],
  testVectors: ['label', 'disabled', 'closable', 'draggable'],
  contract: {
    props: createPropManifestFields(tabApiContract, {
      value: { type: 'TabsKey', description: { zh: '标识', en: 'Identity' } },
      label: { type: 'string | number', description: { zh: '文本', en: 'Label' } },
      icon: { type: 'string', description: { zh: '图标', en: 'Icon' } },
      iconSize: { type: 'string | number', description: { zh: '图标尺寸', en: 'Icon size' } },
      disabled: { type: 'boolean', description: { zh: '禁用', en: 'Disabled' } },
      closable: { type: 'boolean', description: { zh: '可关闭', en: 'Closable' } },
      draggable: { type: 'boolean', description: { zh: '可拖拽', en: 'Draggable' } },
    }),
    emits: createManifestFields<TabEventMap>({
      click: { type: 'TabsKey', description: { zh: '条目激活', en: 'Tab activated' } },
      close: { type: 'TabsKey', description: { zh: '条目关闭', en: 'Tab close requested' } },
    }),
    slots: createManifestFields<TabRegionMap>({
      content: {
        type: 'TabContentRegionContext',
        description: { zh: '条目内容', en: 'Tab content' },
      },
      icon: { type: 'void', description: { zh: '图标', en: 'Icon' } },
    }),
    exposes: [],
  },
});
