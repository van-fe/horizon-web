import type { EventEmitter } from '@aurora/utils';
// import type { Emitter, EventType } from 'mitt';
import type { Ref } from 'vue';

export interface Nr {
  id: number;
  index: number;
  used: boolean;
  key: any;
  type: any;
}

export interface ViewItem {
  nr: Nr;
  item: any;
  position: number;
  offset: number;
}

export type Sizes = {
  [key: string]: { accumulator: number; size?: number };
};

export type SizesMap = Map<any, number>;

export interface VScrollData {
  active: boolean;
  sizes: SizesMap;
  keyField: string;
  simpleArray: boolean;
}

export interface VirtualScrollerContext {
  vscrollData: VScrollData;
  $_undefinedMap: Ref<Map<any, boolean>>;
  $_undefinedSizes: Ref<number>;
  $_events: InstanceType<typeof EventEmitter>;
  vscrollResizeObserver?: ResizeObserver;
  direction: Ref<'horizontal' | 'vertical'>;
}

export interface ItemsWithSize {
  item: any;
  id: any;
  size: number;
}

declare global {
  interface Element {
    $_vs_id?: any;
    $_vs_onResize?: (vsId: any, width: number, height: number) => void;
  }
}
