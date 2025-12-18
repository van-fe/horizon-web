import type { ToRefs } from 'vue';
import { watch } from 'vue';
import type { TreeProps } from '../composables/useProps';
import type { NTreeData, NTreeExtendsData } from '../utils/types';
import type { TopBaseTreeData } from '~/utils/useTree/types';
import type Tree from '~/utils/useTree/index';
import type { LegoSetupContext } from '@nio-fe/shared';
import { isUndefined } from '@nio-fe/shared';
import type { TreeEmits } from '~/components/Tree/src/composables/useEmits';

export default function (
  props: ToRefs<TreeProps>,
  emit: LegoSetupContext<TreeEmits>['emit'],
  treeHelper: Tree<NTreeData, NTreeExtendsData>,
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

  function deleteNode(value?: string | number, emitUpdate: boolean = true): NTreeData[] {
    let res: NTreeData[] = [];

    if (isUndefined(value)) {
      treeHelper.originTreeData = [];
    } else {
      res = treeHelper.deleteNodeByValue(treeHelper.originTreeData, value);
    }

    emitUpdate && emitUpdateTreeData();

    return res;
  }

  function setNode(data: TopBaseTreeData & Partial<NTreeData>, value?: string | number) {
    if (isUndefined(value)) {
      treeHelper.originTreeData.push(data);
    } else {
      treeHelper.setBaseTreeTargetByValue(treeHelper.originTreeData, value, data);
    }

    emitUpdateTreeData();
  }

  /**
   * set node children
   * @param value to set root array should give null
   * @param children the list of tree-data of this level
   */
  function setNodeChildren(value: string | number | null, children: NTreeData[]) {
    if (value === null) {
      treeHelper.originTreeData = children;
    } else {
      const target = treeHelper.getBaseTreeTargetByValue(treeHelper.originTreeData, value);

      if (target) {
        target[treeHelper.fieldMapping['children'] as 'children'] = children;
      }
    }

    emitUpdateTreeData();
  }

  function addNodeChildren(
    arr: Array<TopBaseTreeData & Partial<NTreeData>>,
    value?: string | number,
    append = true,
  ) {
    if (isUndefined(value)) {
      if (append) {
        treeHelper.originTreeData.push(...arr);
      } else {
        treeHelper.originTreeData.unshift(...arr);
      }
    } else {
      const target = treeHelper.getBaseTreeTargetByValue(treeHelper.originTreeData, value);

      if (target) {
        if (!Array.isArray(treeHelper.getOptionValue(target, 'children'))) {
          target[treeHelper.fieldMapping['children'] as 'children'] = [];
        }

        if (append) {
          treeHelper.getOptionValue(target, 'children')!.push(...arr);
        } else {
          treeHelper.getOptionValue(target, 'children')!.unshift(...arr);
        }
      }
    }

    emitUpdateTreeData();
  }

  return {
    deleteNode,
    setNode,
    setNodeChildren,
    addNodeChildren,
  };
}
