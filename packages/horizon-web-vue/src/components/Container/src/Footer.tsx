import { computed, defineComponent } from 'vue';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, sizeUnitTransform, useNamespace } from '@aurora/utils';
import { useFooterProps } from './composables/useProps';
import type { FooterSlots } from './composables/useSlots';
import { useFooterSlots } from './composables/useSlots';

export default defineComponent({
  name: `${useNamespace()}Footer`,
  desc: "页面布局中的底部容器",
  descLocales: { en: "A footer region within a page layout." },
  props: useFooterProps,
  slots: useFooterSlots,
  setup(props, { slots }: HorizonWebSetupContext<{}, FooterSlots>) {
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
