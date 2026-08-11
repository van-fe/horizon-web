import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';

export const useTypographyExposes = {
  /**
   * 进入编辑状态
   * @en Enters edit mode.
   */
  edit: Function as ExposeType<() => void>,
  /**
   * 取消当前编辑
   * @en Cancels the current edit.
   */
  cancelEdit: Function as ExposeType<() => void>,
  /**
   * 复制当前文本
   * @en Copies the current text.
   */
  copy: Function as ExposeType<() => Promise<boolean>>,
};

export type TypographyExposes = ExtractExposeTypes<typeof useTypographyExposes>;
