import type { SlotsType } from 'vue';
export const useFormSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   * @en Custom content for the default slot.
   */
  default?: {};
}>;

export type FormSlots = typeof useFormSlots;

export const useFormItemSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   * @en Custom content for the default slot.
   */
  default?: {};
  /**
   * 标签展示区域
   * @en Custom content for the label slot.
   */
  label?: {};
  /**
   * 标签展示区域的尾部
   * 仅于 label-position = 'top' 时可用
   * @en Custom content for the label append slot.
   */
  labelAppend?: {};
  /**
   * 帮助文本，会覆盖 `slots.helperTitle` 和 `slots.helperContent`
   * @en Custom content for the helper slot.
   */
  helper?: {};
  /**
   * 帮助文本标题
   * @en Custom content for the helper title slot.
   */
  helperTitle?: {};
  /**
   * 帮助文本内容
   * @en Custom content for the helper content slot.
   */
  helperContent?: {};
  /**
   * 帮助文本，优先级低于 `error`
   * @en Custom content for the tip slot.
   */
  tip?: {};
  /**
   * 校验错误信息，优先级高于所有 `props` 和 `slots`
   * @en Custom content for the error slot.
   */
  error?: {};
}>;

export type FormItemSlots = typeof useFormItemSlots;
