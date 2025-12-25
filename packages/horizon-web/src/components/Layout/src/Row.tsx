import type { ComputedRef, InjectionKey } from 'vue';
import { computed, defineComponent, provide, ref } from 'vue';
import { useRowProps } from './composables/useProps';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import { useEventListener } from '@vueuse/core';
import type { RowSlots } from './composables/useSlots';
import { useRowSlots } from './composables/useSlots';

export type RowProvide = {
  vspace: ComputedRef<number | undefined>;
  hspace: ComputedRef<number | undefined>;
};

export const ROW_KEY: InjectionKey<RowProvide> = Symbol(`HorizonWeb-row`);

export default defineComponent({
  name: `${useNamespace()}Row`,
  desc: 'Layout 提供了 n-row 和 n-col 两个组件来进行行列布局，在不同分辨率下有所区别',
  props: useRowProps,
  slots: useRowSlots,
  setup(props, { slots }: HorizonWebSetupContext<{}, RowSlots>) {
    const classHelper = new ComponentClassBlock('row');

    const innerWidth = ref(window.innerWidth);

    useEventListener(window, 'resize', () => {
      innerWidth.value = window.innerWidth;
    });

    // const defaultGutter = computed(() => {
    //   if (innerWidth.value < 480) {
    //     return 4;
    //   } else if (innerWidth.value < 1440) {
    //     return 16;
    //   } else if (innerWidth.value < 2880) {
    //     return 24;
    //   } else {
    //     return 48;
    //   }
    // });

    const vspace = computed(() => props.vspace ?? props.gutter);
    const hspace = computed(() => props.hspace ?? props.gutter);

    provide(ROW_KEY, { vspace, hspace });

    const style = computed(() => {
      const ret = {
        marginLeft: '',
        marginRight: '',
        gap: '',
        marginBottom: '',
      };
      if (hspace.value !== undefined) {
        ret.marginLeft = `-${hspace.value / 2}px`;
        ret.marginRight = ret.marginLeft;
        // ret.gap = `${hspace.value}px 0px`;
      }
      if (vspace.value !== undefined) {
        ret.marginBottom = `${vspace.value}px`;
        ret.gap = `${vspace.value}px 0px`;
      }
      return ret;
    });

    // eslint-disable-next-line vue/no-setup-props-destructure
    const tag = props.tag;

    return () => (
      <tag
        class={[
          `${classHelper.block}`,
          props.justify ? `is-justify-${props.justify}` : '',
          props.align ? `is-align-${props.align}` : '',
        ]}
        style={style.value}
      >
        {slots?.default?.()}
      </tag>
    );
  },
});
