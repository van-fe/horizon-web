import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';

export const useFormExposes = {
  /**
   * 验证表单，验证通过返回 `Resolve<void>`，验证失败返回 `Reject<ValidateError[]>`
    * @en Controls validate.
   */
  validate: Function as ExposeType<() => Promise<void>>,
  /**
   * 验证表单指定字段，验证通过返回 Resolve<string[]>，验证失败返回 Reject<ValidateError[]>
   * @param fields 需要验证的字段
   * @paramEn fields The fields value.
    * @en Controls validate field.
   */
  validateField: Function as ExposeType<(fields: string[]) => Promise<string[]>>,
  /**
   * 重置该表单项，将其值重置为初始值，并移除校验结果
   * @param props 需要重置的字段，不传即全部重置
   * @paramEn props The props value.
    * @en Controls reset fields.
   */
  resetFields: Function as ExposeType<(props?: string[]) => void>,
  /**
   * 滚动到指定的字段
   * @param prop 需要滚动到的字段
   * @paramEn prop The prop value.
    * @en Controls scroll to field.
   */
  scrollToField: Function as ExposeType<(prop: string) => void>,
  /**
   * 清理某个字段的表单验证信息
   * @param props 需要清空验证信息的字段，不传即全部情况
   * @paramEn props The props value.
    * @en Controls clear validate.
   */
  clearValidate: Function as ExposeType<(props?: string[]) => void>,
};

export type FormExposes = ExtractExposeTypes<typeof useFormExposes>;

export const useFormItemExposes = {
  /**
   * 验证表单，验证通过返回 `Resolve<void>`，验证失败返回 `Reject<ValidateError[]>`
    * @en Controls validate.
   */
  validate: Function as ExposeType<() => Promise<void>>,
  /**
   * 重置该表单项，将其值重置为初始值，并移除校验结果
    * @en Controls reset fields.
   */
  resetFields: Function as ExposeType<() => void>,
  /**
   * 清理当前表单项的验证信息
    * @en Controls clear validate.
   */
  clearValidate: Function as ExposeType<() => void>,
};

export type FormItemExposes = ExtractExposeTypes<typeof useFormItemExposes>;
