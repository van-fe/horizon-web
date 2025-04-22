import type { EventEmitter } from '@nio-fe/shared';
// import type { Emitter, EventType } from 'mitt';
import type { Ref } from 'vue';

export interface Nr {
  id: number;
  index: number;
  used: boolean;
  key: string;
  type: string;
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

export type SizesMap = {
  [key: number | string]: number;
};

export interface VScrollData {
  active: boolean;
  sizes: SizesMap;
  keyField: string;
  simpleArray: boolean;
}

export interface VirtualScrollerContext {
  vscrollData: VScrollData;
  $_undefinedMap: Ref<Record<number, boolean | undefined>>;
  $_undefinedSizes: Ref<number>;
  $_events: InstanceType<typeof EventEmitter>;
  vscrollResizeObserver: ResizeObserver;
  direction: string;
}

export interface ItemsWithSize {
  item: any[];
  id: number | string;
  size: number;
}

declare global {
  interface Element {
    $_vs_id?: number;
    $_vs_onResize?: (vsId: number, width: number, height: number) => void;
  }
}
