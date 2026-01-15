import type { ExtractPropTypes, PropType, TeleportProps } from 'vue';
import { declarePropType } from '@aurora/utils';

export type TooltipSize = 'medium' | 'small';
export const useTooltipProps = declarePropType({
  /**
   * 尺寸
   */
  size: {
    type: String as PropType<'large' | 'medium' | 'small'>,
    default: 'medium',
  },
  /**
   * 触发tooltip提示框的行为
   */
  trigger: {
    type: String as PropType<'hover' | 'click' | 'focus' | 'contextmenu' | 'manual'>,
    required: false,
    default: 'hover',
  },
  /**
   * tooltip弹出方向
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
   */
  distance: {
    type: Number,
    required: false,
    default: 12,
  },
  /**
   * 自定义tooltip类名
   */
  popperClass: {
    type: String,
    required: false,
    default: '',
  },
  /**
   * 是否显示 `tooltip`，只有在 `trigger` 为 `manual` 时生效
   */
  visible: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * tooltip的位置偏移
   */
  skidding: {
    type: Number,
    required: false,
    default: 0,
  },
  /**
   * 是否显示tooltip的箭头
   */
  arrow: {
    type: Boolean,
    required: false,
    default: true,
  },
  /**
   * 是否禁用tooltip
   */
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * tooltip内容，权重较slot低
   * @version 2.0.5 默认值修改为空
   */
  content: {
    type: String,
    required: false,
    default: '',
  },
  /**
   * 是否将tooltip挂载在body下
   */
  toBody: {
    type: Boolean,
    required: false,
    default: true,
  },
  /**
   * 是否溢出才显示
   */
  overflow: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * 独立实例
   * @deprecated 过去实现只是 pre render，该属性不影响功能，将在未来移除
   */
  singleton: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * 鼠标是否可以进入到 `tooltip` 中
   */
  enterable: {
    type: Boolean,
    default: false,
  },
  /**
   * 延迟显示时间，单位毫秒
   */
  showAfter: {
    type: Number,
    default: 200,
  },
  /**
   * 延迟关闭时间，单位毫秒
   */
  hideAfter: {
    type: Number,
    default: 200,
  },
  /**
   * 当原本的显示位置空间不够时，是否允许 `tooltip` 显示到对面的位置
   * @version 2.0.5
   */
  flip: { type: Boolean, default: true },
  /**
   * 与 `flip` 配合使用，如果对面与当前位置都不够，还希望能调整到其他位置时，可以设置该属性
   * @version 2.0.5
   */
  fallbackPlacements: {
    type: Array as PropType<Array<'top' | 'bottom' | 'right' | 'left' | 'auto'>>,
    required: false,
  },
  /**
   * 是否点击 `tooltip` 后复制内容
   * @version 2.0.5
   */
  clickToCopy: {
    type: Boolean,
    default: false,
  },
  /**
   * 点击后复制的对象文字
   * @version 2.0.5
   */
  copyTarget: {
    type: String as PropType<'content' | 'reference'>,
    default: 'content',
  },
  /**
   * 复制成功后的文字
   * 默认使用国际化配置
   * @version 2.0.5
   */
  copySuccessText: {
    type: String,
  },
  /**
   * 复制失败后的文字
   * 默认使用国际化配置
   * @version 2.0.5
   */
  copyFailText: {
    type: String,
  },
  /**
   * 是否对触发器是否可见而监听
   * 如果监听，则会在不可见时隐藏 `tooltip`
   * @version 2.1.0
   */
  referenceHiddenObserve: {
    type: Boolean,
    default: false,
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
   * 是否在触发器不可见时隐藏
   * 如果在判断错误时请置为 `false`
   * @version 2.7.0
   */
  popperReferenceHidden: {
    type: Boolean,
    default: true,
  },
  /**
   * 主题
   * @version 2.7.0
   * @deprecated 请使用 `dark` 代替。（`light` 主题已过时）
   */
  theme: {
    type: String as PropType<'dark' | 'light'>,
    default: 'dark',
  },
  /**
   * CSS 层级
   * @version 2.8.3
   */
  zIndex: {
    type: Number,
    required: false,
  },
  /**
   * 目标缩放比例
   * @version 2.8.3
   */
  referenceScale: {
    type: [Number, Array] as PropType<number | number[]>,
    default: 1,
  },

  /**
   * 是否阻止 `popper` 超出边界，即 `popper.js` 检查副轴遮挡
   * 通常情况下，不会检查副轴的遮挡
   * 但对于空间较小的情况下，需要设置为 true，防止被屏幕裁剪
   * @version 2.12.3
   */
  preventOverflow: {
    type: Boolean,
    default: false,
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
