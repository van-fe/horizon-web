import { computed, defineComponent, inject, nextTick, ref, toRef, watch } from 'vue';
import { useInputNumberProps } from './composables/useProps';
import type { HorizonWebSetupContext } from '@aurora/utils';
import {
  ComponentClassBlock,
  cls,
  isNil,
  useNamespace,
  isDefined,
  safelyGetEventTarget,
} from '@aurora/utils';
import type { InputNumberEmits } from './composables/useEmits';
import { useInputNumberEmits } from './composables/useEmits';
import ValueHandler from './utils/setValue';
import {
  HFormDisabledInjectedKey,
  HFormItemErrorInjectedKey,
  HFormItemTriggerInjectedKey,
} from '~/components/Form/src/utils/injectedKeys';
import type { InputNumberSlots } from './composables/useSlots';
import { useInputNumberSlots } from './composables/useSlots';
import type { InputNumberExposes } from './composables/useExposes';
import { useInputNumberExposes } from './composables/useExposes';
import useSize from '~/utils/useSize';
import { Decimal } from 'decimal.js';
import useCursor from './utils/useCursor';
import { IconAdd, IconArrowDown, IconArrowUp, IconCloseFilled, IconReduce } from '@aurora/icon';
import { renderIcon } from '~/utils/useIcon';
import { formatInputForNumber, sanitizeInput } from './utils/inputHelper';
import useLocaleLang from '~/utils/useLocaleLang';

