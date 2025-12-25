import type { ToRefs } from 'vue';
import { computed, watch } from 'vue';
import type { TreeSelectProps } from '../composables/useProps';
import type { HTreeSelectContext, HTreeSelectDomRefs } from './types';
import type { HTreeData, HTreeExtendsData } from '~/components/Tree/src/utils/types';
import TreeHelper from '~/utils/useTree/index';
import { transformUuid } from '~/components/Tree/src/utils/config';

export default function (
  props: ToRefs<TreeSelectProps>,
  context: HTreeSelectContext,
  domRefs: HTreeSelectDomRefs,
) {
  const treeHelper = new TreeHelper<HTreeData, HTreeExtendsData>(
    props.treeData.value,
    props.fieldMap?.value ?? {},
    transformUuid,
  );

  /** computed **/
  const treeDataMapping = computed(
    () => new Map(treeHelper.flattenTreeData.value.map(val => [val._uuid, val])),
  );

  /** watches**/
  watch(
    props.treeData,
    val => {
      treeHelper.setTreeData(val);
    },
    {
      deep: true,
    },
  );

  /** methods **/
  return {
    treeHelper,
    treeDataMapping,
  };
}
