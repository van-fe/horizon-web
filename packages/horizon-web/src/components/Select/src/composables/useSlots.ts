import type { SlotsType, VNode } from 'vue';
import type { OptionProps } from './useProps';
import type { Arrayable } from '@aurora/utils';

export type HSelectOptionValue = OptionProps & Record<string, unknown> & { active: boolean };

export const useSelectSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
    * @en Custom content for the default slot.
   */
  default?: {};
  /**
   * 当为空时展示的插槽
   * @deprecated empty
    * @en Custom content for the option empty render slot.
   */
  optionEmptyRender?: {};
  /**
   * 当为空时展示的插槽
    * @en Custom content for the empty slot.
   */
  empty?: {};
  /**
   * Select Input 的渲染插槽
   * @deprecated pickerInner
    * @en Custom content for the select render slot.
   */
  selectRender?: {};
  /**
   * 自定义选中的项目
   * @param data 已选择的 `option` 的 props & attrs。有可能是 ·
   * @paramEn data The data value.
    * @en Custom content for the tag render slot.
   */
  tagRender?: (data?: OptionProps & Record<string, unknown>) => Arrayable<VNode>;
  /**
   * 自定义 `option` 面板中的顶部内容
    * @en Custom content for the panel header render slot.
   */
  panelHeaderRender?: {};
  /**
   * 自定义 `option` 面板中的底部内容
    * @en Custom content for the panel footer render slot.
   */
  panelFooterRender?: {};
  /**
   * 自定义 `dropConfirm` 渲染内容，只有在传入 `needDropdownConfirm` 为 `true` 时生效
    * @en Custom content for the drop confirm render slot.
   */
  dropConfirmRender?: {};
  /**
   * 自定义 `option` 的渲染
   * @param value 由 option.props option.attrs active 组成
   * @paramEn value The value value.
   * @deprecated optionRender
    * @en Custom content for the dropdown render slot.
   */
  dropdownRender?: (value: HSelectOptionValue) => Arrayable<VNode>;
  /**
   * 自定义 `option` 的渲染
   * @param value 由 option.props option.attrs active 组成
   * @paramEn value The value value.
    * @en Custom content for the option render slot.
   */
  optionRender?: (value: HSelectOptionValue) => Arrayable<VNode>;
  /**
   * 自定义选择器渲染
    * @en Custom content for the picker slot.
   */
  picker?: {};
  /**
   * 自定义选择器内部渲染
    * @en Custom content for the picker inner slot.
   */
  pickerInner?: {};
  /**
   * 选择器整体自定义渲染
    * @en Custom content for the picker outer slot.
   */
  pickerOuter?: {};
  /**
   * 自定义 `panelConfirmLeft` 渲染
    * @en Custom content for the panel confirm left slot.
   */
  panelConfirmLeft?: {};
}>;

export const useOptionSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
   * @param value 由 option.props option.attrs active 组成
   * @paramEn value The value value.
    * @en Custom content for the default slot.
   */
  default?: HSelectOptionValue;
  /**
   * 自定义下拉面板中下拉选择项的内部内容，作用主要是替换原来的纯文本，可以保留文本之外的样式
   * @param value 由 option.props option.attrs active 组成
   * @paramEn value The value value.
   * @deprecated label
    * @en Custom content for the inner render slot.
   */
  innerRender?: HSelectOptionValue;
  /**
   * 文本展示前缀
   * @param value 由 option.props option.attrs active 组成
   * @paramEn value The value value.
    * @en Custom content for the label prefix slot.
   */
  labelPrefix?: HSelectOptionValue;
  /**
   * 文本展示前缀
   * @param value 由 option.props option.attrs active 组成
   * @paramEn value The value value.
    * @en Custom content for the label suffix slot.
   */
  labelSuffix?: HSelectOptionValue;
  /**
   * 文本展示插槽
   * @param value 由 option.props option.attrs active 组成
   * @paramEn value The value value.
    * @en Custom content for the label slot.
   */
  label?: HSelectOptionValue;
  /**
   * 描述插槽
   * @param value 由 option.props option.attrs active 组成
   * @paramEn value The value value.
    * @en Custom content for the description slot.
   */
  description?: HSelectOptionValue;
}>;

export const useOptionGroupSlots = Object as SlotsType<{
  /**
   * 默认展示的内容
    * @en Custom content for the default slot.
   */
  default?: {};
}>;

export type SelectSlots = typeof useSelectSlots;
export type OptionSlots = typeof useOptionSlots;
export type OptionGroupSlots = typeof useOptionGroupSlots;
