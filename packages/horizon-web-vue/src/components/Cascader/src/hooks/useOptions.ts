import { computed, provide, ref, watch } from 'vue';
import type { HorizonWebSetupContext } from '@aurora/utils';
import type { CascaderProps } from '../composables/useProps';
import type { CascaderEmits } from '../composables/useEmits';
import type { CascaderSlots } from '../composables/useSlots';
import type { CascaderExposes } from '../composables/useExposes';
import type { HCascaderExtendOption, HCascaderOption, HCascaderUuidType } from '../utils/types';
import {
  HCascaderModifyOptionChildrenListInjectKey,
  HCascaderOptionListInjectKey,
  HCascaderOptionListMapInjectKey,
  HCascaderRegisterVNodeGetterInjectKey,
  HCascaderTreeHelperInjectKey,
} from '../utils/injectKeys';
import { getTreeDataOriginData } from '../utils/useOptions';
import Tree from '~/utils/useTree';

export default function useOptions(
  props: CascaderProps,
  context: HorizonWebSetupContext<CascaderEmits, CascaderSlots, CascaderExposes>,
) {
  const optionList = ref<HCascaderExtendOption[]>([]);
  const optionListMap = ref(new Map<HCascaderUuidType, HCascaderExtendOption>());
  const optionsVersion = ref(0);

  // Internal identities stay compact; public values are always resolved from value paths.
  let nextOptionUuid = 0;
  const createOptionUuid = () => nextOptionUuid++;

  const tree = new Tree<HCascaderOption, HCascaderExtendOption>(
    [],
    props.fieldMap ?? {},
    createOptionUuid,
  );

  function notifyOptionsChanged() {
    optionsVersion.value++;
  }

  function modifyOptionChildrenList(node: HCascaderExtendOption, children: HCascaderOption[]) {
    const tempInstance = new Tree(
      children,
      props.fieldMap ?? {},
      createOptionUuid,
      node,
      node.level + 1,
    );

    node.children = children;
    node.transformedChildren = tempInstance.transformedTreeData.value;

    tempInstance.flattenTreeData.value.forEach(data => {
      optionListMap.value.set(data._uuid, data);
    });

    notifyOptionsChanged();
    context.emit('update:options', getTreeDataOriginData(Array.from(optionListMap.value.values())));
  }

  watch(
    () => props.options,
    value => {
      if (value) {
        nextOptionUuid = 0;
        tree.setTreeData(value);
        optionList.value = tree.flattenTreeData.value;
        optionListMap.value = tree.flattenTreeDataMapping.value;
      } else {
        optionList.value = [];
        optionListMap.value.clear();
      }

      notifyOptionsChanged();
    },
    {
      immediate: true,
      deep: true,
    },
  );

  provide(HCascaderOptionListInjectKey, optionList);
  provide(HCascaderOptionListMapInjectKey, optionListMap);
  provide(HCascaderTreeHelperInjectKey, tree);
  provide(HCascaderModifyOptionChildrenListInjectKey, modifyOptionChildrenList);
  provide(HCascaderRegisterVNodeGetterInjectKey, (uuid, getter) => {
    const target = optionListMap.value.get(uuid);

    if (target) {
      target.vNodeGetter = getter;
    }
  });

  return {
    tree,
    optionList,
    optionListMap,
    optionsVersion,
    hasOptions: computed(() => props.options.length > 0),
    modifyOptionChildrenList,
  };
}
