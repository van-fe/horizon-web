import type { TreeProps } from '~/components/Tree/src/composables/useProps';
import type { MaybeRef, HorizonWebComponentInstance } from '@aurora/utils';
import { nextTick, ref, SetupContext, unref } from 'vue';
import { mount } from '@vue/test-utils';
import HTree from '~/components/Tree/src/Tree';
import TreeData from './options.json';
import DisabledTreeData from './modifiedOptions/disabled-options.json';
import type Tree from '~/components/Tree/src/Tree';
import type { TreeExposes } from '~/components/Tree/src/composables/useExposes';
import type { TreeSlots } from '~/components/Tree/src/composables/useSlots';
import type { TreeEmits } from '~/components/Tree/src/composables/useEmits';
import type { Mock } from 'vitest';

export async function createInstance<
  T extends keyof TreeProps | `on${Capitalize<keyof TreeEmits>}`,
>(
  propsOrEmits?: Partial<
    Record<T, MaybeRef<T extends keyof TreeProps ? TreeProps[T] : Mock | Function>>
  >,
  useDisabledOptions = false,
  slots: SetupContext<{}, TreeSlots>['slots'] = {},
) {
  const selectedValues = ref();
  const expandedValues = ref();
  const domRef = ref<HorizonWebComponentInstance<typeof Tree, TreeExposes> | null>(null);

  const wrapper = mount(
    () => (
      <HTree
        ref={domRef}
        v-model:selectedValues={selectedValues.value}
        v-model:expandValues={expandedValues.value}
        treeData={useDisabledOptions ? DisabledTreeData : TreeData}
        {...Object.fromEntries(
          Object.entries(propsOrEmits || {}).map(([key, value]) => [key, unref(value)]),
        )}
      >
        {slots}
      </HTree>
    ),
    {
      attachTo: document.body,
    },
  );

  await nextTick();

  const element = wrapper.findComponent(HTree);

  return {
    domRef,
    selectedValues,
    expandedValues,
    wrapper,
    element,
  };
}
