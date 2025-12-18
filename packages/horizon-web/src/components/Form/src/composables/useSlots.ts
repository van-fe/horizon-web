import type { SlotsType } from 'vue';
export const useFormSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   */
  default?: {};
}>;

export type FormSlots = typeof useFormSlots;

export const useFormItemSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   */
  default?: {};
  /**
   * 标签展示区域
   */
  label?: {};
  /**
   * 标签展示区域的尾部
   * 仅于 label-position = 'top' 时可用
   * @version 2.7.0
   */
  labelAppend?: {};
  /**
   * 帮助文本，会覆盖 `slots.helperTitle` 和 `slots.helperContent`
   * @version 2.0.2
   */
  helper?: {};
  /**
   * 帮助文本标题
   * @version 2.0.2
   */
  helperTitle?: {};
  /**
   * 帮助文本内容
   * @version 2.0.2
   */
  helperContent?: {};
  /**
   * 帮助文本，勘误，请使用 `tip`
   * @deprecated tip
   */
  tips?: {};
  /**
   * 帮助文本，优先级低于 `error`
   * @version 2.0.2
   */
  tip?: {};
  /**
   * 校验错误信息，优先级高于所有 `props` 和 `slots`
   * @version 2.0.2
   */
  error?: {};
}>;

export type FormItemSlots = typeof useFormItemSlots;
