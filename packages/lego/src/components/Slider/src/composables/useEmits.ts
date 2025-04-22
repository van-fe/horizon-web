import { isNumber } from '@nio-fe/shared';

export const useSliderEmits = {
  /**
   * 当值更新时触发，包含初始化赋值
   * @param value 变化后的值
   */
  'update:modelValue': (value: number | number[]) => isNumber(value) || Array.isArray(value),
  /**
   * 聚焦时触发
   * @param evt 聚焦事件
   */
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  /**
   * 失焦时触发
   * @param evt 失焦事件
   */
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
};

/**
 * @invisible
 */
export const useSliderCursorEmits = {
  /**
   * 当值更新时触发，包含初始化赋值
   * @param value 变化后的值
   */
  'update:modelValue': (value: number) => isNumber(value),
  /**
   * 聚焦时触发
   * @param evt 聚焦事件
   */
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  /**
   * 失焦时触发
   * @param evt 失焦事件
   */
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
};

export type SliderEmits = typeof useSliderEmits;
export type SliderCursorEmits = typeof useSliderCursorEmits;
