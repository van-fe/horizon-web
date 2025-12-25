import type {
  CSSProperties,
  ExtractPropTypes,
  PropType,
  RendererElement,
  TeleportProps,
} from 'vue';
import { declarePropType } from '@aurora/utils';
import type { TransitionProps } from '~/components/Transition/src/composables/useProps';

export type HPopoverShowWithMask = {
  enable?: boolean;
  style?: Partial<CSSProperties>;
  class?: string;
  to?: string | RendererElement;
};

export const usePopoverProps = declarePropType({
  /**
   * 触发方式
   */
  trigger: {
    type: String as PropType<
      'hover' | 'click' | 'click-hide' | 'click-remain' | 'focus' | 'manual'
    >,
    default: 'hover',
  },
  /**
   * `popper` 是否可见，`trigger` 为 'manual' 时生效
   */
  visible: {
    type: Boolean,
    default: false,
  },
  /**
   * 弹出位置
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
    default: 'top',
  },
  /**
   * `popper` 在辅助方向上的的偏移，正值表示 `popper` 向 `end` 方向偏移 ，负值表示 `popper` 向 `start` 方向偏移
   */
  skidding: { type: Number, default: 0 },
  /**
   * `popper` 在主方向上的偏移，正值表示 `popper` 远离 `reference`，负值表示 `popper` 靠近 `reference`
   */
  distance: { type: Number, default: 8 },
  /**
   * 当原本的显示位置空间不够时，是否允许 `popper` 显示到对面的位置
   */
  flip: { type: Boolean, default: true },
  /**
   * 是否带小箭头
   */
  arrow: {
    type: Boolean,
    default: true,
  },
  /**
   * 小箭头的参数
   */
  arrowOptions: {
    type: Object,
    default: () => {
      return { size: 8 };
    },
  },
  /**
   * `popper` 部分 的 `class`
   */
  popperClass: {
    type: String,
  },
  /**
   * `popper` 部分 的 `style`
   */
  popperStyle: {
    type: Object as PropType<Partial<CSSProperties>>,
  },
  /**
   * 是否在 `popper` 隐藏后销毁 `popper` 的内容
   */
  destroyOnHide: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否将 `popper` 渲染到 `body` 上
   */
  toBody: {
    type: Boolean,
    default: true,
  },
  /**
   * `popper` 的渲染目标，参考 Teleport 的 to 取值
   */
  to: {
    type: [String, Object] as PropType<TeleportProps['to']>,
    required: false,
  },
  /**
   * 是否监听 `reference` 和 `popper` 的大小以更新位置
   */
  resizeObserve: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否监听 `reference` 的溢出
   */
  referenceOverflowObserve: {
    type: Boolean,
    default: false,
    required: false,
  },
  /**
   * 监听 `reference` 溢出的root节点
   */
  referenceOverflowRoot: {
    type: Object as PropType<HTMLElement>,
    default: document.body,
    required: false,
  },
  /**
   * 是否保持 `popper` 和 `reference` 宽度相等
   */
  sameWidth: {
    type: Boolean,
    default: false,
  },
  /**
   * 在开启 `sameWidth` 时，是否使用 `minWidth` 去设置 `popper`
   */
  setMinWidth: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否保持 `popper` 和 `reference` 高度相等
   */
  sameHeight: {
    type: Boolean,
    default: false,
  },
  /**
   * 鼠标进入 `reference` 后，`popper` 延迟出现的时长
   */
  hoverShowDelay: {
    type: Number,
    default: 0,
  },
  /**
   * 鼠标离开 `reference` 后，`popper` 延迟隐藏的时长，会影响鼠标从 `reference` 移动到 `popper` 的过程中 `popper` 是否会隐藏
   */
  hoverHideDelay: {
    type: Number,
    default: 100,
  },
  /**
   * 附加给 `popover-reference` 的 `class`
   */
  referenceClass: {
    type: String,
    required: false,
  },
  /**
   * 与 `flip` 配合使用，如果对面与当前位置都不够，还希望能调整到其他位置时，可以设置该属性
   */
  fallbackPlacements: {
    type: Array as PropType<
      Array<
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
      >
    >,
    required: false,
  },
  /**
   * 层级，会被 `popperStyle` 的 `z-index` 覆盖
   */
  zIndex: {
    type: Number,
    required: false,
  },
  /**
   * 自定义隐藏事件
   */
  hideEventType: {
    type: String as PropType<'click' | 'mousedown' | 'mouseup'>,
    required: false,
    default: 'click',
  },
  /**
   * 是否禁用
   * @version 1.5.7
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 渐变动画名称
   * @version 2.0.3
   */
  transitionName: {
    type: String as PropType<TransitionProps['name'] | 'none'>,
    default: 'fade-in',
  },
  /**
   * 渐变动画速度
   * @version 2.0.3
   */
  transitionSpeed: {
    type: String as PropType<TransitionProps['speed']>,
    default: 'slow',
  },
  /**
   * popper显示时是否带mask
   */
  showWithMask: {
    type: Object as PropType<HPopoverShowWithMask>,
    required: false,
  },
  /**
   * 是否在 trigger 为 `click` `click-remain` `click-hide` 时拦截冒泡
   * @version 2.0.9-alpha.0
   */
  stopPropagation: {
    type: Boolean,
    default: false,
  },
  /**
   * 主题
   * @version 2.5.0
   */
  theme: {
    type: String as PropType<'light' | 'dark'>,
    default: 'light',
  },
  /**
   * 是否阻止 `popper` 超出边界，即 `popper.js` 检查副轴遮挡
   * 通常情况下，不会检查副轴的遮挡
   * 但对于空间较小的情况下，需要设置为 true，防止被屏幕裁剪
   * @version 2.7.2
   */
  preventOverflow: {
    type: Boolean,
    default: false,
  },
  /**
   * 检查主轴遮挡
   * 对于 top/bottom，检查 x轴是否有遮挡
   * 对于 left/right，检查 y轴是否有遮挡
   * @verison latest
   */
  mainAxisCheck: {
    type: Boolean,
    default: true,
  },
  /**
   * 定位方式
   * @version 2.12.3
   */
  strategy: {
    type: String as PropType<'fixed' | 'absolute'>,
    default: 'fixed',
  },
});

export const usePopContentProps = declarePropType({
  /**
   * 主题
   * @version 2.5.0
   */
  theme: {
    type: String as PropType<'light' | 'dark'>,
    default: 'light',
  },
});

export type PopoverProps = ExtractPropTypes<typeof usePopoverProps>;
export type PopContentProps = ExtractPropTypes<typeof usePopContentProps>;
