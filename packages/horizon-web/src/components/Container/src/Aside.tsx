import { computed, defineComponent } from 'vue';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, sizeUnitTransform, useNamespace } from '@aurora/utils';
import { useAsideProps } from './composables/useProps';
import type { AsideSlots } from './composables/useSlots';
import { useAsideSlots } from './composables/useSlots';

export default defineComponent({
  name: `${useNamespace()}Aside`,
  desc: "页面布局中的侧边栏容器",
  descLocales: { en: "A sidebar region within a page layout." },
  props: useAsideProps,
  slots: useAsideSlots,
  setup(props, { slots }: HorizonWebSetupContext<{}, AsideSlots>) {
    const classHelper = new ComponentClassBlock('aside');

    const style = computed(() =>
      props.width
        ? {
            width: sizeUnitTransform(props.width),
          }
        : {},
    );

    return () => (
      <aside class={cls(classHelper.block)} style={style.value}>
        {slots?.default?.()}
      </aside>
    );
  },
});
