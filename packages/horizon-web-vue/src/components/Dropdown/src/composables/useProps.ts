import type { ExtractPropTypes, PropType, TeleportProps, VNode } from 'vue';
import type {
  AdaptComponentApiShape,
  ComponentRendererPropDefinitions,
  DropdownCommonProps,
  DropdownGroupCommonProps,
  DropdownItemCommonProps,
  DropdownSubmenuCommonProps,
} from '@aurora/core';
import {
  DROPDOWN_DEFAULTS,
  DROPDOWN_ITEM_DEFAULTS,
  DROPDOWN_SUBMENU_DEFAULTS,
  isDropdownAlign,
  isDropdownSize,
  isDropdownSubmenuTrigger,
  isDropdownTheme,
  normalizeDropdownTrigger,
} from '@aurora/core';
import { declarePropType } from '@aurora/utils';
import { IconPropType } from '~/utils/useIcon';
import type { TooltipProps } from '~/components/Tooltip/src/composables/useProps';
import type { PopoverProps } from '~/components/Popover/src/composables/useProps';

type DropdownVueProps = AdaptComponentApiShape<
  DropdownCommonProps,
  {
    open: 'visible';
    width: 'popperWidth';
    portal: 'toBody';
    showDelay: 'showAfter';
    hideDelay: 'hideAfter';
    hideEvent: 'hideEventType';
  },
  'defaultOpen',
  {
    menu?: VNode;
    popperClass?: string;
    teleportTo?: TeleportProps['to'];
    popoverOptions?: Partial<PopoverProps>;
  }
>;

type DropdownGroupVueProps = AdaptComponentApiShape<
  DropdownGroupCommonProps,
  {},
  never,
  { titleTooltipOptions?: Partial<TooltipProps> }
>;

type DropdownItemVueProps = AdaptComponentApiShape<
  DropdownItemCommonProps,
  { allowImmediatePropagation: 'forbidEvtStop' },
  never,
  { icon?: unknown; tooltipOptions?: Partial<TooltipProps> }
>;

type DropdownSubmenuVueProps = AdaptComponentApiShape<
  DropdownSubmenuCommonProps,
  {},
  never,
  { icon?: unknown; popoverOptions?: Partial<PopoverProps> }
>;

export const useDropdownProps = declarePropType({
  /** 视觉主题。 @en Visual theme. */
  theme: {
    type: String as PropType<DropdownVueProps['theme']>,
    default: DROPDOWN_DEFAULTS.theme,
    validator: isDropdownTheme,
  },
  /** 触发方式；保留 contextMenu 历史别名。 @en Trigger interaction with the legacy contextMenu alias. */
  trigger: {
    type: String as PropType<DropdownVueProps['trigger'] | 'contextMenu'>,
    default: DROPDOWN_DEFAULTS.trigger,
    validator: (value: unknown) => {
      if (typeof value !== 'string') return false;
      return ['hover', 'click', 'manual', 'context-menu'].includes(
        normalizeDropdownTrigger(
          value as Exclude<DropdownVueProps['trigger'], undefined> | 'contextMenu',
        ),
      );
    },
  },
  /** 菜单尺寸。 @en Menu size. */
  size: {
    type: String as PropType<DropdownVueProps['size']>,
    required: false,
    validator: isDropdownSize,
  },
  /** 手动触发时的可见状态。 @en Visible state used by the manual trigger. */
  visible: { type: Boolean, default: DROPDOWN_DEFAULTS.defaultOpen },
  /** 禁用菜单。 @en Disables the menu. */
  disabled: { type: Boolean, default: DROPDOWN_DEFAULTS.disabled },
  /** 未指定位置时的对齐方式。 @en Alignment used when placement is omitted. */
  align: {
    type: String as PropType<DropdownVueProps['align']>,
    default: DROPDOWN_DEFAULTS.align,
    validator: isDropdownAlign,
  },
  /** 浮层位置。 @en Floating placement. */
  placement: { type: String as PropType<DropdownVueProps['placement']>, required: false },
  /** Vue 菜单 VNode。 @en Vue menu VNode. */
  menu: { type: Object as PropType<VNode>, required: false },
  /** CSS 层级。 @en Floating z-index. */
  zIndex: { type: Number, required: false },
  /** 浮层类名。 @en Floating class name. */
  popperClass: { type: String, required: false },
  /** 菜单宽度。 @en Menu width. */
  popperWidth: { type: [Number, String] as PropType<string | number>, required: false },
  /** 子菜单向左展开。 @en Opens submenus toward the left. */
  submenuLeft: { type: Boolean, default: DROPDOWN_DEFAULTS.submenuLeft },
  /** 使用 Teleport。 @en Uses Teleport. */
  toBody: { type: Boolean, default: DROPDOWN_DEFAULTS.portal },
  /** hover 打开延迟。 @en Hover open delay. */
  showAfter: { type: Number, default: DROPDOWN_DEFAULTS.showDelay },
  /** hover 关闭延迟。 @en Hover close delay. */
  hideAfter: { type: Number, default: DROPDOWN_DEFAULTS.hideDelay },
  /** 触发器与菜单的间距。 @en Distance between trigger and menu. */
  distance: { type: Number, default: DROPDOWN_DEFAULTS.distance },
  /** 与其他菜单互斥。 @en Closes other exclusive menus when opened. */
  exclusive: { type: Boolean, default: DROPDOWN_DEFAULTS.exclusive },
  /** Teleport 目标。 @en Teleport destination. */
  teleportTo: {
    type: [String, Object] as PropType<TeleportProps['to']>,
    default: 'body',
  },
  /** 外部关闭事件。 @en Outside dismissal event. */
  hideEventType: {
    type: String as PropType<DropdownVueProps['hideEventType']>,
    default: DROPDOWN_DEFAULTS.hideEvent,
  },
  /** Vue Popover 扩展参数。 @en Vue Popover extension options. */
  popoverOptions: { type: Object as PropType<Partial<PopoverProps>>, required: false },
} satisfies ComponentRendererPropDefinitions<DropdownVueProps>);

