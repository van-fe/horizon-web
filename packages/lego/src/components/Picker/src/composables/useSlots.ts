import type { ModelValueType, PickerInputStatusType, PickerStatusType } from './useProps';
import { isModelValue } from './useProps';
import { isFunction, isObject, isString } from '@nio-fe/shared';

export const usePickerSlots = {
  /**
   * 面板内容区域插槽
   * @param modelValue value
   * @param pickerStatus 选择器本身状态
   */
  default: (modelValue: ModelValueType, pickerStatus: PickerStatusType) =>
    isModelValue(modelValue) && isString(pickerStatus),
  /**
   * 触发器的完整自定义渲染
   * @param modelValue
   * @param inputStatus
   * @param pickerStatus
   */
  pickerOuter: (
    modelValue: ModelValueType,
    inputStatus: PickerInputStatusType,
    pickerStatus: PickerStatusType,
  ) => isModelValue(modelValue) && isString(inputStatus) && isString(pickerStatus),
  /**
   * 选择器自定义渲染
   * @param modelValue value
   * @param inputStatus 选择器输入框状态
   * @param pickerStatus 选择器本身状态
   * @param onInputFocus 当输入框聚焦时的回调方法
   * @param onInputBlur 当输入框失焦时的回调方法
   */
  picker: (
    modelValue: ModelValueType,
    inputStatus: PickerInputStatusType,
    pickerStatus: PickerStatusType,
    onInputFocus: (evt: FocusEvent) => void,
    onInputBlur: (evt: FocusEvent) => void,
  ) =>
    isModelValue(modelValue) &&
    isString(inputStatus) &&
    isString(pickerStatus) &&
    isFunction(onInputFocus) &&
    isFunction(onInputBlur),
  /**
   * 选择器容器自定义渲染，包括 pickerInner pickerPrefix pickerSuffix 范围
   * @param modelValue value
   * @param inputStatus 选择器输入框状态
   * @param pickerStatus 选择器本身状态
   * @param onInputFocus 当输入框聚焦时的回调方法
   * @param onInputBlur 当输入框失焦时的回调方法
   */
  pickerContainer: (
    modelValue: ModelValueType,
    inputStatus: PickerInputStatusType,
    pickerStatus: PickerStatusType,
    onInputFocus: (evt: FocusEvent) => void,
    onInputBlur: (evt: FocusEvent) => void,
  ) =>
    isModelValue(modelValue) &&
    isString(inputStatus) &&
    isString(pickerStatus) &&
    isFunction(onInputFocus) &&
    isFunction(onInputBlur),
  /**
   * 选择器内容区域
   * @param modelValue value
   * @param inputStatus 选择器输入框状态
   * @param pickerStatus 选择器本身状态
   * @param onInputFocus 当输入框聚焦时的回调方法
   * @param onInputBlur 当输入框失焦时的回调方法
   */
  pickerInner: (
    modelValue: ModelValueType,
    inputStatus: PickerInputStatusType,
    pickerStatus: PickerStatusType,
    onInputFocus: (evt: FocusEvent) => void,
    onInputBlur: (evt: FocusEvent) => void,
  ) =>
    isModelValue(modelValue) &&
    isString(inputStatus) &&
    isString(pickerStatus) &&
    isFunction(onInputFocus) &&
    isFunction(onInputBlur),
  /**
   * 选择器前缀
   * @param modelValue value
   * @param inputStatus 选择器输入框状态
   * @param pickerStatus 选择器本身状态
   */
  pickerPrefix: (
    modelValue: ModelValueType,
    inputStatus: PickerInputStatusType,
    pickerStatus: PickerStatusType,
  ) => isModelValue(modelValue) && isString(inputStatus) && isString(pickerStatus),
  /**
   * 选择器后缀
   * @param modelValue value
   * @param inputStatus 选择器输入框状态
   * @param pickerStatus 选择器本身状态
   */
  pickerSuffix: (
    modelValue: ModelValueType,
    inputStatus: PickerInputStatusType,
    pickerStatus: PickerStatusType,
  ) => isModelValue(modelValue) && isString(inputStatus) && isString(pickerStatus),
  /**
   * 选择器图标
   * @param modelValue value
   * @param inputStatus 选择器输入框状态
   * @param pickerStatus 选择器本身状态
   */
  pickerIcon: (
    modelValue: ModelValueType,
    inputStatus: PickerInputStatusType,
    pickerStatus: PickerStatusType,
  ) => isModelValue(modelValue) && isString(inputStatus) && isString(pickerStatus),
  /**
   * 面板外层插槽
   * @param modelValue value
   * @param pickerStatus 选择器本身状态
   * @version 2.12.15-alpha.3
   */
  panelOuter: (modelValue: ModelValueType, pickerStatus: PickerStatusType) =>
    isModelValue(modelValue) && isString(pickerStatus),
  /**
   * 面板整体插槽
   * @param modelValue value
   * @param pickerStatus 选择器本身状态
   */
  panel: (modelValue: ModelValueType, pickerStatus: PickerStatusType) =>
    isModelValue(modelValue) && isString(pickerStatus),
  /**
   * 面板前缀插槽
   * @param modelValue value
   * @param pickerStatus 选择器本身状态
   */
  panelPrefix: (modelValue: ModelValueType, pickerStatus: PickerStatusType) =>
    isModelValue(modelValue) && isString(pickerStatus),
  /**
   * 面板后缀插槽
   * @param modelValue value
   * @param pickerStatus 选择器本身状态
   */
  panelSuffix: (modelValue: ModelValueType, pickerStatus: PickerStatusType) =>
    isModelValue(modelValue) && isString(pickerStatus),
  /**
   * 面板空插槽
   * @param modelValue value
   * @param pickerStatus 选择器本身状态
   */
  panelEmpty: (modelValue: ModelValueType, pickerStatus: PickerStatusType) =>
    isModelValue(modelValue) && isString(pickerStatus),
  /**
   * 面板加载中覆层插槽
   * @param modelValue value
   * @param pickerStatus 选择器本身状态
   */
  panelLoading: (modelValue: ModelValueType, pickerStatus: PickerStatusType) =>
    isModelValue(modelValue) && isString(pickerStatus),
  /**
   * 面板中确认区域插槽，只有在传入 `need-confirm = true` 时才有效
   * @param handler 确认和取消的操作方法，其中 `enterHandle` 会被去除，请勿使用
   */
  panelConfirm: (handler: {
    cancelHandle: () => void;
    enterHandle: () => void;
    confirmHandle: () => void;
  }) => isObject(handler),
  /**
   * 在确认区域的左侧插槽
   * @version 2.12.6
   */
  panelConfirmLeft: () => true,
  /**
   * 面板左侧
   */
  panelLeftSide: () => true,
  /**
   * 面板右侧
   */
  panelRightSide: () => true,
};

export type PickerSlots = typeof usePickerSlots;
