import {
  defineComponent,
  reactive,
  computed,
  provide,
  ref,
  watch,
  onActivated,
  onDeactivated,
  onBeforeUnmount,
  nextTick,
  toRef,
} from 'vue';
// import { ComponentClassBlock } from '@aurora/utils';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { EventEmitter, useNamespace } from '@aurora/utils';
import type { HRecycleScrollerInstance } from './composables/useProps';
import { useVirtualScrollerProps } from './composables/useProps';
import { useVirtualScrollerEmits } from './composables/useEmits';
import { useVirtualScrollerSlots } from './composables/useSlots';
import type { VirtualScrollerDefaultSlotRowType } from './composables/useSlots';
import { useVirtualScrollerExposes } from './composables/useExposes';
import type { VirtualScrollerEmits } from './composables/useEmits';
import type { VirtualScrollerSlots } from './composables/useSlots';
import type { VirtualScrollerExposes } from './composables/useExposes';
import HRecycleScroller from './RecycleScroller';
import type { ItemsWithSize, VScrollData } from './utils/types';
// import type { EventType } from 'mitt';
// import mitt from 'mitt';
import { VirtualScrollerInjectKey } from './utils/injectionKey';
import get from 'lodash/get';
import useVirtualScrollerResizeObserver from './composables/useVirtualScrollerResizeObserver';
import {
  normalizeScrollerKey,
  normalizeScrollerSize,
} from './composables/useRecycleScrollerLayout';
import useRenderlessVirtualScroller from './composables/useRenderlessVirtualScroller';