export default defineComponent({
  name: `${useNamespace()}InputNumber`,
  desc: '提供一个数字输入框，可以设置最小值、最大值和步长等，返回一个数字',
  props: useInputNumberProps,
  emits: useInputNumberEmits,
  slots: useInputNumberSlots,
  exposes: useInputNumberExposes,
  setup(
    props,
    {
      attrs,
      emit,
      slots,
      expose,
    }: HorizonWebSetupContext<InputNumberEmits, InputNumberSlots, InputNumberExposes>,
  ) {
    const classHelper = new ComponentClassBlock('input-number');

    const valueHandlerInstance = new ValueHandler(props);

    const localValue = ref<Decimal.Value | null | undefined>(null);
    const userInput = ref<number | string | null>(null);
    const beforeChangeValue = ref<Decimal.Value | null | undefined>(null);
    const inputDomRef = ref<HTMLInputElement | null>(null);
    const isFocused = ref(false);

    const displayValue = computed(() => {
      if (userInput.value !== null) {
        return userInput.value;
      }

      const currentValue = localValue.value;

      if (isNil(currentValue) || currentValue === '' || new Decimal(currentValue).isNaN())
        return '';

      if (isDefined(props.precision)) {
        const res = new Decimal(currentValue).toFixed(props.precision);
        return props.stringMode ? res : Number(res);
      }

      return currentValue.toString();
    });

    const formattedValue = computed(() =>
      props.formatter
        ? props.formatter(displayValue.value, {
            userTyping: userInput.value !== null,
            input: userInput.value !== null ? userInput.value.toString() : undefined,
          })
        : displayValue.value,
    );

    const { recordCursor, restoreCursor } = useCursor(inputDomRef, isFocused);

    watch(formattedValue, val => {
      if (props.formatter) {
        restoreCursor(val.toString());
      }
    });

    // global size
    const sizeRef = useSize(toRef(props, 'size'), 'medium');

    // form-item validate trigger
    const formItemTrigger = inject(HFormItemTriggerInjectedKey, undefined);

    // form disabled inject
    const formDisabled = inject(HFormDisabledInjectedKey, undefined);
    const isDisabled = computed(() => props.disabled ?? formDisabled?.value ?? false);

    watch(
      () => props.modelValue,
      value => {
        // do not modify beforeChangeValue value when modelValue triggered from inputNumber inside
        const verifiedValue = valueHandlerInstance.verifyValue(value);
        if (!ValueHandler.maybeNumberIsEqual(localValue.value, verifiedValue)) {
          beforeChangeValue.value = verifiedValue;
        }

        localValue.value = isNil(value) || value === '' ? value : new Decimal(value);

        !isFocused.value && setCurrentValue(value);
      },
      {
        immediate: true,
      },
    );

    watch(
      () => [props.min, props.max],
      () => {
        valueHandlerInstance.updateMinMax();
      },
      {
        immediate: true,
      },
    );

    watch(
      () => props.precision,
      () => {
        setCurrentValue(localValue.value);
      },
    );

    function dealEmitValue(value: Decimal.Value | null | undefined) {
      return isNil(value) || new Decimal(value).isNaN()
        ? null
        : props.stringMode
          ? value.toString()
          : Decimal.isDecimal(value)
            ? value.toNumber()
            : value as string | number;
    }

    function setCurrentValue(value: Decimal.Value | null | undefined) {
      const oldValue = localValue.value;
      const newValue = valueHandlerInstance.verifyValue(value) ?? null;

      if (ValueHandler.maybeNumberIsEqual(oldValue, newValue)) return newValue;

      localValue.value = null;

      emit('update:modelValue', dealEmitValue(newValue));

      localValue.value = newValue ?? null;

      handleInputNaN();

      return newValue;
    }

    const handleInput = (evt: Event) => {
      recordCursor();
      const target = safelyGetEventTarget(evt) as HTMLInputElement;
      const rawNumberValue = sanitizeInput(target.value);

      const originValue = props.parser ? props.parser(rawNumberValue) : rawNumberValue;
      userInput.value = originValue;
      const formattedNumberString = formatInputForNumber(originValue);
      const transformValue = formattedNumberString ? new Decimal(formattedNumberString) : null;

      emit('input', dealEmitValue(transformValue));

      setCurrentValue(transformValue);
    };

    const handleFocus = (e: FocusEvent) => {
      isFocused.value = true;
      emit('focus', e);
    };

    function focus() {
      inputDomRef.value?.focus();
    }

    function emitChange(value: Decimal.Value | null) {
      if (!ValueHandler.maybeNumberIsEqual(value, beforeChangeValue.value)) {
        beforeChangeValue.value = value;
        emit('change', dealEmitValue(isNil(value) ? null : new Decimal(value)));

        nextTick().then(() => {
          formItemTrigger?.('change');
        });
      }
    }

    function updateLocalValue() {
      if (localValue.value !== props.modelValue) {
        beforeChangeValue.value = localValue.value = props.modelValue;
      }
    }

    const handleBlur = (evt: FocusEvent) => {
      isFocused.value = false;

      if (inputDomRef.value) {
        const rawNumberValue = inputDomRef.value.value
          ?.replace(/[^\d.-]+/g, '')
          .replace(/^[-+](?!\d)/, '');
        const originValue = props.parser
          ? props.parser(rawNumberValue ?? '')
          : rawNumberValue;

        let value: Decimal | null =
          isNil(originValue) || originValue === '' ? null : new Decimal(originValue);

        if (value && value.isNaN()) {
          value = null;
        }

        emitChange(setCurrentValue(value));
        updateLocalValue();
      }

      userInput.value = null;

      emit('blur', evt);
      nextTick().then(() => {
        formItemTrigger?.('blur');
      });
    };

    const handleWheel = (evt: WheelEvent) => {
      if (isFocused.value) {
        evt.stopPropagation();

        if (!props.wheelToChange) {
          evt.preventDefault();
        }
      }

      emit('wheel', evt);
    };

    function handleInputNaN() {
      if (inputDomRef.value) {
        const inputElValue = Number(inputDomRef.value.value);
        if (Number.isNaN(inputElValue)) {
          inputDomRef.value.value = localValue.value as unknown as string;
        }
      }
    }

    const handleClear = () => {
      setCurrentValue(null);

      emit('clear');

      emitChange(null);

      focus();
    };

    const handleLongPress = (evt: MouseEvent, triggerType: 'down' | 'up') => {
      // evt.preventDefault();
      if (!props.enableLangPress) return;
      if (isDisabled.value || props.readonly) return;

      const target = safelyGetEventTarget(evt);

      let pressing = true;
      const timer = setTimeout(() => {
        if (triggerType === 'up') {
          const doIncrease = () => {
            if (pressing) {
              increaseValue();
              setTimeout(doIncrease, props.langPressFrequency);
            }
          };

          doIncrease();
        } else {
          const doReduce = () => {
            if (pressing) {
              decreaseValue();
              setTimeout(doReduce, props.langPressFrequency);
            }
          };

          doReduce();
        }
      }, 500);

      const handleLongPressEnd = () => {
        pressing = false;
        clearTimeout(timer);
        target?.removeEventListener('mouseup', handleLongPressEnd);
        target?.removeEventListener('mouseleave', handleLongPressEnd);
      };

      target?.addEventListener('mouseup', handleLongPressEnd);
      target?.addEventListener('mouseleave', handleLongPressEnd);
    };

    const enableReduce = computed(() =>
      isNil(props.modelValue) || props.modelValue === ''
        ? true
        : valueHandlerInstance.minRef.value.lt(
            valueHandlerInstance.verifyValue(props.modelValue) ?? 0,
          ),
    );

    const enableIncrease = computed(() =>
      isNil(props.modelValue) || props.modelValue === ''
        ? true
        : valueHandlerInstance.maxRef.value.gt(
            valueHandlerInstance.verifyValue(props.modelValue) ?? 0,
          ),
    );

    const increaseValue = () => {
      if (isDisabled.value || props.readonly || !enableIncrease.value) return;

      userInput.value = null;

      const currentValue = new Decimal(localValue.value || 0);
      localValue.value = valueHandlerInstance.verifyValue(currentValue.add(props.step));

      emit('update:modelValue', dealEmitValue(localValue.value));
      emitChange(dealEmitValue(localValue.value));
      updateLocalValue();
    };

    const decreaseValue = () => {
      if (isDisabled.value || props.readonly || !enableReduce.value) return;

      userInput.value = null;

      const currentValue = new Decimal(localValue.value || 0);
      localValue.value = valueHandlerInstance.verifyValue(currentValue.sub(props.step));

      emit('update:modelValue', dealEmitValue(localValue.value));
      emitChange(dealEmitValue(localValue.value));
      updateLocalValue();
    };

    const handleClickStep = (evt: Event) => {
      // evt.preventDefault();
      if (isDisabled.value || props.readonly) {
        return;
      }
      const target = evt.currentTarget as HTMLElement;
      const type = target?.dataset.triggerType;
      if (type === 'up') {
        increaseValue();
      } else {
        decreaseValue();
      }
    };

    const handleKeydown = (ev: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown'].includes(ev.code)) {
        ev.preventDefault();
      }

      if (props.controlsPosition === 'between') {
        if (ev.code === 'ArrowRight') {
          increaseValue();
        } else if (ev.code === 'ArrowLeft') {
          decreaseValue();
        }
      } else {
        if (ev.code === 'ArrowUp') {
          increaseValue();
        } else if (ev.code === 'ArrowDown') {
          decreaseValue();
        }
      }

      emit('keydown', ev);
    };

    const isMouseOver = ref(false);
    function handleMouseEnter() {
      if (!isDisabled.value) isMouseOver.value = true;
    }

    function handleMouseLeave() {
      isMouseOver.value = false;
    }

    const iconSize = computed(() => {
      switch (sizeRef.value) {
        case 'large':
          return 14;
        case 'small':
          return 9;
        case 'medium':
        default:
          return 12;
      }
    });

    const hasPrefix = computed(() => !!(slots?.prefix || props.prefixIcon));
    const hasSuffix = computed(() => !!(slots?.suffix || props.suffixIcon));
    const prefixWrapperExist = computed(
      () =>
        hasPrefix.value ||
        (props.controlsPosition === 'between' && props.controls && !props.readonly),
    );
    const suffixWrapperExist = computed(
      () =>
        hasSuffix.value ||
        (['between', 'right'].includes(props.controlsPosition) &&
          props.controls &&
          !props.readonly),
    );

    expose({
      inputNumber: inputDomRef,
      increase: increaseValue,
      decrease: decreaseValue,
      localValue: localValue.value,
      enableIncrease: enableIncrease.value,
      clear: handleClear,
      focus: () => inputDomRef.value?.focus(),
      blur: () => inputDomRef.value?.blur(),
    });

    const nFormError = inject(HFormItemErrorInjectedKey, ref(''));

    return () => {
      return (
        <div
          class={cls(
            classHelper.block,
            classHelper.m(sizeRef.value),
            classHelper.m(props.inputStyle),
            classHelper.is('disabled', isDisabled.value),
            classHelper.is('no-controls', !props.controls || props.readonly),
            classHelper.is('right-controls', props.controlsPosition === 'right'),
            classHelper.is('between-controls', props.controlsPosition === 'between'),
            classHelper.is('clearable', props.clearable),
            classHelper.is('error', !!nFormError.value || props.status === 'error'),
            classHelper.is('inner-active', isMouseOver.value || isFocused.value),
            classHelper.has('prefix', hasPrefix.value),
            classHelper.has('suffix', hasSuffix.value),
          )}
        >
          <div class={classHelper.e('group')}>
            {slots.prepend && (
              <div class={classHelper.em('group', 'prepend')}>{slots.prepend()}</div>
            )}
            <div
              class={cls(
                classHelper.em('group', 'inner'),
                classHelper.has('prepend', !!slots.prepend),
                classHelper.has('append', !!slots.append),
              )}
              onMouseenter={handleMouseEnter}
              onMouseleave={handleMouseLeave}
            >
              {prefixWrapperExist.value && (
                <div class={cls(classHelper.em('prefix', 'wrapper'))}>
                  {props.controlsPosition === 'between' && (
                    <div
                      class={cls(
                        classHelper.e('step-wrapper'),
                        classHelper.is('left', props.controlsPosition === 'between'),
                      )}
                    >
                      <span
                        class={cls(
                          classHelper.e('step-item'),
                          classHelper.e('step-minus'),
                          classHelper.is('disabled', !enableReduce.value),
                        )}
                        data-trigger-type="down"
                        onClick={handleClickStep}
                        onMousedown={evt => handleLongPress(evt, 'down')}
                      >
                        <IconReduce size={12} />
                      </span>
                    </div>
                  )}
                  {hasPrefix.value && (
                    <div class={cls(classHelper.e('prefix'))} onClick={focus}>
                      {renderIcon(props.prefixIcon, slots.prefix, {
                        size: iconSize.value,
                      })}
                    </div>
                  )}
                </div>
              )}

              <input
                value={formattedValue.value}
                ref={inputDomRef}
                class={classHelper.e('inner')}
                name={props.name}
                {...attrs}
                placeholder={
                  props.placeholder ??
                  useLocaleLang('inputNumber.placeholder').value as string
                }
                disabled={isDisabled.value}
                readonly={props.readonly}
                min={props.min}
                max={props.max}
                title=""
                step={props.step}
                onInput={handleInput}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onWheel={handleWheel}
                onKeydown={handleKeydown}
                onKeypress={evt => emit('keypress', evt)}
                onKeyup={evt => emit('keyup', evt)}
              />

              {props.clearable && !isNil(localValue.value) && localValue.value !== null && (
                <div class={classHelper.e('clear')} onClick={handleClear}>
                  <IconCloseFilled size={16} />
                </div>
              )}

              {suffixWrapperExist.value && (
                <div class={cls(classHelper.em('suffix', 'wrapper'))}>
                  {hasSuffix.value && (
                    <div class={cls(classHelper.e('suffix'))} onClick={focus}>
                      {renderIcon(props.suffixIcon, slots.suffix, {
                        size: iconSize.value,
                      })}
                    </div>
                  )}
                  <div class={cls(classHelper.e('step-wrapper'), classHelper.is('right'))}>
                    <span
                      class={[
                        classHelper.e('step-up'),
                        classHelper.e('step-item'),
                        classHelper.is('disabled', !enableIncrease.value),
                      ]}
                      data-trigger-type="up"
                      onClick={handleClickStep}
                      onMousedown={evt => handleLongPress(evt, 'up')}
                    >
                      {props.controlsPosition === 'between' ? (
                        <IconAdd size={12} />
                      ) : (
                        <IconArrowUp size={9} />
                      )}
                    </span>
                    {props.controlsPosition === 'right' && (
                      <span
                        class={[
                          classHelper.e('step-down'),
                          classHelper.e('step-item'),
                          classHelper.is('disabled', !enableReduce.value),
                        ]}
                        data-trigger-type="down"
                        onClick={handleClickStep}
                        onMousedown={evt => handleLongPress(evt, 'down')}
                      >
                        <IconArrowDown size={9} />
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
            {slots.append && <div class={classHelper.em('group', 'append')}>{slots.append()}</div>}
          </div>
        </div>
      );
    };
  },
});
