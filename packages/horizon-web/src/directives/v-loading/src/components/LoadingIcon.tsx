import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import { defineComponent } from 'vue';

export default defineComponent({
  name: `${useNamespace()}LoadingIcon`,
  setup() {
    const classHelper = new ComponentClassBlock('loading-icon');

    return () => (
      <svg
        class={[classHelper.block, 'circular']}
        viewBox="25 25 50 50"
        aria-hidden="true"
        focusable="false"
      >
        <circle
          class={[classHelper.e('path'), 'path']}
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke-width="4.8"
        />
      </svg>
    );
  },
});
