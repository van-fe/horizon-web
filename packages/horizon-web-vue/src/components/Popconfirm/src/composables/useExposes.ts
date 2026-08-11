import type { PopconfirmCommandMap } from '@aurora/core';
import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';

export const usePopconfirmExposes = {
  /** 打开确认浮层。 @en Opens the confirmation popover. */
  open: Function as ExposeType<PopconfirmCommandMap['open']>,
  /** 关闭确认浮层。 @en Closes the confirmation popover. */
  close: Function as ExposeType<PopconfirmCommandMap['close']>,
};

export type PopconfirmExposes = ExtractExposeTypes<typeof usePopconfirmExposes>;
