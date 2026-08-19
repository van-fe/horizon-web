import type { ComputedRef, CSSProperties } from 'vue';
import { computed, defineComponent, inject, nextTick, ref, toRefs } from 'vue';
import type { RateItemStatus } from '@aurora/core';
import {
  getRateItemStatus,
  getRateKeyboardValue,
  normalizeRateValue,
  resolveRateTooltip,
} from '@aurora/core';
import { useRateProps } from './composables/useProps';
import type { RateEmits } from './composables/useEmits';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { useRateEmits } from './composables/useEmits';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import { AIcon } from '@aurora/icon';
import { GlobalSizeInjectedKey } from '~/components/Application/src/utils/injectedKeys';
import type { HApplicationSizeType } from '~/components/Application/src/composables/useProps';
import {
  HFormDisabledInjectedKey,
  HFormItemTriggerInjectedKey,
} from '~/components/Form/src/utils/injectedKeys';
import type { RateSlots } from './composables/useSlots';
import { useRateSlots } from './composables/useSlots';
import type { RateExposes } from './composables/useExposes';
import { useRateExposes } from './composables/useExposes';

export default defineComponent({
  name: `${useNamespace()}Rate`,
  desc: '用于评分操作',
  descLocales: { en: 'Use `v-model` to bind the current rating value.' },
  components: {
    AIcon,
  },
  props: useRateProps,
  emits: useRateEmits,
  slots: useRateSlots,
  exposes: useRateExposes,
  setup(props, { emit, slots, expose }: HorizonWebSetupContext<RateEmits, RateSlots, RateExposes>) {
    const classHelper = new ComponentClassBlock('rate');
    const iconSizeMap = {
      small: 12,
      medium: 16,
      large: 20,
    };

    const {
      count: countRef,
      showTooltip: showTooltipRef,
      tooltip: tooltipRef,
      disabled: disabledRef,
      readonly: readonlyRef,
      icon: iconRef,
      color: colorRef,
      voidColor: voidColorRef,
      disabledColor: disabledColorRef,
      modelValue: modelValueRef,
      gutter: gutterRef,
      half: halfRef,
    } = toRefs(props);
    const rootRef = ref<HTMLElement>();

    // global size
    const globalSize = inject(GlobalSizeInjectedKey, ref('medium'));
    const sizeRef = computed(() => props.size || globalSize.value) as ComputedRef<
      HApplicationSizeType | number
    >;

    /** formItemTrigger **/
    const formItemTrigger = inject(HFormItemTriggerInjectedKey, undefined);

    // form disabled inject
    const formDisabled = inject(HFormDisabledInjectedKey, undefined);
    const isDisabled = computed(() => formDisabled?.value || disabledRef.value);
    const currentValue = computed(() =>
      normalizeRateValue(modelValueRef.value, countRef.value, halfRef.value),
    );

    const iconList = computed(() => {
      return Array(+countRef.value)
        .fill(undefined)
        .map((_, index) => getRateItemStatus(currentValue.value, index + 1));
    });
    const renderIcons = (status: RateItemStatus, index: number) => {
      let trueScore = index + 1;
      const isFull = status === 'full';
      const isHalf = status === 'half';
      const sizeNumber: number =
        typeof sizeRef.value === 'number' ? sizeRef.value : iconSizeMap[sizeRef.value];
      const style = {
        width: sizeNumber,
        height: sizeNumber,
        marginRight: `${gutterRef.value}px`,
      };
      const shouldIconHalf = (event: MouseEvent) => {
        const centerLine = Object.hasOwn(iconSizeMap, sizeRef.value)
          ? iconSizeMap[sizeRef.value as keyof typeof iconSizeMap] / 2
          : parseInt(`${sizeRef.value}`, 10) / 2;

        return event.offsetX < centerLine;
      };
      const onChange = (event: MouseEvent) => {
        const shouldHalf = halfRef.value ? shouldIconHalf(event) : false;
        if (isDisabled.value || readonlyRef.value) {
          return;
        }
        if (shouldHalf) {
          trueScore -= 0.5;
        }
        emit('update:modelValue', trueScore);
        emit('change', trueScore);
        nextTick().then(() => {
          formItemTrigger?.('change');
        });
      };

      const getColor: string = isFull
        ? isDisabled.value
          ? disabledColorRef.value
          : colorRef.value
        : voidColorRef.value;

      const getSize = Object.hasOwn(iconSizeMap, sizeRef.value)
        ? iconSizeMap[sizeRef.value as keyof typeof iconSizeMap]
        : sizeRef.value;

      const getClass = [
        classHelper.e('icon'),
        isFull ? classHelper.m('full') : classHelper.m('void'),
      ];
      const getHalfStyle: CSSProperties = {
        position: 'absolute',
        overflow: 'hidden',
        top: 0,
        left: 0,
        width: '50%',
      };

      return slots.default ? (
        <span
          style={{
            fontSize: `${getSize}px`,
            color: getColor,
            ...style,
          }}
          class={getClass}
          onClick={onChange}
        >
          {slots.default?.({ index, status, value: currentValue.value })}
          {isHalf && (
            <span
              style={{
                ...getHalfStyle,
                color: colorRef.value,
              }}
            >
              {slots.default?.({ index, status, value: currentValue.value })}
            </span>
          )}
        </span>
      ) : (
        <span
          style={{
            fontSize: `${getSize}px`,
            color: getColor,
            ...style,
          }}
          class={getClass}
          onClick={onChange}
        >
          <AIcon name={iconRef.value} size={getSize} color={getColor} />
          {isHalf && (
            <AIcon
              style={{
                ...getHalfStyle,
              }}
              class={classHelper.m('half')}
              name={iconRef.value}
              size={getSize}
              color={colorRef.value}
            />
          )}
        </span>
      );
    };

    function onBlur(evt: FocusEvent) {
      emit('blur', evt);
      nextTick().then(() => {
        formItemTrigger?.('blur');
      });
    }

    function onKeydown(evt: KeyboardEvent) {
      if (readonlyRef.value || isDisabled.value) return;
      const value = getRateKeyboardValue(
        currentValue.value,
        evt.key,
        countRef.value,
        halfRef.value,
      );
      if (value === undefined) return;
      evt.preventDefault();
      emit('update:modelValue', value);
      emit('change', value);
      nextTick().then(() => formItemTrigger?.('change'));
    }

    expose({ focus: () => rootRef.value?.focus() });

    return () => (
      <div
        ref={rootRef}
        class={[
          classHelper.block,
          classHelper.m('enabled', !readonlyRef.value && !isDisabled.value),
          classHelper.m('disabled', isDisabled.value),
        ]}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={countRef.value}
        aria-valuenow={currentValue.value}
        aria-disabled={isDisabled.value}
        aria-readonly={readonlyRef.value}
        tabindex={isDisabled.value ? -1 : 0}
        onKeydown={onKeydown}
        onBlur={onBlur}
      >
        {iconList.value.map((status, index) => {
          return renderIcons(status, index);
        })}
        {showTooltipRef.value && (
          <span class={classHelper.e('tooltip')}>
            {resolveRateTooltip(currentValue.value, countRef.value, tooltipRef.value)}
          </span>
        )}
      </div>
    );
  },
});
