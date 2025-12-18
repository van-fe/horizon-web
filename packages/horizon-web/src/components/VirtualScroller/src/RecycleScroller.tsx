import type { VNode } from 'vue';
import {
  unref,
  h,
  computed,
  markRaw,
  nextTick,
  onActivated,
  onBeforeUnmount,
  onMounted,
  shallowReactive,
  defineComponent,
  ref,
  watch,
  toRef,
} from 'vue';
import {
  ComponentClassBlock,
  cls as multiCls,
  isNil,
  useNamespace,
  isDefined,
} from '@aurora/utils';
import type { LegoSetupContext, LegoComponentInstance } from '@aurora/utils';
import { useRecycleScrollerProps } from './composables/useProps';
import { useRecycleScrollerEmits } from './composables/useEmits';
import { useRecycleScrollerSlots } from './composables/useSlots';
import { useRecycleScrollerExposes } from './composables/useExposes';
import type { RecycleScrollerEmits } from './composables/useEmits';
import type { RecycleScrollerSlots } from './composables/useSlots';
import type { RecycleScrollerExposes } from './composables/useExposes';
import { useElementVisibility, useResizeObserver } from '@vueuse/core';
import type { Sizes, ViewItem } from './utils/types';
import { getScrollParent } from './utils/scrollParent';
import NScrollbar from '~/components/Scrollbar/src/Scrollbar';
import useSize from '~/utils/useSize';
import set from 'lodash/set';
import get from 'lodash/get';
import type { ScrollbarExposes } from '~/components/Scrollbar/src/composables/useExposes';

// 自管理 记录的pk
let uid = 0;

