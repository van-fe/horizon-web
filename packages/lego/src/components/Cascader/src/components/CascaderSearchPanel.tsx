import type { LegoComponentInstance } from '@nio-fe/shared';
import { cls, ComponentClassBlock, sizeUnitTransform, useNamespace } from '@nio-fe/shared';
import { defineComponent, inject, ref } from 'vue';
import {
  NCascaderPickOptionInjectKey,
  NCascaderPresetModelValueInjectKey,
  NCascaderPropsInjectKey,
  NCascaderTreeHelperInjectKey,
  NCascaderVisibleOptionsInjectKey,
} from '../utils/injectKeys';
import NScrollbar from '~/components/Scrollbar/src/Scrollbar';
import CascaderItem from './CascaderItem';
import NCheckbox from '~/components/Checkbox/src/Checkbox';
import NVirtualScroller from '~/components/VirtualScroller/src/VirtualScroller';
import NVirtualScrollerItem from '~/components/VirtualScroller/src/VirtualScrollerItem';
import useLocaleLang from '~/utils/useLocaleLang';
import type { NCascaderExtendOption } from '../utils/types';
import type { VirtualScrollerExposes } from '~/components/VirtualScroller/src/composables/useExposes';
import { useCascaderSearchPanelEmits } from '../composables/useEmits';
import useCheckAll from '../hooks/useCheckAll';

export default defineComponent({
  name: `${useNamespace()}CascaderSearchPanel`,
  components: {
    NScrollbar,
    CascaderItem,
  },
  emits: useCascaderSearchPanelEmits,
  setup(_, { emit }) {
    const classHelper = new ComponentClassBlock('cascader-search-panel');

    const optionList = inject(NCascaderVisibleOptionsInjectKey)!;
    const parentProps = inject(NCascaderPropsInjectKey)!;
    const presetModelValueSet = inject(NCascaderPresetModelValueInjectKey)!;
    const treeHelper = inject(NCascaderTreeHelperInjectKey)!;
    const pickOption = inject(NCascaderPickOptionInjectKey)!;

    const scrollerDomRef = ref<LegoComponentInstance<
      typeof NVirtualScroller,
      VirtualScrollerExposes
    > | null>(null);

    const { isCheckAll, isIndeterminate, toggleCheckAll } = useCheckAll(
      parentProps,
      optionList,
      presetModelValueSet,
      pickOption,
      emit,
    );

    function getOptionValue<T extends NCascaderExtendOption, K extends keyof T>(
      option: T,
      key: K,
    ): T[K] {
      return treeHelper.getOptionValue<T, K>(option, key);
    }

    return () => (
      <div class={classHelper.block}>
        {parentProps.multiple && parentProps.useFilterCheckAll && (
          <div class={cls(classHelper.e('check-all'))} onClick={toggleCheckAll}>
            <NCheckbox modelValue={isCheckAll.value} indeterminate={isIndeterminate.value}>
              {useLocaleLang('select.checkAll').value}
            </NCheckbox>
          </div>
        )}
        {parentProps.useVirtualScroll ? (
          <NVirtualScroller
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
              default: (row: { item: NCascaderExtendOption; index: number; active: boolean }) => (
                <NVirtualScrollerItem item={row.item} active={row.active} index={row.index}>
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
                </NVirtualScrollerItem>
              ),
            }}
          </NVirtualScroller>
        ) : (
          <NScrollbar
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
          </NScrollbar>
        )}
      </div>
    );
  },
});
