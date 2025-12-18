import { defineComponent, onMounted, ref, watch } from 'vue';
import { cls, ComponentClassBlock, isString } from '@aurora/shared';

export default defineComponent({
  name: 'InputTag',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: {
    'update:modelValue': (val: string) => isString(val),
    blur: () => true,
  },
  setup(props, { emit }) {
    const classHelper = new ComponentClassBlock('tag');

    const inputRef = ref<HTMLInputElement | null>(null);
    const inputString = ref(props.modelValue);
    const compositionString = ref('');

    watch(
      () => props.modelValue,
      val => {
        inputString.value = val;
      },
    );

    watch(inputString, val => {
      emit('update:modelValue', val);
    });

    onMounted(() => {
      inputRef.value?.focus();
    });

    function onBlur(e: FocusEvent) {
      e.stopImmediatePropagation();
      emit('blur');
    }

    function onCompositionUpdate(e: CompositionEvent) {
      compositionString.value = e.data;
    }

    function onCompositionEnd() {
      compositionString.value = '';
    }

    function onKeyUp(e: KeyboardEvent) {
      if (e.code.toLowerCase() === 'enter') {
        inputRef.value?.blur();
      }
    }

    return () => (
      <span class={cls(classHelper.e('input-wrapper'))}>
        <span class={classHelper.e('input-opacity-content')}>
          <span v-html={inputString.value.replace(/\s/g, '&nbsp;')} />
          {compositionString.value}
        </span>
        <input
          v-model={inputString.value}
          ref={inputRef}
          class={cls(classHelper.e('input'))}
          onCompositionupdate={onCompositionUpdate}
          onCompositionend={onCompositionEnd}
          onKeyup={onKeyUp}
          onBlur={onBlur}
        />
      </span>
    );
  },
});
