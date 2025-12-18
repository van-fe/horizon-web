import type { PropType, VNode } from 'vue';
import { defineComponent, inject, provide, ref, watch } from 'vue';
import type { LegoComponentInstance } from '@aurora/shared';
import {
  cls,
  ComponentClassBlock,
  isDefined,
  sizeUnitTransform,
  useNamespace,
} from '@aurora/shared';
import type { NCascaderExtendOption } from '../utils/types';
import CascaderItem from './CascaderItem';
import NScrollbar from '~/components/Scrollbar/src/Scrollbar';
import {
  NCascaderActiveOptionInPanelInjectKey,
  NCascaderEmitsInjectKey,
  NCascaderPopperVisibleInjectKey,
  NCascaderPropsInjectKey,
  NCascaderSlotsInjectKey,
  NCascaderTreeHelperInjectKey,
} from '../utils/injectKeys';
import useLocaleLang from '~/utils/useLocaleLang';
import NVirtualScroller from '~/components/VirtualScroller/src/VirtualScroller';
import NVirtualScrollerItem from '~/components/VirtualScroller/src/VirtualScrollerItem';
import type { VirtualScrollerExposes } from '~/components/VirtualScroller/src/composables/useExposes';

export default defineComponent({
  name: `${useNamespace()}CascaderPanel`,
  props: {
    list: {
      type: Array as PropType<NCascaderExtendOption[]>,
      required: true,
    },
  },
  setup(props) {
    const classHelper = new ComponentClassBlock('cascader-panel');

    const parentProps = inject(NCascaderPropsInjectKey)!;
    const parentEmits = inject(NCascaderEmitsInjectKey)!;
    const parentSlots = inject(NCascaderSlotsInjectKey)!;
    const popperVisible = inject(NCascaderPopperVisibleInjectKey)!;
    const treeHelper = inject(NCascaderTreeHelperInjectKey)!;

    const scrollerDomRef = ref<LegoComponentInstance<
      typeof NVirtualScroller,
      VirtualScrollerExposes
    > | null>(null);

    const activeOption = ref<NCascaderExtendOption>();

    provide(NCascaderActiveOptionInPanelInjectKey, activeOption);

    watch(popperVisible, val => {
      if (!val) {
        activeOption.value = undefined;
      }
    });

    function getOptionValue<T extends NCascaderExtendOption, K extends keyof T>(
      option: T,
      key: K,
    ): T[K] {
      return treeHelper.getOptionValue<T, K>(option, key);
    }

    return () => (
      <div class={classHelper.block}>
        {props.list?.length > 0 ? (
          parentProps.useVirtualScroll ? (
            <NVirtualScroller
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
                      duringFilter={false}
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
            </NScrollbar>
          )
        ) : (
          <div class={classHelper.e('empty')}>
            {parentSlots.empty?.() ??
              parentSlots.emptyRender?.() ??
              parentSlots.optionEmptyRender?.() ??
              parentProps.emptyContent ??
              parentProps.emptyText ??
              useLocaleLang('cascader.noData').value}
          </div>
        )}
      </div>
    );
  },
});
