import type { ExtractPropTypes, PropType, TeleportProps } from 'vue';
import { declarePropType } from '@aurora/utils';

export type TooltipSize = 'medium' | 'small';
export const useTooltipProps = declarePropType({
  /**
   * 尺寸
    * @en Configuration for size.
   */
  size: {
    type: String as PropType<'large' | 'medium' | 'small'>,
    default: 'medium',
  },
  /**
   * 触发tooltip提示框的行为
    * @en Configuration for trigger.
   */
  trigger: {
    type: String as PropType<'hover' | 'click' | 'focus' | 'contextmenu' | 'manual'>,
    required: false,
    default: 'hover',
  },
  /**
   * tooltip弹出方向
    * @en Configuration for placement.
   */
  placement: {
    type: String as PropType<
      | 'top-start'
      | 'top-end'
      | 'bottom-start'
      | 'bottom-end'
      | 'top'
      | 'bottom'
      | 'right-start'
      | 'left-start'
      | 'right-end'
      | 'left-end'
      | 'right'
      | 'left'
    >,
    required: false,
    default: 'top',
  },
  /**
   * tooltip距离目标元素偏移距离
    * @en Configuration for distance.
   */
  distance: {
    type: Number,
    required: false,
    default: 12,
  },
  /**
   * 自定义tooltip类名
    * @en Configuration for popper class.
   */
  popperClass: {
    type: String,
    required: false,
    default: '',
  },
  /**
   * 是否显示 `tooltip`，只有在 `trigger` 为 `manual` 时生效
    * @en Configuration for visible.
   */
  visible: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * tooltip的位置偏移
    * @en Configuration for skidding.
   */
  skidding: {
    type: Number,
    required: false,
    default: 0,
  },
  /**
   * 是否显示tooltip的箭头
    * @en Configuration for arrow.
   */
  arrow: {
    type: Boolean,
    required: false,
    default: true,
  },
  /**
   * 是否禁用tooltip
    * @en Configuration for disabled.
   */
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * tooltip内容，权重较slot低
    * @en Configuration for content.
   */
  content: {
    type: String,
    required: false,
    default: '',
  },
  /**
   * 是否将tooltip挂载在body下
    * @en Configuration for to body.
   */
  toBody: {
    type: Boolean,
    required: false,
    default: true,
  },
  /**
   * 是否溢出才显示
    * @en Configuration for overflow.
   */
  overflow: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * 独立实例
   * @deprecated 过去实现只是 pre render，该属性不影响功能，将在未来移除
    * @en Configuration for singleton.
   */
  singleton: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * 鼠标是否可以进入到 `tooltip` 中
    * @en Configuration for enterable.
   */
  enterable: {
    type: Boolean,
    default: false,
  },
  /**
   * 延迟显示时间，单位毫秒
    * @en Configuration for show after.
   */
  showAfter: {
    type: Number,
    default: 200,
  },
  /**
   * 延迟关闭时间，单位毫秒
    * @en Configuration for hide after.
   */
  hideAfter: {
    type: Number,
    default: 200,
  },
  /**
   * 当原本的显示位置空间不够时，是否允许 `tooltip` 显示到对面的位置
    * @en Configuration for flip.
   */
  flip: { type: Boolean, default: true },
  /**
   * 与 `flip` 配合使用，如果对面与当前位置都不够，还希望能调整到其他位置时，可以设置该属性
    * @en Configuration for fallback placements.
   */
  fallbackPlacements: {
    type: Array as PropType<Array<'top' | 'bottom' | 'right' | 'left' | 'auto'>>,
    required: false,
  },
  /**
   * 是否点击 `tooltip` 后复制内容
    * @en Configuration for click to copy.
   */
  clickToCopy: {
    type: Boolean,
    default: false,
  },
  /**
   * 点击后复制的对象文字
    * @en Configuration for copy target.
   */
  copyTarget: {
    type: String as PropType<'content' | 'reference'>,
    default: 'content',
  },
  /**
   * 复制成功后的文字
   * 默认使用国际化配置
    * @en Configuration for copy success text.
   */
  copySuccessText: {
    type: String,
  },
  /**
   * 复制失败后的文字
   * 默认使用国际化配置
    * @en Configuration for copy fail text.
   */
  copyFailText: {
    type: String,
  },
  /**
   * 是否对触发器是否可见而监听
   * 如果监听，则会在不可见时隐藏 `tooltip`
    * @en Configuration for reference hidden observe.
   */
  referenceHiddenObserve: {
    type: Boolean,
    default: false,
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
   * 是否在触发器不可见时隐藏
   * 如果在判断错误时请置为 `false`
    * @en Configuration for popper reference hidden.
   */
  popperReferenceHidden: {
    type: Boolean,
    default: true,
  },
  /**
   * 主题
   * @deprecated 请使用 `dark` 代替。（`light` 主题已过时）
    * @en Configuration for theme.
   */
  theme: {
    type: String as PropType<'dark' | 'light'>,
    default: 'dark',
  },
  /**
   * CSS 层级
    * @en Configuration for z index.
   */
  zIndex: {
    type: Number,
    required: false,
  },
  /**
   * 目标缩放比例
    * @en Configuration for reference scale.
   */
  referenceScale: {
    type: [Number, Array] as PropType<number | number[]>,
    default: 1,
  },

  /**
   * 是否阻止 `popper` 超出边界，即 `popper.js` 检查副轴遮挡
   * 通常情况下，不会检查副轴的遮挡
   * 但对于空间较小的情况下，需要设置为 true，防止被屏幕裁剪
    * @en Configuration for prevent overflow.
   */
  preventOverflow: {
    type: Boolean,
    default: false,
  },
  /**
   * 定位方式
    * @en Configuration for strategy.
   */
  strategy: {
    type: String as PropType<'fixed' | 'absolute'>,
    default: 'fixed',
  },
});

export const generateGetBoundingClientRect = (
  width = 0,
  height = 0,
  top = 0,
  right = 0,
  bottom = 0,
  left = 0,
) => {
  return () => ({
    width,
    height,
    top,
    right,
    bottom,
    left,
  });
};

export type TooltipProps = ExtractPropTypes<typeof useTooltipProps>;
