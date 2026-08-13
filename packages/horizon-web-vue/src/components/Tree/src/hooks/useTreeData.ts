import type { ToRefs } from 'vue';
import { watch } from 'vue';
import type { TreeProps } from '../composables/useProps';
import type { HTreeData, HTreeExtendsData } from '../utils/types';
import type { TopBaseTreeData } from '~/utils/useTree/types';
import type Tree from '~/utils/useTree/index';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { isUndefined } from '@aurora/utils';
import {
  addTreeChildren,
  deleteTreeNode,
  replaceTreeChildren,
  replaceTreeNode,
} from '@aurora/core';
import type { TreeEmits } from '~/components/Tree/src/composables/useEmits';

export default function useTreeData(
  props: ToRefs<TreeProps>,
  emit: HorizonWebSetupContext<TreeEmits>['emit'],
  treeHelper: Tree<HTreeData, HTreeExtendsData>,
) {
  watch(
    props.treeData,
    val => {
      treeHelper.setTreeData(val);
    },
    {
      deep: true,
    },
  );

  function emitUpdateTreeData() {
    emit('update:treeData', treeHelper.originTreeData);
  }

  function replaceData(next: HTreeData[], emitUpdate = true) {
    // Consumers (notably TreeSelect) retain the root array reference, so apply Core's
    // immutable result through a splice instead of replacing that identity.
    treeHelper.originTreeData.splice(0, treeHelper.originTreeData.length, ...next);
    try {
      treeHelper.setTreeData(treeHelper.originTreeData);
    } catch (error) {
      if (!(error instanceof Error) || !error.message.toLowerCase().includes('unique')) throw error;
    }
    if (emitUpdate) emitUpdateTreeData();
  }

  const fieldMap = () => treeHelper.fieldMapping as Record<string, string>;

  function deleteNode(value?: string | number, emitUpdate: boolean = true): HTreeData[] {
    const result = deleteTreeNode(treeHelper.originTreeData, value, fieldMap());
    replaceData(result.data as HTreeData[], emitUpdate);
    return result.deleted as HTreeData[];
  }

  function setNode(data: TopBaseTreeData & Partial<HTreeData>, value?: string | number) {
    const next = isUndefined(value)
      ? addTreeChildren(treeHelper.originTreeData, undefined, [data], true, fieldMap())
      : replaceTreeNode(treeHelper.originTreeData, value, data, fieldMap());
    replaceData(next as HTreeData[]);
  }

  /**
   * set node children
   * @param value to set root array should give null
   * @paramEn value The value value.
   * @param children the list of tree-data of this level
   * @paramEn children The children value.
   */
  function setNodeChildren(value: string | number | null, children: HTreeData[]) {
    replaceData(
      replaceTreeChildren(
        treeHelper.originTreeData,
        value ?? undefined,
        children,
        fieldMap(),
      ) as HTreeData[],
    );
  }

  function addNodeChildren(
    arr: Array<TopBaseTreeData & Partial<HTreeData>>,
    value?: string | number,
    append = true,
  ) {
    replaceData(
      addTreeChildren(
        treeHelper.originTreeData,
        value,
        arr as HTreeData[],
        append,
        fieldMap(),
      ) as HTreeData[],
    );
  }

  return {
    deleteNode,
    setNode,
    setNodeChildren,
    addNodeChildren,
  };
}

export type TreeDataMutations = Pick<
  ReturnType<typeof useTreeData>,
  'deleteNode' | 'setNodeChildren' | 'addNodeChildren'
>;
