import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type { BadgeCommandMap, BadgeEventMap, BadgeRegionMap } from './contract';
import { badgeApiContract } from './contract';

export const badgeManifest = createComponentManifest({
  name: 'Badge',
  category: 'feedback',
  description: {
    zh: '为目标补充状态、数量或图标标记。',
    en: 'Adds a status, count, or icon marker to a target.',
  },
  semantics: ['dot', 'bounded count', 'icon marker', 'position offset'],
  accessibility: ['supplemental readable label', 'hidden state'],
  testVectors: ['dot', 'count maximum', 'icon', 'bottom position', 'custom offset'],
  contract: {
    props: createPropManifestFields(badgeApiContract, {
      type: {
        type: 'BadgeType',
        description: { zh: '标记类型', en: 'Marker type' },
      },
      content: {
        type: 'string | number',
        description: { zh: '标记内容', en: 'Marker content' },
      },
      hidden: {
        type: 'boolean',
        description: { zh: '是否隐藏', en: 'Whether hidden' },
      },
      numMax: {
        type: 'number',
        description: { zh: '数字上限', en: 'Maximum displayed number' },
      },
      bottom: {
        type: 'boolean',
        description: { zh: '是否位于底部', en: 'Whether positioned at the bottom' },
      },
      align: {
        type: 'BadgeAlign',
        description: { zh: '对齐方式', en: 'Alignment' },
      },
      offset: {
        type: 'BadgeOffset | null',
        description: { zh: '定位偏移', en: 'Position offset' },
      },
    }),
    emits: createManifestFields<BadgeEventMap>({}),
    slots: createManifestFields<BadgeRegionMap>({
      content: {
        type: 'content',
        description: { zh: '目标内容', en: 'Target content' },
      },
      icon: {
        type: 'content',
        description: { zh: '图标内容', en: 'Icon content' },
      },
    }),
    exposes: createManifestFields<BadgeCommandMap>({}),
  },
});
