import {
  createComponentManifest,
  createManifestFields,
  createPropManifestFields,
} from '../_shared/manifest';
import type {
  DropdownCommandMap,
  DropdownEventMap,
  DropdownGroupRegionMap,
  DropdownItemEventMap,
  DropdownItemRegionMap,
  DropdownMenuRegionMap,
  DropdownRegionMap,
  DropdownSubmenuEventMap,
  DropdownSubmenuRegionMap,
} from './contract';
import {
  dropdownApiContract,
  dropdownGroupApiContract,
  dropdownItemApiContract,
  dropdownMenuApiContract,
  dropdownSubmenuApiContract,
} from './contract';

export const dropdownManifest = createComponentManifest({
  name: 'Dropdown',
  category: 'navigation',
  description: {
    zh: '展示一组上下文操作或导航项。',
    en: 'Displays contextual actions or navigation items.',
  },
  semantics: ['controlled open', 'delayed trigger', 'context menu', 'exclusive menus', 'commands'],
  accessibility: ['menu ownership', 'keyboard navigation', 'escape dismissal', 'focus return'],
  testVectors: ['alignment', 'trigger aliases', 'keyboard wrapping', 'disabled', 'commands'],
  contract: {
    props: createPropManifestFields(dropdownApiContract, {
      theme: { type: 'DropdownTheme', description: { zh: '主题', en: 'Theme' } },
      trigger: {
        type: 'DropdownTrigger',
        description: { zh: '触发方式', en: 'Trigger interaction' },
      },
      open: { type: 'boolean', description: { zh: '受控打开状态', en: 'Controlled open state' } },
      defaultOpen: {
        type: 'boolean',
        description: { zh: '初始打开状态', en: 'Initial open state' },
      },
      size: { type: 'DropdownSize', description: { zh: '尺寸', en: 'Size' } },
      disabled: { type: 'boolean', description: { zh: '禁用', en: 'Disabled' } },
      align: { type: 'DropdownAlign', description: { zh: '对齐方式', en: 'Alignment' } },
      placement: { type: 'PopoverPlacement', description: { zh: '浮层位置', en: 'Placement' } },
      zIndex: { type: 'number', description: { zh: '层级', en: 'Z-index' } },
      width: { type: 'string | number', description: { zh: '菜单宽度', en: 'Menu width' } },
      submenuLeft: {
        type: 'boolean',
        description: { zh: '子菜单向左展开', en: 'Left-opening submenus' },
      },
      portal: { type: 'boolean', description: { zh: '使用挂载容器', en: 'Uses a portal' } },
      showDelay: { type: 'number', description: { zh: '打开延迟', en: 'Open delay' } },
      hideDelay: { type: 'number', description: { zh: '关闭延迟', en: 'Close delay' } },
      distance: { type: 'number', description: { zh: '浮层间距', en: 'Floating distance' } },
      exclusive: {
        type: 'boolean',
        description: { zh: '与其他菜单互斥', en: 'Exclusive with other menus' },
      },
      hideEvent: {
        type: 'PopoverHideEvent',
        description: { zh: '外部关闭事件', en: 'Outside dismissal event' },
      },
    }),
    emits: createManifestFields<DropdownEventMap>({
      openChange: {
        type: '[boolean, TooltipChangeDetails]',
        description: { zh: '打开状态变化', en: 'Open state changed' },
      },
      command: { type: 'unknown', description: { zh: '菜单命令', en: 'Menu command' } },
    }),
    slots: createManifestFields<DropdownRegionMap>({
      trigger: { type: 'void', description: { zh: '触发元素', en: 'Trigger element' } },
      menu: { type: 'void', description: { zh: '菜单内容', en: 'Menu content' } },
    }),
    exposes: createManifestFields<DropdownCommandMap>({
      open: { type: '() => void', description: { zh: '打开菜单', en: 'Opens the menu' } },
      close: { type: '() => void', description: { zh: '关闭菜单', en: 'Closes the menu' } },
      focusFirst: {
        type: '() => void',
        description: { zh: '聚焦首个菜单项', en: 'Focuses the first item' },
      },
    }),
  },
});

