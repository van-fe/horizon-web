import { defineComponent, Fragment, toRef } from 'vue';
import { useNamespace, ComponentClassBlock } from '@aurora/utils';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { useAffixProps } from './composables/useProps';
import { useAffixEmits } from './composables/useEmits';
import { useAffixSlots } from './composables/useSlots';
import { useAffixExposes } from './composables/useExposes';
import type { AffixProps } from './composables/useProps';
import type { AffixEmits } from './composables/useEmits';
import type { AffixSlots } from './composables/useSlots';
import type { AffixExposes } from './composables/useExposes';
import { useAffixPosition } from './composables/useAffixPosition';

export default defineComponent({
  name: `${useNamespace()}Affix`,
  desc: '将页面元素固定在特定可视区域',
  descLocales: {
    en: 'Affix listens to window scrolling by default and pins its content to the viewport top. It preserves the original space so surrounding content does not jump.',
  },
  inheritAttrs: false,
  props: useAffixProps,
  emits: useAffixEmits,
  slots: useAffixSlots,
  exposes: useAffixExposes,
  setup(
    props: AffixProps,
    { slots, expose, attrs }: HorizonWebSetupContext<AffixEmits, AffixSlots, AffixExposes>,
  ) {
    const classHelper = new ComponentClassBlock('affix');

    const target = toRef(props, 'target');
    const position = toRef(props, 'position');
    const offset = toRef(props, 'offset');
    const zIndex = toRef(props, 'zIndex');
    const {
      contentRef,
      contentStyle,
      isAffixed,
      placeholderRef,
      placeholderStyle,
      updatePosition,
    } = useAffixPosition({ target, position, offset, zIndex });

    expose({
      updatePosition,
    });

    return () => (
      <Fragment>
        {isAffixed.value && (
          <div ref={placeholderRef} aria-hidden="true" style={placeholderStyle.value} />
        )}
        <div ref={contentRef} class={classHelper.block} {...attrs} style={contentStyle.value}>
          {slots.default?.()}
        </div>
      </Fragment>
    );
  },
});
