import { defineComponent, computed } from 'vue';
import type { CSSProperties } from 'vue';
import { resolveMaskRootStyle } from '@aurora/horizon-web-core';
import { useMaskProps } from './composables/useProps';
import { useMaskEmits } from './composables/useEmits';
import type { MaskSlots } from './composables/useSlots';
import { useMaskSlots } from './composables/useSlots';
import type { MaskEmits } from './composables/useEmits';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, useNamespace } from '@aurora/utils';

export default defineComponent({
  name: `${useNamespace()}Mask`,
  desc: '提供一个遮罩，可以覆盖在任意元素上',
  descLocales: { en: 'Displays a scrim and optional action content above a surface.' },
  props: useMaskProps,
  emits: useMaskEmits,
  slots: useMaskSlots,
  setup(props, { emit, slots }: HorizonWebSetupContext<MaskEmits, MaskSlots>) {
    const classDefault = new ComponentClassBlock('mask');
    const rootStyle = computed(
      () => resolveMaskRootStyle(props.value, props.zIndex) as CSSProperties,
    );

    return () => (
      <div
        aria-hidden={!props.value || undefined}
        class={cls(
          classDefault.block,
          classDefault.m(props.type),
          classDefault.is('absolute', props.absolute),
          classDefault.is('fuzzified', props.isFuzzification),
        )}
        style={rootStyle.value}
        inert={!props.value || undefined}
      >
        {/* 蒙层 */}
        <div
          class={cls(classDefault.e('scrim'), props.scrimClass)}
          style={{
            backgroundColor: props.color,
            opacity: props.opacity,
            ...props.scrimStyle,
          }}
          onClick={() => emit('clickMask')}
        />
        {/* 蒙层内部内容 */}
        <div
          class={cls(
            classDefault.e('content'),
            classDefault.is('full-size', props.contentFullSize),
          )}
        >
          {slots.default?.()}
        </div>
      </div>
    );
  },
});
