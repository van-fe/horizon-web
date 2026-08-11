import {
  defineComponent,
  ref,
  toRefs,
  onMounted,
  computed,
  inject,
  watch,
  provide,
  nextTick,
  toRef,
} from 'vue';
import { useSliderProps } from './composables/useProps';
import type { SliderEmits } from './composables/useEmits';
import { useSliderEmits } from './composables/useEmits';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, useNamespace } from '@aurora/utils';
import {
  HFormDisabledInjectedKey,
  HFormItemTriggerInjectedKey,
} from '~/components/Form/src/utils/injectedKeys';
import { getCorrectedValue, transformValue } from './utils/valueMethods';
import SliderCursor from './components/SliderCursor';
import { HSliderGetTrackSizeInjectedKey, HSliderPropsInjectedKey } from './utils/injectedKeys';
import HInputNumber from '~/components/InputNumber/src/InputNumber';
import useSize from '~/utils/useSize';
import {
  getClosestSliderThumb,
  getSliderProgress,
  getSliderSeparatorPercents,
  getSliderValueFromPosition,
} from '@aurora/core';
import { getSliderTrackMetrics } from '@aurora/horizon-web-core';
import { useSliderSlots } from './composables/useSlots';
import type { SliderSlots } from './composables/useSlots';
import { useSliderExposes } from './composables/useExposes';
import type { SliderExposes } from './composables/useExposes';

export default defineComponent({
  name: `${useNamespace()}Slider`,
  desc: '通过拖动滑块在一个固定区间内进行选择',
  descLocales: {
    en: 'Bind a number with `v-model`. The demo keeps the business result visible while the value changes.',
  },
  components: {
    SliderCursor,
  },
  props: useSliderProps,
  emits: useSliderEmits,
  slots: useSliderSlots,
  exposes: useSliderExposes,
  setup(props, { emit, expose }: HorizonWebSetupContext<SliderEmits, SliderSlots, SliderExposes>) {
    const classHelper = new ComponentClassBlock('slider');
    const { disabled, modelValue, max, min, step, type, color, range } = toRefs(props);

    provide(HSliderPropsInjectedKey, props);

    const containerRef = ref<HTMLElement | null>(null);
    const trackRef = ref<HTMLElement | null>(null);
    const progressRef = ref<HTMLElement | null>(null);
    const firstCursorRef = ref<typeof SliderCursor | null>(null);
    const secondCursorRef = ref<typeof SliderCursor | null>(null);

    // form-item-trigger
    const formItemTrigger = inject(HFormItemTriggerInjectedKey, undefined);
    // slider use other form element
    provide(HFormItemTriggerInjectedKey, undefined);

    // form disabled inject
    const formDisabled = inject(HFormDisabledInjectedKey, undefined);
    const isDisabled = computed(() => formDisabled?.value || disabled.value);

    const firstValue = ref(0);
    const secondValue = ref(0);

    watch(
      modelValue,
      val => {
        const [first, second] = transformValue(val, props);
        if (
          [first, second].sort().join(',') !==
          [firstValue.value, secondValue.value].sort().join(',')
        ) {
          firstValue.value = getCorrectedValue(first, props, true);
          secondValue.value = getCorrectedValue(second, props, true);
        }
      },
      {
        immediate: true,
      },
    );

    function updateModelValue(val: number | [number, number]) {
      emit('update:modelValue', val);
      nextTick().then(() => {
        formItemTrigger?.('change');
      });
    }

    watch(
      [firstValue, secondValue],
      ([first, second]) => {
        if (range.value) {
          updateModelValue([Math.min(first, second), Math.max(first, second)]);
        } else {
          updateModelValue(first);
        }
      },
      {
        immediate: true,
      },
    );

    function updateValues() {
      [firstValue.value, secondValue.value] = transformValue(modelValue.value, props);
    }

    watch(range, () => {
      updateValues();
    });

    /**
     * track size
     */
    function getTrackSize() {
      return getSliderTrackMetrics(trackRef.value);
    }

    provide(HSliderGetTrackSizeInjectedKey, getTrackSize);

    watch(
      () => [props.min, props.max],
      () => {
        updateValues();
        firstCursorRef.value?.updateCursorPosition();
        secondCursorRef.value?.updateCursorPosition();
      },
    );

    /**
     * progress size
     */
    const progress = computed(() =>
      getSliderProgress(firstValue.value, secondValue.value, min.value, max.value, range.value),
    );

    // global size
    const sizeRef = useSize(toRef(props, 'size'), 'medium', {
      mini: 'small',
    });

    /**
     * separator
     */
    const separators = computed(() => getSliderSeparatorPercents(min.value, max.value, step.value));

    /**
     * events
     */
    function onClick(evt: MouseEvent) {
      if (!props.trackClickable || isDisabled.value) return;

      const { left, width } = getTrackSize();
      const value = getSliderValueFromPosition(
        evt.clientX,
        left,
        width,
        min.value,
        max.value,
        step.value,
      );
      const cursorIndex = range.value
        ? getClosestSliderThumb(value, firstValue.value, secondValue.value)
        : 0;
      (cursorIndex === 0 ? firstCursorRef : secondCursorRef).value?.updateCurrentValue(value, true);
    }

    function onFocus(evt: FocusEvent) {
      emit('focus', evt);
    }

    function onBlur(evt: FocusEvent) {
      emit('blur', evt);
      nextTick().then(() => {
        formItemTrigger?.('blur');
      });
    }

    function onInputUpdateModelValue(val: number | string | null | undefined) {
      firstValue.value = getCorrectedValue(Number(val) || 0, props, true);
    }

    onMounted(() => {
      firstCursorRef.value?.updateCursorPosition();
      secondCursorRef.value?.updateCursorPosition();
    });

    expose({ focus: () => firstCursorRef.value?.focus() });

    return () => (
      <div
        class={cls(
          classHelper.block,
          classHelper.is('disabled', isDisabled.value),
          classHelper.m(sizeRef.value),
          classHelper.m(type.value),
        )}
      >
        <div ref={containerRef} class={classHelper.e('container')} onClick={onClick}>
          <div ref={trackRef} class={classHelper.e('track')}>
            <div
              ref={progressRef}
              class={classHelper.e('progress')}
              style={{
                left: progress.value.left + '%',
                width: progress.value.width + '%',
                background: color.value,
              }}
            />
            {props.showSeparator && (
              <div class={cls(classHelper.e('separator'))}>
                {separators.value.map((left, index) => (
                  <div
                    key={index}
                    class={classHelper.em('separator', 'item')}
                    style={{ left: left + '%' }}
                  />
                ))}
              </div>
            )}
            <SliderCursor
              ref={firstCursorRef}
              modelValue={firstValue.value}
              onUpdate:modelValue={val => (firstValue.value = val)}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            {range.value && (
              <SliderCursor
                ref={secondCursorRef}
                modelValue={secondValue.value}
                onUpdate:modelValue={val => (secondValue.value = val)}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            )}
          </div>
        </div>
        {props.inputEnable && !props.range && (
          <div class={classHelper.e('input')}>
            <HInputNumber
              modelValue={firstValue.value}
              size={sizeRef.value}
              min={min.value}
              max={max.value}
              step={step.value}
              disabled={isDisabled.value}
              stepStrictly={true}
              {...props.inputProps}
              onUpdate:modelValue={onInputUpdateModelValue}
            />
          </div>
        )}
      </div>
    );
  },
});
