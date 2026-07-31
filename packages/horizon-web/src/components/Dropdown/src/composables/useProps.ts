import { declarePropType } from '@aurora/utils';
import type { ExtractPropTypes, PropType, VNode, TeleportProps } from 'vue';
import { IconPropType } from '~/utils/useIcon';
import type { TooltipProps } from '~/components/Tooltip/src/composables/useProps';
import type { PopoverProps } from '~/components/Popover/src/composables/useProps';

export const useDropdownProps = declarePropType({
  /**
   * 主题
    * @en Configuration for theme.
   */
  theme: {
    type: String as PropType<'default' | 'gray' | 'midnight'>,
    default: 'default',
  },
  /**
   * 触发方式
    * @en Configuration for trigger.
   */
  trigger: {
    type: String as PropType<'hover' | 'click' | 'contextMenu' | 'context-menu' | 'manual'>,
    required: false,
    default: 'hover',
  },
  /**
   * 尺寸
    * @en Configuration for size.
   */
  size: {
    type: String as PropType<'small' | 'medium'>,
  },
  /**
   * 控制是否显示，仅在 `manual` 时有效
    * @en Configuration for visible.
   */
  visible: {
    type: Boolean,
    default: false,
  },

  /**
   * 是否禁用 dropdown menu
    * @en Configuration for disabled.
   */
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },

  /**
   * dropdown menu 与 button 的对齐方式
    * @en Configuration for align.
   */
  align: {
    type: String as PropType<'left' | 'right' | 'center'>,
    required: false,
    default: 'left',
  },

  /**
   * 触发器位置，设置后会覆盖 `align` 配置
    * @en Configuration for placement.
   */
  placement: {
    type: String as PropType<
      | 'auto'
      | 'auto-start'
      | 'auto-end'
      | 'top-start'
      | 'top-end'
      | 'bottom-start'
      | 'bottom-end'
      | 'right-start'
      | 'right-end'
      | 'left-start'
      | 'left-end'
      | 'top'
      | 'bottom'
      | 'right'
      | 'left'
    >,
  },
  /**
   * dropdown 菜单内容
    * @en Configuration for menu.
   */
  menu: {
    type: Object as PropType<VNode>,
    required: false,
  },

  /**
   * 弹出层的层级
    * @en Configuration for z index.
   */
  zIndex: {
    type: Number,
    required: false,
  },

  /**
   * 弹出层自定义类名
    * @en Configuration for popper class.
   */
  popperClass: {
    type: String,
  },

  /**
   * 弹出层自定义宽度
    * @en Configuration for popper width.
   */
  popperWidth: {
    type: [Number, String],
  },

  /**
   * 有 `submenu` 时的子菜单弹出方向是否朝左边
    * @en Configuration for submenu left.
   */
  submenuLeft: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否将元素发送到 `Body` 上
    * @en Configuration for to body.
   */
  toBody: {
    type: Boolean,
    default: true,
  },
  /**
   * 延迟显示的事件，单位ms
   * 仅在 `trigger = 'hover'` 时有效
    * @en Configuration for show after.
   */
  showAfter: {
    type: Number,
    default: 200,
  },
  /**
   * 延迟显示的事件，单位ms
   * 仅在 `trigger = 'hover'` 时有效
    * @en Configuration for hide after.
   */
  hideAfter: {
    type: Number,
    default: 100,
  },
  /**
   * 触发器与弹出层距离
   * 不适用于 `trigger = 'context-menu'` 的情况
    * @en Configuration for distance.
   */
  distance: {
    type: Number,
    default: 4,
  },
  /**
   * 是否与其他 `dropdown` 显示互斥
    * @en Configuration for exclusive.
   */
  exclusive: {
    type: Boolean,
    default: true,
  },
  /**
   * 挂载的位置，默认是 `body`
    * @en Configuration for teleport to.
   */
  teleportTo: {
    type: [String, Object] as PropType<TeleportProps['to']>,
    default: 'body',
  },
  /**
   * 继承 `popover` 的 `hideEventType` 属性
    * @en Configuration for hide event type.
   */
  hideEventType: {
    type: String as PropType<'click' | 'mousedown' | 'mouseup'>,
    default: 'click',
  },
  /**
   * `popover` 的额外参数
    * @en Configuration for popover options.
   */
  popoverOptions: {
    type: Object as PropType<Partial<PopoverProps>>,
  },
});

export const useDropdownGroupProps = declarePropType({
  /**
   * 分组标题
    * @en Configuration for title.
   */
  title: {
    type: String,
    required: false,
  },
  /**
   * 标题的 tooltip 配置
    * @en Configuration for title tooltip options.
   */
  titleTooltipOptions: {
    type: Object as PropType<Partial<TooltipProps>>,
    required: false,
  },
});

export const useDropdownItemProps = declarePropType({
  /**
   * 是否禁用 menu item
    * @en Configuration for disabled.
   */
  disabled: {
    type: Boolean,
    required: false,
  },

  /**
   * icon
    * @en Configuration for icon.
   */
  icon: {
    type: IconPropType,
    required: false,
  },

  /**
   * 是否激活
    * @en Configuration for active.
   */
  active: {
    type: Boolean,
    required: false,
  },

  /**
   * 是否不禁用事件冒泡
    * @en Configuration for forbid evt stop.
   */
  forbidEvtStop: {
    type: Boolean,
    default: false,
  },
  /**
   * 派发到 `h-dropdown-menu` 的 `command` 事件的参数
    * @en Configuration for command.
   */
  command: {
    type: [String, Number, Object],
  },
  /**
   * 是否显示分隔符
    * @en Configuration for divided.
   */
  divided: {
    type: Boolean,
    default: false,
  },
  /**
   * 内容文字的 tooltip 配置
    * @en Configuration for tooltip options.
   */
  tooltipOptions: {
    type: Object as PropType<Partial<TooltipProps>>,
    required: false,
  },
});

export const useDropdownSubmenuProps = declarePropType({
  /**
   * 是否禁用当前子菜单
    * @en Configuration for disabled.
   */
  disabled: {
    type: Boolean,
    required: false,
  },

  /**
   * 当前子菜单展示的内容
    * @en Configuration for title.
   */
  title: {
    type: String,
    required: false,
  },

  /**
   * icon
    * @en Configuration for icon.
   */
  icon: {
    type: IconPropType,
    required: false,
  },
  /**
   * 是否处于激活态
    * @en Configuration for active.
   */
  active: {
    type: Boolean,
    default: false,
  },

  /**
   * 触发方式
    * @en Configuration for trigger.
   */
  trigger: {
    type: String as PropType<'hover' | 'click'>,
    required: false,
    default: 'hover',
  },
  /**
   * 是否已选择
    * @en Configuration for selected.
   */
  selected: {
    type: Boolean,
    default: false,
  },
  /**
   * `popover` 的额外参数
    * @en Configuration for popover options.
   */
  popoverOptions: {
    type: Object as PropType<Partial<PopoverProps>>,
  },
});

export const useDropdownMenuProps = declarePropType({});

export type DropdownProps = ExtractPropTypes<typeof useDropdownProps>;
export type DropdownGroupProps = ExtractPropTypes<typeof useDropdownGroupProps>;
export type DropdownMenuProps = ExtractPropTypes<typeof useDropdownMenuProps>;
export type DropdownItemProps = ExtractPropTypes<typeof useDropdownItemProps>;
export type DropdownSubmenuProps = ExtractPropTypes<typeof useDropdownSubmenuProps>;
