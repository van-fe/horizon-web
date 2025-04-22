import { defineComponent } from 'vue';
import { ComponentClassBlock, cls, useNamespace } from '@nio-fe/shared';
import type { LegoSetupContext } from '@nio-fe/shared';
import { use${capitalName}Props } from './composables/useProps';
import { use${capitalName}Emits } from './composables/useEmits';
import { use${capitalName}Slots } from './composables/useSlots';
import { use${capitalName}Exposes } from './composables/useExposes';
import type { ${capitalName}Props } from './composables/useProps';
import type { ${capitalName}Emits } from './composables/useEmits';
import type { ${capitalName}Slots } from './composables/useSlots';
import type { ${capitalName}Exposes } from './composables/useExposes';

export default defineComponent({
  name: `${useNamespace()}${capitalName}`,
  desc: '',
  props: use${capitalName}Props,
  emits: use${capitalName}Emits,
  slots: use${capitalName}Slots,
  exposes: use${capitalName}Exposes,
  setup(props: ${capitalName}Props, { emit, slots, expose }: LegoSetupContext<${capitalName}Emits, ${capitalName}Slots, ${capitalName}Exposes>) {
    const classHelper = new ComponentClassBlock('${kebabName}');

    expose({});

    return () => (
      <div class={cls(classHelper.block)}>
        <div class={cls(classHelper.e('content'))}>
          { slots.default?.() ?? 'test content' }
        </div>
      </div>
    );
  },
});
