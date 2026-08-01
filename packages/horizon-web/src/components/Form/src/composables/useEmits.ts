import { isString, isUndefined } from '@aurora/utils';

export const useFormEmits = {
  /**
   * 提交时的回调
   * @en Emitted when submit changes.
   */
  submit: (e: Event) => e instanceof Event,
  /**
   * 当验证时触发
   * @param prop 验证的表单的 `prop`
   * @paramEn prop The prop value.
   * @param isValidated 是否验证通过
   * @paramEn isValidated The is validated value.
   * @param message 验证结果，如果通过则为空
   * @paramEn message The message value.
   * @en Emitted when validate changes.
   */
  validate: (prop: string, isValidated: boolean, message?: string) =>
    isString(message) || isUndefined(message),
};

export type FormEmits = typeof useFormEmits;
