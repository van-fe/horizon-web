import type { ToRefs } from 'vue';
import { computed } from 'vue';
import type { TreeProps } from '../composables/useProps';
import { ComponentClassBlock, isObject } from '@nio-fe/shared';
import type { NTreeExtendsData, NTreeData } from './types';
import type Tree from '~/utils/useTree/index';
import { transformRegString } from '~/utils/tools';

const useHighlightMethod = (
  props: ToRefs<TreeProps>,
  treeHelper: Tree<NTreeData, NTreeExtendsData>,
) =>
  computed(() => {
    const classHelper = new ComponentClassBlock('tree');

    if (isObject(props.filter?.value) && props.filter?.value.highLightMethod) {
      return props.filter.value.highLightMethod;
    }

    if (props.highlightMethod?.value) {
      return props.highlightMethod?.value;
    }

    return (inputValue: string, node: NTreeExtendsData) =>
      inputValue ? (
        <span
          v-safe-html={treeHelper
            .getOptionValue(node, 'label')
            ?.toString()
            .replace(
              new RegExp(transformRegString(inputValue), 'ig'),
              substring => `<span class=${classHelper.e('keyword')}>${substring}</span>`,
            )}
        />
      ) : (
        node.label
      );
  });

export default useHighlightMethod;
