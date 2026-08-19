import { formatTimeParts, resolveTimeDurationSeconds, splitTimeDuration } from '@aurora/core';
import type { TimeParts } from '@aurora/core';
import { createTimeController } from '@aurora/horizon-core';
import { defineComponent, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useTimeProps } from './composables/useProps';
import { useTimeEmits } from './composables/useEmits';
import type { TimeSlots } from './composables/useSlots';
import { useTimeSlots } from './composables/useSlots';
import type { TimeEmits } from './composables/useEmits';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';

export default defineComponent({
  name: `${useNamespace()}Time`,
  desc: '可以用来做倒计时',
  descLocales: { en: 'Displays time values and countdowns.' },
  props: useTimeProps,
  emits: useTimeEmits,
  slots: useTimeSlots,
  setup(props, { slots, emit }: HorizonWebSetupContext<TimeEmits, TimeSlots>) {
    const classHelper = new ComponentClassBlock('time');
    const initialDuration = props.forward ? 0 : resolveTimeDurationSeconds(props);
    const resultDateObj = ref<TimeParts>(splitTimeDuration(initialDuration));
    let controller: ReturnType<typeof createTimeController> | undefined;
    const start = () => {
      controller?.destroy();
      controller = createTimeController({
        duration: resolveTimeDurationSeconds(props),
        forward: props.forward,
        calculative: props.calculative,
        onChange: parts => (resultDateObj.value = parts),
        onFinished: () => emit('finished'),
      });
    };
    watch(() => [props.time, props.endTime, props.forward, props.calculative], start);
    onMounted(start);
    onBeforeUnmount(() => controller?.destroy());
    return () => (
      <div class={`${classHelper.block}`} role="timer" aria-live="off">
        {slots?.default?.(resultDateObj.value) ?? formatTimeParts(resultDateObj.value)}
      </div>
    );
  },
});
