import type { Component } from 'vue';
import { computed, defineComponent } from 'vue';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, useNamespace } from '@aurora/utils';
import { useContainerProps } from './composables/useProps';
import type { ContainerSlots } from './composables/useSlots';
import { useContainerSlots } from './composables/useSlots';

export default defineComponent({
  name: `${useNamespace()}Container`,
  desc:
    '用于布局的容器组件，方便快速搭建页面的基本结构:' +
    '<n-container>：外层容器。 当子元素中包含 <n-header> 或 <n-footer> 时，全部子元素会垂直上下排列， 否则会水平左右排列。\n' +
    '<n-header>：顶栏容器。\n' +
    '<n-aside>：侧边栏容器。\n' +
    '<n-main>：主要区域容器。\n' +
    '<n-footer>：底栏容器。',
  props: useContainerProps,
  slots: useContainerSlots,
  setup(props, { slots }: HorizonWebSetupContext<{}, ContainerSlots>) {
    const classHelper = new ComponentClassBlock('container');

    const isVertical = computed(() => {
      if (props.direction) {
        return props.direction === 'vertical';
      } else {
        if (slots && slots.default) {
          return slots
            .default()
            .some(node => (node?.type as Component)?.name?.endsWith('Header') || (node?.type as Component)?.name?.endsWith('Footer'));
        } else {
          return false;
        }
      }
    });

    return () => (
      <section class={cls(classHelper.block, classHelper.is('vertical', isVertical.value))}>
        {slots?.default?.()}
      </section>
    );
  },
});
