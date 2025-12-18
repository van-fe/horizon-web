import {
  defineComponent,
  reactive,
  computed,
  provide,
  ref,
  watch,
  onActivated,
  onDeactivated,
  // onUnmounted,
  nextTick,
} from 'vue';
// import { ComponentClassBlock } from '@nio-fe/shared';
import type { LegoSetupContext } from '@nio-fe/shared';
import { EventEmitter, useNamespace } from '@nio-fe/shared';
import type { NRecycleScrollerInstance } from './composables/useProps';
import { useVirtualScrollerProps } from './composables/useProps';
import { useVirtualScrollerEmits } from './composables/useEmits';
import { useVirtualScrollerSlots } from './composables/useSlots';
import { useVirtualScrollerExposes } from './composables/useExposes';
import type { VirtualScrollerEmits } from './composables/useEmits';
import type { VirtualScrollerSlots } from './composables/useSlots';
import type { VirtualScrollerExposes } from './composables/useExposes';
import NRecycleScroller from './RecycleScroller';
import type { ItemsWithSize, VScrollData } from './utils/types';
// import type { EventType } from 'mitt';
// import mitt from 'mitt';
import { VirtualScrollerInjectKey } from './utils/injectionKey';
import get from 'lodash/get';

export default defineComponent({
  name: `${useNamespace()}VirtualScroller`,
  desc: '虚拟滚动组件, 实现有限的Dom节点渲染无限的数据',
  components: {
    NRecycleScroller,
  },
  inheritAttrs: false,
  props: useVirtualScrollerProps,
  emits: useVirtualScrollerEmits,
  slots: useVirtualScrollerSlots,
  exposes: useVirtualScrollerExposes,
  setup(
    props,
    {
      emit,
      slots,
      expose,
      attrs,
    }: LegoSetupContext<VirtualScrollerEmits, VirtualScrollerSlots, VirtualScrollerExposes>,
  ) {
    // refs
    const elRef = ref<HTMLDivElement | null | undefined>(null);
    const scroller = ref<NRecycleScrollerInstance | null>(null);
    const $_undefinedMap = ref<Record<number | string, boolean>>({});
    const $_undefinedSizes = ref<number>(0);
    const $_resizeObserver = ref<ResizeObserver>();
    // const $_events = mitt<Record<EventType, { force: boolean }>>();
    const $_events = new EventEmitter();
    const $_scrollingToBottom = ref<boolean>(false);

    const vscrollData = reactive<VScrollData>({
      // keepalive status change flag
      active: true,
      // 由 virtualscrolleritem 组件回写过来的
      sizes: {},
      keyField: props.keyField,
      simpleArray: false,
    });

    // computed(s)
    const isSimpleArray = computed(
      (): boolean => props.items.length > 0 && typeof props.items[0] !== 'object',
    );

    const itemsWithSize = computed((): ItemsWithSize[] => {
      const result = [];
      const sizes = vscrollData.sizes;

      for (let i = 0; i < props.items.length; i++) {
        const item = props.items[i];
        const id: number | string = isSimpleArray.value ? i : get(item, props.keyField);
        let size = sizes[id];

        if (typeof size === 'undefined' && !$_undefinedMap.value[id]) {
          size = 0;
        }

        result.push({
          item,
          id,
          size,
        });
      }
      // console.log(Object.entries(vscrollData.sizes).map(item => `${item[0]}:${item[1]}`).join(' | '));
      return result;
    });

    // watch(s)
    watch(
      () => props.items,
      () => forceUpdate(),
    );

    watch(
      () => isSimpleArray.value,
      (val: boolean) => {
        vscrollData.simpleArray = val;
      },
      {
        immediate: true,
      },
    );

    watch(
      () => props.direction,
      () => forceUpdate(true),
    );

    /**
     * 计算itemsWithSize变化前后的尺寸差, 修正滚动位置
     * 解决向起始位置滚动时, 闪动的问题;
     */
    watch(
      () => itemsWithSize.value,
      (next: ItemsWithSize[], prev: ItemsWithSize[]) => {
        if (!elRef.value) {
          elRef.value = scroller.value?.getRootEl();
        }

        const scrollTop = elRef.value?.scrollTop || 0;
        const scrollLeft = elRef.value?.scrollLeft || 0;

        let prevActiveTop = 0;
        let activeTop = 0;
        const length = Math.min(next.length, prev.length);

        for (let i = 0; i < length; i++) {
          if (prevActiveTop >= (props.direction === 'vertical' ? scrollTop : scrollLeft)) {
            break;
          }
          prevActiveTop += prev[i].size || Number(props.minItemSize);
          activeTop += next[i].size || Number(props.minItemSize);
        }

        const offset = activeTop - prevActiveTop;

        if (offset === 0) {
          return;
        }

        if (props.direction === 'vertical') {
          elRef.value!.scrollTop += offset;
        } else {
          elRef.value!.scrollLeft += offset;
        }
      },
    );

    $_resizeObserver.value = new ResizeObserver(entries => {
      requestAnimationFrame(() => {
        if (!Array.isArray(entries)) {
          return;
        }

        for (const entry of entries) {
          if (entry.target && entry.target.$_vs_onResize) {
            let width: number;
            let height: number;
            if (entry.borderBoxSize) {
              const resizeObserverSize = entry.borderBoxSize[0];
              width = resizeObserverSize.inlineSize;
              height = resizeObserverSize.blockSize;
            } else {
              width = entry.contentRect.width;
              height = entry.contentRect.height;
            }
            // console.log(entry.target.$_vs_id, height);
            entry.target.$_vs_onResize(entry.target.$_vs_id!, width, height);
          }
        } // end for
      }); // end requestAnimationFrame
    }); // end new ResizeObserver

    provide(VirtualScrollerInjectKey, {
      vscrollData,
      vscrollResizeObserver: $_resizeObserver.value,
      direction: props.direction,
      $_undefinedMap,
      $_undefinedSizes,
      $_events,
    });

    expose({
      scrollToItem,
      scrollToBottom,
    });

    // hook(s)
    onActivated(() => {
      vscrollData.active = true;
    });

    onDeactivated(() => {
      vscrollData.active = false;
    });

    // onUnmounted(() => {
    //   $_events.all.clear();
    // });

    function scrollToItem(index: number) {
      const _scroller = scroller.value;
      _scroller && _scroller.scrollToItem(index);
    }

    function scrollToBottom() {
      if ($_scrollingToBottom.value) return;
      $_scrollingToBottom.value = true;
      const el = elRef.value!;

      nextTick(() => {
        el.scrollTop = el.scrollHeight + 5000;

        const cb = () => {
          el.scrollTop = el.scrollHeight + 5000;
          requestAnimationFrame(() => {
            el.scrollTop = el.scrollHeight + 5000;
            if ($_undefinedSizes.value === 0) {
              $_scrollingToBottom.value = false;
            } else {
              requestAnimationFrame(cb);
            }
          });
        };
        requestAnimationFrame(cb);
      });
    }

    // getItemSize 好像没有地方用到了, 应该是个expose

    function forceUpdate(clear = false) {
      if (clear || isSimpleArray.value) {
        vscrollData.sizes = {};
      }
      $_events.emit('vscroll:update', { force: true });
    }

    function onScrollerResize() {
      const _scroller = scroller.value;
      if (_scroller) {
        forceUpdate();
      }
      emit('resize');
    }

    function onScrollerVisible() {
      $_events.emit('vscroll:update', { force: false });
      emit('visible');
    }

    return () => (
      <NRecycleScroller
        ref={scroller}
        {...props}
        {...attrs}
        items={itemsWithSize.value}
        minItemSize={props.minItemSize}
        direction={props.direction}
        keyField="id"
        listTag={props.listTag}
        itemTag={props.itemTag}
        buffer={props.buffer}
        emitUpdate={props.emitUpdate}
        updateInterval={props.updateInterval}
        expandWrapperByChildren={props.expandWrapperByChildren}
        onResize={onScrollerResize}
        onVisible={onScrollerVisible}
        onUpdate={(...args) => emit('update', ...args)}
        onMouseEnter={evt => emit('mouseEnter', evt)}
        onMouseLeave={evt => emit('mouseLeave', evt)}
        onScrollStart={() => emit('scrollStart')}
        onScrollEnd={() => emit('scrollEnd')}
        onScrollBegin={() => emit('scrollBegin')}
        onScrollStop={() => emit('scrollStop')}
        v-slots={{
          default: (scope: { item: ItemsWithSize; index: number; activated: boolean }) =>
            slots.default?.({ ...scope, item: scope.item.item }),
          before: () => slots.before?.(),
          after: () => slots.after?.(),
          empty: () => slots.empty?.(),
        }}
      />
    );
  },
});
