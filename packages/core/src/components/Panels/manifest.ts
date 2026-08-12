import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type {
  PanelCommandMap,
  PanelEventMap,
  PanelRegionMap,
  PanelsCommandMap,
  PanelsEventMap,
  PanelsRegionMap,
} from './contract';
import { panelApiContract, panelsApiContract } from './contract';

export const panelsManifest = createComponentManifest({
  name: 'Panels',
  category: 'navigation',
  description: {
    zh: '根据当前键值显示一组可切换内容中的单个面板。',
    en: 'Displays one keyed panel from a switchable content collection.',
  },
  semantics: ['controlled selection', 'keyed panels', 'disabled panels', 'directional motion'],
  accessibility: ['tabpanel semantics', 'external labelled-by support'],
  testVectors: ['active panel', 'disabled panel', 'horizontal direction', 'vertical direction'],
  contract: {
    props: createPropManifestFields(panelsApiContract, {
      value: { type: 'PanelsKey', description: { zh: '当前面板', en: 'Current panel' } },
      animated: { type: 'boolean', description: { zh: '切换动画', en: 'Animated switching' } },
      vertical: { type: 'boolean', description: { zh: '垂直动画', en: 'Vertical motion' } },
    }),
    emits: createManifestFields<PanelsEventMap>({}),
    slots: createManifestFields<PanelsRegionMap>({
      content: { type: 'content', description: { zh: '面板条目', en: 'Panel items' } },
    }),
    exposes: createManifestFields<PanelsCommandMap>({}),
  },
});

export const panelManifest = createComponentManifest({
  name: 'Panel',
  category: 'navigation',
  description: {
    zh: 'Panels 中的单个具名内容面板。',
    en: 'A single named content panel within Panels.',
  },
  semantics: ['panel key', 'disabled state', 'panel content'],
  accessibility: ['content inherits tabpanel ownership'],
  testVectors: ['content', 'disabled state', 'native attributes'],
  contract: {
    props: createPropManifestFields(panelApiContract, {
      name: { type: 'PanelsKey', description: { zh: '面板标识', en: 'Panel key' } },
      disabled: { type: 'boolean', description: { zh: '禁用并隐藏', en: 'Disabled and hidden' } },
    }),
    emits: createManifestFields<PanelEventMap>({}),
    slots: createManifestFields<PanelRegionMap>({
      content: { type: 'content', description: { zh: '面板内容', en: 'Panel content' } },
    }),
    exposes: createManifestFields<PanelCommandMap>({}),
  },
});
