import type { HorizonWebComponentInstance } from '@aurora/utils';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import { computed, defineComponent, inject, provide, ref, unref, watch } from 'vue';
import HInput from '~/components/Input/src/Input';
import type { InputExposes } from '~/components/Input/src/composables/useExposes';
import { HFormItemTriggerInjectedKey } from '~/components/Form/src/utils/injectedKeys';
import { HPickerPopperVisibleInjectKey } from '../utils/InjectKeys';
import { usePickerFitContentInputExposes } from '../composables/useExposes';
import { usePickerPureInputProps } from '../composables/useProps';
import { usePickerPureInputEmits } from '../composables/useEmits';

/**
 * Picker 内部兼容层。输入、IME、焦点和禁用行为统一复用 Input，
 * 这里只保留 Picker 既有的事件签名和 expose API。
 */
export default defineComponent({
  name: `${useNamespace()}PickerFitContentInput`,
  inheritAttrs: false,
  props: usePickerPureInputProps,
  emits: usePickerPureInputEmits,
  exposes: usePickerFitContentInputExposes,
  setup(props, { emit, expose, attrs }) {
    const classHelper = new ComponentClassBlock('picker-fit-content-input');
    const inputRef = ref<HorizonWebComponentInstance<typeof HInput, InputExposes> | null>(null);
    const localValue = ref(props.modelValue);
    const popperVisible = inject(HPickerPopperVisibleInjectKey, ref(false));
    provide(HFormItemTriggerInjectedKey, () => undefined);
    const nativeInput = computed(() => unref(inputRef.value?.input) ?? null);

    watch(
      () => props.modelValue,
      value => {
        localValue.value = value;
      },
    );

    watch(localValue, value => emit('update:modelValue', value));

    function onFocus(evt: FocusEvent) {
      emit('focus', evt);
    }

    function onBlur(evt: FocusEvent) {
      evt.stopImmediatePropagation();
      emit('blur', evt);
    }

    function onClick(evt: MouseEvent) {
      if (popperVisible.value) evt.stopPropagation();
    }

    expose({
      focus: () => nativeInput.value?.focus(),
      blur: () => nativeInput.value?.blur(),
      forceBlur: () => nativeInput.value?.blur(),
      input: nativeInput,
      resetInputString: () => undefined,
    });

    return () => (
      <HInput
        {...attrs}
        ref={inputRef}
        embedded
        fitContent
        embeddedInputHandler={evt => emit('input', evt)}
        fitContentMinWidth={props.minWidth}
        fitContentClass={classHelper.e('wrapper')}
        fitContentMirrorClass={classHelper.e('opacity-content')}
        modelValue={localValue.value.toString()}
        embeddedClass={classHelper.e('input')}
        embeddedStyle={props.style}
        disabled={props.disabled}
        readonly={props.readonly}
        placeholder={props.placeholder}
        tabindex={props.tabindex}
        autocomplete={props.autocomplete}
        unselectable={props.unselectable}
        onUpdate:modelValue={value => {
          localValue.value = value;
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onClick}
        onKeydown={evt => emit('keydown', evt)}
        onCompositionstart={evt => emit('compositionStart', evt)}
        onCompositionupdate={evt => emit('compositionUpdate', evt)}
        onCompositionend={evt => emit('compositionEnd', evt)}
      />
    );
  },
});
