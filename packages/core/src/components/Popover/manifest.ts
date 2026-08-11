import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type {
  PopContentRegionMap,
  PopoverCommandMap,
  PopoverEventMap,
  PopoverRegionMap,
} from './contract';
import { popContentApiContract, popoverApiContract } from './contract';

export const popoverManifest = createComponentManifest({
  name: 'Popover',
  category: 'overlay',
  description: {
    zh: '展示可交互的上下文浮层。',
    en: 'Displays an interactive contextual overlay.',
  },
  semantics: ['controlled open', 'delayed triggers', 'outside dismissal', 'portal'],
  accessibility: ['dialog ownership', 'expanded state', 'escape dismissal', 'focus return'],
  testVectors: ['hover delay', 'click dismissal', 'manual state', 'disabled', 'position update'],
  contract: {
    props: createPropManifestFields(popoverApiContract, {
      trigger: {
        type: 'PopoverTrigger',
        description: { zh: '触发方式', en: 'Trigger interaction' },
      },
      open: { type: 'boolean', description: { zh: '受控打开状态', en: 'Controlled open state' } },
      defaultOpen: {
        type: 'boolean',
        description: { zh: '初始打开状态', en: 'Initial open state' },
      },
      placement: { type: 'PopoverPlacement', description: { zh: '浮层位置', en: 'Placement' } },
      skidding: { type: 'number', description: { zh: '交叉轴偏移', en: 'Cross-axis offset' } },
      distance: { type: 'number', description: { zh: '主轴间距', en: 'Distance' } },
      flip: { type: 'boolean', description: { zh: '自动翻转', en: 'Automatic flip' } },
      arrow: { type: 'boolean', description: { zh: '展示箭头', en: 'Arrow visibility' } },
      arrowOptions: {
        type: 'PopoverArrowOptions',
        description: { zh: '箭头参数', en: 'Arrow options' },
      },
      destroyOnHide: { type: 'boolean', description: { zh: '隐藏后销毁', en: 'Unmount on close' } },
      portal: { type: 'boolean', description: { zh: '使用挂载容器', en: 'Uses a portal' } },
      resizeObserve: {
        type: 'boolean',
        description: { zh: '监听尺寸', en: 'Observes size changes' },
      },
      referenceOverflowObserve: {
        type: 'boolean',
        description: { zh: '监听触发器溢出', en: 'Observes reference visibility' },
      },
      sameWidth: {
        type: 'boolean',
        description: { zh: '与触发器同宽', en: 'Matches reference width' },
      },
      setMinWidth: { type: 'boolean', description: { zh: '使用最小宽度', en: 'Uses min-width' } },
      sameHeight: {
        type: 'boolean',
        description: { zh: '与触发器同高', en: 'Matches reference height' },
      },
      showDelay: { type: 'number', description: { zh: '打开延迟', en: 'Open delay' } },
      hideDelay: { type: 'number', description: { zh: '关闭延迟', en: 'Close delay' } },
      fallbackPlacements: {
        type: 'readonly PopoverPlacement[]',
        description: { zh: '备选位置', en: 'Fallback placements' },
      },
      zIndex: { type: 'number', description: { zh: '层级', en: 'Z-index' } },
      hideEvent: {
        type: 'PopoverHideEvent',
        description: { zh: '外部关闭事件', en: 'Outside dismissal event' },
      },
      disabled: { type: 'boolean', description: { zh: '禁用', en: 'Disabled' } },
      mask: { type: 'PopoverMaskOptions', description: { zh: '遮罩', en: 'Overlay mask' } },
      stopPropagation: {
        type: 'boolean',
        description: { zh: '阻止点击冒泡', en: 'Stops click propagation' },
      },
      theme: { type: 'PopoverTheme', description: { zh: '主题', en: 'Theme' } },
      preventOverflow: {
        type: 'boolean',
        description: { zh: '限制在视口内', en: 'Prevents viewport overflow' },
      },
      mainAxisCheck: {
        type: 'boolean',
        description: { zh: '检查主轴遮挡', en: 'Checks main-axis overflow' },
      },
      strategy: {
        type: 'PopoverStrategy',
        description: { zh: '定位策略', en: 'Positioning strategy' },
      },
    }),
    emits: createManifestFields<PopoverEventMap>({
      openChange: {
        type: '[boolean, TooltipChangeDetails]',
        description: { zh: '打开状态变化', en: 'Open state changed' },
      },
      show: { type: 'void', description: { zh: '浮层显示', en: 'Popover shown' } },
      hide: { type: 'void', description: { zh: '浮层隐藏', en: 'Popover hidden' } },
      enterReference: {
        type: 'unknown',
        description: { zh: '进入触发器', en: 'Reference entered' },
      },
      leaveReference: { type: 'unknown', description: { zh: '离开触发器', en: 'Reference left' } },
      click: { type: 'unknown', description: { zh: '点击触发器', en: 'Reference clicked' } },
    }),
    slots: createManifestFields<PopoverRegionMap>({
      trigger: { type: 'void', description: { zh: '触发元素', en: 'Trigger element' } },
      content: { type: 'void', description: { zh: '浮层内容', en: 'Floating content' } },
    }),
    exposes: createManifestFields<PopoverCommandMap>({
      open: { type: '() => void', description: { zh: '打开', en: 'Opens the popover' } },
      close: { type: '() => void', description: { zh: '关闭', en: 'Closes the popover' } },
      updatePosition: {
        type: '() => void | Promise<void>',
        description: { zh: '更新位置', en: 'Updates position' },
      },
    }),
  },
});

export const popContentManifest = createComponentManifest({
  name: 'PopContent',
  category: 'overlay',
  description: { zh: 'Popover 的预置内容容器。', en: 'Preset content container for Popover.' },
  semantics: ['content surface', 'theme'],
  accessibility: ['inherits popover ownership'],
  testVectors: ['light theme', 'dark theme'],
  contract: {
    props: createPropManifestFields(popContentApiContract, {
      theme: { type: 'PopoverTheme', description: { zh: '主题', en: 'Theme' } },
    }),
    emits: [],
    slots: createManifestFields<PopContentRegionMap>({
      content: { type: 'void', description: { zh: '内容', en: 'Content' } },
    }),
    exposes: [],
  },
});