export default defineComponent({
  name: `${useNamespace()}RecycleScroller`,
  components: {
    NScrollbar,
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
    }: LegoSetupContext<RecycleScrollerEmits, RecycleScrollerSlots, RecycleScrollerExposes>,
  ) {
    // 本地变量
    let $_startIndex = 0;
    let $_endIndex = 0;
    const $_views = new Map<String | Number, ViewItem>();
    const $_unusedViews = new Map();
    let $_scrollDirty = false;
    let $_lastUpdateScrollPosition = 0;
    let $_computedMinItemSize = 0;
    let $_sortTimer: ReturnType<typeof setTimeout>;
    let $_updateTimeout: ReturnType<typeof setTimeout> | null;
    let $_refreshTimeout: ReturnType<typeof setTimeout>;

    // var(s) ---------------------------------------
    // 组件是否完成挂载;
    const ready = ref<Boolean>(false);
    const totalSize = ref<Number>(0);
    const pool = ref<ViewItem[]>([]);
    const hoverKey = ref<String>('');
    const listenerTarget = ref<Element | Window | null>();

    const cls = new ComponentClassBlock('recycle-scroller');

    // dom ref(s) ---------------------------------------
    const scrollbar = ref<LegoComponentInstance<typeof NScrollbar, ScrollbarExposes>>();
    const wrapperRef = ref<HTMLElement | null | undefined>();
    const wiewRef = ref<HTMLElement | null | undefined>();
    const beforeRef = ref<HTMLElement | null | undefined>();
    const afterRef = ref<HTMLElement | null | undefined>();

    // vueuse(s)
    const isWrapperVisible = useElementVisibility(wrapperRef, {
      // TODO: 必须正确指定滚动容器, 否则 useElementVisibility 不生效;
      // scrollTarget: document.querySelector('.n-main'),
    });

    useResizeObserver(wrapperRef, handleResize);

    const sizeRef = useSize(toRef(props, 'size'), 'medium');

    // expose ---------------------------------------
    expose({
      scrollToItem,
      getRootEl,
    });

    // watch(s) ---------------------------------------
    watch(isWrapperVisible, isVisible => {
      handleVisibilityChange(isVisible);
    });
    // 数据变化时更新渲染;
    watch(
      () => props.items,
      () => updateVisibleItems(true),
    );

    watch(
      () => props.pageMode,
      () => {
        applyPageMode();
        updateVisibleItems(false);
      },
    );

    watch(
      () => props.gridItems,
      () => updateVisibleItems(true),
    );

    watch(
      () => props.itemSecondarySize,
      () => updateVisibleItems(true),
    );

    // computed(s) ---------------------------------------
    // 传入的数据是否为基础类型数组
    const isSimpleArray = computed(() => props.items.length && typeof props.items[0] !== 'object');

    // -
    const sizes = computed((): Sizes => {
      const ret: Sizes = {
        '-1': { accumulator: 0 },
      };

      if (isNil(props.itemSize)) {
        let computedMinSize = 10000;
        let accumulator = 0;
        let current;
        for (let i = 0, l = props.items.length; i < l; i++) {
          current = props.items[i][props.sizeField] || props.minItemSize;
          if (current < computedMinSize) {
            computedMinSize = current;
          }
          accumulator += current;
          ret[i] = { accumulator, size: current };
        }
        $_computedMinItemSize = computedMinSize;
      }
      return ret;
    });

    watch(
      () => sizes,
      () => {
        updateVisibleItems(false);
      },
      {
        deep: true,
      },
    );

    const itemIndexKey = computed(() => {
      const ret: Record<string, number> = {};
      for (let i = 0, l = props.items.length; i < l; i++) {
        set(ret, [props.items[i], props.keyField], i);
      }
      return ret;
    });

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

    function addView(_pool: ViewItem[], index: number, item: ViewItem, key: string, type: string) {
      const nr = markRaw({
        id: uid++,
        index,
        used: true,
        key,
        type,
      });
      const view = shallowReactive<ViewItem>({
        item,
        position: 0,
        offset: 0,
        nr,
      });

      _pool.push(view);
      return view;
    }

    function unuseView(view: ViewItem, fake = false) {
      const unusedViews = $_unusedViews;
      const type = view.nr.type;
      let unusedPool = unusedViews.get(type);
      if (!unusedPool) {
        unusedPool = [];
        unusedViews.set(type, unusedPool);
      }
      unusedPool.push(view);
      if (!fake) {
        view.nr.used = false;
        view.position = -9999;
      }
    }

    function getScroll(): { start: number; end: number } {
      const isVertical = props.direction === 'vertical';
      let scrollState: { start: number; end: number };
      const el = wrapperRef.value!;

      if (props.pageMode) {
        const bounds = el.getBoundingClientRect();
        const boundsSize = isVertical ? bounds.height : bounds.width;
        const start = -(isVertical ? bounds.top : bounds.left);
        let size = isVertical ? window.innerHeight : window.innerWidth;

        if (start < 0) {
          size += start;
        }
        if (start + size > boundsSize) {
          size = boundsSize - start;
        }
        scrollState = {
          start,
          end: start + size,
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
      let scroll: number;
      const gridItems = props.gridItems || 1;
      if (props.itemSize === null) {
        scroll = index > 0 ? sizes.value[index - 1].accumulator : 0;
      } else {
        scroll = Math.floor(index / gridItems) * props.itemSize!;
      }

      scrollToPosition(scroll);
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

        const scrollTop = viewportEl?.tagName === 'HTML' ? 0 : viewportEl[direction.scroll];
        const bounds = viewportEl?.getBoundingClientRect();

        const scroller = wrapperRef.value!.getBoundingClientRect();
        const scrollerPosition = scroller[direction.start] - bounds[direction.start];

        viewport = viewportEl as HTMLElement;
        scrollDirection = direction.scroll;
        scrollDistance = position + scrollTop + scrollerPosition;
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

    function setWrapperSizeByChildren() {
      if (wiewRef.value) {
        const items = Array.from(
          wiewRef.value.querySelectorAll(`.${cls.e('item-view')}`) as NodeListOf<HTMLElement>,
        );

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
      const gridItems = props.gridItems || 1;
      const itemSecondarySize = props.itemSecondarySize || itemSize;
      const minItemSize = $_computedMinItemSize;
      const typeField = props.typeField;
      const keyField = isSimpleArray.value ? null : props.keyField;
      const items = props.items;
      const count = items.length;
      const size = sizes.value;
      const views = $_views;
      const unusedViews = $_unusedViews;
      const _pool = pool.value;
      const itemIndexByKey = itemIndexKey.value;

      let startIndex: number, endIndex: number;
      let _totalSize: number;
      let visibleStartIndex: number, visibleEndIndex: number;

      // 没有数据, 初始化所有位置信息为0
      if (!count) {
        startIndex = endIndex = visibleStartIndex = visibleEndIndex = _totalSize = 0;
      } else {
        const scroll = getScroll();

        if (checkPositionDiff) {
          let positionDiff = scroll.start - $_lastUpdateScrollPosition;
          if (positionDiff < 0) {
            positionDiff = -positionDiff;
          }
          if ((itemSize === null && positionDiff < minItemSize) || positionDiff < itemSize!) {
            return {
              continuous: true,
            };
          }
        }
        $_lastUpdateScrollPosition = scroll.start;

        const buffer = props.buffer;
        scroll.start -= buffer;
        scroll.end += buffer;

        let beforeSize = 0;
        if (beforeRef.value) {
          beforeSize = beforeRef.value.scrollHeight;
          scroll.start -= beforeSize;
        }

        if (afterRef.value) {
          const afterSize = afterRef.value.scrollHeight;
          scroll.end += afterSize;
        }
        if (itemSize === null) {
          let h: number;
          let a = 0;
          let b = count - 1;
          let i = ~~(count / 2);
          let oldI: number;

          do {
            oldI = i;
            h = size[i].accumulator;
            if (h < scroll.start) {
              a = i;
            } else if (i < count - 1 && size[i + 1].accumulator > scroll.start) {
              b = i;
            }
            i = ~~((a + b) / 2);
          } while (i !== oldI);

          i < 0 && (i = 0);
          startIndex = i;

          _totalSize = size[count - 1].accumulator;

          for (
            endIndex = i;
            endIndex < count && size[endIndex].accumulator < scroll.end;
            endIndex++
          );
          if (endIndex === -1) {
            endIndex = items.length - 1;
          } else {
            endIndex++;
            endIndex > count && (endIndex = count);
          }

          // search visible startIndex
          for (
            visibleStartIndex = startIndex;
            visibleStartIndex < count &&
            beforeSize + size[visibleStartIndex].accumulator < scroll.start;
            visibleStartIndex++
          );

          // search visible endIndex
          for (
            visibleEndIndex = visibleStartIndex;
            visibleEndIndex < count && beforeSize + size[visibleEndIndex].accumulator < scroll.end;
            visibleEndIndex++
          );
        } else {
          startIndex = ~~((scroll.start / itemSize!) * gridItems);
          const remainer = startIndex % gridItems;
          startIndex -= remainer;
          endIndex = Math.ceil((scroll.end / itemSize!) * gridItems);
          visibleStartIndex = Math.max(
            0,
            Math.floor(((scroll.start - beforeSize) / itemSize!) * gridItems),
          );
          visibleEndIndex = Math.floor(((scroll.end - beforeSize) / itemSize!) * gridItems);

          startIndex < 0 && (startIndex = 0);
          endIndex > count && (endIndex = count);
          visibleStartIndex < 0 && (visibleStartIndex = 0);
          visibleEndIndex > count && (visibleEndIndex = count);

          _totalSize = Math.ceil(count / gridItems) * itemSize!;
        }
        // -
      }

      if (endIndex - startIndex > 1000) {
        itemsLimitError();
      }

      totalSize.value = _totalSize;

      let view;

      const continuous = startIndex <= $_endIndex && endIndex >= $_startIndex;

      // Unuse views that are no longer visible
      if (continuous) {
        for (let i = 0, l = _pool.length; i < l; i++) {
          view = _pool[i];
          if (view.nr.used) {
            if (checkItem) {
              view.nr.index = itemIndexByKey[get(view.item, keyField!)];
            }

            if (
              view.nr.index === null ||
              view.nr.index === undefined ||
              view.nr.index < startIndex ||
              view.nr.index >= endIndex
            ) {
              unuseView(view);
            }
          }
        }
      }

      const unusedIndex = continuous ? null : new Map();

      let item: any;
      let type: string;
      let v;

      for (let i = startIndex; i < endIndex; i++) {
        item = items[i];
        const key = keyField ? get(item, keyField) : item;
        if (key === null) {
          throw new Error(`Key is ${key} on item (keyField is '${keyField}')`);
        }
        view = views.get(key);

        if (!itemSize && !size[i].size) {
          if (view) unuseView(view);
          continue;
        }

        type = item[typeField];

        let unusedPool = unusedViews.get(type);
        let newlyUsedView = false;

        if (!view) {
          if (continuous) {
            // reuse existing view
            if (unusedPool && unusedPool.length) {
              view = unusedPool.pop();
            } else {
              view = addView(_pool, i, item, key, type);
            }
          } else {
            // Use existing view
            // We don't care if they are already used
            // because we are not in continous scrolling
            v = unusedIndex?.get(type) || 0;

            if (!unusedPool || v >= unusedPool.length) {
              view = addView(_pool, i, item, key, type);
              unuseView(view, true);
              unusedPool = unusedViews.get(type);
            }

            view = unusedPool[v];
            unusedIndex?.set(type, v + 1);
          }

          // assign view to item;
          views.delete(view.nr.key);
          view.nr.used = true;
          view.nr.index = i;
          view.nr.key = key;
          view.nr.type = type;
          views.set(key, view);

          newlyUsedView = true;
        } else {
          if (!view.nr.used) {
            view.nr.used = true;
            newlyUsedView = true;
            if (unusedPool) {
              const index = unusedPool.indexOf(view);
              if (index !== -1) unusedPool.splice(index, 1);
            }
          }
        }

        view.item = item;

        if (newlyUsedView) {
          if (i === items.length - 1) emit('scrollEnd');
          if (i === 0) emit('scrollStart');
        }

        // update position
        if (itemSize === null) {
          view.position = size[i - 1].accumulator;
          view.offset = 0;
        } else {
          view.position = Math.floor(i / gridItems) * itemSize!;
          view.offset = (i % gridItems) * itemSecondarySize!;
        }
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

      return {
        continuous,
      };
      // -
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

    function sortViews() {
      pool.value.sort((viewA, viewB) => viewA.nr.index - viewB.nr.index);
    }

    // 渲染滚动容器
    const renderWrapper = (): VNode => {
      const vnode = h(
        props.listTag,
        {
          style: `${props.direction === 'vertical' ? 'min-height' : 'min-width'}: ${
            totalSize.value
          }px`,
          class: multiCls(cls.e('item-wrapper'), cls.is(props.listClass, Boolean(props.listClass))),
        },
        renderItems(),
      );

      return vnode;
    };

    // 渲染子元素
    const renderItems = (): VNode[] => {
      if (pool.value && pool.value.length === 0 && slots.empty) {
        return slots.empty?.();
      }

      return pool.value.map(view => {
        // console.log(view, 'view...pool')
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
              cls.is(props.itemClass, Boolean(props.itemClass)),
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
          slots.default?.({ item: view.item, index: view.nr.index, activated: view.nr.used }),
        );
      });
    };

    return () => (
      // 主容器
      <NScrollbar
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
      </NScrollbar>
    );
  },
});
