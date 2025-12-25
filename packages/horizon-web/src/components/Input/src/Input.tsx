import type { VNode } from 'vue';
import { computed, defineComponent, inject, nextTick, ref, toRefs, watch } from 'vue';
import type { InputProps } from './composables/useProps';
import { useInputProps } from './composables/useProps';
import type { HorizonWebSetupContext } from '@aurora/utils';
import {
  pickFromObject,
  ComponentClassBlock,
  cls,
  isDefined,
  useNamespace,
  safelyGetEventTarget,
} from '@aurora/utils';
import { AIcon } from '@aurora/icon';
import type { InputEmits } from './composables/useEmits';
import { useInputEmits } from './composables/useEmits';
import {
  NFormDisabledInjectedKey,
  NFormItemErrorInjectedKey,
  NFormItemTriggerInjectedKey,
} from '~/components/Form/src/utils/injectedKeys';
import type { InputSlots } from './composables/useSlots';
import { useInputSlots } from './composables/useSlots';
import type { InputExposes } from './composables/useExposes';
import { useInputExposes } from './composables/useExposes';
import { defaultLocale, localeInjectKey } from '~/provides';
import useSize from '~/utils/useSize';
import useIconRender from '~/utils/useIconRender';
import { useAutoSizeStyle } from './composables/useAutoSizeStyle';
import { useLimitStyle } from './composables/useLimitStyle';

