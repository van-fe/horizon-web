import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  toRef,
  watch,
  type ComputedRef,
  type SetupContext,
} from 'vue';
import { useResizeObserver } from '@vueuse/core';
import type { VirtualScrollerProps, RecycleScrollerProps } from './useProps';
import type { VirtualScrollerEmits } from './useEmits';
import type { ItemsWithSize } from '../utils/types';
import type { VirtualScrollerRenderlessScope } from './useSlots';
import useRecycleScrollerLayout, { normalizeScrollerSize } from './useRecycleScrollerLayout';

const emptyRange = () => ({
  startIndex: 0,
  endIndex: 0,
  visibleStartIndex: 0,
  visibleEndIndex: 0,
  totalSize: 0,
});

/**
 * 复用虚拟滚动布局，但将 DOM 与滚动容器交由消费组件管理。
 * @en Reuses virtual-scroller layout while leaving DOM and scroll ownership to the consumer.
 */
export default function useRenderlessVirtualScroller(
  props: Readonly<VirtualScrollerProps>,
  itemsWithSize: ComputedRef<ItemsWithSize[]>,
  emit: SetupContext<VirtualScrollerEmits>['emit'],
) {
  const range = reactive(emptyRange());
  const scrollTarget = computed(() => (props.renderless ? props.scrollContainer : undefined));
  const layoutProps = reactive({
    get items() {
      return itemsWithSize.value;
    },
    keyField: 'id',
    typeField: 'type',
    sizeField: 'size',
    get itemSize() {
      return props.itemSize ?? null;
    },
    itemSecondarySize: undefined,
    gridItems: undefined,
    get minItemSize() {
      return props.minItemSize;
    },
    get buffer() {
      return props.buffer;
    },
    get direction() {
      return props.direction;
    },
  }) as unknown as Readonly<RecycleScrollerProps>;
  const layout = useRecycleScrollerLayout(layoutProps);

  let updateFrame: number | undefined;
  let updateScheduled = false;

  function updateRange() {
    if (!props.renderless) return;

    const target = props.scrollContainer;
    if (!target) {
      const fallbackViewportSize = normalizeScrollerSize(props.scrollerHeight);
      Object.assign(
        range,
        fallbackViewportSize > 0 ? layout.getRange(0, fallbackViewportSize) : emptyRange(),
      );
      return;
    }

    const start = props.direction === 'vertical' ? target.scrollTop : target.scrollLeft;
    const measuredViewportSize =
      props.direction === 'vertical' ? target.clientHeight : target.clientWidth;
    const viewportSize = measuredViewportSize || normalizeScrollerSize(props.scrollerHeight);
    const nextRange = layout.getRange(start, start + viewportSize);

    Object.assign(range, nextRange);
    if (props.emitUpdate) {
      emit(
        'update',
        nextRange.startIndex,
        nextRange.endIndex,
        nextRange.visibleStartIndex,
        nextRange.visibleEndIndex,
      );
    }
  }

  function scheduleUpdate() {
    if (updateScheduled) return;

    updateScheduled = true;
    updateFrame = requestAnimationFrame(() => {
      updateScheduled = false;
      updateFrame = undefined;
      updateRange();
    });
  }

  function scrollToItem(index: number) {
    const target = props.scrollContainer;
    if (!target) return;

    const position = layout.getScrollPosition(index);
    if (props.direction === 'vertical') {
      target.scrollTop = position;
    } else {
      target.scrollLeft = position;
    }
    updateRange();
  }

  function scrollToBottom() {
    const target = props.scrollContainer;
    if (!target) return;

    if (props.direction === 'vertical') {
      target.scrollTop = layout.getRange(0, 0).totalSize;
    } else {
      target.scrollLeft = layout.getRange(0, 0).totalSize;
    }
    updateRange();
  }

  watch(
    scrollTarget,
    (target, _previousTarget, onCleanup) => {
      if (!target) return;

      target.addEventListener('scroll', scheduleUpdate, { passive: true });
      onCleanup(() => target.removeEventListener('scroll', scheduleUpdate));
    },
    { immediate: true, flush: 'post' },
  );
  useResizeObserver(scrollTarget, scheduleUpdate);

  watch(
    [
      itemsWithSize,
      toRef(props, 'itemSize'),
      toRef(props, 'minItemSize'),
      toRef(props, 'buffer'),
      toRef(props, 'direction'),
      toRef(props, 'scrollContainer'),
      toRef(props, 'scrollerHeight'),
      toRef(props, 'renderless'),
    ],
    () => void nextTick(scheduleUpdate),
    { deep: true },
  );

  onMounted(() => void nextTick(scheduleUpdate));
  onBeforeUnmount(() => {
    if (updateFrame !== undefined) {
      cancelAnimationFrame(updateFrame);
    }
    updateScheduled = false;
  });

  updateRange();

  const scope = computed<VirtualScrollerRenderlessScope>(() => {
    const startOffset =
      range.startIndex < props.items.length
        ? layout.getItemPosition(range.startIndex).position
        : range.totalSize;
    const renderedEnd =
      range.endIndex < props.items.length
        ? layout.getItemPosition(range.endIndex).position
        : range.totalSize;

    return {
      views: props.items.slice(range.startIndex, range.endIndex).map((item, offset) => ({
        item,
        index: range.startIndex + offset,
        active: true,
      })),
      ...range,
      startOffset,
      endOffset: Math.max(0, range.totalSize - renderedEnd),
      scrollToItem,
    };
  });

  return {
    scope,
    scrollToBottom,
    scrollToItem,
    updateRange,
  };
}
