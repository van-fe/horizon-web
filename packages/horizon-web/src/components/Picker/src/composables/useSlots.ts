import type { SlotsType, VNode } from 'vue';
import type { ModelValueType, PickerInputStatusType, PickerStatusType } from './useProps';
import type { Arrayable } from '@aurora/utils';

export const usePickerSlots = Object as SlotsType<{
  /**
   * 面板内容区域插槽
   * @param modelValue value
   * @param pickerStatus 选择器本身状态
   */
  default?: (modelValue: ModelValueType, pickerStatus: PickerStatusType) => Arrayable<VNode>;
  /**
   * 触发器的完整自定义渲染
   * @param modelValue
   * @param inputStatus
   * @param pickerStatus
   */
  pickerOuter?: (
    modelValue: ModelValueType,
    inputStatus: PickerInputStatusType,
    pickerStatus: PickerStatusType,
  ) => Arrayable<VNode>;
  /**
   * 选择器自定义渲染
   * @param modelValue value
   * @param inputStatus 选择器输入框状态
   * @param pickerStatus 选择器本身状态
   * @param onInputFocus 当输入框聚焦时的回调方法
   * @param onInputBlur 当输入框失焦时的回调方法
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
   * @param inputStatus 选择器输入框状态
   * @param pickerStatus 选择器本身状态
   * @param onInputFocus 当输入框聚焦时的回调方法
   * @param onInputBlur 当输入框失焦时的回调方法
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
   * @param inputStatus 选择器输入框状态
   * @param pickerStatus 选择器本身状态
   * @param onInputFocus 当输入框聚焦时的回调方法
   * @param onInputBlur 当输入框失焦时的回调方法
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
   * @param inputStatus 选择器输入框状态
   * @param pickerStatus 选择器本身状态
   */
  pickerPrefix?: (
    modelValue: ModelValueType,
    inputStatus: PickerInputStatusType,
    pickerStatus: PickerStatusType,
  ) => Arrayable<VNode>;
  /**
   * 选择器后缀
   * @param modelValue value
   * @param inputStatus 选择器输入框状态
   * @param pickerStatus 选择器本身状态
   */
  pickerSuffix?: (
    modelValue: ModelValueType,
    inputStatus: PickerInputStatusType,
    pickerStatus: PickerStatusType,
  ) => Arrayable<VNode>;
  /**
   * 选择器图标
   * @param modelValue value
   * @param inputStatus 选择器输入框状态
   * @param pickerStatus 选择器本身状态
   */
  pickerIcon?: (
    modelValue: ModelValueType,
    inputStatus: PickerInputStatusType,
    pickerStatus: PickerStatusType,
  ) => VNode[];
  /**
   * 面板外层插槽
   * @param modelValue value
   * @param pickerStatus 选择器本身状态
   * @version 2.12.15-alpha.3
   */
  panelOuter?: (modelValue: ModelValueType, pickerStatus: PickerStatusType) => Arrayable<VNode>;
  /**
   * 面板整体插槽
   * @param modelValue value
   * @param pickerStatus 选择器本身状态
   */
  panel?: (modelValue: ModelValueType, pickerStatus: PickerStatusType) => Arrayable<VNode>;
  /**
   * 面板前缀插槽
   * @param modelValue value
   * @param pickerStatus 选择器本身状态
   */
  panelPrefix?: (modelValue: ModelValueType, pickerStatus: PickerStatusType) => Arrayable<VNode>;
  /**
   * 面板后缀插槽
   * @param modelValue value
   * @param pickerStatus 选择器本身状态
   */
  panelSuffix?: (modelValue: ModelValueType, pickerStatus: PickerStatusType) => Arrayable<VNode>;
  /**
   * 面板空插槽
   * @param modelValue value
   * @param pickerStatus 选择器本身状态
   */
  panelEmpty?: (modelValue: ModelValueType, pickerStatus: PickerStatusType) => Arrayable<VNode>;
  /**
   * 面板加载中覆层插槽
   * @param modelValue value
   * @param pickerStatus 选择器本身状态
   */
  panelLoading?: (modelValue: ModelValueType, pickerStatus: PickerStatusType) => Arrayable<VNode>;
  /**
   * 面板中确认区域插槽，只有在传入 `need-confirm = true` 时才有效
   * @param cancelHandle 取消的操作方法
   * @param enterHandle 确认的操作方法
   * @param confirmHandle 确认的操作方法
   */
  panelConfirm?: { cancelHandle: () => void; enterHandle: () => void; confirmHandle: () => void };
  /**
   * 在确认区域的左侧插槽
   * @version 2.12.6
   */
  panelConfirmLeft?: {};
  /**
   * 面板左侧
   */
  panelLeftSide?: {};
  /**
   * 面板右侧
   */
  panelRightSide?: {};
}>;

export type PickerSlots = typeof usePickerSlots;
