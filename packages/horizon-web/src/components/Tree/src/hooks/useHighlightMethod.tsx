import type { ToRefs } from 'vue';
import { computed } from 'vue';
import type { TreeProps } from '../composables/useProps';

const useHighlightMethod = (props: ToRefs<TreeProps>) =>
  computed(() => {
    if (props.highlightMethod?.value) {
      return props.highlightMethod?.value;
    }

    return undefined;
  });

export default useHighlightMethod;