export const useDropdownGroupProps = declarePropType({
  /** 分组标题。 @en Group title. */
  title: { type: String, required: false },
  /** 标题 Tooltip 参数。 @en Title Tooltip options. */
  titleTooltipOptions: { type: Object as PropType<Partial<TooltipProps>>, required: false },
} satisfies ComponentRendererPropDefinitions<DropdownGroupVueProps>);

export const useDropdownItemProps = declarePropType({
  /** 禁用菜单项。 @en Disables the item. */
  disabled: { type: Boolean, default: DROPDOWN_ITEM_DEFAULTS.disabled },
  /** Vue 图标。 @en Vue icon. */
  icon: { type: IconPropType, required: false },
  /** 激活菜单项。 @en Marks the item active. */
  active: { type: Boolean, default: DROPDOWN_ITEM_DEFAULTS.active },
  /** 保留同节点后续监听器。 @en Keeps later listeners on the same node active. */
  forbidEvtStop: { type: Boolean, default: DROPDOWN_ITEM_DEFAULTS.allowImmediatePropagation },
  /** 激活时派发的命令。 @en Command emitted on activation. */
  command: { type: [String, Number, Object] as PropType<unknown>, required: false },
  /** 显示分隔线。 @en Shows a divider. */
  divided: { type: Boolean, default: DROPDOWN_ITEM_DEFAULTS.divided },
  /** 内容 Tooltip 参数。 @en Content Tooltip options. */
  tooltipOptions: { type: Object as PropType<Partial<TooltipProps>>, required: false },
} satisfies ComponentRendererPropDefinitions<DropdownItemVueProps>);

export const useDropdownSubmenuProps = declarePropType({
  /** 禁用子菜单。 @en Disables the submenu. */
  disabled: { type: Boolean, default: DROPDOWN_SUBMENU_DEFAULTS.disabled },
  /** 子菜单标题。 @en Submenu title. */
  title: { type: String, required: false },
  /** Vue 图标。 @en Vue icon. */
  icon: { type: IconPropType, required: false },
  /** 激活子菜单。 @en Marks the submenu active. */
  active: { type: Boolean, default: DROPDOWN_SUBMENU_DEFAULTS.active },
  /** 子菜单触发方式。 @en Submenu trigger interaction. */
  trigger: {
    type: String as PropType<DropdownSubmenuVueProps['trigger']>,
    default: DROPDOWN_SUBMENU_DEFAULTS.trigger,
    validator: isDropdownSubmenuTrigger,
  },
  /** 标记子菜单已选择。 @en Marks the submenu selected. */
  selected: { type: Boolean, default: DROPDOWN_SUBMENU_DEFAULTS.selected },
  /** Vue Popover 扩展参数。 @en Vue Popover extension options. */
  popoverOptions: { type: Object as PropType<Partial<PopoverProps>>, required: false },
} satisfies ComponentRendererPropDefinitions<DropdownSubmenuVueProps>);

export const useDropdownMenuProps = declarePropType({});

export type DropdownProps = ExtractPropTypes<typeof useDropdownProps>;
export type DropdownGroupProps = ExtractPropTypes<typeof useDropdownGroupProps>;
export type DropdownMenuProps = ExtractPropTypes<typeof useDropdownMenuProps>;
export type DropdownItemProps = ExtractPropTypes<typeof useDropdownItemProps>;
export type DropdownSubmenuProps = ExtractPropTypes<typeof useDropdownSubmenuProps>;
