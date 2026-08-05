import { computed, defineComponent } from 'vue';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, sizeUnitTransform, useNamespace } from '@aurora/utils';
import { useHeaderProps } from './composables/useProps';
import type { HeaderSlots } from './composables/useSlots';
import { useHeaderSlots } from './composables/useSlots';

export default defineComponent({
  name: `${useNamespace()}Header`,
  desc: "页面布局中的顶部容器",
  descLocales: { en: "A header region within a page layout." },
  props: useHeaderProps,
  slots: useHeaderSlots,
  setup(props, { slots }: HorizonWebSetupContext<{}, HeaderSlots>) {
    const classHelper = new ComponentClassBlock('header');

    const style = computed(() => {
      return props.height
        ? {
            height: sizeUnitTransform(props.height),
          }
        : {};
    });

    return () => (
      <header class={cls(classHelper.block)} style={style.value}>
        {slots?.default?.()}
      </header>
    );
  },
});
