import type { DrawerCommandMap } from '@aurora/core';
import type { ExposeType, ExtractExposeTypes } from '@aurora/utils';

export const useDrawerExposes = {
  /** 请求打开抽屉。 @en Requests opening the drawer. */
  open: Function as ExposeType<DrawerCommandMap['open']>,
  /** 请求关闭抽屉。 @en Requests closing the drawer. */
  close: Function as ExposeType<DrawerCommandMap['close']>,
};

export type DrawerExposes = ExtractExposeTypes<typeof useDrawerExposes>;
