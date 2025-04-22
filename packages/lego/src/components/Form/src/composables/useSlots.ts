export const useFormSlots = {
  /**
   * 默认展示的内容
   */
  default: () => true,
};

export type FormSlots = typeof useFormSlots;

export const useFormItemSlots = {
  /**
   * 默认展示的内容
   */
  default: () => true,
  /**
   * 标签展示区域
   */
  label: () => true,
  /**
   * 标签展示区域的尾部
   * 仅于 label-position = 'top' 时可用
   * @version 2.7.0
   */
  labelAppend: () => true,
  /**
   * 帮助文本，会覆盖 `slots.helperTitle` 和 `slots.helperContent`
   * @version 2.0.2
   */
  helper: () => true,
  /**
   * 帮助文本标题
   * @version 2.0.2
   */
  helperTitle: () => true,
  /**
   * 帮助文本内容
   * @version 2.0.2
   */
  helperContent: () => true,
  /**
   * 帮助文本，优先级低于 `error`
   * @version 2.0.2
   */
  tip: () => true,
  /**
   * 校验错误信息，优先级高于所有 `props` 和 `slots`
   * @version 2.0.2
   */
  error: () => true,
};

export type FormItemSlots = typeof useFormItemSlots;
