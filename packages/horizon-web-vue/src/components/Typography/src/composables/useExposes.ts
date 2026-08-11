import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';
import type { TypographyCommandMap } from '@aurora/core';

export const useTypographyExposes = {
  /**
   * 进入编辑状态
   * @en Enters edit mode.
   */
  edit: Function as ExposeType<TypographyCommandMap['edit']>,
  /**
   * 取消当前编辑
   * @en Cancels the current edit.
   */
  cancelEdit: Function as ExposeType<TypographyCommandMap['cancelEdit']>,
  /**
   * 复制当前文本
   * @en Copies the current text.
   */
  copy: Function as ExposeType<TypographyCommandMap['copy']>,
};

export type TypographyExposes = ExtractExposeTypes<typeof useTypographyExposes>;
