import { defineComponent, inject, ref, watch } from 'vue';
import { cls, ComponentClassBlock, isDefined, useNamespace } from '@aurora/utils';
import { HPickerPopperVisibleInjectKey } from '../utils/InjectKeys';
import { usePickerPureInputExpose } from '../composables/useExposes';
import { usePickerPureInputProps } from '../composables/useProps';
import { usePickerPureInputEmits } from '../composables/useEmits';

export default defineComponent({
  name: `${useNamespace()}PickerPureInput`,
  props: usePickerPureInputProps,
  emits: usePickerPureInputEmits,
  exposes: usePickerPureInputExpose,
  setup(props, { emit, expose }) {
    const classHelper = new ComponentClassBlock('picker');

    const inputRef = ref<HTMLInputElement | null>(null);
    const inputString = ref(props.modelValue);
    const compositionString = ref('');

    const popperVisible = inject(HPickerPopperVisibleInjectKey)!;

    watch(
      () => props.modelValue,
      val => {
        inputString.value = val;
      },
    );

    watch(inputString, val => {
      emit('update:modelValue', val);
    });

    let isInputFocus = false;

    function onFocus(evt: FocusEvent) {
      isInputFocus = true;
      emit('focus', evt);
    }

    function onBlur(evt: FocusEvent) {
      evt.stopImmediatePropagation();
      isInputFocus = false;
      emit('blur', evt);
    }

    function onCompositionStart(evt: CompositionEvent) {
      emit('compositionStart', evt);
    }

    function onCompositionUpdate(evt: CompositionEvent) {
      compositionString.value = evt.data;
      emit('compositionUpdate', evt);
    }

    function onCompositionEnd(evt: CompositionEvent) {
      compositionString.value = '';
      emit('compositionEnd', evt);
    }

    function onClick(evt: MouseEvent) {
      if (popperVisible.value) {
        evt.stopPropagation();
      }
    }

    expose({
      focus: () => {
        !isInputFocus && inputRef.value?.focus();
      },
      blur: () => {
        isInputFocus && inputRef.value?.blur();
      },
      forceBlur: () => {
        inputRef.value?.blur();
      },
      input: inputRef,
      resetInputString: (value?: string | number) => {
        inputString.value = isDefined(value) ? value?.toString() : props.modelValue?.toString();
      },
    });

    return () => (
      <input
        v-model={inputString.value}
        ref={inputRef}
        class={cls(classHelper.em('input', 'inner'), classHelper.is('pure-input'))}
        disabled={props.disabled}
        readonly={props.readonly}
        placeholder={props.placeholder}
        style={props.style}
        tabindex={props.tabindex}
        autocomplete={props.autocomplete}
        unselectable={props.unselectable}
        onInput={evt => emit('input', evt)}
        onCompositionstart={onCompositionStart}
        onCompositionupdate={onCompositionUpdate}
        onCompositionend={onCompositionEnd}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onClick}
        onKeydown={evt => emit('keydown', evt)}
      />
    );
  },
});
