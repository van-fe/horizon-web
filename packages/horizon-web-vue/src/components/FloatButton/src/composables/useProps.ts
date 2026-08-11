import type { ExtractPropTypes, PropType, VNode } from 'vue';
import { declarePropType } from '@aurora/utils';
import { IconPropType } from '~/utils/useIcon';
import type { TooltipProps } from '~/components/Tooltip/src/composables/useProps';
import type { BadgeProps } from '~/components/Badge/src/composables/useProps';
import { IconClose, IconMoreTwo } from '@aurora/icon';

export const useFloatButtonProps = declarePropType({
  /**
   * 自定义图标
    * @en Configuration for icon.
   */
  icon: {
    type: IconPropType,
  },
  /**
   * 描述文字，可以是 `VNode` 节点
    * @en Configuration for description.
   */
  description: {
    type: [String, Object] as PropType<string | VNode>,
  },
  /**
   * 气泡卡片内容
    * @en Configuration for tooltip.
   */
  tooltip: {
    type: [String, Object] as PropType<string | Partial<TooltipProps>>,
  },
  /**
   * 类型
    * @en Configuration for type.
   */
  type: {
    type: String as PropType<'primary' | 'normal'>,
    default: 'normal',
  },
  /**
   * 形状
    * @en Configuration for shape.
   */
  shape: {
    type: String as PropType<'circle' | 'square'>,
    default: 'circle',
  },
  /**
   * 跳转链接
    * @en Configuration for href.
   */
  href: {
    type: String,
  },
  /**
   * 跳转时的目标窗口
   * 类同 `<a />` 的 `target` 属性
    * @en Configuration for target.
   */
  target: {
    type: String as PropType<'_blank' | '_self' | '_parent' | '_top'>,
    default: '_self',
  },
  /**
   * 徽标配置
   * `true`: `type="dot"`
    * @en Configuration for badge.
   */
  badge: {
    type: [Boolean, Object] as PropType<boolean | Partial<BadgeProps>>,
    default: false,
  },
  /**
   * 是否可拖拽
    * @en Configuration for draggable.
   */
  draggable: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否吸附在底部
    * @en Configuration for adsorb bottom.
   */
  adsorbBottom: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否显示
    * @en Configuration for visible.
   */
  visible: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否是折叠按钮，内部变量
   * @invisible
    * @en Configuration for collapse button.
   */
  collapseButton: {
    type: Boolean,
    default: undefined,
  },
});

export const useFloatButtonGroupProps = declarePropType({
  /**
   * 类型，会覆盖内部 `float-button` 的 `type`
    * @en Configuration for type.
   */
  type: {
    type: String as PropType<'primary' | 'normal'>,
  },
  /**
   * 形状，会覆盖内部 `float-button` 的 `shape`
    * @en Configuration for shape.
   */
  shape: {
    type: String as PropType<'circle' | 'square'>,
  },
  /**
   * 是否启用展开折叠功能
    * @en Configuration for use collapse.
   */
  useCollapse: {
    type: Boolean,
    default: false,
  },
  /**
   * 触发方式
    * @en Configuration for trigger.
   */
  trigger: {
    type: String as PropType<'click' | 'hover'>,
    default: 'click',
  },
  /**
   * 展开按钮
    * @en Configuration for expand icon.
   */
  expandIcon: {
    type: IconPropType,
    default: () => IconMoreTwo,
  },
  /**
   * 折叠按钮
    * @en Configuration for fold icon.
   */
  foldIcon: {
    type: IconPropType,
    default: () => IconClose,
  },
  /**
   * 展开按钮气泡卡片内容
    * @en Configuration for expand tooltip.
   */
  expandTooltip: {
    type: [String, Object] as PropType<string | Partial<TooltipProps>>,
  },
  /**
   * 折叠按钮气泡卡片内容
    * @en Configuration for fold tooltip.
   */
  foldTooltip: {
    type: [String, Object] as PropType<string | Partial<TooltipProps>>,
  },
  /**
   * 打开按钮的徽标配置
    * @en Configuration for badge.
   */
  badge: {
    type: Object as PropType<Partial<BadgeProps>>,
  },
  /**
   * 是否可拖拽
    * @en Configuration for draggable.
   */
  draggable: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否吸附在底部
    * @en Configuration for adsorb bottom.
   */
  adsorbBottom: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否显示
    * @en Configuration for visible.
   */
  visible: {
    type: Boolean,
    default: true,
  },
});

export type FloatButtonProps = ExtractPropTypes<typeof useFloatButtonProps>;
export type FloatButtonGroupProps = ExtractPropTypes<typeof useFloatButtonGroupProps>;
