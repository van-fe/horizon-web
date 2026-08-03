import { defineComponent, toRefs, ref, watch, computed } from 'vue';
import { useFormatNumber } from './composables/useTools';
import { useCountProps } from './composables/useProps';
import { useCountEmits } from './composables/useEmits';
import type { CountEmits } from './composables/useEmits';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import type { CountSlots } from './composables/useSlots';
import { useCountSlots } from './composables/useSlots';

export default defineComponent({
  name: `${useNamespace()}Count`,
  desc: '用于计数，并且可以提供格式化显示数字的能力',
  descLocales: { en: 'Displays a count with optional number formatting.' },
  props: useCountProps,
  emits: useCountEmits,
  slots: useCountSlots,
  setup(props, { slots, emit }: HorizonWebSetupContext<CountEmits, CountSlots>) {
    const {
      prefix: prefixProp,
      suffix: suffixProp,
      separator: separatorProp,
      startValue: startValueProp,
      extent: extentProp,
      endValue: endValueProp,
      decimal: decimalProp,
      delay: delayProp,
      step: stepProp,
      autoPlay: autoPlayProp,
    } = toRefs(props);
    const classHelper = new ComponentClassBlock('count');
    const count = ref(startValueProp.value);
    let setTimeoutId: null | number = null;
    const countContent = computed(() =>
      useFormatNumber(count.value, separatorProp.value, extentProp.value, decimalProp.value),
    );
    const handleChangeCount = () => {
      count.value += 10 ** stepProp.value;
    };
    const handleLoopCount = (callback: any, delay: number) => {
      setTimeoutId = window.setTimeout(() => {
        setTimeoutId && clearTimeout(setTimeoutId);
        setTimeoutId = null;
        callback();
        return handleLoopCount(callback, delay);
      }, delay);
    };
    watch(
      () => autoPlayProp.value,
      val => {
        if (val) {
          count.value < (endValueProp.value as number) &&
            handleLoopCount(handleChangeCount, delayProp.value);
        } else {
          count.value = endValueProp.value as number;
        }
      },
      {
        immediate: true,
      },
    );
    watch(
      () => count.value,
      val => {
        emit('change', val);
        if (val >= (endValueProp.value as number) && setTimeoutId) {
          clearTimeout(setTimeoutId);
          setTimeoutId = null;
        }
      },
      {
        immediate: true,
      },
    );
    return () => (
      <div class={`${classHelper.block}`}>
        {slots?.prefix?.() ?? prefixProp.value}
        <div class={`${classHelper.e('content')}`}>{countContent.value}</div>
        {slots?.suffix?.() ?? suffixProp.value}
      </div>
    );
  },
});