export default defineComponent({
  name: `${useNamespace()}Input`,
  desc: '输入框组件',
  props: useInputProps,
  emits: useInputEmits,
  slots: useInputSlots,
  exposes: useInputExposes,
  setup(
    props: InputProps,
    { slots, attrs, emit, expose }: HorizonWebSetupContext<InputEmits, InputSlots, InputExposes>,
  ) {
    const cHelper = new ComponentClassBlock('input');
    const originalAttrs = pickFromObject(attrs, [
      'id',
      'name',
      // 'value',
      'min',
      'max',
      'autofocus',
      'form',
      'tabindex',
      'cols',
      // events
      'onKeydown',
      'onKeypress',
      'onKeyup',
      'onFocus',
      'onBlur',
      'onChange',
      /^data-[\w-]+$/,
      // 'onClick',
      'autocomplete',
    ]);

    const localValue = ref();
    const showPassword = ref(false);
    const focused = ref(false);
    const isComposing = ref(false);
    const inputRef = ref<HTMLInputElement | null>(null);
    const textareaRef = ref<HTMLTextAreaElement | null>(null);
    const inputOrTextarea = computed(() => inputRef.value || textareaRef.value);
    const checkedType = computed(() => {
      if (['text', 'textarea', 'password'].includes(props.type)) {
        return props.type;
      }
      console.warn(
        '[HorizonWeb input warn] Please use one of these values as the input prop "type": "text"/"textarea"/"password". Or it will be converted to "text".',
      );
      return 'text';
    });

    const { size } = toRefs(props);

    // global size
    const sizeRef = useSize(size, 'medium');

    const locale = inject(localeInjectKey, defaultLocale);

    // form disabled inject
    const formDisabled = inject(NFormDisabledInjectedKey, undefined);
    const isDisabled = computed(() => props.disabled ?? formDisabled?.value ?? false);

    let preValue = localValue.value;

    // form-item validate trigger
    const formItemTrigger = inject(NFormItemTriggerInjectedKey, undefined);
    const { modelValue, autoSize } = toRefs(props);
    const autoSizeStyle = useAutoSizeStyle(textareaRef, modelValue, autoSize);
    const limitCountStyle = useLimitStyle(textareaRef, modelValue);
    const handleInput = (event: Event): void => {
      if (isComposing.value) return;
      const target = safelyGetEventTarget(event) as HTMLInputElement;
      localValue.value = target?.value;
      emit('update:modelValue', target?.value);
      emit('input', target?.value, event);

      nextTick().then(() => {
        formItemTrigger?.('change');
      });
    };

    const isOutOfExceeded = computed(
      () =>
        isDefined(props.maxlength) &&
        props.enableOutOfExceeded &&
        localValue.value?.length > props.maxlength,
    );

    watch(
      () => props.modelValue,
      val => {
        localValue.value = val;
      },
      { immediate: true },
    );

    watch(isDisabled, val => {
      if (val) {
        focused.value = false;
      }
    });

    const handleToggleShowPassword = () => {
      showPassword.value = !showPassword.value;
      focus();
    };

    const focus = () => {
      // 应对dialog内input无法聚焦的情况；应对showPassword后光标移到最前面的情况
      nextTick().then(() => {
        inputOrTextarea.value?.focus();
      });
    };

    const blur = () => {
      inputOrTextarea.value?.blur();
    };

    const select = () => {
      inputOrTextarea.value?.select();
    };

    const emitChange = (value: string) => {
      if (preValue !== value) {
        preValue = value;
        emit('change', value);
      }
    };

    const handleFocus = (event: FocusEvent) => {
      focused.value = true;
      preValue = localValue.value;
      emit('focus', event);
    };

    const handleBlur = (event: FocusEvent) => {
      focused.value = false;
      emitChange(localValue.value);
      emit('blur', event);
      nextTick().then(() => {
        formItemTrigger?.('blur');
      });
    };

    const handleClear = (evt: MouseEvent) => {
      localValue.value = '';
      emit('update:modelValue', '');
      emit('input', '', evt);
      emitChange(localValue.value);
      emit('clear');
      // When clear icon clicked, should focus on element.
      focus();
      nextTick().then(() => {
        formItemTrigger?.('change');
      });
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      emit('keydown', event);
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      emit('keypress', event);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      emit('keyup', event);
    };

    const handleCompositionStart = (event: CompositionEvent) => {
      emit('compositionstart', event);
      isComposing.value = true;
    };

    const handleCompositionUpdate = (event: CompositionEvent) => {
      emit('compositionupdate', event);
    };

    const handleCompositionEnd = (event: CompositionEvent) => {
      emit('compositionend', event);
      if (isComposing.value) {
        isComposing.value = false;
        handleInput(event);
      }
    };

    const iconSize = computed(() => {
      switch (sizeRef.value) {
        case 'large':
          return 16;
        case 'small':
          return 12;
        case 'medium':
        default:
          return 16;
      }
    });

    expose({
      input: props.type === 'textarea' ? textareaRef : inputRef,
      blur,
      focus,
      select,
    });

    return () => {
      const suffixVisible =
        (!isDisabled.value && props.clearable && localValue.value) ||
        (props.type === 'password' && props.showPassword) ||
        !!slots.suffix ||
        !!props.suffixIcon;

      let suffixNode: VNode | null;
      if (suffixVisible) {
        suffixNode = (
          <span class={[cHelper.e('suffix')]} onClick={focus}>
            {!isDisabled.value && props.clearable && localValue.value ? (
              <AIcon
                class={[
                  (props.type === 'password' && props.showPassword) ||
                  slots.suffix ||
                  props.suffixIcon
                    ? cHelper.m('clear-action-with-multi')
                    : cHelper.m('clear-action'),
                ]}
                name={'close_filled'}
                size={iconSize.value}
                onClick={handleClear}
              />
            ) : null}
            {props.type === 'password' && props.showPassword ? (
              <AIcon
                class={[cHelper.m('password-action')]}
                name={showPassword.value ? 'eye' : 'eye_off'}
                size={iconSize.value}
                onClick={handleToggleShowPassword}
              />
            ) : (
              useIconRender(props.suffixIcon, slots.suffix, {
                size: iconSize.value,
              })
            )}
          </span>
        );
      } else {
        suffixNode = null;
      }

      const prefixNode: VNode | null =
        slots.prefix || props.prefixIcon ? (
          <span class={cls(cHelper.e('prefix'))} onClick={focus}>
            {useIconRender(props.prefixIcon, slots.prefix, {
              size: iconSize.value,
            })}
          </span>
        ) : null;

      const isPassword = props.type === 'password';

      const nFormError = inject(NFormItemErrorInjectedKey, ref(''));

      if (props.type === 'textarea') {
        return (
          <div
            class={cls(
              cHelper.block,
              cHelper.e(`textarea--${props.inputStyle}`),
              cHelper.em(`textarea--${props.inputStyle}`, 'focused', focused.value),
              cHelper.em(`textarea--${props.inputStyle}`, 'disabled', isDisabled.value),
              cHelper.is('error', !!nFormError?.value || props.status === 'error'),
              props.showLimit &&
                isDefined(props.maxlength) &&
                props.maxlength > 0 &&
                cHelper.m('limit-with-multi-line'),
              cHelper.is('out-of-exceeded', isOutOfExceeded.value),
            )}
          >
            <textarea
              ref={textareaRef}
              class={[cHelper.e('inner'), cHelper.e('textarea-inner')]}
              style={{
                resize: props.autoSize ? 'none' : props.resize,
                ...autoSizeStyle.value,
              }}
              {...originalAttrs}
              v-model={localValue.value}
              placeholder={
                props.placeholder || locale.value?.langService?.td()?.horizon-web?.input.placeholder
              }
              readonly={props.readonly}
              rows={props.autoSize ? undefined : props.rows}
              maxlength={props.enableOutOfExceeded ? undefined : props.maxlength}
              minlength={props.minlength}
              onInput={handleInput}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeydown={handleKeyDown}
              onKeypress={handleKeyPress}
              onKeyup={handleKeyUp}
              onCompositionstart={handleCompositionStart}
              onCompositionupdate={handleCompositionUpdate}
              onCompositionend={handleCompositionEnd}
              onClick={evt => emit('click', evt)}
              disabled={isDisabled.value}
            />
            {props.showLimit && props.maxlength ? (
              <span
                class={[
                  cHelper.e('textarea-limit-wrap'),
                  {
                    [cHelper.em('textarea-limit-wrap', 'disabled')]: isDisabled.value,
                  },
                ]}
                style={limitCountStyle.value}
              >
                <span class={[cHelper.e('textarea-limit')]}>
                  <span
                    class={{
                      [cHelper.em('textarea-limit', 'current')]: localValue.value?.length > 0,
                    }}
                  >
                    {localValue.value?.length || 0}
                  </span>
                  /{props.maxlength}
                </span>
              </span>
            ) : null}
          </div>
        );
      }

      return (
        <div
          class={cls(
            cHelper.block,
            cHelper.m(sizeRef.value, !!sizeRef.value),
            cHelper.m('filled', props.filled || props.inputStyle === 'emphasize'),
            cHelper.m('no-border', props.inputStyle === 'no-border'),
            cHelper.m('with-prepend', !!slots.prepend),
            cHelper.m('with-append', !!slots.append),
            cHelper.em('error', props.inputStyle, !!nFormError?.value || props.status === 'error'),
            cHelper.is('out-of-exceeded', isOutOfExceeded.value),
          )}
        >
          <div class={cHelper.e('group-wrap')}>
            {slots.prepend ? <span class={cHelper.e('prepend')}>{slots.prepend()}</span> : null}
            <span
              class={{
                [cHelper.e('inner-wrap')]: true,
                [cHelper.em('inner-wrap', 'focused')]: focused.value,
                [cHelper.em('inner-wrap', 'disabled')]: isDisabled.value,
              }}
            >
              {prefixNode}
              <input
                ref={inputRef}
                class={[cHelper.e('inner')]}
                {...originalAttrs}
                type={isPassword && showPassword.value ? 'text' : checkedType.value}
                v-model={localValue.value}
                placeholder={
                  props.placeholder || locale.value?.langService?.td()?.horizon-web?.input.placeholder
                }
                readonly={props.readonly}
                maxlength={props.enableOutOfExceeded ? undefined : props.maxlength}
                minlength={props.minlength}
                onInput={handleInput}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeydown={handleKeyDown}
                onKeypress={handleKeyPress}
                onKeyup={handleKeyUp}
                onCompositionstart={handleCompositionStart}
                onCompositionupdate={handleCompositionUpdate}
                onCompositionend={handleCompositionEnd}
                onClick={evt => emit('click', evt)}
                disabled={isDisabled.value}
              />
              {suffixNode}
              {props.showLimit && props.maxlength ? (
                <span class={[cHelper.e('limit')]}>
                  <span class={{ [cHelper.em('limit', 'current')]: localValue.value?.length > 0 }}>
                    {localValue.value?.length || 0}
                  </span>
                  /{props.maxlength}
                </span>
              ) : null}
            </span>
            {slots.append ? <span class={cHelper.e('append')}>{slots.append()}</span> : null}
          </div>
        </div>
      );
    };
  },
});
