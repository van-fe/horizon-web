import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type {
  TagCommandMap,
  TagEventMap,
  TagGroupCommandMap,
  TagGroupEventMap,
  TagGroupRegionMap,
  TagRegionMap,
} from './contract';
import { tagApiContract, tagGroupApiContract } from './contract';

export const tagManifest = createComponentManifest({
  name: 'Tag',
  category: 'basic',
  description: {
    zh: '标记对象的类别、状态或属性。',
    en: 'Labels an object category, state, or attribute.',
  },
  semantics: ['controlled activation', 'close action', 'inline editing', 'semantic color'],
  accessibility: ['keyboard action', 'checked state', 'separate close control'],
  testVectors: [
    'controlled rejection',
    'disabled interaction',
    'guarded close',
    'edit lifecycle',
    'custom color states',
  ],
  contract: {
    props: createPropManifestFields(tagApiContract),
    emits: createManifestFields<TagEventMap>({
      activeChange: {
        type: 'boolean',
        description: { zh: '激活状态提案', en: 'Active-state proposal' },
      },
      press: { type: 'unknown', description: { zh: '标签操作', en: 'Tag action' } },
      close: { type: 'unknown', description: { zh: '关闭操作', en: 'Close action' } },
    }),
    slots: createManifestFields<TagRegionMap>({
      content: { type: 'void', description: { zh: '标签内容', en: 'Tag content' } },
      icon: { type: '{ color?: string }', description: { zh: '图标', en: 'Icon' } },
      avatar: { type: 'void', description: { zh: '头像', en: 'Avatar' } },
      tooltipContent: { type: 'void', description: { zh: '提示内容', en: 'Tooltip content' } },
    }),
    exposes: createManifestFields<TagCommandMap>({
      edit: {
        type: '(content?: string) => void',
        runtimeType: 'function',
        description: { zh: '进入编辑状态', en: 'Enters edit mode' },
      },
    }),
  },
});

export const tagGroupManifest = createComponentManifest({
  name: 'TagGroup',
  category: 'basic',
  description: {
    zh: '组织、折叠和编辑一组相关标签。',
    en: 'Organizes, collapses, and edits related tags.',
  },
  semantics: ['overflow collapse', 'guarded creation', 'guarded editing', 'guarded close'],
  accessibility: ['group semantics', 'keyboard expansion', 'announced pending state'],
  testVectors: [
    'minimum visible count',
    'resize recalculation',
    'duplicate async guard',
    'rejected mutation',
    'destroyed mutation',
  ],
  contract: {
    props: createPropManifestFields(tagGroupApiContract),
    emits: createManifestFields<TagGroupEventMap>({
      created: { type: 'string', description: { zh: '创建完成', en: 'Tag created' } },
      edited: {
        type: '[string, string, TagId?]',
        description: { zh: '编辑完成', en: 'Tag edited' },
      },
      closed: { type: 'TagId | undefined', description: { zh: '关闭完成', en: 'Tag closed' } },
      toggled: {
        type: 'boolean',
        description: { zh: '展开状态变化', en: 'Expanded state changed' },
      },
      exceeded: { type: 'void', description: { zh: '出现溢出', en: 'Overflow detected' } },
    }),
    slots: createManifestFields<TagGroupRegionMap>({
      content: { type: 'void', description: { zh: '标签列表', en: 'Tag list' } },
      createText: {
        type: '{ tags: readonly TagCommonProps[] }',
        description: { zh: '创建文字', en: 'Create label' },
      },
      create: {
        type: '{ tags: readonly TagCommonProps[] }',
        description: { zh: '创建操作', en: 'Create action' },
      },
      prepend: { type: 'void', description: { zh: '组前内容', en: 'Content before the group' } },
      append: { type: 'void', description: { zh: '组后内容', en: 'Content after the group' } },
      prefix: {
        type: 'void',
        description: { zh: '容器前置内容', en: 'Leading container content' },
      },
      suffix: {
        type: 'void',
        description: { zh: '容器后置内容', en: 'Trailing container content' },
      },
    }),
    exposes: createManifestFields<TagGroupCommandMap>({
      toggle: {
        type: '(expanded?: boolean) => void',
        runtimeType: 'function',
        description: { zh: '设置展开状态', en: 'Sets expanded state' },
      },
      calculate: {
        type: '() => void | Promise<void>',
        runtimeType: 'function',
        description: { zh: '重新计算折叠', en: 'Recalculates collapse' },
      },
    }),
  },
});