export const dropdownMenuManifest = createComponentManifest({
  name: 'DropdownMenu',
  category: 'navigation',
  description: { zh: '下拉菜单内容容器。', en: 'Content container for a dropdown menu.' },
  semantics: ['menu container'],
  accessibility: ['menu role'],
  testVectors: ['content'],
  contract: {
    props: createPropManifestFields(dropdownMenuApiContract, {}),
    emits: [],
    slots: createManifestFields<DropdownMenuRegionMap>({
      content: { type: 'void', description: { zh: '菜单项', en: 'Menu items' } },
    }),
    exposes: [],
  },
});

export const dropdownGroupManifest = createComponentManifest({
  name: 'DropdownGroup',
  category: 'navigation',
  description: { zh: '下拉菜单分组。', en: 'Groups related dropdown items.' },
  semantics: ['group title', 'group content'],
  accessibility: ['group ownership'],
  testVectors: ['title', 'content'],
  contract: {
    props: createPropManifestFields(dropdownGroupApiContract, {
      title: { type: 'string', description: { zh: '分组标题', en: 'Group title' } },
    }),
    emits: [],
    slots: createManifestFields<DropdownGroupRegionMap>({
      title: { type: 'void', description: { zh: '分组标题', en: 'Group title' } },
      content: { type: 'void', description: { zh: '分组内容', en: 'Group content' } },
    }),
    exposes: [],
  },
});

export const dropdownItemManifest = createComponentManifest({
  name: 'DropdownItem',
  category: 'navigation',
  description: { zh: '下拉菜单中的单个操作项。', en: 'A single action within a dropdown menu.' },
  semantics: ['command', 'active', 'divider'],
  accessibility: ['menuitem role', 'disabled state', 'keyboard activation'],
  testVectors: ['command', 'disabled', 'active', 'event propagation'],
  contract: {
    props: createPropManifestFields(dropdownItemApiContract, {
      disabled: { type: 'boolean', description: { zh: '禁用', en: 'Disabled' } },
      active: { type: 'boolean', description: { zh: '激活', en: 'Active' } },
      allowImmediatePropagation: {
        type: 'boolean',
        description: { zh: '允许同节点后续监听器', en: 'Allows later same-node listeners' },
      },
      command: { type: 'unknown', description: { zh: '命令', en: 'Command' } },
      divided: { type: 'boolean', description: { zh: '分隔线', en: 'Divider' } },
    }),
    emits: createManifestFields<DropdownItemEventMap>({
      press: { type: 'unknown', description: { zh: '菜单项激活', en: 'Item activated' } },
    }),
    slots: createManifestFields<DropdownItemRegionMap>({
      icon: { type: 'void', description: { zh: '前置图标', en: 'Leading icon' } },
      content: { type: 'void', description: { zh: '内容', en: 'Content' } },
    }),
    exposes: [],
  },
});

export const dropdownSubmenuManifest = createComponentManifest({
  name: 'DropdownSubmenu',
  category: 'navigation',
  description: { zh: '包含下级菜单的菜单项。', en: 'A menu item that owns a nested menu.' },
  semantics: ['nested menu', 'sibling ownership', 'selected state'],
  accessibility: ['submenu ownership', 'expanded state', 'keyboard activation'],
  testVectors: ['hover', 'click', 'disabled', 'nested content'],
  contract: {
    props: createPropManifestFields(dropdownSubmenuApiContract, {
      disabled: { type: 'boolean', description: { zh: '禁用', en: 'Disabled' } },
      title: { type: 'string', description: { zh: '标题', en: 'Title' } },
      active: { type: 'boolean', description: { zh: '激活', en: 'Active' } },
      trigger: {
        type: 'DropdownSubmenuTrigger',
        description: { zh: '触发方式', en: 'Trigger interaction' },
      },
      selected: { type: 'boolean', description: { zh: '已选择', en: 'Selected' } },
    }),
    emits: createManifestFields<DropdownSubmenuEventMap>({
      press: {
        type: 'unknown',
        description: { zh: '子菜单触发器激活', en: 'Submenu trigger activated' },
      },
    }),
    slots: createManifestFields<DropdownSubmenuRegionMap>({
      icon: { type: 'void', description: { zh: '前置图标', en: 'Leading icon' } },
      content: { type: 'void', description: { zh: '标题内容', en: 'Title content' } },
      submenu: { type: 'void', description: { zh: '子菜单内容', en: 'Nested menu content' } },
    }),
    exposes: [],
  },
});
