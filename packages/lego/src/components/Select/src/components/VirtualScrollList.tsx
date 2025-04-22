import { defineComponent, inject, provide, ref } from 'vue';
import { useNamespace } from '@nio-fe/shared';
import type { NRecycleScrollerInstance } from '~/components/VirtualScroller';
import { NVirtualScroller, NVirtualScrollerItem } from '~/components/VirtualScroller';
import type { SelectCollectedOptionData } from '../utils/injectKeys';
import {
  NSelectModelValueInjectKey,
  NSelectPropsInjectKey,
  NSelectVirtualScrollListIsScrollingInjectKey,
  NSelectVisibleOptionsInjectKey,
} from '../utils/injectKeys';
import SimpleOption from './SimpleOption';

export default defineComponent({
  name: `${useNamespace()}VirtualScrollList`,
  components: {
    NVirtualScroller,
    NVirtualScrollerItem,
    SimpleOption,
  },
  emits: {
    /**
     * 鼠标移入
     * @param e 鼠标事件
     */
    mouseEnter: (e: MouseEvent) => e instanceof MouseEvent,
    /**
     * 鼠标移出
     * @param e 鼠标事件
     */
    mouseLeave: (e: MouseEvent) => e instanceof MouseEvent,
    /**
     * 触底时触发
     */
    reachBottom: () => true,
  },
  setup(_, { emit, expose }) {
    const parentProps = inject(NSelectPropsInjectKey)!;
    const visibleOptions = inject(NSelectVisibleOptionsInjectKey)!;
    const modelValueSet = inject(NSelectModelValueInjectKey)!;

    const scrollerDomRef = ref<(NRecycleScrollerInstance & HTMLElement) | null>(null);
    const isScrolling = ref(false);

    provide(NSelectVirtualScrollListIsScrollingInjectKey, isScrolling);

    let startIndex = 0;
    let endIndex = 0;

    function onUpdate(startIdx: number, endIdx: number) {
      startIndex = startIdx;
      endIndex = endIdx;
    }

    function doScrollToIndex(index: number) {
      isScrolling.value = true;

      setTimeout(() => {
        scrollerDomRef.value?.scrollToItem(index);
        isScrolling.value = false;
      });
    }

    /**
     * 滚动到某下标位置
     * @param index 下标
     * @param checkInViewport 是否检查在可是窗口内，如果在可视窗口内则不滚动
     */
    function scrollToIndex(index: number, checkInViewport = false) {
      if (checkInViewport) {
        if (index < startIndex || endIndex < index) {
          doScrollToIndex(index);
        }
      } else {
        doScrollToIndex(index);
      }
    }

    function scrollToActiveModelValue() {
      const modelValue = Array.from(modelValueSet.value.values()).at(0);

      let index = 0;

      if (modelValue) {
        index = visibleOptions.value.findIndex(value => value.props.value === modelValue);
      }

      scrollToIndex(index ?? 0);
    }

    expose({
      scrollToIndex,
      scrollToActiveModelValue,
    });

    return () => (
      <NVirtualScroller
        ref={scrollerDomRef}
        scrollerMaxHeight={parentProps.optionListMaxHeight}
        items={visibleOptions.value}
        minItemSize={40}
        keyField="props.value"
        buffer={parseFloat(parentProps.optionListMaxHeight.toString())}
        emitUpdate={true}
        size="small"
        expandWrapperByChildren={parentProps.expandPanelByChildren}
        onMouseEnter={evt => emit('mouseEnter', evt)}
        onMouseLeave={evt => emit('mouseLeave', evt)}
        onUpdate={onUpdate}
        onScrollEnd={() => emit('reachBottom')}
      >
        {{
          default: (row: {
            item: SelectCollectedOptionData<'option'>;
            index: number;
            active: boolean;
          }) => (
            <NVirtualScrollerItem item={row.item} active={row.active} index={row.index}>
              <SimpleOption
                key={row.item.props.value!.toString()}
                disabled={row.item.props.disabled}
                value={row.item.props.value}
                label={row.item.props.label}
                description={row.item.props.description}
              />
            </NVirtualScrollerItem>
          ),
        }}
      </NVirtualScroller>
    );
  },
});
