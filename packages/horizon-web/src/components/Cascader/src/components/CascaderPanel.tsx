import type { PropType, VNode } from 'vue';
import { defineComponent, inject, provide, ref, watch } from 'vue';
import type { HorizonWebComponentInstance } from '@aurora/utils';
import {
  cls,
  ComponentClassBlock,
  isDefined,
  sizeUnitTransform,
  useNamespace,
} from '@aurora/utils';
import type { HCascaderExtendOption } from '../utils/types';
import CascaderItem from './CascaderItem';
import HScrollbar from '~/components/Scrollbar/src/Scrollbar';
import {
  HCascaderActiveOptionInPanelInjectKey,
  HCascaderEmitsInjectKey,
  HCascaderPopperVisibleInjectKey,
  HCascaderPropsInjectKey,
  HCascaderSlotsInjectKey,
  HCascaderTreeHelperInjectKey,
} from '../utils/injectKeys';
import useLocaleLang from '~/utils/useLocaleLang';
import HVirtualScroller from '~/components/VirtualScroller/src/VirtualScroller';
import HVirtualScrollerItem from '~/components/VirtualScroller/src/VirtualScrollerItem';
import type { VirtualScrollerExposes } from '~/components/VirtualScroller/src/composables/useExposes';

export default defineComponent({
  name: `${useNamespace()}CascaderPanel`,
  props: {
    list: {
      type: Array as PropType<HCascaderExtendOption[]>,
      required: true,
    },
  },
  setup(props) {
    const classHelper = new ComponentClassBlock('cascader-panel');

    const parentProps = inject(HCascaderPropsInjectKey)!;
    const parentEmits = inject(HCascaderEmitsInjectKey)!;
    const parentSlots = inject(HCascaderSlotsInjectKey)!;
    const popperVisible = inject(HCascaderPopperVisibleInjectKey)!;
    const treeHelper = inject(HCascaderTreeHelperInjectKey)!;

    const scrollerDomRef = ref<HorizonWebComponentInstance<
      typeof HVirtualScroller,
      VirtualScrollerExposes
    > | null>(null);

    const activeOption = ref<HCascaderExtendOption>();

    provide(HCascaderActiveOptionInPanelInjectKey, activeOption);

    watch(popperVisible, val => {
      if (!val) {
        activeOption.value = undefined;
      }
    });

    function getOptionValue<T extends HCascaderExtendOption, K extends keyof T>(
      option: T,
      key: K,
    ): T[K] {
      return treeHelper.getOptionValue<T, K>(option, key);
    }

    return () => (
      <div class={classHelper.block}>
        {props.list?.length > 0 ? (
          parentProps.useVirtualScroll ? (
            <HVirtualScroller
              ref={scrollerDomRef}
              class={cls(
                classHelper.em('scrollbar', 'view'),
                classHelper.has('panel-input', parentProps.useBuildInPanelFilter),
              )}
              scrollerMaxHeight={`calc(${sizeUnitTransform(parentProps.maxHeight)} - 16px)`}
              items={props.list}
              minItemSize={40}
              keyField="_uuid"
              size="small"
              onScrollEnd={() => parentEmits('panelReachBottom', undefined, props.list[0]?.parent)}
            >
              {{
                default: (row: { item: HCascaderExtendOption; index: number; active: boolean }) => (
                  <HVirtualScrollerItem item={row.item} active={row.active} index={row.index}>
                    {isDefined(getOptionValue(row.item, 'groupLabel')) ? (
                      <div class={classHelper.e('group-label')}>
                        {typeof getOptionValue(row.item, 'groupLabel') === 'function'
                          ? (getOptionValue(row.item, 'groupLabel') as () => VNode)()
                          : getOptionValue(row.item, 'groupLabel')}
                      </div>
                    ) : (
                      <CascaderItem
                        key={row.item._uuid}
                        value={getOptionValue(row.item, 'value')}
                        label={getOptionValue(row.item, 'label')}
                        level={row.item.level}
                        disabled={getOptionValue(row.item, 'disabled')}
                        isLeaf={getOptionValue(row.item, 'isLeaf')}
                        extendsOption={row.item}
                        duringFilter={false}
                      />
                    )}
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
              onReachBottom={evt => parentEmits('panelReachBottom', evt, props.list[0]?.parent)}
            >
              {props.list.map(item =>
                isDefined(getOptionValue(item, 'groupLabel')) ? (
                  <div class={classHelper.e('group-label')}>
                    {typeof getOptionValue(item, 'groupLabel') === 'function'
                      ? (getOptionValue(item, 'groupLabel') as () => VNode)()
                      : getOptionValue(item, 'groupLabel')}
                  </div>
                ) : (
                  <CascaderItem
                    key={item._uuid}
                    value={getOptionValue(item, 'value')}
                    label={getOptionValue(item, 'label')}
                    level={item.level}
                    disabled={getOptionValue(item, 'disabled')}
                    isLeaf={getOptionValue(item, 'isLeaf')}
                    extendsOption={item}
                    duringFilter={false}
                  />
                ),
              )}
            </HScrollbar>
          )
        ) : (
          <div class={classHelper.e('empty')}>
            {parentSlots.empty?.() ??
              parentSlots.empty?.() ??
              parentProps.emptyText ??
              useLocaleLang('cascader.noData').value}
          </div>
        )}
      </div>
    );
  },
});