export default defineComponent({
  name: `${useNamespace()}VirtualScroller`,
  desc: '虚拟滚动组件, 实现有限的Dom节点渲染无限的数据',
  components: {
    HRecycleScroller,
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
    }: HorizonWebSetupContext<VirtualScrollerEmits, VirtualScrollerSlots, VirtualScrollerExposes>,
  ) {
    // refs
    const elRef = ref<HTMLDivElement | null | undefined>(null);
    const scroller = ref<HRecycleScrollerInstance | null>(null);
    const $_undefinedMap = ref(new Map<any, boolean>());
    const $_undefinedSizes = ref<number>(0);
    const $_resizeObserver = useVirtualScrollerResizeObserver();
    const $_events = new EventEmitter();
    const $_scrollingToBottom = ref<boolean>(false);
    const directionRef = toRef(props, 'direction');
    let $_scrollToBottomFrame: number | undefined;

    const vscrollData = reactive<VScrollData>({
      // keepalive status change flag
      active: true,
      // 由 virtualscrolleritem 组件回写过来的
      sizes: new Map(),
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
        const id = isSimpleArray.value ? i : normalizeScrollerKey(get(item, props.keyField));

        if (id === null || typeof id === 'undefined') {
          throw new Error(
            `keyField '${props.keyField}' not found in your item. You should set a valid keyField prop on your Scroller`,
          );
        }

        let size = sizes.get(id);

        if (typeof size === 'undefined' && !$_undefinedMap.value.get(id)) {
          size = 0;
        }

        result.push({
          item,
          id,
          size: size ?? 0,
        });
      }
      return result;
    });

    const renderlessScroller = useRenderlessVirtualScroller(props, itemsWithSize, emit);

    // watch(s)
    watch(
      () => props.items.slice(),
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

    watch(
      () => props.keyField,
      value => {
        vscrollData.keyField = value;
        forceUpdate(true);
      },
    );

    /**
     * 计算itemsWithSize变化前后的尺寸差, 修正滚动位置
     * 解决向起始位置滚动时, 闪动的问题;
     */
    watch(
      () => itemsWithSize.value,
      (next: ItemsWithSize[], prev: ItemsWithSize[]) => {
        if ($_scrollingToBottom.value || !prev.length) return;

        if (!props.renderless && !elRef.value) {
          elRef.value = scroller.value?.getRootEl();
        }

        const el = props.renderless ? props.scrollContainer : elRef.value;
        if (!el) return;

        const scrollPosition =
          props.direction === 'vertical' ? el.scrollTop || 0 : el.scrollLeft || 0;
        const minItemSize = normalizeScrollerSize(props.minItemSize);

        let previousAnchorTop = 0;
        let previousAnchorIndex = 0;
        while (
          previousAnchorIndex < prev.length - 1 &&
          previousAnchorTop + normalizeScrollerSize(prev[previousAnchorIndex].size, minItemSize) <=
            scrollPosition
        ) {
          previousAnchorTop += normalizeScrollerSize(prev[previousAnchorIndex].size, minItemSize);
          previousAnchorIndex++;
        }

        const anchorId = prev[previousAnchorIndex]?.id;
        const nextAnchorIndex = next.findIndex(item => item.id === anchorId);
        if (nextAnchorIndex === -1) return;

        let nextAnchorTop = 0;
        for (let i = 0; i < nextAnchorIndex; i++) {
          nextAnchorTop += normalizeScrollerSize(next[i].size, minItemSize);
        }

        const offset = nextAnchorTop - previousAnchorTop;
        if (!offset) return;

        if (props.direction === 'vertical') {
          el.scrollTop += offset;
        } else {
          el.scrollLeft += offset;
        }
      },
    );

    provide(VirtualScrollerInjectKey, {
      vscrollData,
      vscrollResizeObserver: $_resizeObserver,
      direction: directionRef,
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

    onBeforeUnmount(() => {
      $_scrollingToBottom.value = false;
      if (typeof $_scrollToBottomFrame !== 'undefined') {
        cancelAnimationFrame($_scrollToBottomFrame);
      }
    });

    function scrollToItem(index: number) {
      if (props.renderless) {
        renderlessScroller.scrollToItem(index);
        return;
      }

      const _scroller = scroller.value;
      _scroller && _scroller.scrollToItem(index);
    }

    function scrollToBottom() {
      if (props.renderless) {
        renderlessScroller.scrollToBottom();
        return;
      }

      if ($_scrollingToBottom.value) return;
      $_scrollingToBottom.value = true;

      nextTick(() => {
        const el = elRef.value ?? scroller.value?.getRootEl();
        if (!el) {
          $_scrollingToBottom.value = false;
          return;
        }

        elRef.value = el;
        let previousExtent = -1;
        let stableFrames = 0;
        let attempts = 0;

        const cb = () => {
          const extent =
            props.direction === 'vertical' ? el.scrollHeight || 0 : el.scrollWidth || 0;

          if (props.direction === 'vertical') {
            el.scrollTop = extent;
          } else {
            el.scrollLeft = extent;
          }

          stableFrames =
            extent === previousExtent && $_undefinedSizes.value === 0 ? stableFrames + 1 : 0;
          previousExtent = extent;
          attempts++;

          if (stableFrames >= 2 || attempts >= 100) {
            $_scrollingToBottom.value = false;
            $_scrollToBottomFrame = undefined;
            return;
          }

          $_scrollToBottomFrame = requestAnimationFrame(cb);
        };

        cb();
      });
    }

    // getItemSize 好像没有地方用到了, 应该是个expose

    function forceUpdate(clear = false) {
      if (clear || isSimpleArray.value) {
        vscrollData.sizes = new Map();
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

    return () =>
      props.renderless ? (
        slots.renderless?.(renderlessScroller.scope.value)
      ) : (
        <HRecycleScroller
          ref={scroller}
          {...props}
          {...attrs}
          items={itemsWithSize.value}
          minItemSize={props.minItemSize}
          itemSize={props.itemSize}
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
            default: (scope: VirtualScrollerDefaultSlotRowType<ItemsWithSize>) =>
              slots.default?.({ ...scope, item: scope.item.item }),
            before: () => slots.before?.(),
            after: () => slots.after?.(),
            empty: () => slots.empty?.(),
          }}
        />
      );
  },
});
