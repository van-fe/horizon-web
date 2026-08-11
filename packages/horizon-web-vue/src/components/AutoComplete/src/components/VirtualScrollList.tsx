import { defineComponent, inject, provide, ref } from 'vue';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import type { HorizonWebComponentInstance } from '@aurora/utils';
import HVirtualScroller from '~/components/VirtualScroller/src/VirtualScroller';
import HVirtualScrollerItem from '~/components/VirtualScroller/src/VirtualScrollerItem';
import type { VirtualScrollerExposes } from '~/components/VirtualScroller/src/composables/useExposes';
import {
  HAutoCompletePropsInjectKey,
  HAutoCompleteVirtualScrollListIsScrollingInjectKey,
  HAutoCompleteVisibleOptionsInjectKey,
} from '../utils/injectKeys';
import SimpleOption from './SimpleOption';
import type { HAutoCompleteOptionWithUuid } from '../utils/typed';

export default defineComponent({
  name: `${useNamespace()}VirtualScrollList`,
  components: {
    SimpleOption,
  },
  setup() {
    const classHelper = new ComponentClassBlock('auto-complete');
    const parentProps = inject(HAutoCompletePropsInjectKey)!;
    const visibleOptions = inject(HAutoCompleteVisibleOptionsInjectKey)!;

    const scrollerDomRef = ref<HorizonWebComponentInstance<
      typeof HVirtualScroller,
      VirtualScrollerExposes
    > | null>(null);
    const isScrolling = ref(false);

    provide(HAutoCompleteVirtualScrollListIsScrollingInjectKey, isScrolling);

    return () => (
      <HVirtualScroller
        ref={scrollerDomRef}
        scrollerMaxHeight={parseFloat(parentProps.optionListMaxHeight.toString())}
        items={visibleOptions.value}
        class={classHelper.e('scrollbar')}
        minItemSize={parentProps.descriptionPosition === 'right' ? 40 : 57}
        expandWrapperByChildren={parentProps.expandPanelByChildren}
        keyField="uuid"
        size="small"
        onScrollBegin={() => (isScrolling.value = true)}
        onScrollStop={() => (isScrolling.value = false)}
      >
        {{
          default: (row: { item: HAutoCompleteOptionWithUuid; index: number; active: boolean }) => (
            <HVirtualScrollerItem item={row.item} active={row.active} index={row.index}>
              <SimpleOption
                uuid={row.item.uuid}
                key={row.item.uuid}
                item={row.item}
                label={row.item.label}
                value={row.item.value}
                description={row.item.description}
              />
            </HVirtualScrollerItem>
          ),
        }}
      </HVirtualScroller>
    );
  },
});
