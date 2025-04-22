import type { ToRefs } from 'vue';
import { computed, watch } from 'vue';
import type { TreeSelectProps } from '../composables/useProps';
import type { NTreeSelectContext, NTreeSelectDomRefs } from './types';
import type { NTreeData, NTreeExtendsData } from '~/components/Tree/src/utils/types';
import TreeHelper from '~/utils/useTree/index';
import { transformUuid } from '~/components/Tree/src/utils/config';

export default function (
  props: ToRefs<TreeSelectProps>,
  context: NTreeSelectContext,
  domRefs: NTreeSelectDomRefs,
) {
  const treeHelper = new TreeHelper<NTreeData, NTreeExtendsData>(
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
