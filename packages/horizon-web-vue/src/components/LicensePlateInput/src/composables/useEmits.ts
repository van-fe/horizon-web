import { isBoolean, isString } from '@aurora/utils';
import type { LicensePlateType } from '../utils';

const isPlateType = (value: LicensePlateType) =>
  ['empty', 'incomplete', 'standard', 'new-energy', 'invalid'].includes(value);

export const useLicensePlateInputEmits = {
  /**
   * 更新绑定的完整车牌号
   * @param value 规范化后的车牌号
   * @paramEn value Normalized license plate value.
   * @en Emitted when the bound license plate changes.
   */
  'update:modelValue': (value: string) => isString(value),
  /**
   * 输入时触发
   * @param value 规范化后的车牌号
   * @paramEn value Normalized license plate value.
   * @param type 车牌类型或当前状态
   * @paramEn type License plate type or current state.
   * @en Emitted while the number field changes.
   */
  input: (value: string, type: LicensePlateType) => isString(value) && isPlateType(type),
  /**
   * 车牌号发生完整变更时触发
   * @param value 规范化后的车牌号
   * @paramEn value Normalized license plate value.
   * @param type 车牌类型或当前状态
   * @paramEn type License plate type or current state.
   * @en Emitted when an edit is committed.
   */
  change: (value: string, type: LicensePlateType) => isString(value) && isPlateType(type),
  /**
   * 省份简称变化时触发
   * @param province 省份简称
   * @paramEn province Province abbreviation.
   * @en Emitted when the province changes.
   */
  provinceChange: (province: string) => isString(province),
  /**
   * 有效性变化时触发
   * @param valid 当前是否有效
   * @paramEn valid Whether the current value is valid.
   * @param type 车牌类型或当前状态
   * @paramEn type License plate type or current state.
   * @en Emitted when validity changes.
   */
  validityChange: (valid: boolean, type: LicensePlateType) => isBoolean(valid) && isPlateType(type),
  /**
   * 获得焦点时触发
   * @param evt 焦点事件
   * @paramEn evt Focus event.
   * @en Emitted when the number field receives focus.
   */
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  /**
   * 失去焦点时触发
   * @param evt 焦点事件
   * @paramEn evt Focus event.
   * @en Emitted when the number field loses focus.
   */
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  /**
   * 清空时触发
   * @en Emitted when the value is cleared.
   */
  clear: () => true,
};

export type LicensePlateInputEmits = typeof useLicensePlateInputEmits;
