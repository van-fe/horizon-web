import { computed, defineComponent, h, inject, ref } from 'vue';
import { cls, ComponentClassBlock, useNamespace } from '@aurora/shared';
import type { LegoSetupContext } from '@aurora/shared';
import type { ControlProps } from './composables/useProps';
import { useControlProps } from './composables/useProps';
import { useControlEmits } from './composables/useEmits';
import { useControlSlots } from './composables/useSlots';
import type { ControlEmits } from './composables/useEmits';
import type { ControlSlots } from './composables/useSlots';
import NTooltip from '~/components/Tooltip/src/Tooltip';
import { NControlsEmitInjectKey, NControlsPropsInjectKey } from './utils/injectKeys';

export default defineComponent({
  name: `${useNamespace()}Control`,
  components: {
    NTooltip,
  },
  props: useControlProps,
  emits: useControlEmits,
  slots: useControlSlots,
  setup(props: ControlProps, { slots }: LegoSetupContext<ControlEmits, ControlSlots>) {
    const classHelper = new ComponentClassBlock('control');
    const index = ref(-1);

    const parentProps = inject(NControlsPropsInjectKey)!;
    const parentEmits = inject(NControlsEmitInjectKey)!;

    const isDisabled = computed(() => parentProps.disabled || props.disabled);

    function onClick(evt: MouseEvent) {
      if (!isDisabled.value) {
        parentEmits('command', props.label, evt);
      }
    }

    return () => (
      <NTooltip disabled={!parentProps.useTooltip}>
        {{
          content: () => slots.text?.() ?? props.text,
          default: () => (
            <div
              class={cls(
                classHelper.block,
                classHelper.is('disabled', isDisabled.value),
                classHelper.is('custom-color', !!(props.iconColor || parentProps.iconColor)),
              )}
              data-index={index.value}
              onClick={onClick}
            >
              {h(props.icon!, {
                color: props.iconColor || parentProps.iconColor,
              })}
            </div>
          ),
        }}
      </NTooltip>
    );
  },
});
