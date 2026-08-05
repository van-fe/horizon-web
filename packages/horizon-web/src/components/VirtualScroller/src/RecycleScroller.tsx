import type { VNode } from 'vue';
import {
  unref,
  h,
  nextTick,
  onActivated,
  onBeforeUnmount,
  onMounted,
  defineComponent,
  ref,
  watch,
  toRef,
} from 'vue';
import { ComponentClassBlock, cls as multiCls, useNamespace, isDefined } from '@aurora/utils';
import type { HorizonWebSetupContext, HorizonWebComponentInstance } from '@aurora/utils';
import { useRecycleScrollerProps } from './composables/useProps';
import { useRecycleScrollerEmits } from './composables/useEmits';
import { useRecycleScrollerSlots } from './composables/useSlots';
import { useRecycleScrollerExposes } from './composables/useExposes';
import type { RecycleScrollerEmits } from './composables/useEmits';
import type { RecycleScrollerSlots } from './composables/useSlots';
import type { RecycleScrollerExposes } from './composables/useExposes';
import { useElementVisibility, useResizeObserver } from '@vueuse/core';
import { getScrollParent } from './utils/scrollParent';
import HScrollbar from '~/components/Scrollbar/src/Scrollbar';
import useSize from '~/utils/useSize';
import type { ScrollbarExposes } from '~/components/Scrollbar/src/composables/useExposes';
import useRecycleScrollerLayout, {
  normalizeScrollerSize,
} from './composables/useRecycleScrollerLayout';
import useRecycleScrollerPool from './composables/useRecycleScrollerPool';

