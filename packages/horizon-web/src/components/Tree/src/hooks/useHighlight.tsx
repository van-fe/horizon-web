import type { ToRefs } from 'vue';
import { computed } from 'vue';
import type { TreeProps } from '../composables/useProps';
import { isObject } from '@aurora/shared';

const useHighlightMethod = (props: ToRefs<TreeProps>) =>
  computed(() => {
    if (isObject(props.filter?.value) && props.filter?.value.highLightMethod) {
      return props.filter.value.highLightMethod;
    }

    if (props.highlightMethod?.value) {
      return props.highlightMethod?.value;
    }

    return undefined;
  });

export default useHighlightMethod;
