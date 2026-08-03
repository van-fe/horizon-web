import { computed, defineComponent, onMounted, toRefs, ref, watch } from 'vue';
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
    const {
      time: timeProp,
      endTime: endTimeProp,
      forward: forwardProp,
      calculative: calculativeProp,
    } = toRefs(props);
    const classHelper = new ComponentClassBlock('time');
    let setTimeoutId: null | number = null;
    let currentTimestamp: number = Date.now();
    const resultDateObj = ref<{ dd?: number; hh?: number; mm?: number; ss: number }>({ ss: 0 });
    const initTimestamp = ref(0);
    const duration = computed(() => {
      const time = String(+timeProp.value).length >= 13 ? +timeProp.value : +timeProp.value * 1000;
      const endTime =
        String(+endTimeProp.value).length >= 13 ? +endTimeProp.value : +endTimeProp.value * 1000;
      let gapTime = endTimeProp.value ? endTime - Date.now() : time;
      if (calculativeProp.value && time && endTime) {
        gapTime = Math.abs(endTime - time);
      }
      return Math.round(+gapTime / 1000);
    });
    const handleDurationFormatter = (time: number) => {
      if (!time) return { ss: 0 };
      let t = time;
      const ss = t % 60;
      t = (t - ss) / 60;
      if (t < 1) return { ss };
      const mm = t % 60;
      t = (t - mm) / 60;
      if (t < 1) return { mm, ss };
      const hh = t % 24;
      t = (t - hh) / 24;
      if (t < 1) return { hh, mm, ss };
      const dd = t;
      return { dd, hh, mm, ss };
    };
    const handleGetTime = (duration: number) => {
      setTimeoutId && window.clearTimeout(setTimeoutId);
      if (duration < 0) {
        emit('finished');
        return;
      }
      if (forwardProp.value) {
        if (initTimestamp.value < 0) {
          resultDateObj.value = { ss: 0 };
        } else {
          resultDateObj.value = handleDurationFormatter(initTimestamp.value);
        }
      } else {
        resultDateObj.value = handleDurationFormatter(duration);
      }
      setTimeoutId = window.setTimeout(() => {
        const nowTimestamp = Date.now();
        const diffTime = Math.floor((nowTimestamp - currentTimestamp) / 1000);
        currentTimestamp = nowTimestamp;
        duration > 0 && (initTimestamp.value += diffTime);
        handleGetTime(duration - diffTime);
      }, 1000);
    };
    const handleCountDown = () => {
      if (calculativeProp.value && timeProp.value && endTimeProp.value) {
        resultDateObj.value = handleDurationFormatter(duration.value);
      } else {
        currentTimestamp = Date.now();
        handleGetTime(duration.value);
      }
    };
    watch(
      () => duration.value,
      () => handleCountDown(),
    );
    onMounted(() => {
      handleCountDown();
    });
    return () => (
      <div class={`${classHelper.block}`}>
        {slots?.default?.(resultDateObj.value) ??
          `00${resultDateObj.value?.hh ?? '00'}`.slice(-2) +
            ':' +
            `00${resultDateObj.value?.mm ?? '00'}`.slice(-2) +
            ':' +
            `00${resultDateObj.value.ss ?? '00'}`.slice(-2)}
      </div>
    );
  },
});
