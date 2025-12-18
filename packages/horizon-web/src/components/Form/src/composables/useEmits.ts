import { isBoolean, isString, isUndefined } from '@aurora/utils';

export const useFormEmits = {
  /**
   * 提交时的回调
   */
  submit: (e: Event) => e instanceof Event,
  /**
   * 当验证时触发
   * @param prop 验证的表单的 `prop`
   * @param isValidated 是否验证通过
   * @param message 验证结果，如果通过则为空
   */
  validate: (prop: string, isValidated: boolean, message?: string) =>
    isString(message) || isUndefined(message),
  /**
   * 当验证时触发
   * @param isValidated
   * @deprecated validate
   */
  validateChange: (isValidated: boolean) => isBoolean(isValidated),
};

export type FormEmits = typeof useFormEmits;
