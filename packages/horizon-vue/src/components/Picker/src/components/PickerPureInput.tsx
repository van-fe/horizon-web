import type { HorizonWebComponentInstance } from '@aurora/utils';
import { cls, ComponentClassBlock, isDefined, useNamespace } from '@aurora/utils';
import { computed, defineComponent, inject, provide, ref, unref, watch } from 'vue';
import HInput from '~/components/Input/src/Input';
import type { InputExposes } from '~/components/Input/src/composables/useExposes';
import { HFormItemTriggerInjectedKey } from '~/components/Form/src/utils/injectedKeys';
import { HPickerPopperVisibleInjectKey } from '../utils/InjectKeys';
import { usePickerPureInputExpose } from '../composables/useExposes';
import { usePickerPureInputProps } from '../composables/useProps';
import { usePickerPureInputEmits } from '../composables/useEmits';

/** Picker 内部的 Input 兼容层。 */
export default defineComponent({
  name: `${useNamespace()}PickerPureInput`,
  inheritAttrs: false,
  props: usePickerPureInputProps,
  emits: usePickerPureInputEmits,
  exposes: usePickerPureInputExpose,
  setup(props, { emit, expose, attrs }) {
    const classHelper = new ComponentClassBlock('picker');
    const inputRef = ref<HorizonWebComponentInstance<typeof HInput, InputExposes> | null>(null);
    const localValue = ref(props.modelValue.toString());
    const popperVisible = inject(HPickerPopperVisibleInjectKey, ref(false));
    provide(HFormItemTriggerInjectedKey, () => undefined);
    const nativeInput = computed(() => unref(inputRef.value?.input) ?? null);

    watch(
      () => props.modelValue,
      value => {
        localValue.value = value.toString();
      },
    );

    watch(localValue, value => emit('update:modelValue', value));

    function onBlur(evt: FocusEvent) {
      evt.stopImmediatePropagation();
      emit('blur', evt);
    }

    function onFocus(evt: FocusEvent) {
      emit('focus', evt);
    }

    function onClick(evt: MouseEvent) {
      if (popperVisible.value) evt.stopPropagation();
    }

    expose({
      focus: () => nativeInput.value?.focus(),
      blur: () => nativeInput.value?.blur(),
      forceBlur: () => nativeInput.value?.blur(),
      input: nativeInput,
      resetInputString: (value?: string | number) => {
        localValue.value = isDefined(value) ? value.toString() : props.modelValue.toString();
      },
    });

    return () => (
      <HInput
        {...attrs}
        ref={inputRef}
        embedded
        embeddedInputHandler={evt => emit('input', evt)}
        modelValue={localValue.value}
        embeddedClass={cls(classHelper.em('input', 'inner'), classHelper.is('pure-input'))}
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
