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
  NFormDisabledInjectedKey,
  NFormItemTriggerInjectedKey,
} from '~/components/Form/src/utils/injectedKeys';
import { getCorrectedValue, transformValue } from './utils/valueMethods';
import SliderCursor from './components/SliderCursor';
import { NSliderGetTrackSizeInjectedKey, NSliderPropsInjectedKey } from './utils/injectedKeys';
import NInputNumber from '~/components/InputNumber/src/InputNumber';
import useSize from '~/utils/useSize';

export default defineComponent({
  name: `${useNamespace()}Slider`,
  desc: '通过拖动滑块在一个固定区间内进行选择',
  components: {
    SliderCursor,
  },
  props: useSliderProps,
  emits: useSliderEmits,
  setup(props, { emit }: HorizonWebSetupContext<SliderEmits>) {
    const classHelper = new ComponentClassBlock('slider');
    const { disabled, modelValue, max, min, step, type, color, range } = toRefs(props);

    provide(NSliderPropsInjectedKey, props);

    const containerRef = ref<HTMLElement | null>(null);
    const trackRef = ref<HTMLElement | null>(null);
    const progressRef = ref<HTMLElement | null>(null);
    const firstCursorRef = ref<typeof SliderCursor | null>(null);
    const secondCursorRef = ref<typeof SliderCursor | null>(null);

    // form-item-trigger
    const formItemTrigger = inject(NFormItemTriggerInjectedKey, undefined);
    // slider use other form element
    provide(NFormItemTriggerInjectedKey, undefined);

    // form disabled inject
    const formDisabled = inject(NFormDisabledInjectedKey, undefined);
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
      ([first, second], [oldFirst, oldSecond]) => {
        if (range.value) {
          if (first !== oldFirst || second !== oldSecond) {
            updateModelValue([Math.min(first, second), Math.max(first, second)]);
          }
        } else {
          if (first !== oldFirst) {
            updateModelValue(first);
          }
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
      return {
        width: trackRef.value?.getBoundingClientRect().width || 0,
        left: trackRef.value?.getBoundingClientRect().left || 0,
      };
    }

    provide(NSliderGetTrackSizeInjectedKey, getTrackSize);

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
    const progressWidth = computed(() => {
      if (!range.value) {
        return ((firstValue.value - min.value) / (max.value - min.value)) * 100;
      } else {
        return (
          ((Math.abs(firstValue.value - secondValue.value) - min.value) / (max.value - min.value)) *
          100
        );
      }
    });

    const progressLeft = computed(() => {
      if (!range.value) {
        return 0;
      } else {
        return (
          ((Math.min(firstValue.value, secondValue.value) - min.value) / (max.value - min.value)) *
          100
        );
      }
    });

    // global size
    const sizeRef = useSize(toRef(props, 'size'), 'medium', {
      mini: 'small',
    });

    /**
     * separator
     */
    const separatorAmount = computed(() => Math.ceil((max.value - min.value) / step.value) - 1);

    /**
     * events
     */
    function onClick(evt: MouseEvent) {
      if (!props.trackClickable || props.disabled === true) return;

      const { left, width } = getTrackSize();

      const value = ((evt.clientX - left) / width) * (max.value - min.value) + min.value;

      if (range.value) {
        if (Math.abs(value - firstValue.value) > Math.abs(value - secondValue.value)) {
          secondCursorRef.value?.updateCurrentValue(value, true);
          return;
        }
      }

      firstCursorRef.value?.updateCurrentValue(value, true);
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
                left: progressLeft.value + '%',
                width: progressWidth.value + '%',
                background: color.value,
              }}
            />
            {props.showSeparator && (
              <div class={cls(classHelper.e('separator'))}>
                {new Array(separatorAmount.value).fill(0).map((_, index) => (
                  <div
                    class={classHelper.em('separator', 'item')}
                    style={{
                      left: (((index + 1) * step.value) / (max.value - min.value)) * 100 + '%',
                    }}
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
            <NInputNumber
              modelValue={firstValue.value}
              size={sizeRef.value}
              min={min.value}
              max={max.value}
              step={step.value}
              disabled={props.disabled}
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
