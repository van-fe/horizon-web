import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';
import type { LicensePlateType } from '../utils';

export interface LicensePlateValidationResult {
  valid: boolean;
  type: LicensePlateType;
  value: string;
}

export const useLicensePlateInputExposes = {
  /**
   * 原生号码输入元素
   * @en Native number input element.
   */
  input: Object as ExposeType<HTMLInputElement | undefined>,
  /**
   * 使号码输入框获得焦点
   * @en Focus the number field.
   */
  focus: Function as ExposeType<() => void>,
  /**
   * 使号码输入框失去焦点
   * @en Blur the number field.
   */
  blur: Function as ExposeType<() => void>,
  /**
   * 选中号码输入框内容
   * @en Select the number field content.
   */
  select: Function as ExposeType<() => void>,
  /**
   * 校验当前车牌号并返回结果
   * @en Validate the current license plate and return its result.
   */
  validate: Function as ExposeType<() => LicensePlateValidationResult>,
};

export type LicensePlateInputExposes = ExtractExposeTypes<typeof useLicensePlateInputExposes>;
