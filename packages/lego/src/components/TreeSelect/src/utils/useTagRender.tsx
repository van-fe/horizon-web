import type { ToRefs, VNode, Ref, ComputedRef } from 'vue';
import type { TreeSelectProps } from '../composables/useProps';
import type { NTreeSelectContext, NTreeSelectDomRefs } from './types';
import { NTag } from '~/components/Tag';
import type { NTreeExtendsData, NTreeData, NTreeUuidType } from '~/components/Tree/src/utils/types';
import type Tree from '~/utils/useTree/index';
import { watch } from 'vue';

export default function (
  props: ToRefs<TreeSelectProps>,
  context: NTreeSelectContext,
  domRefs: NTreeSelectDomRefs,
  treeHelper: Tree<NTreeData, NTreeExtendsData>,
  modelValueSet: Ref<Set<NTreeUuidType>>,
  presetModelValueSet: Ref<Set<NTreeUuidType>>,
  renderedModelValueTags: Ref<Array<VNode | JSX.Element>>,
  prevRenderedModelValueTags: Map<NTreeUuidType, VNode | JSX.Element>,
  isDisabled: ComputedRef<boolean>,
  updateModelValue: () => void,
  visibleNodes: Ref<NTreeExtendsData[]>,
) {
  watch(
    modelValueSet,
    () => {
      resetRenderedTags();
      updateModelValue();
    },
    {
      deep: true,
    },
  );

  watch(props.checkStrictly, () => {
    resetRenderedTags();
  });

  watch(visibleNodes, () => {
    resetRenderedTags();
  });

  watch(
    () => props.disabled?.value,
    () => {
      resetRenderedTags();
    },
  );

  function getShowLabel(uuid: NTreeUuidType) {
    const option = treeHelper.flattenTreeDataMapping.value.get(uuid);

    return option?.stringLabel ?? '';
  }

  function resetRenderedTags() {
    renderedModelValueTags.value = Array.from(modelValueSet.value.values())
      .map(uuid => {
        const option = treeHelper.flattenTreeData.value.find(curr => curr._uuid === uuid);

        if (!option) {
          return (
            prevRenderedModelValueTags.get(uuid) ?? (
              <NTag
                clickable={false}
                closable={true}
                disabled={isDisabled.value}
                onClose={() => modelValueSet.value.delete(uuid)}
              >
                {getShowLabel(uuid)}
              </NTag>
            )
          );
        }

        const res = context.slots.tagRender?.({ ...option, label: option.fullPathLabel }) ?? (
          <NTag
            clickable={false}
            closable={
              !option?.disabled &&
              !isDisabled.value &&
              (props.checkStrictly.value || (!props.checkStrictly.value && !option.passingDisabled))
            }
            disabled={option?.disabled || isDisabled.value}
            onClose={() => modelValueSet.value.delete(uuid)}
          >
            {getShowLabel(uuid)}
          </NTag>
        );

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
  }

  return {
    resetRenderedTags,
    getShowLabel,
  };
}
