import { computed, defineComponent } from 'vue';
import type { LegoSetupContext } from '@aurora/shared';
import { cls, ComponentClassBlock, sizeUnitTransform, useNamespace } from '@aurora/shared';
import { useFooterProps } from './composables/useProps';
import type { FooterSlots } from './composables/useSlots';
import { useFooterSlots } from './composables/useSlots';

export default defineComponent({
  name: `${useNamespace()}Footer`,
  props: useFooterProps,
  slots: useFooterSlots,
  setup(props, { slots }: LegoSetupContext<{}, FooterSlots>) {
    const classHelper = new ComponentClassBlock('footer');

    const style = computed(() => {
      return props.height
        ? {
            height: sizeUnitTransform(props.height),
          }
        : {};
    });

    return () => (
      <footer class={cls(classHelper.block)} style={style.value}>
        {slots?.default?.()}
      </footer>
    );
  },
});
