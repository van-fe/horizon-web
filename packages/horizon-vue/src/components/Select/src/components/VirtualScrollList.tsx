import { defineComponent, inject, onBeforeUnmount, provide, ref } from 'vue';
import { useNamespace } from '@aurora/utils';
import type { HorizonWebComponentInstance, HorizonWebSetupContext } from '@aurora/utils';
import HVirtualScroller from '~/components/VirtualScroller/src/VirtualScroller';
import HVirtualScrollerItem from '~/components/VirtualScroller/src/VirtualScrollerItem';
import type { VirtualScrollerExposes } from '~/components/VirtualScroller/src/composables/useExposes';
import type { SelectCollectedOptionData } from '../utils/injectKeys';
import {
  HSelectModelValueInjectKey,
  HSelectPropsInjectKey,
  HSelectVirtualScrollListIsScrollingInjectKey,
  HSelectVisibleOptionsInjectKey,
} from '../utils/injectKeys';
import SimpleOption from './SimpleOption';
import { isOptionChecked } from '../utils/valueFormat';
import {
  SelectVirtualScrollListExposes,
  useSelectVirtualScrollListExposes,
} from '../composables/useExposes';
import { useVirtualScrollListEmits, VirtualScrollListEmits } from '../composables/useEmits';

export default defineComponent({
  name: `${useNamespace()}VirtualScrollList`,
  emits: useVirtualScrollListEmits,
  exposes: useSelectVirtualScrollListExposes,
  setup(
    _,
    {
      emit,
      expose,
    }: HorizonWebSetupContext<VirtualScrollListEmits, {}, SelectVirtualScrollListExposes>,
  ) {
    const parentProps = inject(HSelectPropsInjectKey)!;
    const visibleOptions = inject(HSelectVisibleOptionsInjectKey)!;
    const modelValueSet = inject(HSelectModelValueInjectKey)!;

    const scrollerDomRef = ref<HorizonWebComponentInstance<
      typeof HVirtualScroller,
      VirtualScrollerExposes
    > | null>(null);
    const isScrolling = ref(false);

    provide(HSelectVirtualScrollListIsScrollingInjectKey, isScrolling);

    let startIndex = 0;
    let endIndex = 0;
    let scrollTimer: ReturnType<typeof setTimeout> | undefined;

    function onUpdate(
      _startIdx: number,
      _endIdx: number,
      visibleStartIdx: number,
      visibleEndIdx: number,
    ) {
      startIndex = visibleStartIdx;
      endIndex = visibleEndIdx;
    }

    function doScrollToIndex(index: number) {
      isScrolling.value = true;

      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
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
        if (index < startIndex || index >= endIndex) {
          doScrollToIndex(index);
        }
      } else {
        doScrollToIndex(index);
      }
    }

    function scrollToActiveModelValue() {
      const modelValue = Array.from(modelValueSet.value.values()).at(0);

      let index = 0;

      if (typeof modelValue !== 'undefined') {
        index = visibleOptions.value.findIndex(option =>
          isOptionChecked(
            new Set([modelValue]),
            option.props.value,
            parentProps.valueFormat
              ? () => parentProps.valueFormat!({ ...option.props, ...option.attrs })
              : undefined,
          ),
        );
      }

      scrollToIndex(index >= 0 ? index : 0);
    }

    onBeforeUnmount(() => {
      clearTimeout(scrollTimer);
    });

    expose({
      scrollToIndex,
      scrollToActiveModelValue,
    });

    return () => (
      <HVirtualScroller
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
        onScrollBegin={() => (isScrolling.value = true)}
        onScrollStop={() => (isScrolling.value = false)}
      >
        {{
          default: (row: {
            item: SelectCollectedOptionData<'option'>;
            index: number;
            active: boolean;
          }) => (
            <HVirtualScrollerItem item={row.item} active={row.active} index={row.index}>
              <SimpleOption key={row.item.props.value!.toString()} {...row.item.props} />
            </HVirtualScrollerItem>
          ),
        }}
      </HVirtualScroller>
    );
  },
});
