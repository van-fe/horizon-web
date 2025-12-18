import type { ExposeType, ExtractExposeTypes } from '@aurora/shared';
import type { Ref } from 'vue';

export const usePickerExposes = {
  /**
   * 显示下拉框
   * @deprecated showPopover
   */
  show: Function as ExposeType<() => void>,
  /**
   * 隐藏下拉框
   * @deprecated hidePopover
   */
  hide: Function as ExposeType<() => void>,
  /**
   * 显示下拉框
   * @version 2.5.11
   */
  showPopover: Function as ExposeType<() => void>,
  /**
   * 隐藏下拉框
   * @version 2.5.11
   */
  hidePopover: Function as ExposeType<() => void>,
  /**
   * 聚焦输入框
   */
  focus: Function as ExposeType<() => void>,
  /**
   * 失焦输入框
   */
  blur: Function as ExposeType<() => void>,
  /**
   * @invisible
   * 强制失焦输入框
   * @version 2.12.15-alpha.3
   */
  forceBlur: Function as ExposeType<() => void>,
  /**
   * 获取最外层 div dom 节点
   * @version 2.2.0
   */
  wrapperDom: Function as ExposeType<() => HTMLDivElement>,
  /**
   * 获取弹出层 dom 节点
   * @version 2.2.0
   */
  popoverDom: Function as ExposeType<() => HTMLDivElement>,
  /**
   * 处理输入框聚焦
   * 用于在自定义输入框内有输入框的交互时，更好地处理事件
   * @param evt 聚焦事件
   * @version 2.5.11
   */
  handleInputFocus: Function as ExposeType<(evt: FocusEvent) => void>,
  /**
   * 处理输入框失焦
   * 用于在自定义输入框内有输入框的交互时，更好地处理事件
   * @param evt 聚焦事件
   * @version 2.5.11
   */
  handleInputBlur: Function as ExposeType<(evt: FocusEvent) => void>,
};

export const usePickerInputExposes = {
  /**
   * 聚焦输入框
   */
  focus: Function as ExposeType<() => void>,
  /**
   * 失焦输入框
   */
  blur: Function as ExposeType<() => void>,
  /**
   * 强制失焦输入框
   * @version 2.12.15-alpha.3
   */
  forceBlur: Function as ExposeType<() => void>,
  /**
   * 输入框
   */
  input: Object as ExposeType<Ref<HTMLInputElement | null>>,
};

export const usePickerFitContentInputExposes = {
  /**
   * 聚焦输入框
   */
  focus: Function as ExposeType<() => void>,
  /**
   * 失焦输入框
   */
  blur: Function as ExposeType<() => void>,
  /**
   * 强制失焦输入框
   * @version 2.12.15-alpha.3
   */
  forceBlur: Function as ExposeType<() => void>,
  /**
   * 输入框
   */
  input: Object as ExposeType<Ref<HTMLInputElement | null>>,
  /**
   * 刷新输入框内字符串
   * @version 2.12.6
   */
  resetInputString: Function as ExposeType<(value?: string | number) => void>,
};

export const usePickerPureInputExpose = usePickerFitContentInputExposes;

export type PickerExposes = ExtractExposeTypes<typeof usePickerExposes>;
export type PickerInputExposes = ExtractExposeTypes<typeof usePickerInputExposes>;
export type PickerFitContentInputExposes = ExtractExposeTypes<
  typeof usePickerFitContentInputExposes
>;
export type PickerPureInputExposes = ExtractExposeTypes<typeof usePickerPureInputExpose>;
