import { computed, defineComponent, inject, ref } from 'vue';
import type { ComputedRef, CSSProperties } from 'vue';
import { useEmptyProps } from './composables/useProps';
import type { EmptySlots } from './composables/useSlots';
import { useEmptySlots } from './composables/useSlots';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock, cls, useNamespace } from '@aurora/utils';
import { GlobalSizeInjectedKey } from '~/components/Application/src/utils/injectedKeys';
import type { HApplicationSizeType } from '~/components/Application/src/composables/useProps';
import { PRESENTED_IMAGES } from './utils/presentedImages';

export default defineComponent({
  name: `${useNamespace()}Empty`,
  desc: '空状态时的占位提示，并提供多场景可供使用',
  descLocales: { en: "Default empty placeholder effect." },
  props: useEmptyProps,
  slots: useEmptySlots,
  setup(props, { slots }: HorizonWebSetupContext<{}, EmptySlots>) {
    const classHelper = new ComponentClassBlock('empty');

    // size, support global size
    const globalSize = inject(GlobalSizeInjectedKey, ref('medium'));
    const sizeRef = computed(() =>
      typeof props.size === 'number' ? '' : props.size || globalSize.value,
    ) as ComputedRef<HApplicationSizeType>;

    // size style
    const sizeStyleRef = computed(() => {
      const sizeStyle = {} as CSSProperties;
      if (typeof props.size === 'number') {
        sizeStyle.width = `${props.size}px`;
      }
      return sizeStyle;
    });

    return () => (
      <div class={cls(classHelper.block, classHelper.m(sizeRef.value))}>
        <div class={`${classHelper.e('image')}`} style={sizeStyleRef.value}>
          {slots.image ? (
            slots.image()
          ) : (
            <img src={props.image || PRESENTED_IMAGES.EMPTY_DEFAULT} />
          )}
        </div>
        {(props.description || slots.description) && (
          <div class={`${classHelper.e('description')}`}>
            {props.description ? props.description : slots.description?.()}
          </div>
        )}
        {slots.default && <div class={`${classHelper.e('bottom')}`}>{slots.default?.()}</div>}
      </div>
    );
  },
});
