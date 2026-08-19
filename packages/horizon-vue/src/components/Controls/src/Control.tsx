import { computed, defineComponent, h, inject, ref } from 'vue';
import { cls, ComponentClassBlock, useNamespace } from '@aurora/utils';
import type { HorizonWebSetupContext } from '@aurora/utils';
import type { ControlProps } from './composables/useProps';
import { useControlProps } from './composables/useProps';
import { useControlEmits } from './composables/useEmits';
import { useControlSlots } from './composables/useSlots';
import type { ControlEmits } from './composables/useEmits';
import type { ControlSlots } from './composables/useSlots';
import HTooltip from '~/components/Tooltip/src/Tooltip';
import { HControlsEmitInjectKey, HControlsPropsInjectKey } from './utils/injectKeys';

export default defineComponent({
  name: `${useNamespace()}Control`,
  desc: "Controls 中的单个操作项",
  descLocales: { en: "A single action item within Controls." },
  components: {
    HTooltip,
  },
  props: useControlProps,
  emits: useControlEmits,
  slots: useControlSlots,
  setup(props: ControlProps, { slots }: HorizonWebSetupContext<ControlEmits, ControlSlots>) {
    const classHelper = new ComponentClassBlock('control');
    const index = ref(-1);

    const parentProps = inject(HControlsPropsInjectKey)!;
    const parentEmits = inject(HControlsEmitInjectKey)!;

    const isDisabled = computed(() => parentProps.disabled || props.disabled);

    function onClick(evt: MouseEvent) {
      if (!isDisabled.value) {
        parentEmits('command', props.label, evt);
      }
    }

    return () => (
      <HTooltip disabled={!parentProps.useTooltip}>
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
      </HTooltip>
    );
  },
});
