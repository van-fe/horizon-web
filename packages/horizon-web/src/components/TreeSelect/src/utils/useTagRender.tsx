import type { ToRefs, VNode, Ref, ComputedRef } from 'vue';
import type { TreeSelectProps } from '../composables/useProps';
import type { HTreeSelectContext, HTreeSelectDomRefs } from './types';
import HTag from '~/components/Tag/src/Tag';
import type { HTreeExtendsData, HTreeData, HTreeUuidType } from '~/components/Tree/src/utils/types';
import type Tree from '~/utils/useTree/index';
import { watch } from 'vue';
import { JSX } from 'vue/jsx-runtime';

export default function (
  props: ToRefs<TreeSelectProps>,
  context: HTreeSelectContext,
  domRefs: HTreeSelectDomRefs,
  treeHelper: Tree<HTreeData, HTreeExtendsData>,
  modelValueSet: Ref<Set<HTreeUuidType>>,
  presetModelValueSet: Ref<Set<HTreeUuidType>>,
  renderedModelValueTags: Ref<Array<VNode | JSX.Element>>,
  prevRenderedModelValueTags: Map<HTreeUuidType, VNode | JSX.Element>,
  isDisabled: ComputedRef<boolean>,
  updateModelValue: () => void,
  visibleNodes: Ref<HTreeExtendsData[]>,
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

  function getShowLabel(uuid: HTreeUuidType) {
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
              <HTag
                clickable={false}
                closable={true}
                disabled={isDisabled.value}
                onClose={() => modelValueSet.value.delete(uuid)}
              >
                {getShowLabel(uuid)}
              </HTag>
            )
          );
        }

        const res = context.slots.tagRender?.({ ...option, label: option.fullPathLabel }) ?? (
          <HTag
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
          </HTag>
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
