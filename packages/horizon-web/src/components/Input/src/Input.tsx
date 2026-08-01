import type { StyleValue, VNode } from 'vue';
import { defineComponent, ref } from 'vue';
import { useInputProps } from './composables/useProps';
import type { HorizonWebSetupContext } from '@aurora/utils';
import {
  pickFromObject,
  ComponentClassBlock,
  cls,
  isDefined,
  sizeUnitTransform,
  useNamespace,
} from '@aurora/utils';
import { AIcon } from '@aurora/icon';
import type { InputEmits } from './composables/useEmits';
import { useInputEmits } from './composables/useEmits';
import type { InputSlots } from './composables/useSlots';
import { useInputSlots } from './composables/useSlots';
import type { InputExposes } from './composables/useExposes';
import { useInputExposes } from './composables/useExposes';
import useIconRender from '~/utils/useIconRender';
import { useInput } from './hooks/useInput';

export default defineComponent({
  name: `${useNamespace()}Input`,
  desc: '输入框组件',
  descLocales: {
    en: 'Input component',
  },
  props: useInputProps,
  emits: useInputEmits,
  slots: useInputSlots,
  exposes: useInputExposes,
  inheritAttrs: false,
  setup(
    props,
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

    const {
      autoSizeStyle,
      blur,
      checkedType,
      focus,
      focused,
      formError,
      handleBlur,
      handleClear,
      handleCompositionEnd,
      handleCompositionStart,
      handleCompositionUpdate,
      handleFocus,
      handleInput,
      handleKeyDown,
      handleKeyPress,
      handleKeyUp,
      handleToggleShowPassword,
      iconSize,
      inputRef,
      isDisabled,
      isOutOfExceeded,
      limitCountStyle,
      localValue,
      placeholder,
      select,
      showPassword,
      sizeRef,
      textareaRef,
    } = useInput(props, emit);
    const compositionValue = ref('');

    function onInput(event: Event) {
      if (props.embedded) props.embeddedInputHandler?.(event);
      handleInput(event);
    }

    function onCompositionStart(event: CompositionEvent) {
      handleCompositionStart(event);
    }

    function onCompositionUpdate(event: CompositionEvent) {
      compositionValue.value = event.data;
      handleCompositionUpdate(event);
    }

    function onCompositionEnd(event: CompositionEvent) {
      compositionValue.value = '';
      handleCompositionEnd(event);
    }

    expose({
      input: props.type === 'textarea' ? textareaRef : inputRef,
      blur,
      focus,
      select,
    });

    return () => {
      const forwardedAttrs = Object.fromEntries(
        Object.entries(attrs).filter(
          ([key]) =>
            ![
              'class',
              'className',
              'style',
              'onUpdate:modelValue',
              'onInput',
              'onChange',
              'onFocus',
              'onBlur',
              'onClear',
              'onClick',
              'onKeydown',
              'onKeypress',
              'onKeyup',
              'onCompositionstart',
              'onCompositionupdate',
              'onCompositionend',
            ].includes(key),
        ),
      );
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

      const inputNode = (
        <input
          {...(props.embedded ? forwardedAttrs : {})}
          ref={inputRef}
          class={
            props.embedded
              ? [attrs.class, attrs.className, props.embeddedClass || cHelper.e('embedded-inner')]
              : cHelper.e('inner')
          }
          style={props.embedded ? [attrs.style as StyleValue, props.embeddedStyle] : undefined}
          {...originalAttrs}
          type={isPassword && showPassword.value ? 'text' : checkedType.value}
          v-model={localValue.value}
          placeholder={props.placeholder || (placeholder.value as string)}
          readonly={props.readonly}
          maxlength={props.enableOutOfExceeded ? undefined : props.maxlength}
          minlength={props.minlength}
          tabindex={props.tabindex}
          autocomplete={props.autocomplete}
          unselectable={props.unselectable}
          onInput={onInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeydown={handleKeyDown}
          onKeypress={handleKeyPress}
          onKeyup={handleKeyUp}
          onCompositionstart={onCompositionStart}
          onCompositionupdate={onCompositionUpdate}
          onCompositionend={onCompositionEnd}
          onClick={evt => emit('click', evt)}
          disabled={isDisabled.value}
        />
      );

      if (props.embedded && props.type !== 'textarea') {
        if (!props.fitContent) return inputNode;

        return (
          <span
            {...forwardedAttrs}
            class={[
              props.fitContentClass || cHelper.e('fit-content'),
              attrs.class,
              attrs.className,
            ]}
            style={attrs.style as StyleValue}
          >
            <span
              aria-hidden="true"
              class={props.fitContentMirrorClass || cHelper.e('fit-content-mirror')}
              style={{ minWidth: sizeUnitTransform(props.fitContentMinWidth) }}
            >
              <span>{localValue.value || props.placeholder || ''}</span>
              {compositionValue.value}
            </span>
            {inputNode}
          </span>
        );
      }

      if (props.type === 'textarea') {
        return (
          <div
            {...forwardedAttrs}
            style={attrs.style as StyleValue}
            class={cls(
              cHelper.block,
              attrs.class as string | undefined,
              attrs.className as string | undefined,
              cHelper.e(`textarea--${props.inputStyle}`),
              cHelper.em(`textarea--${props.inputStyle}`, 'focused', focused.value),
              cHelper.em(`textarea--${props.inputStyle}`, 'disabled', isDisabled.value),
              cHelper.is('error', !!formError?.value || props.status === 'error'),
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
              placeholder={props.placeholder || (placeholder.value as string)}
              readonly={props.readonly}
              rows={props.autoSize ? undefined : props.rows}
              maxlength={props.enableOutOfExceeded ? undefined : props.maxlength}
              minlength={props.minlength}
              tabindex={props.tabindex}
              autocomplete={props.autocomplete}
              unselectable={props.unselectable}
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
          {...forwardedAttrs}
          style={attrs.style as StyleValue}
          class={cls(
            cHelper.block,
            attrs.class as string | undefined,
            attrs.className as string | undefined,
            cHelper.m(sizeRef.value, !!sizeRef.value),
            cHelper.m('filled', props.inputStyle === 'emphasize'),
            cHelper.m('no-border', props.inputStyle === 'no-border'),
            cHelper.m('with-prepend', !!slots.prepend),
            cHelper.m('with-append', !!slots.append),
            cHelper.em('error', props.inputStyle, !!formError?.value || props.status === 'error'),
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
              {inputNode}
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
