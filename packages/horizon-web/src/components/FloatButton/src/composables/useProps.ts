import type { ExtractPropTypes, PropType, VNode } from 'vue';
import { declarePropType } from '@aurora/shared';
import { IconPropType } from '~/utils/useIcon';
import type { TooltipProps } from '~/components/Tooltip/src/composables/useProps';
import type { BadgeProps } from '~/components/Badge/src/composables/useProps';
import { IconClose, IconMoreTwo } from '@aurora/icon';

export const useFloatButtonProps = declarePropType({
  /**
   * 自定义图标
   */
  icon: {
    type: IconPropType,
  },
  /**
   * 描述文字，可以是 `VNode` 节点
   */
  description: {
    type: [String, Object] as PropType<string | VNode>,
  },
  /**
   * 气泡卡片内容
   */
  tooltip: {
    type: [String, Object] as PropType<string | Partial<TooltipProps>>,
  },
  /**
   * 类型
   */
  type: {
    type: String as PropType<'primary' | 'normal'>,
    default: 'normal',
  },
  /**
   * 形状
   */
  shape: {
    type: String as PropType<'circle' | 'square'>,
    default: 'circle',
  },
  /**
   * 跳转链接
   */
  href: {
    type: String,
  },
  /**
   * 跳转时的目标窗口
   * 类同 `<a />` 的 `target` 属性
   */
  target: {
    type: String as PropType<'_blank' | '_self' | '_parent' | '_top'>,
    default: '_self',
  },
  /**
   * 徽标配置
   * `true`: `type="dot"`
   */
  badge: {
    type: [Boolean, Object] as PropType<boolean | Partial<BadgeProps>>,
    default: false,
  },
  /**
   * 是否可拖拽
   */
  draggable: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否吸附在底部
   */
  adsorbBottom: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否显示
   */
  visible: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否是折叠按钮，内部变量
   * @invisible
   */
  collapseButton: {
    type: Boolean,
    default: undefined,
  },
});

export const useFloatButtonGroupProps = declarePropType({
  /**
   * 类型，会覆盖内部 `float-button` 的 `type`
   */
  type: {
    type: String as PropType<'primary' | 'normal'>,
  },
  /**
   * 形状，会覆盖内部 `float-button` 的 `shape`
   */
  shape: {
    type: String as PropType<'circle' | 'square'>,
  },
  /**
   * 是否启用展开折叠功能
   */
  useCollapse: {
    type: Boolean,
    default: false,
  },
  /**
   * 触发方式
   */
  trigger: {
    type: String as PropType<'click' | 'hover'>,
    default: 'click',
  },
  /**
   * 展开按钮
   */
  expandIcon: {
    type: IconPropType,
    default: () => IconMoreTwo,
  },
  /**
   * 折叠按钮
   */
  foldIcon: {
    type: IconPropType,
    default: () => IconClose,
  },
  /**
   * 展开按钮气泡卡片内容
   */
  expandTooltip: {
    type: [String, Object] as PropType<string | Partial<TooltipProps>>,
  },
  /**
   * 折叠按钮气泡卡片内容
   */
  foldTooltip: {
    type: [String, Object] as PropType<string | Partial<TooltipProps>>,
  },
  /**
   * 打开按钮的徽标配置
   */
  badge: {
    type: Object as PropType<Partial<BadgeProps>>,
  },
  /**
   * 是否可拖拽
   */
  draggable: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否吸附在底部
   */
  adsorbBottom: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否显示
   */
  visible: {
    type: Boolean,
    default: true,
  },
});

export type FloatButtonProps = ExtractPropTypes<typeof useFloatButtonProps>;
export type FloatButtonGroupProps = ExtractPropTypes<typeof useFloatButtonGroupProps>;
