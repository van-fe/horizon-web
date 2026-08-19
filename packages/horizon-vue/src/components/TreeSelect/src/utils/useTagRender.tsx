import type { ToRefs, VNode, Ref, ComputedRef } from 'vue';
import type { TreeSelectProps } from '../composables/useProps';
import type { HTreeSelectContext } from './types';
import HTag from '~/components/Tag/src/Tag';
import type { HTreeExtendsData, HTreeData, HTreeUuidType } from '~/components/Tree/src/utils/types';
import type Tree from '~/utils/useTree/index';
import { watchEffect } from 'vue';
import { JSX } from 'vue/jsx-runtime';
import {
  createTreeSelectTags,
  type TreeSelectController,
  type TreeSelectStageResult,
  type TreeValue,
} from '@aurora/core';

export default function (
  props: ToRefs<TreeSelectProps>,
  context: HTreeSelectContext,
  treeHelper: Tree<HTreeData, HTreeExtendsData>,
  modelValueSet: Ref<Set<HTreeUuidType>>,
  prevRenderedModelValueTags: Map<HTreeUuidType, VNode | JSX.Element>,
  isDisabled: ComputedRef<boolean>,
  removeValue: (value: TreeValue) => TreeSelectStageResult,
  controller: TreeSelectController<HTreeData>,
) {
  const previousLabels = new Map<TreeValue, string>();
  watchEffect(() => {
    for (const value of modelValueSet.value) {
      const label = controller.snapshot.tree.byValue.get(value)?.stringLabel;
      if (label !== undefined) previousLabels.set(value, label);
    }
  });

  function renderTags(): Array<VNode | JSX.Element> {
    const tags = createTreeSelectTags(
      controller.snapshot.tree,
      Array.from(modelValueSet.value.values()),
      {
        checkStrictly: props.checkStrictly.value,
        disabled: isDisabled.value,
        previousLabels,
      },
    );
    for (const tag of tags) previousLabels.set(tag.value, tag.label);

    const rendered = tags
      .map(tag => {
        const uuid = tag.value;
        const option = treeHelper.flattenTreeData.value.find(curr => curr._uuid === uuid);

        if (!option) {
          return context.slots.tagRender && prevRenderedModelValueTags.has(uuid) ? (
            prevRenderedModelValueTags.get(uuid)
          ) : (
            <HTag
              clickable={false}
              closable={tag.removable}
              disabled={tag.disabled}
              onClose={() => removeValue(uuid)}
            >
              {tag.label}
            </HTag>
          );
        }

        const res = context.slots.tagRender?.({ ...option, label: option.fullPathLabel }) ?? (
          <HTag
            clickable={false}
            closable={tag.removable}
            disabled={tag.disabled}
            onClose={() => removeValue(uuid)}
          >
            {tag.label}
          </HTag>
        );

        if (context.slots.tagRender)
          prevRenderedModelValueTags.set(uuid, res as VNode | JSX.Element);

        return res;
      })
      .filter(curr => !!curr) as Array<VNode | JSX.Element>;

    // remove selected option in prevRenderedModelValueTags
    for (const optValue of prevRenderedModelValueTags.keys()) {
      if (!modelValueSet.value.has(optValue)) {
        prevRenderedModelValueTags.delete(optValue);
      }
    }
    return rendered;
  }

  return {
    renderTags,
  };
}
