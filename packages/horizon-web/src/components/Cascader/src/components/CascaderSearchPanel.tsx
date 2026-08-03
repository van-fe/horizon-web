import type { HorizonWebComponentInstance } from '@aurora/utils';
import { cls, ComponentClassBlock, sizeUnitTransform, useNamespace } from '@aurora/utils';
import { defineComponent, inject, ref } from 'vue';
import {
  HCascaderPickOptionInjectKey,
  HCascaderPresetModelValueInjectKey,
  HCascaderPropsInjectKey,
  HCascaderTreeHelperInjectKey,
  HCascaderVisibleOptionsInjectKey,
} from '../utils/injectKeys';
import HScrollbar from '~/components/Scrollbar/src/Scrollbar';
import CascaderItem from './CascaderItem';
import HCheckbox from '~/components/Checkbox/src/Checkbox';
import HVirtualScroller from '~/components/VirtualScroller/src/VirtualScroller';
import HVirtualScrollerItem from '~/components/VirtualScroller/src/VirtualScrollerItem';
import useLocaleLang from '~/utils/useLocaleLang';
import type { HCascaderExtendOption } from '../utils/types';
import type { VirtualScrollerExposes } from '~/components/VirtualScroller/src/composables/useExposes';
import { useCascaderSearchPanelEmits } from '../composables/useEmits';
import useCheckAll from '../hooks/useCheckAll';

export default defineComponent({
  name: `${useNamespace()}CascaderSearchPanel`,
  components: {
    HScrollbar,
    CascaderItem,
  },
  emits: useCascaderSearchPanelEmits,
  setup(_, { emit }) {
    const classHelper = new ComponentClassBlock('cascader-search-panel');

    const optionList = inject(HCascaderVisibleOptionsInjectKey)!;
    const parentProps = inject(HCascaderPropsInjectKey)!;
    const presetModelValueSet = inject(HCascaderPresetModelValueInjectKey)!;
    const treeHelper = inject(HCascaderTreeHelperInjectKey)!;
    const pickOption = inject(HCascaderPickOptionInjectKey)!;

    const scrollerDomRef = ref<HorizonWebComponentInstance<
      typeof HVirtualScroller,
      VirtualScrollerExposes
    > | null>(null);

    const { isCheckAll, isIndeterminate, toggleCheckAll } = useCheckAll(
      parentProps,
      optionList,
      presetModelValueSet,
      pickOption,
      emit,
    );

    function getOptionValue<T extends HCascaderExtendOption, K extends keyof T>(
      option: T,
      key: K,
    ): T[K] {
      return treeHelper.getOptionValue<T, K>(option, key);
    }

    return () => (
      <div class={classHelper.block}>
        {parentProps.multiple && parentProps.useFilterCheckAll && (
          <div class={cls(classHelper.e('check-all'))} onClick={toggleCheckAll}>
            <HCheckbox modelValue={isCheckAll.value} indeterminate={isIndeterminate.value}>
              {useLocaleLang('select.checkAll').value}
            </HCheckbox>
          </div>
        )}
        {parentProps.useVirtualScroll ? (
          <HVirtualScroller
            ref={scrollerDomRef}
            class={cls(
              classHelper.em('scrollbar', 'view'),
              classHelper.has('panel-input', parentProps.useBuildInPanelFilter),
            )}
            scrollerMaxHeight={`calc(${sizeUnitTransform(parentProps.maxHeight)} - 16px)`}
            items={Array.from(optionList.value.values())}
            minItemSize={40}
            keyField="_uuid"
            size="small"
          >
            {{
              default: (row: { item: HCascaderExtendOption; index: number; active: boolean }) => (
                <HVirtualScrollerItem item={row.item} active={row.active} index={row.index}>
                  <CascaderItem
                    key={row.item._uuid}
                    value={getOptionValue(row.item, 'value')}
                    label={getOptionValue(row.item, 'label')}
                    level={row.item.level}
                    disabled={getOptionValue(row.item, 'disabled')}
                    isLeaf={getOptionValue(row.item, 'isLeaf')}
                    extendsOption={row.item}
                    expand={false}
                    duringFilter={true}
                  />
                </HVirtualScrollerItem>
              ),
            }}
          </HVirtualScroller>
        ) : (
          <HScrollbar
            class={cls(classHelper.e('scrollbar'))}
            viewClass={cls(
              classHelper.em('scrollbar', 'view'),
              classHelper.has('panel-input', parentProps.useBuildInPanelFilter),
            )}
            maxHeight={parentProps.maxHeight}
            size="small"
          >
            {Array.from(optionList.value.values()).map(item => (
              <CascaderItem
                key={item._uuid}
                value={item.value}
                label={item.label}
                level={item.level}
                disabled={item.disabled}
                isLeaf={item.isLeaf}
                extendsOption={item}
                expand={false}
                duringFilter={true}
              />
            ))}
          </HScrollbar>
        )}
      </div>
    );
  },
});
