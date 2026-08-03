import type { CSSProperties } from 'vue';
import { computed, defineComponent, inject, nextTick, ref, watch } from 'vue';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock, cls, useNamespace } from '@aurora/utils';
import type { HApplicationSizeType } from '~/components/Application/src/composables/useProps';
import { GlobalSizeInjectedKey } from '~/components/Application/src/utils/injectedKeys';
import {
  HFormDisabledInjectedKey,
  HFormItemErrorInjectedKey,
  HFormItemTriggerInjectedKey,
} from '~/components/Form/src/utils/injectedKeys';
import type { InputOtpEmits } from './composables/useEmits';
import { useInputOtpEmits } from './composables/useEmits';
import type { InputOtpExposes } from './composables/useExposes';
import { useInputOtpExposes } from './composables/useExposes';
import { useInputOtpProps } from './composables/useProps';
import type { InputOtpSlots } from './composables/useSlots';
import { useInputOtpSlots } from './composables/useSlots';

export default defineComponent({
  name: `${useNamespace()}InputOtp`,
  desc: '支持整串粘贴和系统验证码自动填充的验证码输入框',
  descLocales: {
    en: 'Verification-code input with full-code paste and system AutoFill support.',
  },
  inheritAttrs: false,
  props: useInputOtpProps,
  emits: useInputOtpEmits,
  slots: useInputOtpSlots,
  exposes: useInputOtpExposes,
  setup(
    props,
    {
      attrs,
      emit,
      expose,
      slots,
    }: HorizonWebSetupContext<InputOtpEmits, InputOtpSlots, InputOtpExposes>,
  ) {
    const cHelper = new ComponentClassBlock('input-otp');
    const inputRef = ref<HTMLInputElement>();
    const focused = ref(false);
    const lastCompletedValue = ref('');
    const globalSize = inject(GlobalSizeInjectedKey, ref('medium'));
    const formDisabled = inject(HFormDisabledInjectedKey, undefined);
    const formError = inject(HFormItemErrorInjectedKey, undefined);
    const formItemTrigger = inject(HFormItemTriggerInjectedKey, undefined);

    const normalize = (value: unknown) => {
      const input = String(value ?? '');
      const filtered =
        props.type === 'numeric' ? input.replace(/\D/g, '') : input.replace(/[^a-z\d]/gi, '');
      return filtered.slice(0, props.length);
    };

    const localValue = ref(normalize(props.modelValue));
    const size = computed(
      () => (props.size || globalSize.value || 'medium') as HApplicationSizeType,
    );
    const isDisabled = computed(() => Boolean(formDisabled?.value || props.disabled));
    const isError = computed(() => Boolean(formError?.value || props.status === 'error'));
    const activeIndex = computed(() => Math.min(localValue.value.length, props.length - 1));

    watch(
      () => [props.modelValue, props.length, props.type] as const,
      () => {
        localValue.value = normalize(props.modelValue);
        if (localValue.value.length < props.length) lastCompletedValue.value = '';
      },
    );

    const emitComplete = (value: string) => {
      if (value.length === props.length && value !== lastCompletedValue.value) {
        lastCompletedValue.value = value;
        emit('complete', value);
      } else if (value.length < props.length) {
        lastCompletedValue.value = '';
      }
    };

    const updateValue = (rawValue: string, evt?: Event) => {
      const value = normalize(rawValue);
      localValue.value = value;
      if (inputRef.value && inputRef.value.value !== value) inputRef.value.value = value;
      emit('update:modelValue', value);
      if (evt) emit('input', value, evt);
      emitComplete(value);
      nextTick(() => formItemTrigger?.('change'));
      return value;
    };

    const handleInput = (evt: Event) => {
      updateValue((evt.target as HTMLInputElement).value, evt);
    };

    const handlePaste = (evt: ClipboardEvent) => {
      if (props.readonly || isDisabled.value) return;
      const pastedText = evt.clipboardData?.getData('text');
      if (pastedText === undefined) return;

      evt.preventDefault();
      const input = inputRef.value;
      const start = input?.selectionStart ?? localValue.value.length;
      const end = input?.selectionEnd ?? start;
      const pastedValue = normalize(pastedText);
      const nextValue = `${localValue.value.slice(0, start)}${pastedValue}${localValue.value.slice(end)}`;
      const value = updateValue(nextValue, evt);
      emit('paste', pastedValue, evt);
      nextTick(() => input?.setSelectionRange(value.length, value.length));
    };

    const handleFocus = (evt: FocusEvent) => {
      focused.value = true;
      emit('focus', evt);
    };

    const handleBlur = (evt: FocusEvent) => {
      focused.value = false;
      emit('blur', evt);
      nextTick(() => formItemTrigger?.('blur'));
    };

    const focus = () => inputRef.value?.focus();
    const blur = () => inputRef.value?.blur();
    const select = () => inputRef.value?.select();
    const clear = () => updateValue('');

    expose({ input: inputRef, focus, blur, select, clear });

    return () => {
      const { class: customClass, style: customStyle, ...inputAttrs } = attrs;

      return (
        <div
          class={[
            cls(
              cHelper.block,
              cHelper.m(size.value),
              cHelper.is('focused', focused.value),
              cHelper.is('disabled', isDisabled.value),
              cHelper.is('readonly', props.readonly),
              cHelper.is('error', isError.value),
            ),
            customClass,
          ]}
          style={customStyle as CSSProperties}
        >
          <div class={cHelper.e('cells')} aria-hidden="true">
            {Array.from({ length: props.length }, (_, index) => {
              const rawCharacter = localValue.value[index] || '';
              const character = props.mask && rawCharacter ? '•' : rawCharacter;
              const active = focused.value && index === activeIndex.value;

              return (
                <span
                  key={index}
                  class={cls(
                    cHelper.e('cell'),
                    cHelper.em('cell', 'filled', Boolean(rawCharacter)),
                    cHelper.em('cell', 'active', active),
                  )}
                >
                  {slots.character?.({
                    character,
                    index,
                    filled: Boolean(rawCharacter),
                    active,
                  }) ?? character}
                </span>
              );
            })}
          </div>
          <input
            {...inputAttrs}
            ref={inputRef}
            class={cHelper.e('native')}
            type="text"
            value={localValue.value}
            maxlength={props.length}
            inputmode={props.type === 'numeric' ? 'numeric' : 'text'}
            pattern={props.type === 'numeric' ? '[0-9]*' : undefined}
            autocomplete={props.autocomplete}
            disabled={isDisabled.value}
            readonly={props.readonly}
            onInput={handleInput}
            onPaste={handlePaste}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={() => emit('change', localValue.value)}
          />
        </div>
      );
    };
  },
});
