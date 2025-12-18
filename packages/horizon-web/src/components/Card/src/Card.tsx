import { defineComponent, toRefs } from 'vue';
import { ComponentClassBlock, cls, useNamespace } from '@aurora/shared';
import type { LegoSetupContext } from '@aurora/shared';
import { useCardProps } from './composables/useProps';
import { useCardEmits } from './composables/useEmits';
import { useCardSlots } from './composables/useSlots';
import { useCardExposes } from './composables/useExposes';
import type { CardProps } from './composables/useProps';
import type { CardEmits } from './composables/useEmits';
import type { CardSlots } from './composables/useSlots';
import type { CardExposes } from './composables/useExposes';

export default defineComponent({
  name: `${useNamespace()}Card`,
  desc: '卡片组件',
  props: useCardProps,
  emits: useCardEmits,
  slots: useCardSlots,
  exposes: useCardExposes,
  setup(props: CardProps, { slots }: LegoSetupContext<CardEmits, CardSlots, CardExposes>) {
    const classHelper = new ComponentClassBlock('card');
    const { radius, border, title, topDivider, bottomDivider } = toRefs(props);

    return () => (
      <div
        class={cls(
          classHelper.block,
          classHelper.m(radius.value),
          classHelper.is('border', border.value),
        )}
      >
        {title.value ? (
          <header class={classHelper.e('header')}>{title.value}</header>
        ) : (
          slots.header?.()
        )}
        {topDivider.value && <div class={classHelper.e('divider')} />}
        <main class={classHelper.e('content')}>{slots.default?.()}</main>
        {bottomDivider.value && <div class={classHelper.e('divider')} />}
        {slots.footer?.()}
      </div>
    );
  },
});
