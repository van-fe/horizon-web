import type { DialogCommandMap } from '@aurora/core';
import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';

export const useDialogExposes = {
  /** 请求打开对话框。 @en Requests opening the dialog. */
  open: Function as ExposeType<DialogCommandMap['open']>,
  /** 请求关闭对话框。 @en Requests closing the dialog. */
  close: Function as ExposeType<DialogCommandMap['close']>,
};

export type DialogExposes = ExtractExposeTypes<typeof useDialogExposes>;
