import type { HTableInsertedColumnData } from './utils/types';

declare module '@vue/reactivity' {
  interface RefUnwrapBailTypes {
    tableInsertedColumnData: HTableInsertedColumnData;
  }
}
