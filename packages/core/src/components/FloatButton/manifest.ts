import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type {
  FloatButtonCommandMap,
  FloatButtonEventMap,
  FloatButtonGroupCommandMap,
  FloatButtonGroupEventMap,
  FloatButtonGroupRegionMap,
  FloatButtonRegionMap,
} from './contract';
import { floatButtonApiContract, floatButtonGroupApiContract } from './contract';

export const floatButtonManifest = createComponentManifest({
  name: 'FloatButton',
  category: 'navigation',
  description: {
    zh: '在界面上方提供常驻的快捷操作。',
    en: 'Provides a persistent shortcut action above the interface.',
  },
  semantics: [
    'action or link',
    'controlled visibility',
    'tooltip',
    'badge',
    'draggable adsorption',
  ],
  accessibility: ['button or link semantics', 'focusable action', 'tooltip ownership'],
  testVectors: ['variant', 'shape', 'link', 'badge layout', 'drag adsorption', 'stack offset'],
  contract: {
    props: createPropManifestFields(floatButtonApiContract, {
      icon: { type: 'unknown', description: { zh: '图标', en: 'Icon' } },
      description: { type: 'string', description: { zh: '描述', en: 'Description' } },
      tooltip: {
        type: 'FloatButtonTooltip',
        description: { zh: '提示参数', en: 'Tooltip options' },
      },
      variant: {
        type: 'FloatButtonVariant',
        description: { zh: '视觉类型', en: 'Visual variant' },
      },
      shape: { type: 'FloatButtonShape', description: { zh: '形状', en: 'Shape' } },
      href: { type: 'string', description: { zh: '导航链接', en: 'Navigation URL' } },
      target: { type: 'FloatButtonTarget', description: { zh: '链接目标', en: 'Link target' } },
      badge: { type: 'FloatButtonBadge', description: { zh: '徽标参数', en: 'Badge options' } },
      draggable: { type: 'boolean', description: { zh: '允许拖拽', en: 'Draggable' } },
      adsorbBottom: {
        type: 'boolean',
        description: { zh: '允许底部吸附', en: 'Bottom adsorption' },
      },
      visible: {
        type: 'boolean',
        description: { zh: '受控可见状态', en: 'Controlled visibility' },
      },
      defaultVisible: {
        type: 'boolean',
        description: { zh: '初始可见状态', en: 'Initial visibility' },
      },
    }),
    emits: createManifestFields<FloatButtonEventMap>({
      click: { type: 'unknown', description: { zh: '按钮激活', en: 'Button activated' } },
      visibleChange: {
        type: 'boolean',
        description: { zh: '可见状态变化', en: 'Visibility changed' },
      },
      dragStart: { type: 'void', description: { zh: '开始拖拽', en: 'Drag started' } },
      dragging: { type: 'void', description: { zh: '正在拖拽', en: 'Drag moved' } },
      dragEnd: { type: 'void', description: { zh: '结束拖拽', en: 'Drag ended' } },
    }),
    slots: createManifestFields<FloatButtonRegionMap>({
      icon: { type: 'void', description: { zh: '图标', en: 'Icon content' } },
      description: { type: 'void', description: { zh: '描述', en: 'Description content' } },
    }),
    exposes: createManifestFields<FloatButtonCommandMap>({
      show: { type: '() => void', description: { zh: '显示按钮', en: 'Shows the button' } },
      hide: { type: '() => void', description: { zh: '隐藏按钮', en: 'Hides the button' } },
      focus: { type: '() => void', description: { zh: '聚焦按钮', en: 'Focuses the button' } },
    }),
  },
});

export const floatButtonGroupManifest = createComponentManifest({
  name: 'FloatButtonGroup',
  category: 'navigation',
  description: {
    zh: '组织一组相关的悬浮快捷操作。',
    en: 'Groups related floating shortcut actions.',
  },
  semantics: [
    'controlled visibility',
    'controlled expansion',
    'click or hover trigger',
    'shared appearance',
  ],
  accessibility: ['expanded state', 'group ownership', 'keyboard trigger'],
  testVectors: [
    'collapsed initial state',
    'controlled expansion',
    'click trigger',
    'hover trigger',
    'drag suppression',
  ],
  contract: {
    props: createPropManifestFields(floatButtonGroupApiContract, {
      variant: {
        type: 'FloatButtonVariant',
        description: { zh: '组内视觉类型', en: 'Grouped variant' },
      },
      shape: { type: 'FloatButtonShape', description: { zh: '组内形状', en: 'Grouped shape' } },
      useCollapse: { type: 'boolean', description: { zh: '启用展开折叠', en: 'Enables collapse' } },
      trigger: {
        type: 'FloatButtonGroupTrigger',
        description: { zh: '触发方式', en: 'Trigger interaction' },
      },
      expandIcon: { type: 'unknown', description: { zh: '展开图标', en: 'Expand icon' } },
      foldIcon: { type: 'unknown', description: { zh: '折叠图标', en: 'Fold icon' } },
      expandTooltip: {
        type: 'FloatButtonTooltip',
        description: { zh: '展开提示', en: 'Expand tooltip' },
      },
      foldTooltip: {
        type: 'FloatButtonTooltip',
        description: { zh: '折叠提示', en: 'Fold tooltip' },
      },
      badge: { type: 'unknown', description: { zh: '折叠按钮徽标', en: 'Collapse button badge' } },
      draggable: { type: 'boolean', description: { zh: '允许拖拽', en: 'Draggable' } },
      adsorbBottom: {
        type: 'boolean',
        description: { zh: '允许底部吸附', en: 'Bottom adsorption' },
      },
      visible: {
        type: 'boolean',
        description: { zh: '受控可见状态', en: 'Controlled visibility' },
      },
      defaultVisible: {
        type: 'boolean',
        description: { zh: '初始可见状态', en: 'Initial visibility' },
      },
      expanded: {
        type: 'boolean',
        description: { zh: '受控展开状态', en: 'Controlled expanded state' },
      },
      defaultExpanded: {
        type: 'boolean',
        description: { zh: '初始展开状态', en: 'Initial expanded state' },
      },
    }),
    emits: createManifestFields<FloatButtonGroupEventMap>({
      visibleChange: {
        type: 'boolean',
        description: { zh: '可见状态变化', en: 'Visibility changed' },
      },
      expandedChange: {
        type: '[boolean, FloatButtonGroupExpansionDetails]',
        description: { zh: '展开状态变化', en: 'Expanded state changed' },
      },
      expand: { type: 'void', description: { zh: '组已展开', en: 'Group expanded' } },
      fold: { type: 'void', description: { zh: '组已折叠', en: 'Group folded' } },
      click: { type: 'void', description: { zh: '点击折叠按钮', en: 'Collapse button clicked' } },
    }),
    slots: createManifestFields<FloatButtonGroupRegionMap>({
      content: { type: 'void', description: { zh: '组内操作', en: 'Grouped actions' } },
    }),
    exposes: createManifestFields<FloatButtonGroupCommandMap>({
      show: { type: '() => void', description: { zh: '显示按钮组', en: 'Shows the group' } },
      hide: { type: '() => void', description: { zh: '隐藏按钮组', en: 'Hides the group' } },
      expand: { type: '() => void', description: { zh: '展开按钮组', en: 'Expands the group' } },
      fold: { type: '() => void', description: { zh: '折叠按钮组', en: 'Folds the group' } },
      toggle: { type: '() => void', description: { zh: '切换展开状态', en: 'Toggles expansion' } },
    }),
  },
});
