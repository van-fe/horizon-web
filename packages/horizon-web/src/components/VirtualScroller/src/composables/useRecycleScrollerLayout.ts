import { computed, toRaw } from 'vue';
import get from 'lodash/get';
import type { RecycleScrollerProps } from './useProps';
import type { Sizes } from '../utils/types';

export interface RecycleScrollerRange {
  startIndex: number;
  endIndex: number;
  visibleStartIndex: number;
  visibleEndIndex: number;
  totalSize: number;
}

export interface RecycleScrollerItemPosition {
  position: number;
  offset: number;
}

export function normalizeScrollerSize(value: unknown, fallback = 0): number {
  const size = typeof value === 'number' ? value : parseFloat(String(value));
  return Number.isFinite(size) && size > 0 ? size : fallback;
}

export function normalizeScrollerKey(value: any): any {
  return value && typeof value === 'object' ? toRaw(value) : value;
}

/**
 * 虚拟列表的纯布局能力。
 * 统一负责 key、累计尺寸、可见区间和项目坐标计算，避免 DOM 与回收逻辑耦合。
 */
export default function useRecycleScrollerLayout(props: Readonly<RecycleScrollerProps>) {
  const isSimpleArray = computed(
    () => props.items.length > 0 && typeof props.items[0] !== 'object',
  );

  const gridItems = computed(() => {
    const value = Math.floor(Number(props.gridItems));
    return Number.isFinite(value) && value > 0 ? value : 1;
  });

  const fixedItemSize = computed(() => normalizeScrollerSize(props.itemSize));
  const itemSecondarySize = computed(() =>
    normalizeScrollerSize(props.itemSecondarySize, fixedItemSize.value),
  );
  const fallbackItemSize = computed(() => normalizeScrollerSize(props.minItemSize));

  const variableLayout = computed(() => {
    const sizes: Sizes = {
      '-1': { accumulator: 0 },
    };

    let accumulator = 0;
    let minItemSize = Number.POSITIVE_INFINITY;

    if (props.itemSize === null) {
      for (let i = 0; i < props.items.length; i++) {
        const item = props.items[i];
        const measuredSize =
          item && typeof item === 'object' ? get(item, props.sizeField) : undefined;
        const size = normalizeScrollerSize(measuredSize, fallbackItemSize.value);

        accumulator += size;
        sizes[i] = { accumulator, size };

        if (size > 0) {
          minItemSize = Math.min(minItemSize, size);
        }
      }
    }

    return {
      sizes,
      totalSize: accumulator,
      minItemSize: Number.isFinite(minItemSize) ? minItemSize : fallbackItemSize.value,
    };
  });

  const sizes = computed(() => variableLayout.value.sizes);
  const computedMinItemSize = computed(() => variableLayout.value.minItemSize);

  function getItemKey(item: any, index: number): any {
    return isSimpleArray.value ? index : normalizeScrollerKey(get(item, props.keyField));
  }

  function getItemType(item: any): any {
    return item && typeof item === 'object' ? get(item, props.typeField) : undefined;
  }

  const itemIndexByKey = computed(() => {
    const result = new Map<any, number>();

    for (let i = 0; i < props.items.length; i++) {
      const item = props.items[i];
      const key = getItemKey(item, i);

      // Track type changes as part of the item metadata dependency.
      getItemType(item);

      if (key === null || typeof key === 'undefined') {
        throw new Error(`Key is ${key} on item (keyField is '${props.keyField}')`);
      }
      if (result.has(key)) {
        throw new Error(`Key '${String(key)}' is duplicated in the virtual scroller items`);
      }

      result.set(key, i);
    }

    return result;
  });

  function findStartIndex(position: number): number {
    const value = sizes.value;
    let low = 0;
    let high = props.items.length;

    while (low < high) {
      const middle = Math.floor((low + high) / 2);
      if (value[middle].accumulator <= position) {
        low = middle + 1;
      } else {
        high = middle;
      }
    }

    return low;
  }

  function findEndIndex(position: number): number {
    if (position <= 0) return 0;

    const count = props.items.length;
    const value = sizes.value;
    let low = 0;
    let high = count;

    while (low < high) {
      const middle = Math.floor((low + high) / 2);
      if (value[middle].accumulator < position) {
        low = middle + 1;
      } else {
        high = middle;
      }
    }

    return Math.min(count, low + 1);
  }

  function getRange(rawStart: number, rawEnd: number, beforeSize = 0): RecycleScrollerRange {
    const count = props.items.length;
    if (!count) {
      return {
        startIndex: 0,
        endIndex: 0,
        visibleStartIndex: 0,
        visibleEndIndex: 0,
        totalSize: 0,
      };
    }

    const buffer = Math.max(0, Number(props.buffer) || 0);
    const contentStart = rawStart - beforeSize;
    const contentEnd = rawEnd - beforeSize;
    const visibleStart = Math.max(0, contentStart);
    const visibleEnd = Math.max(0, contentEnd);
    const renderStart = Math.max(0, contentStart - buffer);
    const renderEnd = Math.max(0, contentEnd + buffer);

    let startIndex: number;
    let endIndex: number;
    let visibleStartIndex: number;
    let visibleEndIndex: number;
    let totalSize: number;

    if (props.itemSize === null) {
      totalSize = variableLayout.value.totalSize;
      startIndex = findStartIndex(renderStart);
      endIndex = findEndIndex(Math.min(renderEnd, totalSize));
      visibleStartIndex = findStartIndex(visibleStart);
      visibleEndIndex = findEndIndex(Math.min(visibleEnd, totalSize));
    } else {
      const itemSize = fixedItemSize.value;
      if (!itemSize) {
        throw new Error('[RecycleScroller] itemSize must be a positive number');
      }

      const columns = gridItems.value;
      totalSize = Math.ceil(count / columns) * itemSize;
      startIndex = Math.floor(renderStart / itemSize) * columns;
      endIndex = Math.ceil(Math.min(renderEnd, totalSize) / itemSize) * columns;
      visibleStartIndex = Math.floor(visibleStart / itemSize) * columns;
      visibleEndIndex = Math.ceil(Math.min(visibleEnd, totalSize) / itemSize) * columns;
    }

    return {
      startIndex: Math.min(count, Math.max(0, startIndex)),
      endIndex: Math.min(count, Math.max(0, endIndex)),
      visibleStartIndex: Math.min(count, Math.max(0, visibleStartIndex)),
      visibleEndIndex: Math.min(count, Math.max(0, visibleEndIndex)),
      totalSize,
    };
  }

  function getItemPosition(index: number): RecycleScrollerItemPosition {
    if (props.itemSize === null) {
      return {
        position: sizes.value[index - 1]?.accumulator ?? 0,
        offset: 0,
      };
    }

    return {
      position: Math.floor(index / gridItems.value) * fixedItemSize.value,
      offset: (index % gridItems.value) * itemSecondarySize.value,
    };
  }

  function getScrollPosition(index: number): number {
    if (!props.items.length) return 0;

    const safeIndex = Math.min(props.items.length - 1, Math.max(0, Math.floor(index)));
    return getItemPosition(safeIndex).position;
  }

  return {
    computedMinItemSize,
    getItemKey,
    getItemPosition,
    getItemType,
    getRange,
    getScrollPosition,
    gridItems,
    isSimpleArray,
    itemIndexByKey,
    sizes,
  };
}
