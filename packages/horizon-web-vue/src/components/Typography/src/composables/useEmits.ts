import { isString } from '@aurora/utils';

export const useTypographyEmits = {
  /**
   * 更新文本内容
   * @param value 新文本
   * @paramEn value The updated text.
   * @en Emitted when the controlled text is updated.
   */
  'update:modelValue': (value: string) => isString(value),
  /**
   * 编辑完成时触发
   * @param value 新文本
   * @paramEn value The committed text.
   * @en Emitted when editing is committed.
   */
  change: (value: string) => isString(value),
  /**
   * 复制完成时触发
   * @param value 被复制的文本
   * @paramEn value The copied text.
   * @param success 是否复制成功
   * @paramEn success Whether copying succeeded.
   * @en Emitted after a copy attempt.
   */
  copy: (value: string, success: boolean) => isString(value) && typeof success === 'boolean',
};

export type TypographyEmits = typeof useTypographyEmits;
