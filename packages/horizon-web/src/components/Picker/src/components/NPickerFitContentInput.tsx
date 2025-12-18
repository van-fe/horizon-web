import { defineComponent, inject, ref, watch } from 'vue';
import { cls, ComponentClassBlock, sizeUnitTransform, useNamespace } from '@aurora/utils';
import { NPickerPopperVisibleInjectKey } from '../utils/InjectKeys';
import { usePickerFitContentInputExposes } from '../composables/useExposes';
import { usePickerPureInputProps } from '../composables/useProps';
import { usePickerPureInputEmits } from '../composables/useEmits';

export default defineComponent({
  name: `${useNamespace()}PickerFitContentInput`,
  inheritAttrs: false,
  props: usePickerPureInputProps,
  emits: usePickerPureInputEmits,
  exposes: usePickerFitContentInputExposes,
  setup(props, { emit, expose, attrs }) {
    const classHelper = new ComponentClassBlock('picker-fit-content-input');

    const inputRef = ref<HTMLInputElement | null>(null);
    const inputString = ref(props.modelValue);
    const compositionString = ref('');

    const popperVisible = inject(NPickerPopperVisibleInjectKey)!;

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
    });

    return () => (
      <span
        class={cls(
          classHelper.e('wrapper'),
          attrs.class as string | undefined,
          attrs.className as string | undefined,
        )}
      >
        <span
          class={classHelper.e('opacity-content')}
          style={{ minWidth: sizeUnitTransform(props.minWidth) }}
        >
          <span
            v-html={(inputString.value || (props.placeholder as string) || '')
              .toString()
              .replace(/\s/g, '&nbsp;')}
          />
          {compositionString.value}
        </span>
        <input
          v-model={inputString.value}
          ref={inputRef}
          class={cls(classHelper.e('input'))}
          disabled={props.disabled}
          readonly={props.readonly}
          placeholder={props.placeholder}
          style={props.style}
          tabindex={props.tabindex}
          autocomplete={props.autocomplete}
          unselectable={props.unselectable}
          {...attrs}
          onInput={evt => emit('input', evt)}
          onCompositionstart={onCompositionStart}
          onCompositionupdate={onCompositionUpdate}
          onCompositionend={onCompositionEnd}
          onFocus={onFocus}
          onBlur={onBlur}
          onClick={onClick}
          onKeydown={evt => emit('keydown', evt)}
        />
      </span>
    );
  },
});
