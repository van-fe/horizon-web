import type { SlotsType, VNode } from 'vue';
import type { OptionProps } from './useProps';
import type { Arrayable } from '@nio-fe/shared';

export type NSelectOptionValue = OptionProps & Record<string, unknown> & { active: boolean };

export const useSelectSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   */
  default?: {};
  /**
   * 当为空时展示的插槽
   * @deprecated empty
   */
  optionEmptyRender?: {};
  /**
   * 当为空时展示的插槽
   * @version 2.1.0
   */
  empty?: {};
  /**
   * Select Input 的渲染插槽
   * @deprecated pickerInner
   */
  selectRender?: {};
  /**
   * 自定义选中的项目
   * @param data 已选择的 `option` 的 props & attrs。有可能是 ·
   */
  tagRender?: (data?: OptionProps & Record<string, unknown>) => Arrayable<VNode>;
  /**
   * 自定义 `option` 面板中的顶部内容
   */
  panelHeaderRender?: {};
  /**
   * 自定义 `option` 面板中的底部内容
   */
  panelFooterRender?: {};
  /**
   * 自定义 `dropConfirm` 渲染内容，只有在传入 `needDropdownConfirm` 为 `true` 时生效
   */
  dropConfirmRender?: {};
  /**
   * 自定义 `option` 的渲染
   * @param value 由 option.props option.attrs active 组成
   * @deprecated optionRender
   */
  dropdownRender?: (value: NSelectOptionValue) => Arrayable<VNode>;
  /**
   * 自定义 `option` 的渲染
   * @param value 由 option.props option.attrs active 组成
   */
  optionRender?: (value: NSelectOptionValue) => Arrayable<VNode>;
  /**
   * 自定义选择器渲染
   * @version 2.2.5
   */
  picker?: {};
  /**
   * 自定义选择器内部渲染
   * @version 2.2.5
   */
  pickerInner?: {};
  /**
   * 选择器整体自定义渲染
   * @version 2.7.0
   */
  pickerOuter?: {};
  /**
   * 自定义 `panelConfirmLeft` 渲染
   * @version 2.12.15-alpha.3
   */
  panelConfirmLeft?: {};
}>;

export const useOptionSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   * @param value 由 option.props option.attrs active 组成
   */
  default?: NSelectOptionValue;
  /**
   * 自定义下拉面板中下拉选择项的内部内容，作用主要是替换原来的纯文本，可以保留文本之外的样式
   * @param value 由 option.props option.attrs active 组成
   * @deprecated label
   */
  innerRender?: NSelectOptionValue;
  /**
   * 文本展示前缀
   * @param value 由 option.props option.attrs active 组成
   * @version 2.1.0
   */
  labelPrefix?: NSelectOptionValue;
  /**
   * 文本展示前缀
   * @param value 由 option.props option.attrs active 组成
   * @version 2.1.0
   */
  labelSuffix?: NSelectOptionValue;
  /**
   * 文本展示插槽
   * @param value 由 option.props option.attrs active 组成
   * @version 2.1.0
   */
  label?: NSelectOptionValue;
  /**
   * 描述插槽
   * @param value 由 option.props option.attrs active 组成
   * @version 2.1.0
   */
  description?: NSelectOptionValue;
}>;

export const useOptionGroupSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   */
  default?: {};
}>;

export type SelectSlots = typeof useSelectSlots;
export type OptionSlots = typeof useOptionSlots;
export type OptionGroupSlots = typeof useOptionGroupSlots;
