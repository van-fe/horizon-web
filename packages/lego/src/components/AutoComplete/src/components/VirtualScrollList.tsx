import { defineComponent, inject, provide, ref } from 'vue';
import { ComponentClassBlock, useNamespace } from '@nio-fe/shared';
import type { NRecycleScrollerInstance } from '~/components/VirtualScroller';
import { NVirtualScroller, NVirtualScrollerItem } from '~/components/VirtualScroller';
import {
  NAutoCompletePropsInjectKey,
  NAutoCompleteVirtualScrollListIsScrollingInjectKey,
  NAutoCompleteVisibleOptionsInjectKey,
} from '../utils/injectKeys';
import SimpleOption from './SimpleOption';
import type { NAutoCompleteOptionWithUuid } from '../utils/typed';

export default defineComponent({
  name: `${useNamespace()}VirtualScrollList`,
  components: {
    NVirtualScroller,
    NVirtualScrollerItem,
    SimpleOption,
  },
  setup() {
    const classHelper = new ComponentClassBlock('auto-complete');
    const parentProps = inject(NAutoCompletePropsInjectKey)!;
    const visibleOptions = inject(NAutoCompleteVisibleOptionsInjectKey)!;

    const scrollerDomRef = ref<(NRecycleScrollerInstance & HTMLElement) | null>(null);
    const isScrolling = ref(false);

    provide(NAutoCompleteVirtualScrollListIsScrollingInjectKey, isScrolling);

    return () => (
      <NVirtualScroller
        ref={scrollerDomRef}
        scrollerMaxHeight={parseFloat(parentProps.optionListMaxHeight.toString())}
        items={visibleOptions.value}
        class={classHelper.e('scrollbar')}
        minItemSize={parentProps.descriptionPosition === 'right' ? 40 : 57}
        expandWrapperByChildren={parentProps.expandPanelByChildren}
        keyField="uuid"
        size="small"
      >
        {{
          default: (row: { item: NAutoCompleteOptionWithUuid; index: number; active: boolean }) => (
            <NVirtualScrollerItem item={row.item} active={row.active} index={row.index}>
              <SimpleOption
                uuid={row.item.uuid}
                key={row.item.uuid}
                item={row.item}
                label={row.item.label}
                value={row.item.value}
                description={row.item.description}
              />
            </NVirtualScrollerItem>
          ),
        }}
      </NVirtualScroller>
    );
  },
});
