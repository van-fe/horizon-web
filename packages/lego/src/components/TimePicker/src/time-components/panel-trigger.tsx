import type { ComputedRef } from 'vue';
import { defineComponent, ref, toRefs, computed, inject, watch } from 'vue';
import { ComponentClassBlock, cls, slotVNodes, useNamespace } from '@nio-fe/shared';
import { NIcon } from '@nio-fe/icon';
import NInput from '~/components/Input/src/Input';
import { NDatejs } from '~/components/DatePicker/src/composables/NDatejs';
import {
  LOCALES_DEFAULT_FORMATS,
  DATE_FORMATS_DEFAULT,
} from '~/components/DatePicker/src/composables/default';
import type {
  ObjectMapType,
  ModelValueType,
} from '~/components/DatePicker/src/composables/useProps';
import { usePanelTriggerProps } from '~/components/DatePicker/src/composables/useProps';
import { GlobalSizeInjectedKey } from '~/components/Application/src/utils/injectedKeys';
import type { NApplicationSizeType } from '~/components/Application/src/composables/useProps';
import {
  NFormDisabledInjectedKey,
  NFormItemErrorInjectedKey,
} from '~/components/Form/src/utils/injectedKeys';

export default defineComponent({
  name: `${useNamespace()}PanelTrigger`,
  components: {
    NIcon,
    NInput,
  },
  props: usePanelTriggerProps,
  emits: ['focus', 'blur', 'input', 'clear', 'pick'],
  setup(props, { emit, expose }) {
    const classHelper = new ComponentClassBlock('date-picker-trigger-content');
    const NTimePicker = inject('N_TIME_PICKER') as any;
    const {
      modelValue,
      type,
      inputStyle,
      size,
      placeholder,
      startPlaceholder,
      endPlaceholder,
      format,
      valueFormat,
      clearable,
      inputReadonly,
      isRange,
      rangeSeparator,
      disabled,
      prefixIcon,
      suffixIcon,
      triggerNumber,
      originalAttrs,
      formatTriggerText,
      locale,
      legoLocale,
      isMultipleSingleTime,
    } = toRefs(NTimePicker.props);
    const { visible, inputStatus } = toRefs(props);

    // form disabled inject
    const formDisabled = inject(NFormDisabledInjectedKey, undefined);
    const isDisabled = computed(() => formDisabled?.value || disabled.value);
    const isEmphasize = computed(() => inputStyle.value === 'emphasize');
    const isNoBorder = computed(() => inputStyle.value === 'no-border');

    const InputRef = ref<typeof NInput | null>(null);
    const rangeSeparatorSlots = slotVNodes(NTimePicker.rangeSeparatorSlots);
    const prefixIconSlots = slotVNodes(NTimePicker.prefixIconSlots);
    const suffixIconSlots = slotVNodes(NTimePicker.suffixIconSlots);
    // dayjs替换后，兼容yyyy、dd -> YYYY、DD
    const parseFormat = computed(() => format.value.replace(/y/g, 'Y').replace(/d/g, 'D'));
    const formatProps = computed(() => {
      return parseFormat.value
        ? parseFormat.value
        : (locale.value?.current &&
            (LOCALES_DEFAULT_FORMATS as ObjectMapType)[locale.value?.current as string][
              type.value
            ]) ||
            DATE_FORMATS_DEFAULT;
    });
    // dayjs替换后，兼容yyyy、dd -> YYYY、DD
    const parseValueFormat = computed(() =>
      valueFormat.value.replace(/y/g, 'Y').replace(/d/g, 'D'),
    );
    const placeholderText = computed(
      () => placeholder.value || legoLocale.value?.timePicker.placeholder || 'Please select',
    );
    const startPlaceholderText = computed(
      () =>
        placeholder.value ||
        startPlaceholder.value ||
        legoLocale.value?.timePicker.placeholder ||
        'Please select',
    );
    const endPlaceholderText = computed(
      () => endPlaceholder.value || legoLocale.value?.timePicker.placeholder || 'Please select',
    );
    const showClearIcon = computed(() => {
      if (isRange.value && Array.isArray(displayValue.value)) {
        return !isDisabled.value && !NDatejs.isEmpty(displayValue.value[0]);
      }
      return !isDisabled.value && !NDatejs.isEmpty(displayValue.value);
    });
    const clearHover = ref(false);
    const isClear = ref(false);
    const userInput = ref<string | null | (string | null)[]>(null);
    // input栏展示值
    const displayValue = computed(() => {
      // 输入
      if (Array.isArray(userInput.value) || userInput.value !== null) {
        return userInput.value;
      }
      const displayText = formatDisplay(modelValue.value);
      // 自定义文案
      if (formatTriggerText.value && typeof formatTriggerText.value === 'function') {
        return formatTriggerText.value(modelValue.value, displayText);
      }
      return displayText;
    });
    const isEvenTrigger = computed(() => {
      return isRange.value && triggerNumber.value === 2;
    });
    const isShowMoreTrigger = computed(() => {
      return isEvenTrigger.value && isRange.value;
    });

    function formatDisplay(v: ModelValueType) {
      if (!v || !formatProps.value) {
        return isRange.value ? [] : v;
      }

      if ((isRange.value || isMultipleSingleTime.value) && Array.isArray(v)) {
        const evenPanelValue = (v as (Date | string | number)[]).map(item => {
          const parseValue = NDatejs.parseDayjsDate(item, parseValueFormat.value);
          return parseValue.isValid() ? parseValue.format(formatProps.value) : null;
        });

        // 多个触发器
        if (isEvenTrigger.value) {
          return evenPanelValue;
        }
        // 单个触发器
        return isMultipleSingleTime.value ? evenPanelValue.join(',') : [evenPanelValue.join(' - ')];
      }

      const parseValue = NDatejs.parseDayjsDate(v, parseValueFormat.value);

      return parseValue.isValid() ? parseValue.format(formatProps.value) : null;
    }
    function NInputSlots(position?: string | undefined) {
      const prefixSlot =
        prefixIconSlots.length > 0
          ? {
              prefix: () => prefixIconSlots,
            }
          : {};
      const show = isShowMoreTrigger.value
        ? position === 'left'
          ? false
          : showClearIcon.value
        : showClearIcon.value;
      isClear.value = show;

      const clearVisible = show && clearHover.value;
      let suffixSlot = {};
      // suffix 占位 一直存在
      if (clearable.value && !(isShowMoreTrigger.value && position === 'left')) {
        suffixSlot = {
          suffix: () => (
            <span class={cls(classHelper.e('icon-wrapper'))} onClick={onClear.bind(null, position)}>
              {clearVisible &&
                (suffixIconSlots.length > 0 ? (
                  suffixIconSlots
                ) : (
                  <NIcon class={cls(classHelper.e('icon'))} name={suffixIcon.value}></NIcon>
                ))}
            </span>
          ),
        };
      }

      return {
        ...prefixSlot,
        ...suffixSlot,
      };
    }
    function onFocus(event: Event) {
      emit('focus', event);
    }
    function onBlur(event: Event) {
      emit('blur', event);
    }
    function onHandleUserInput(value: string | null) {
      userInput.value = value;
    }
    function onHandleStartUserInput(value: string | null) {
      if (displayValue.value) {
        userInput.value = [value, (displayValue.value as string[])[1]];
      } else {
        userInput.value = [value, null];
      }
    }
    function onHandleEndUserInput(value: string | null) {
      if (displayValue.value) {
        userInput.value = [(displayValue.value as string[])[0], value];
      } else {
        userInput.value = [null, value];
      }
    }
    function onHandleInputChange() {
      if (userInput.value) {
        // 按照dayjs解析
        const parseValue = NDatejs.parseDayjsDate(userInput.value, formatProps.value);
        const c1 = !Array.isArray(parseValue) && parseValue.isValid();

        if (c1) {
          emit('pick', NDatejs.getHoursMinutesSecondsObject(parseValue));
          userInput.value = null;
        }
      }
      if (userInput.value === '') {
        emit('pick', null);
        userInput.value = null;
      }
    }
    function onHandleStartChange() {
      if (userInput.value) {
        const parseValue1 = NDatejs.parseDayjsDate(userInput.value[0], formatProps.value);
        const parseValue2 = NDatejs.parseDayjsDate(userInput.value[1], formatProps.value);
        const c1 = parseValue1.isValid();
        if (c1) {
          if (parseValue2.isValid()) {
            emit('pick', [
              NDatejs.getHoursMinutesSecondsObject(parseValue1),
              NDatejs.getHoursMinutesSecondsObject(parseValue2),
            ]);
            userInput.value = null;
          } else {
            emit('pick', [NDatejs.getHoursMinutesSecondsObject(parseValue1), null]);
            const formatParseValue = parseValue1.format(formatProps.value);
            userInput.value = [formatParseValue, null];
          }
        }
      }
    }
    function onHandleEndChange() {
      if (userInput.value) {
        const parseValue1 = NDatejs.parseDayjsDate(userInput.value[0], formatProps.value);
        const parseValue2 = NDatejs.parseDayjsDate(userInput.value[1], formatProps.value);
        const c1 = parseValue2.isValid();

        if (c1) {
          if (parseValue1.isValid()) {
            emit('pick', [
              NDatejs.getHoursMinutesSecondsObject(parseValue1),
              NDatejs.getHoursMinutesSecondsObject(parseValue2),
            ]);
            userInput.value = null;
          } else {
            emit('pick', [null, NDatejs.getHoursMinutesSecondsObject(parseValue2)]);
            const formatParseValue = parseValue2.format(formatProps.value);
            userInput.value = [null, formatParseValue];
          }
        }
      }
    }

    function onClear(position: string | undefined, event: Event) {
      // range 左侧点击无效
      if (
        (isShowMoreTrigger.value && position === 'left') ||
        !displayValue.value ||
        isDisabled.value
      ) {
        return;
      }
      event.stopPropagation();
      clearHover.value = false;
      emit('clear');
    }
    function mouseEnterHandle(event: MouseEvent) {
      event.stopPropagation();
      if (isClear.value) {
        clearHover.value = true;
      }
    }

    function mouseLeaveHandle() {
      if (isClear.value) {
        clearHover.value = false;
      }
    }

    watch(
      () => visible.value,
      val => {
        if (!val) {
          userInput.value = null;
        }
      },
    );

    expose({
      input: computed(() => InputRef.value?.input),
    });
    // global size
    const globalSize = inject(GlobalSizeInjectedKey, ref('medium'));
    const sizeRef = computed(
      () => size.value || globalSize.value,
    ) as ComputedRef<NApplicationSizeType>;

    const nFormError = inject(NFormItemErrorInjectedKey, ref(''));

    return () => (
      <div
        class={cls(
          classHelper.block,
          classHelper.is('error', !!nFormError.value || inputStatus.value === 'error'),
        )}
        onMouseenter={mouseEnterHandle}
        onMouseleave={mouseLeaveHandle}
      >
        {isRange.value ? (
          <div
            class={[
              cls([classHelper.m('range'), classHelper.m(sizeRef.value)]),
              {
                [classHelper.m('active')]: visible.value,
                [classHelper.m('disabled')]: isDisabled.value,
                [classHelper.m('emphasize')]: isEmphasize.value,
                [classHelper.m('no-border')]: isNoBorder.value,
              },
            ]}
          >
            <div
              class={[
                cls(classHelper.e('body')),
                { [classHelper.em('body', 'single')]: !isShowMoreTrigger.value },
              ]}
            >
              <NInput
                class={classHelper.e('left')}
                modelValue={(displayValue.value as (string | number)[])[0]}
                onFocus={onFocus}
                onBlur={onBlur}
                onInput={onHandleStartUserInput}
                onChange={onHandleStartChange}
                ref={InputRef}
                {...originalAttrs.value}
                inputStyle={inputStyle.value}
                size={sizeRef.value}
                placeholder={startPlaceholderText.value}
                readonly={inputReadonly.value}
                disabled={isDisabled.value}
                prefix-icon={prefixIcon.value}
                v-slots={NInputSlots('left')}
              ></NInput>
              <span v-show={isShowMoreTrigger.value} class={cls(classHelper.e('separator'))}>
                {rangeSeparatorSlots.length > 0 ? (
                  rangeSeparatorSlots
                ) : rangeSeparator.value ? (
                  rangeSeparator.value
                ) : (
                  <NIcon name="swap_right"></NIcon>
                )}
              </span>
              <NInput
                class={classHelper.e('right')}
                v-show={isShowMoreTrigger.value}
                modelValue={(displayValue.value as string[])[1]}
                onFocus={onFocus}
                onBlur={onBlur}
                onInput={onHandleEndUserInput}
                onChange={onHandleEndChange}
                inputStyle={inputStyle.value}
                size={sizeRef.value}
                placeholder={endPlaceholderText.value}
                readonly={inputReadonly.value}
                disabled={isDisabled.value}
                v-slots={NInputSlots('right')}
              ></NInput>
            </div>
          </div>
        ) : (
          <NInput
            modelValue={displayValue.value}
            onFocus={onFocus}
            onBlur={onBlur}
            onInput={onHandleUserInput}
            onChange={onHandleInputChange}
            ref={InputRef}
            {...originalAttrs.value}
            inputStyle={inputStyle.value}
            size={sizeRef.value}
            placeholder={placeholderText.value}
            readonly={inputReadonly.value}
            disabled={isDisabled.value}
            prefix-icon={prefixIcon.value}
            status={inputStatus.value}
            v-slots={NInputSlots()}
          ></NInput>
        )}
      </div>
    );
  },
});
