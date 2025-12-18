import { declarePropType } from '@aurora/shared';
import type { ExtractPropTypes, PropType, VNode, TeleportProps } from 'vue';
import { IconPropType } from '~/utils/useIcon';
import type { TooltipProps } from '~/components/Tooltip/src/composables/useProps';
import type { PopoverProps } from '~/components/Popover/src/composables/useProps';

export const useDropdownProps = declarePropType({
  /**
   * 主题
   */
  theme: {
    type: String as PropType<'default' | 'gray' | 'midnight'>,
    default: 'default',
  },
  /**
   * 触发方式
   * @version 2.0.5 支持 manual
   */
  trigger: {
    type: String as PropType<'hover' | 'click' | 'contextMenu' | 'context-menu' | 'manual'>,
    required: false,
    default: 'hover',
  },
  /**
   * 尺寸
   * @version 2.10.0
   */
  size: {
    type: String as PropType<'small' | 'medium'>,
  },
  /**
   * 控制是否显示，仅在 `manual` 时有效
   * @version 2.0.5
   */
  visible: {
    type: Boolean,
    default: false,
  },

  /**
   * 是否禁用 dropdown menu
   */
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },

  /**
   * dropdown menu 与 button 的对齐方式
   */
  align: {
    type: String as PropType<'left' | 'right' | 'center'>,
    required: false,
    default: 'left',
  },

  /**
   * 触发器位置，设置后会覆盖 `align` 配置
   * @version 2.0.5
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
   */
  menu: {
    type: Object as PropType<VNode>,
    required: false,
  },

  /**
   * 弹出层的层级
   */
  zIndex: {
    type: Number,
    required: false,
  },

  /**
   * 弹出层自定义类名
   */
  popperClass: {
    type: String,
  },

  /**
   * 弹出层自定义宽度
   * @version 2.12.0
   */
  popperWidth: {
    type: [Number, String],
  },

  /**
   * 有 `submenu` 时的子菜单弹出方向是否朝左边
   */
  submenuLeft: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否将元素发送到 `Body` 上
   * @version 1.5.7
   */
  toBody: {
    type: Boolean,
    default: true,
  },
  /**
   * 延迟显示的事件，单位ms
   * 仅在 `trigger = 'hover'` 时有效
   * @version 2.0.5
   */
  showAfter: {
    type: Number,
    default: 200,
  },
  /**
   * 延迟显示的事件，单位ms
   * 仅在 `trigger = 'hover'` 时有效
   * @version 2.0.5
   */
  hideAfter: {
    type: Number,
    default: 100,
  },
  /**
   * 触发器与弹出层距离
   * 不适用于 `trigger = 'context-menu'` 的情况
   */
  distance: {
    type: Number,
    default: 4,
  },
  /**
   * 是否与其他 `dropdown` 显示互斥
   * @version 2.0.18
   */
  exclusive: {
    type: Boolean,
    default: true,
  },
  /**
   * 挂载的位置，默认是 `body`
   * @version 2.3.3
   */
  teleportTo: {
    type: [String, Object] as PropType<TeleportProps['to']>,
    default: 'body',
  },
  /**
   * 继承 `popover` 的 `hideEventType` 属性
   * @version 2.5.0
   */
  hideEventType: {
    type: String as PropType<'click' | 'mousedown' | 'mouseup'>,
    default: 'click',
  },
  /**
   * `popover` 的额外参数
   * @version 2.4.9
   */
  popoverOptions: {
    type: Object as PropType<Partial<PopoverProps>>,
  },
});

export const useDropdownGroupProps = declarePropType({
  /**
   * 分组标题
   */
  title: {
    type: String,
    required: false,
  },
  /**
   * 标题的 tooltip 配置
   * @version 2.0.5
   */
  titleTooltipOptions: {
    type: Object as PropType<Partial<TooltipProps>>,
    required: false,
  },
});

export const useDropdownItemProps = declarePropType({
  /**
   * 是否禁用 menu item
   */
  disabled: {
    type: Boolean,
    required: false,
  },

  /**
   * icon
   * @version 2.0.5 可以传入 Icon 对象
   */
  icon: {
    type: IconPropType,
    required: false,
  },

  /**
   * 是否激活
   */
  active: {
    type: Boolean,
    required: false,
  },

  /**
   * 是否不禁用事件冒泡
   */
  forbidEvtStop: {
    type: Boolean,
    default: false,
  },
  /**
   * 派发到 `n-dropdown-menu` 的 `command` 事件的参数
   */
  command: {
    type: [String, Number, Object],
  },
  /**
   * 是否显示分隔符
   * @version 2.0.5
   */
  divided: {
    type: Boolean,
    default: false,
  },
  /**
   * 内容文字的 tooltip 配置
   * @version 2.0.5
   */
  tooltipOptions: {
    type: Object as PropType<Partial<TooltipProps>>,
    required: false,
  },
});

export const useDropdownSubmenuProps = declarePropType({
  /**
   * 是否禁用当前子菜单
   */
  disabled: {
    type: Boolean,
    required: false,
  },

  /**
   * 当前子菜单展示的内容
   */
  title: {
    type: String,
    required: false,
  },

  /**
   * icon
   * @version 2.0.5 可以传入 Icon 对象
   */
  icon: {
    type: IconPropType,
    required: false,
  },
  /**
   * 是否处于激活态
   * @version 2.0.5
   */
  active: {
    type: Boolean,
    default: false,
  },

  /**
   * 触发方式
   */
  trigger: {
    type: String as PropType<'hover' | 'click'>,
    required: false,
    default: 'hover',
  },
  /**
   * 是否已选择
   * @version 2.0.16
   */
  selected: {
    type: Boolean,
    default: false,
  },
  /**
   * `popover` 的额外参数
   * @version 2.9.1
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
