import type { OptionProps } from './useProps';
import { isNil, isObject } from '@nio-fe/shared';

export type NSelectOptionValue = OptionProps & Record<string, unknown> & { active: boolean };

export const useSelectSlots = {
  /**
   * 默认展示的内容
   */
  default: () => true,
  /**
   * 当为空时展示的插槽
   * @deprecated empty
   */
  optionEmptyRender: () => true,
  /**
   * 当为空时展示的插槽
   * @version 2.1.0
   */
  empty: () => true,
  /**
   * Select Input 的渲染插槽
   * @deprecated pickerInner
   */
  selectRender: () => true,
  /**
   * 自定义选中的项目
   * @param data 已选择的 `option` 的 props & attrs。有可能是 ·
   */
  tagRender: (data: (OptionProps & Record<string, unknown>) | undefined) =>
    isObject(data) || isNil(data),
  /**
   * 自定义 `option` 面板中的顶部内容
   */
  panelHeaderRender: () => true,
  /**
   * 自定义 `option` 面板中的底部内容
   */
  panelFooterRender: () => true,
  /**
   * 自定义 `dropConfirm` 渲染内容，只有在传入 `needDropdownConfirm` 为 `true` 时生效
   */
  dropConfirmRender: () => true,
  /**
   * 自定义 `option` 的渲染
   * @param value 由 option.props option.attrs active 组成
   * @deprecated optionRender
   */
  dropdownRender: (value: NSelectOptionValue) => isObject(value),
  /**
   * 自定义 `option` 的渲染
   * @param value 由 option.props option.attrs active 组成
   */
  optionRender: (value: NSelectOptionValue) => isObject(value),
  /**
   * 自定义选择器渲染
   * @version 2.2.5
   */
  picker: () => true,
  /**
   * 自定义选择器内部渲染
   * @version 2.2.5
   */
  pickerInner: () => true,
  /**
   * 选择器整体自定义渲染
   * @version 2.7.0
   */
  pickerOuter: () => true,
  /**
   * 自定义 `panelConfirmLeft` 渲染
   * @version 2.12.15-alpha.3
   */
  panelConfirmLeft: () => true,
};

export const useOptionSlots = {
  /**
   * 默认展示的内容
   * @param value 由 option.props option.attrs active 组成
   */
  default: (value: NSelectOptionValue) => isObject(value),
  /**
   * 自定义下拉面板中下拉选择项的内部内容，作用主要是替换原来的纯文本，可以保留文本之外的样式
   * @param value 由 option.props option.attrs active 组成
   * @deprecated label
   */
  innerRender: (value: NSelectOptionValue) => isObject(value),
  /**
   * 文本展示前缀
   * @param value 由 option.props option.attrs active 组成
   * @version 2.1.0
   */
  labelPrefix: (value: NSelectOptionValue) => isObject(value),
  /**
   * 文本展示前缀
   * @param value 由 option.props option.attrs active 组成
   * @version 2.1.0
   */
  labelSuffix: (value: NSelectOptionValue) => isObject(value),
  /**
   * 文本展示插槽
   * @param value 由 option.props option.attrs active 组成
   * @version 2.1.0
   */
  label: (value: NSelectOptionValue) => isObject(value),
  /**
   * 描述插槽
   * @param value 由 option.props option.attrs active 组成
   * @version 2.1.0
   */
  description: (value: NSelectOptionValue) => isObject(value),
};

export const useOptionGroupSlots = {
  /**
   * 默认展示的内容
   */
  default: () => true,
};

export type SelectSlots = typeof useSelectSlots;
export type OptionSlots = typeof useOptionSlots;
export type OptionGroupSlots = typeof useOptionGroupSlots;
