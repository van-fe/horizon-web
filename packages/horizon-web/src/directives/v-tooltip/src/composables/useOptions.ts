import type { DirectiveOptionType, ExtractDirectiveOptionTypes } from '@aurora/utils';
import { declareDirectiveOptionType } from '@aurora/utils';

export const useTooltipOptions = declareDirectiveOptionType({
  /**
   * 触发tooltip提示框的行为
   * @en Trigger tooltipmessage框的behavior
   */
  trigger: {
    type: String as DirectiveOptionType<'hover' | 'click' | 'focus' | 'manual'>,
    required: false,
    default: 'hover',
  },
  /**
   * tooltip弹出方向
   * @en Tooltip弹出direction
   */
  placement: {
    type: String as DirectiveOptionType<
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
   * @en Tooltipdistancetargetelementoffsetdistance
   */
  distance: {
    type: Number,
    required: false,
    default: 12,
  },
  /**
   * 自定义tooltip类名
   * @en Custom tooltipclass name
   */
  popperClass: {
    type: String,
    required: false,
    default: '',
  },
  /**
   * 是否显示 `tooltip`，只有在 `trigger` 为 `manual` 时生效
   * @en Whether Display tooltip, 只有在 trigger 为 manual 时effective
   */
  visible: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * tooltip的位置偏移
   * @en Tooltip的positionoffset
   */
  skidding: {
    type: Number,
    required: false,
    default: 0,
  },
  /**
   * 是否显示tooltip的箭头
   * @en Whether Display tooltip的箭头
   */
  arrow: {
    type: Boolean,
    required: false,
    default: true,
  },
  /**
   * 是否禁用tooltip
   * @en Whether Disable tooltip
   */
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * tooltip内容，权重较slot低
   * @en Tooltipcontent, 权重较slot低
   */
  content: {
    type: String,
    required: false,
    default: 'This is a Tooltip',
  },
  /**
   * 是否溢出才显示
   * @en Whether overflow才Display
   */
  overflow: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * 附带样式
   * @en Additional style
   */
  style: {
    type: Object as DirectiveOptionType<Partial<CSSStyleDeclaration>>,
    required: false,
  },
  /**
   * 挂载节点
   * @en Mountnode
   */
  reference: {
    type: Object as DirectiveOptionType<HTMLElement>,
    required: false,
  },
  /**
   * 尺寸
   * @en Size
   * @deprecated 此设置已无效
   */
  size: {
    type: String as DirectiveOptionType<'medium' | 'small'>,
    default: 'medium',
  },
  /**
   * 主题
   * @en Theme
   * @deprecated `light` 已过时，请改成 `dark`
   */
  theme: {
    type: String as DirectiveOptionType<'dark' | 'light'>,
    default: 'dark',
  },
  /**
   * 在鼠标悬浮后多少毫秒展示
   * @en Description
   */
  showAfter: {
    type: Number,
    default: 200,
  },
  /**
   * 在鼠标离开后多少毫秒消失
   * @en Description
   */
  hideAfter: {
    type: Number,
    default: 0,
  },
});

export type TooltipOptions = ExtractDirectiveOptionTypes<typeof useTooltipOptions>;