export default defineComponent({
  name: `${useNamespace()}RecycleScroller`,
  desc: "复用渲染节点的虚拟滚动容器",
  descLocales: { en: "A virtual scroller that reuses rendered nodes." },
  components: {
    HScrollbar,
  },
  props: useRecycleScrollerProps,
  emits: useRecycleScrollerEmits,
  slots: useRecycleScrollerSlots,
  exposes: useRecycleScrollerExposes,
  setup(
    props,
    {
      emit,
      slots,
      expose,
    }: HorizonWebSetupContext<RecycleScrollerEmits, RecycleScrollerSlots, RecycleScrollerExposes>,
  ) {
    // 本地变量
    let $_startIndex = 0;
    let $_endIndex = 0;
    let $_scrollDirty = false;
    let $_lastUpdateScrollPosition = 0;
    let $_sortTimer: ReturnType<typeof setTimeout> | undefined;
    let $_updateTimeout: ReturnType<typeof setTimeout> | null;
    let $_refreshTimeout: ReturnType<typeof setTimeout> | undefined;

    // var(s) ---------------------------------------
    // 组件是否完成挂载;
    const ready = ref(false);
    const totalSize = ref(0);
    const hoverKey = ref<any>('');
    const listenerTarget = ref<Element | Window | null>();

    const cls = new ComponentClassBlock('recycle-scroller');

    // dom ref(s) ---------------------------------------
    const scrollbar = ref<HorizonWebComponentInstance<typeof HScrollbar, ScrollbarExposes>>();
    const wrapperRef = ref<HTMLElement | null | undefined>();
    const wiewRef = ref<HTMLElement | null | undefined>();
    const beforeRef = ref<HTMLElement | null | undefined>();
    const afterRef = ref<HTMLElement | null | undefined>();

    // vueuse(s)
    const isWrapperVisible = useElementVisibility(wrapperRef, {
      // TODO: 必须正确指定滚动容器, 否则 useElementVisibility 不生效;
      // scrollTarget: document.querySelector('.VPDoc'),
    });

    useResizeObserver(wrapperRef, handleResize);
    useResizeObserver(beforeRef, () => ready.value && updateVisibleItems(false));
    useResizeObserver(afterRef, () => ready.value && updateVisibleItems(false));

    const sizeRef = useSize(toRef(props, 'size'), 'medium');
    const {
      computedMinItemSize,
      getItemKey,
      getItemPosition,
      getItemType,
      getRange,
      getScrollPosition,
      itemIndexByKey,
      sizes,
    } = useRecycleScrollerLayout(props);
    const { acquireView, pool, releaseAllViews, releaseOutsideRange, releaseViewByKey, sortViews } =
      useRecycleScrollerPool();

    // expose ---------------------------------------
    expose({
      scrollToItem,
      getRootEl,
    });

    // watch(s) ---------------------------------------
    watch(isWrapperVisible, isVisible => {
      handleVisibilityChange(isVisible);
    });
    watch(
      () => props.pageMode,
      () => {
        applyPageMode();
        updateVisibleItems(false);
      },
    );

    watch(itemIndexByKey, () => updateVisibleItems(true));
    watch(sizes, () => updateVisibleItems(false), { deep: true });
    watch(
      [
        () => props.itemSize,
        () => props.gridItems,
        () => props.itemSecondarySize,
        () => props.direction,
        () => props.buffer,
        () => props.expandWrapperByChildren,
      ],
      () => updateVisibleItems(false),
    );

    // hooks ---------------------------------------
    // # created
    // 去掉了ssr支持

    if (props.gridItems && !props.itemSize) {
      console.error('[RecycleScroller] You must provide an itemSize when using gridItems');
    }

    // #
    onMounted(() => {
      wrapperRef.value = unref(scrollbar.value?.wrapRef);
      wiewRef.value = unref(scrollbar.value?.viewRef);
      applyPageMode();
      nextTick(() => {
        updateWrapperCssProperties();
        updateVisibleItems(true);
        ready.value = true;
      });
    });

    // #
    onActivated(() => {
      const lastPosition = $_lastUpdateScrollPosition;
      if (typeof lastPosition === 'number') {
        nextTick(() => {
          updateWrapperCssProperties();
          scrollToPosition(lastPosition);
        });
      }
    });

    // #
    onBeforeUnmount(() => {
      removeListeners();
      clearTimeout($_sortTimer);
      clearTimeout($_updateTimeout ?? undefined);
      clearTimeout($_refreshTimeout);
    });

    /* -----------------------------------------------------------Method(s)----------------------------------------------------------------------- */

    function updateWrapperCssProperties() {
      if (wrapperRef.value) {
        wrapperRef.value.style.setProperty('--scroller-width', wrapperRef.value.clientWidth + 'px');
        wrapperRef.value.style.setProperty(
          '--scroller-height',
          wrapperRef.value.clientHeight + 'px',
        );
      }
    }

    function getScroll(): { start: number; end: number } {
      const isVertical = props.direction === 'vertical';
      let scrollState: { start: number; end: number };
      const el = wrapperRef.value!;

      if (props.pageMode) {
        const bounds = el.getBoundingClientRect();
        const scrollParent = getScrollParent(el);
        const isDocumentScroller =
          scrollParent === document.documentElement ||
          scrollParent === document.body ||
          scrollParent === document.scrollingElement;
        const parentBounds = isDocumentScroller ? null : scrollParent?.getBoundingClientRect();
        const viewportStart = parentBounds
          ? isVertical
            ? parentBounds.top
            : parentBounds.left
          : 0;
        const start = viewportStart - (isVertical ? bounds.top : bounds.left);
        const viewportSize = parentBounds
          ? isVertical
            ? (scrollParent as HTMLElement).clientHeight
            : (scrollParent as HTMLElement).clientWidth
          : isVertical
            ? window.innerHeight
            : window.innerWidth;

        scrollState = {
          start,
          end: start + viewportSize,
        };
      } else if (isVertical) {
        scrollState = {
          start: el.scrollTop,
          end: el.scrollTop + el.clientHeight,
        };
      } else {
        scrollState = {
          start: el.scrollLeft,
          end: el.scrollLeft + el.clientWidth,
        };
      }

      return scrollState;
    }

    function scrollToItem(index: number) {
      const beforeSize = props.items.length ? getBeforeSize() : 0;
      scrollToPosition(beforeSize + getScrollPosition(index));
    }

    function scrollToPosition(position: number) {
      const direction: {
        scroll: 'scrollTop' | 'scrollLeft';
        start: 'top' | 'left';
      } =
        props.direction === 'vertical'
          ? { scroll: 'scrollTop', start: 'top' }
          : { scroll: 'scrollLeft', start: 'left' };

      let viewport: HTMLElement;
      let scrollDirection: 'scrollTop' | 'scrollLeft';
      let scrollDistance: number;

      if (props.pageMode) {
        const viewportEl = getScrollParent(wrapperRef.value!)!;
        const isDocumentScroller =
          viewportEl === document.documentElement ||
          viewportEl === document.body ||
          viewportEl === document.scrollingElement;
        const currentScroll = isDocumentScroller
          ? direction.scroll === 'scrollTop'
            ? window.scrollY
            : window.scrollX
          : viewportEl[direction.scroll];
        const bounds = isDocumentScroller ? null : viewportEl.getBoundingClientRect();

        const scroller = wrapperRef.value!.getBoundingClientRect();
        const scrollerPosition = scroller[direction.start] - (bounds?.[direction.start] ?? 0);

        viewport = viewportEl as HTMLElement;
        scrollDirection = direction.scroll;
        scrollDistance = position + currentScroll + scrollerPosition;
      } else {
        viewport = wrapperRef.value!;
        scrollDirection = direction.scroll;
        scrollDistance = position;
      }

      if (isDefined(props.scrollOption)) {
        viewport.scroll({
          [scrollDirection === 'scrollTop' ? 'top' : 'left']: scrollDistance,
          ...props.scrollOption,
        });
      } else {
        viewport[scrollDirection] = scrollDistance;
      }
    }

    function getRootEl(): HTMLElement | null | undefined {
      return wrapperRef.value;
    }

    /**
     * 找到此组件的滚动容器
     */
    function getListenerTarget(): Element | Window | null {
      let target: Element | Window | null = getScrollParent(wrapperRef.value!);

      if (
        window.document &&
        (target === window.document.documentElement || target === window.document.body)
      ) {
        target = window;
      }
      return target;
    }

    function applyPageMode() {
      // 如果是pageMode模式, 给组件的滚动父容器添加scroll监听
      if (props.pageMode) {
        addListeners();
      } else {
        removeListeners();
      }
    }

    function addListeners() {
      removeListeners();
      listenerTarget.value = getListenerTarget();
      listenerTarget.value?.addEventListener('scroll', handleScroll, false);
      listenerTarget.value?.addEventListener('resize', handleResize);
    }

    function removeListeners() {
      if (!listenerTarget.value) {
        return;
      }

      listenerTarget.value.removeEventListener('scroll', handleScroll);
      listenerTarget.value.removeEventListener('resize', handleResize);

      listenerTarget.value = null;
    }

    /**
     * 整个组件在进入/离开 当前视口时
     */
    function handleVisibilityChange(visible: boolean) {
      if (ready.value) {
        if (visible) {
          emit('visible');

          requestAnimationFrame(() => {
            updateVisibleItems(false);
          });
        } else {
          emit('hidden');
        }
      }
    }

    /**
     * 组件 根 上的滚动 响应事件
     */
    function handleScroll() {
      if (!$_scrollDirty) {
        $_scrollDirty = true;
        if ($_updateTimeout) return;

        const requestUpdate = () =>
          requestAnimationFrame(() => {
            $_scrollDirty = false;
            const { continuous } = updateVisibleItems(false, true);

            if (!continuous) {
              clearTimeout($_refreshTimeout);
              $_refreshTimeout = setTimeout(handleScroll, props.updateInterval + 100);
            }
          });

        requestUpdate();

        if (props.updateInterval) {
          $_updateTimeout = setTimeout(() => {
            $_updateTimeout = null;
            if ($_scrollDirty) requestUpdate();
          }, props.updateInterval);
        }
      }

      emit('scrollBegin');
    }

    function handleResize() {
      emit('resize');
      updateWrapperCssProperties();
      ready.value && updateVisibleItems(false);
    }

    function getBeforeSize() {
      if (!beforeRef.value) return 0;

      return props.direction === 'vertical'
        ? beforeRef.value.scrollHeight
        : beforeRef.value.scrollWidth;
    }

    function setWrapperSizeByChildren() {
      if (wiewRef.value) {
        const items = Array.from(
          wiewRef.value.querySelectorAll(`.${cls.e('item-view')}`) as NodeListOf<HTMLElement>,
        );

        if (!items.length) return;

        if (props.direction === 'vertical') {
          const size = Math.max(...items.map(item => item.offsetWidth));

          wiewRef.value.style.setProperty('width', size + 'px');
        } else {
          const size = Math.max(...items.map(item => item.offsetHeight));

          wiewRef.value.style.setProperty('height', size + 'px');
        }
      }
    }

    /**
     * 核心方法;
     * @param checkItem ?
     * @param checkPositionDiff ?
     * @returns void
     */
    function updateVisibleItems(checkItem: boolean, checkPositionDiff = false) {
      const itemSize = props.itemSize;
      const items = props.items;
      const count = items.length;
      const size = sizes.value;
      const scroll = getScroll();

      if (checkPositionDiff && count) {
        const positionDiff = Math.abs(scroll.start - $_lastUpdateScrollPosition);
        const updateThreshold =
          itemSize === null
            ? computedMinItemSize.value
            : normalizeScrollerSize(itemSize, computedMinItemSize.value);

        if (updateThreshold > 0 && positionDiff < updateThreshold) {
          return {
            continuous: true,
          };
        }
      }
      $_lastUpdateScrollPosition = scroll.start;

      const beforeSize = getBeforeSize();
      const {
        startIndex,
        endIndex,
        visibleStartIndex,
        visibleEndIndex,
        totalSize: nextTotalSize,
      } = getRange(scroll.start, scroll.end, beforeSize);
      const indexByKey = itemIndexByKey.value;

      if (endIndex - startIndex > 1000) {
        itemsLimitError();
      }

      totalSize.value = nextTotalSize;

      const continuous = startIndex <= $_endIndex && endIndex >= $_startIndex;

      if (continuous) {
        releaseOutsideRange(startIndex, endIndex, checkItem ? indexByKey : undefined);
      } else {
        // A large jump must recycle all old active views before assigning the new range.
        releaseAllViews();
      }

      for (let i = startIndex; i < endIndex; i++) {
        const item = items[i];
        const key = getItemKey(item, i);

        if (itemSize === null && !size[i]?.size) {
          releaseViewByKey(key);
          continue;
        }

        const { newlyUsed, view } = acquireView(i, item, key, getItemType(item));

        if (newlyUsed) {
          if (i === items.length - 1) emit('scrollEnd');
          if (i === 0) emit('scrollStart');
        }

        const position = getItemPosition(i);
        view.position = position.position;
        view.offset = position.offset;
      }

      $_startIndex = startIndex;
      $_endIndex = endIndex;

      if (props.emitUpdate)
        emit('update', startIndex, endIndex, visibleStartIndex, visibleEndIndex);

      clearTimeout($_sortTimer);
      $_sortTimer = setTimeout(sortViews, props.updateInterval);

      if (props.expandWrapperByChildren) {
        void nextTick(() => {
          setWrapperSizeByChildren();
        });
      }

      return { continuous };
    }

    function itemsLimitError() {
      setTimeout(() => {
        console.warn(
          "It seems the scroller element isn't scrolling, so it tries to render all the items at once.",
          'Scroller:',
          wrapperRef.value,
        );
        console.warn(
          "Make sure the scroller has a fixed height (or width) and 'overflow-y' (or 'overflow-x') set to 'auto' so it can scroll correctly and only render the items visible in the scroll viewport.",
        );
      });
      throw new Error('Rendered items limit reached');
    }

    // 渲染滚动容器
    const renderWrapper = (): VNode => {
      const vnode = h(
        props.listTag,
        {
          style: `${props.direction === 'vertical' ? 'min-height' : 'min-width'}: ${
            totalSize.value
          }px`,
          class: multiCls(cls.e('item-wrapper'), props.listClass),
        },
        renderItems(),
      );

      return vnode;
    };

    // 渲染子元素
    const renderItems = (): VNode[] => {
      if (props.items.length === 0 && slots.empty) {
        return slots.empty?.();
      }

      return pool.value.map(view => {
        // console.info(view, 'view...pool')
        return h(
          props.itemTag,
          // props
          // https://vue3js.cn/global/h.html
          {
            key: view.nr.id,
            style: ready.value
              ? {
                  transform: `translate${props.direction === 'vertical' ? 'Y' : 'X'}(${
                    view.position
                  }px) translate${props.direction === 'vertical' ? 'X' : 'Y'}(${view.offset}px)`,

                  width: props.gridItems
                    ? `${
                        props.direction === 'vertical'
                          ? props.itemSecondarySize || props.itemSize
                          : props.itemSize
                      }px`
                    : undefined,

                  height: props.gridItems
                    ? `${
                        props.direction === 'horizontal'
                          ? props.itemSecondarySize || props.itemSize
                          : props.itemSize
                      }px`
                    : undefined,
                }
              : null,
            class: multiCls(
              cls.e('item-view'),
              props.itemClass,
              cls.is('hover', !props.skipHover && hoverKey.value === view.nr.key),
            ),
            onMouseenter() {
              hoverKey.value = view.nr.key;
            },
            onMouseleave() {
              hoverKey.value = '';
            },
          },
          // children
          slots.default?.({
            item: view.item,
            index: view.nr.index,
            active: view.nr.used,
          }),
        );
      });
    };

    return () => (
      // 主容器
      <HScrollbar
        ref={scrollbar}
        class={multiCls(
          cls.block,
          cls.is('ready', Boolean(ready.value)),
          cls.is('page-mode', props.pageMode),
          cls.is(`direction-${props.direction}`, true),
          cls.is('expand-by-children', props.expandWrapperByChildren),
        )}
        height={props.scrollerHeight}
        maxHeight={props.scrollerMaxHeight}
        size={sizeRef.value}
        onScroll={handleScroll}
        onScrollEnd={() => emit('scrollStop')}
        onMouseEnter={evt => emit('mouseEnter', evt)}
        onMouseLeave={evt => emit('mouseLeave', evt)}
      >
        {/* before 插槽 */}
        {slots.before && (
          <div ref={beforeRef} class={cls.e('slot')}>
            {slots.before()}
          </div>
        )}

        {/* 渲染列表 */}
        {renderWrapper()}

        {/* after 插槽 */}
        {slots.after && (
          <div ref={afterRef} class={cls.e('slot')}>
            {slots.after()}
          </div>
        )}
      </HScrollbar>
    );
  },
});
