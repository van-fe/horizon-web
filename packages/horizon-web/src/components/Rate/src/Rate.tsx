import type { ComputedRef } from 'vue';
import { computed, defineComponent, inject, nextTick, ref, toRefs } from 'vue';
import { useRateProps } from './composables/useProps';
import type { RateEmits } from './composables/useEmits';
import type { LegoSetupContext } from '@aurora/shared';
import { useRateEmits } from './composables/useEmits';
import { ComponentClassBlock, useNamespace } from '@aurora/shared';
import { NIcon } from '@aurora/icon';
import { GlobalSizeInjectedKey } from '~/components/Application/src/utils/injectedKeys';
import type { NApplicationSizeType } from '~/components/Application/src/composables/useProps';
import {
  NFormDisabledInjectedKey,
  NFormItemTriggerInjectedKey,
} from '~/components/Form/src/utils/injectedKeys';
import type { RateSlots } from './composables/useSlots';
import { useRateSlots } from './composables/useSlots';

type RateStatus = 'full' | 'half' | 'void';

type RateListItem = {
  value: number;
  status: RateStatus;
};
function getRateStatus(value: number, index: number): RateListItem {
  if (value >= index) {
    return { status: 'full', value: 1 };
  } else if (value < index && value + 0.5 === index) {
    return { status: 'half', value: 0.5 };
  }
  return { status: 'void', value: 0 };
}

export default defineComponent({
  name: `${useNamespace()}Rate`,
  desc: '用于评分操作',
  components: {
    NIcon,
  },
  props: useRateProps,
  emits: useRateEmits,
  slots: useRateSlots,
  setup(props, { emit, slots }: LegoSetupContext<RateEmits, RateSlots>) {
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

    // global size
    const globalSize = inject(GlobalSizeInjectedKey, ref('medium'));
    const sizeRef = computed(() => props.size || globalSize.value) as ComputedRef<
      NApplicationSizeType | number
    >;

    /** formItemTrigger **/
    const formItemTrigger = inject(NFormItemTriggerInjectedKey, undefined);

    // form disabled inject
    const formDisabled = inject(NFormDisabledInjectedKey, undefined);
    const isDisabled = computed(() => formDisabled?.value || disabledRef.value);

    const tooltipText = computed<any[]>(() => {
      if (shouldShowCustomTooltip.value) {
        return tooltipRef.value;
      }
      return Array(+countRef.value)
        .fill(0)
        .map((_, index) => {
          return index + 1;
        });
    });

    const shouldShowCustomTooltip = computed<Boolean>(() => {
      return (
        JSON.stringify(tooltipRef.value.length) !== '[]' &&
        tooltipRef.value?.length === countRef.value
      );
    });
    const iconList = computed(() => {
      return Array(+countRef.value)
        .fill({})
        .map((_, index) => {
          return getRateStatus(modelValueRef.value, index + 1);
        });
    });
    const renderIcons = (item: RateListItem, index: number) => {
      let trueScore = index + 1;
      const isFull: Boolean = item.status === 'full';
      const isHalf: Boolean = item.status === 'half';
      const sizeNumber: number =
        typeof sizeRef.value === 'number' ? sizeRef.value : iconSizeMap[sizeRef.value];
      const style = {
        width: sizeNumber,
        height: sizeNumber,
        marginRight: `${gutterRef.value}px`,
      };
      const shouldIconHalf = (event: any) => {
        const centerLine = iconSizeMap.hasOwnProperty(sizeRef.value)
          ? iconSizeMap[sizeRef.value as keyof typeof iconSizeMap] / 2
          : parseInt(`${sizeRef.value}`, 10) / 2;

        return event.offsetX < centerLine;
      };
      const onChange = (event: any) => {
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

      const getSize: any = iconSizeMap.hasOwnProperty(sizeRef.value)
        ? iconSizeMap[sizeRef.value as keyof typeof iconSizeMap]
        : sizeRef.value;

      const getClass: Array<any> = [
        classHelper.e('icon'),
        isFull ? classHelper.m('full') : classHelper.m('void'),
      ];
      const getHalfStyle: Object = {
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
          {slots.default?.()}
          {isHalf && (
            <span
              style={{
                ...getHalfStyle,
                color: colorRef.value,
              }}
            >
              {slots.default?.()}
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
          <NIcon name={iconRef.value} size={getSize} color={getColor} />
          {isHalf && (
            <NIcon
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

    return () => (
      <div
        class={[
          classHelper.block,
          classHelper.m('enabled', !readonlyRef.value && !isDisabled.value),
          classHelper.m('disabled', isDisabled.value),
        ]}
        tabindex={0}
        onBlur={onBlur}
      >
        {iconList.value.map((item: RateListItem, index: number) => {
          return renderIcons(item, index);
        })}
        {showTooltipRef.value && (
          <span class={classHelper.e('tooltip')}>
            {shouldShowCustomTooltip.value
              ? tooltipText.value[parseInt(`${modelValueRef.value}`, 10) - 1]
              : modelValueRef.value}
          </span>
        )}
      </div>
    );
  },
});
