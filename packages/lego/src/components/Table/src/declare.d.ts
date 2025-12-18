import type { NTableInsertedColumnData } from './utils/types';

declare module '@vue/reactivity' {
  interface RefUnwrapBailTypes {
    tableInsertedColumnData: NTableInsertedColumnData;
  }
}
