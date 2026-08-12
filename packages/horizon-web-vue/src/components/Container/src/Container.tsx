import type { Component } from 'vue';
import { computed, defineComponent } from 'vue';
import type { ContainerRegion } from '@aurora/core';
import { resolveContainerDirection } from '@aurora/core';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, useNamespace } from '@aurora/utils';
import { useContainerProps } from './composables/useProps';
import type { ContainerSlots } from './composables/useSlots';
import { useContainerSlots } from './composables/useSlots';

export default defineComponent({
  name: `${useNamespace()}Container`,
  desc:
    '用于布局的容器组件，方便快速搭建页面的基本结构:' +
    '<h-container>：外层容器。 当子元素中包含 <h-header> 或 <h-footer> 时，全部子元素会垂直上下排列， 否则会水平左右排列。\n' +
    '<h-header>：顶栏容器。\n' +
    '<h-aside>：侧边栏容器。\n' +
    '<h-main>：主要区域容器。\n' +
    '<h-footer>：底栏容器。',
  descLocales: {
    en: 'When a direct child is `h-header`, `h-container` automatically uses a vertical direction. This is the simplest shell for a top bar and main content.',
  },
  props: useContainerProps,
  slots: useContainerSlots,
  setup(props, { slots }: HorizonWebSetupContext<{}, ContainerSlots>) {
    const classHelper = new ComponentClassBlock('container');

    const isVertical = computed(() => {
      const regions = (slots?.default?.() ?? []).map<ContainerRegion>(node => {
        const name = (node?.type as Component)?.name;
        if (name?.endsWith('Header')) return 'header';
        if (name?.endsWith('Aside')) return 'aside';
        if (name?.endsWith('Main')) return 'main';
        if (name?.endsWith('Footer')) return 'footer';
        return 'other';
      });
      return resolveContainerDirection(props.direction, regions) === 'vertical';
    });

    return () => (
      <section class={cls(classHelper.block, classHelper.is('vertical', isVertical.value))}>
        {slots?.default?.()}
      </section>
    );
  },
});
