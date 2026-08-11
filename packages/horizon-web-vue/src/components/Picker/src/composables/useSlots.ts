import type { SlotsType, VNode } from 'vue';
import type { ModelValueType, PickerInputStatusType, PickerStatusType } from './useProps';
import type { Arrayable } from '@aurora/utils';

export const usePickerSlots = Object as SlotsType<{
  /**
   * 面板内容区域插槽
   * @param modelValue value
   * @paramEn modelValue The model value value.
   * @param pickerStatus 选择器本身状态
   * @paramEn pickerStatus The picker status value.
    * @en Custom content for the default slot.
   */
  default?: (modelValue: ModelValueType, pickerStatus: PickerStatusType) => Arrayable<VNode>;
  /**
   * 触发器的完整自定义渲染
   * @param modelValue
   * @param inputStatus
   * @param pickerStatus
    * @en Custom content for the picker outer slot.
   */
  pickerOuter?: (
    modelValue: ModelValueType,
    inputStatus: PickerInputStatusType,
    pickerStatus: PickerStatusType,
  ) => Arrayable<VNode>;
  /**
   * 选择器自定义渲染
   * @param modelValue value
   * @paramEn modelValue The model value value.
   * @param inputStatus 选择器输入框状态
   * @paramEn inputStatus The input status value.
   * @param pickerStatus 选择器本身状态
   * @paramEn pickerStatus The picker status value.
   * @param onInputFocus 当输入框聚焦时的回调方法
   * @paramEn onInputFocus The on input focus value.
   * @param onInputBlur 当输入框失焦时的回调方法
   * @paramEn onInputBlur The on input blur value.
    * @en Custom content for the picker slot.
   */
  picker?: (
    modelValue: ModelValueType,
    inputStatus: PickerInputStatusType,
    pickerStatus: PickerStatusType,
    onInputFocus: (evt: FocusEvent) => void,
    onInputBlur: (evt: FocusEvent) => void,
  ) => Arrayable<VNode>;
  /**
   * 选择器容器自定义渲染，包括 pickerInner pickerPrefix pickerSuffix 范围
   * @param modelValue value
   * @paramEn modelValue The model value value.
   * @param inputStatus 选择器输入框状态
   * @paramEn inputStatus The input status value.
   * @param pickerStatus 选择器本身状态
   * @paramEn pickerStatus The picker status value.
   * @param onInputFocus 当输入框聚焦时的回调方法
   * @paramEn onInputFocus The on input focus value.
   * @param onInputBlur 当输入框失焦时的回调方法
   * @paramEn onInputBlur The on input blur value.
    * @en Custom content for the picker container slot.
   */
  pickerContainer?: (
    modelValue: ModelValueType,
    inputStatus: PickerInputStatusType,
    pickerStatus: PickerStatusType,
    onInputFocus: (evt: FocusEvent) => void,
    onInputBlur: (evt: FocusEvent) => void,
  ) => Arrayable<VNode>;
  /**
   * 选择器内容区域
   * @param modelValue value
   * @paramEn modelValue The model value value.
   * @param inputStatus 选择器输入框状态
   * @paramEn inputStatus The input status value.
   * @param pickerStatus 选择器本身状态
   * @paramEn pickerStatus The picker status value.
   * @param onInputFocus 当输入框聚焦时的回调方法
   * @paramEn onInputFocus The on input focus value.
   * @param onInputBlur 当输入框失焦时的回调方法
   * @paramEn onInputBlur The on input blur value.
    * @en Custom content for the picker inner slot.
   */
  pickerInner?: (
    modelValue: ModelValueType,
    inputStatus: PickerInputStatusType,
    pickerStatus: PickerStatusType,
    onInputFocus: (evt: FocusEvent) => void,
    onInputBlur: (evt: FocusEvent) => void,
  ) => Arrayable<VNode>;
  /**
   * 选择器前缀
   * @param modelValue value
   * @paramEn modelValue The model value value.
   * @param inputStatus 选择器输入框状态
   * @paramEn inputStatus The input status value.
   * @param pickerStatus 选择器本身状态
   * @paramEn pickerStatus The picker status value.
    * @en Custom content for the picker prefix slot.
   */
  pickerPrefix?: (
    modelValue: ModelValueType,
    inputStatus: PickerInputStatusType,
    pickerStatus: PickerStatusType,
  ) => Arrayable<VNode>;
  /**
   * 选择器后缀
   * @param modelValue value
   * @paramEn modelValue The model value value.
   * @param inputStatus 选择器输入框状态
   * @paramEn inputStatus The input status value.
   * @param pickerStatus 选择器本身状态
   * @paramEn pickerStatus The picker status value.
    * @en Custom content for the picker suffix slot.
   */
  pickerSuffix?: (
    modelValue: ModelValueType,
    inputStatus: PickerInputStatusType,
    pickerStatus: PickerStatusType,
  ) => Arrayable<VNode>;
  /**
   * 选择器图标
   * @param modelValue value
   * @paramEn modelValue The model value value.
   * @param inputStatus 选择器输入框状态
   * @paramEn inputStatus The input status value.
   * @param pickerStatus 选择器本身状态
   * @paramEn pickerStatus The picker status value.
    * @en Custom content for the picker icon slot.
   */
  pickerIcon?: (
    modelValue: ModelValueType,
    inputStatus: PickerInputStatusType,
    pickerStatus: PickerStatusType,
  ) => VNode[];
  /**
   * 面板外层插槽
   * @param modelValue value
   * @paramEn modelValue The model value value.
   * @param pickerStatus 选择器本身状态
   * @paramEn pickerStatus The picker status value.
    * @en Custom content for the panel outer slot.
   */
  panelOuter?: (modelValue: ModelValueType, pickerStatus: PickerStatusType) => Arrayable<VNode>;
  /**
   * 面板整体插槽
   * @param modelValue value
   * @paramEn modelValue The model value value.
   * @param pickerStatus 选择器本身状态
   * @paramEn pickerStatus The picker status value.
    * @en Custom content for the panel slot.
   */
  panel?: (modelValue: ModelValueType, pickerStatus: PickerStatusType) => Arrayable<VNode>;
  /**
   * 面板前缀插槽
   * @param modelValue value
   * @paramEn modelValue The model value value.
   * @param pickerStatus 选择器本身状态
   * @paramEn pickerStatus The picker status value.
    * @en Custom content for the panel prefix slot.
   */
  panelPrefix?: (modelValue: ModelValueType, pickerStatus: PickerStatusType) => Arrayable<VNode>;
  /**
   * 面板后缀插槽
   * @param modelValue value
   * @paramEn modelValue The model value value.
   * @param pickerStatus 选择器本身状态
   * @paramEn pickerStatus The picker status value.
    * @en Custom content for the panel suffix slot.
   */
  panelSuffix?: (modelValue: ModelValueType, pickerStatus: PickerStatusType) => Arrayable<VNode>;
  /**
   * 面板空插槽
   * @param modelValue value
   * @paramEn modelValue The model value value.
   * @param pickerStatus 选择器本身状态
   * @paramEn pickerStatus The picker status value.
    * @en Custom content for the panel empty slot.
   */
  panelEmpty?: (modelValue: ModelValueType, pickerStatus: PickerStatusType) => Arrayable<VNode>;
  /**
   * 面板加载中覆层插槽
   * @param modelValue value
   * @paramEn modelValue The model value value.
   * @param pickerStatus 选择器本身状态
   * @paramEn pickerStatus The picker status value.
    * @en Custom content for the panel loading slot.
   */
  panelLoading?: (modelValue: ModelValueType, pickerStatus: PickerStatusType) => Arrayable<VNode>;
  /**
   * 面板中确认区域插槽，只有在传入 `need-confirm = true` 时才有效
   * @param cancelHandle 取消的操作方法
   * @paramEn cancelHandle The cancel handle value.
   * @param enterHandle 确认的操作方法
   * @paramEn enterHandle The enter handle value.
   * @param confirmHandle 确认的操作方法
   * @paramEn confirmHandle The confirm handle value.
    * @en Custom content for the panel confirm slot.
   */
  panelConfirm?: { cancelHandle: () => void; enterHandle: () => void; confirmHandle: () => void };
  /**
   * 在确认区域的左侧插槽
    * @en Custom content for the panel confirm left slot.
   */
  panelConfirmLeft?: {};
  /**
   * 面板左侧
    * @en Custom content for the panel left side slot.
   */
  panelLeftSide?: {};
  /**
   * 面板右侧
    * @en Custom content for the panel right side slot.
   */
  panelRightSide?: {};
}>;

export type PickerSlots = typeof usePickerSlots;
