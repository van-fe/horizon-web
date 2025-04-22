import { defineComponent, toRefs, inject, ref, watch, computed, nextTick } from 'vue';
import { useRadioProps } from './useProps';
import { cls, ComponentClassBlock } from '@nio-fe/shared';

export default defineComponent({
  name: 'Radio',
  props: useRadioProps,
  emits: {
    blur: (evt: FocusEvent) => evt instanceof FocusEvent,
    changeInput: () => true,
  },
  setup(props, { slots, emit, attrs }) {
    const {
      modelValue: propModelValue,
      disabled: propDisabled,
      value: propValue,
      viewable: propViewable,
      name: propName,
    } = toRefs(props);

    const inputDomRef = ref<HTMLInputElement>();

    const type = inject('type', 'radio');
    const classHelper = new ComponentClassBlock(`${type}`);

    const isChecked = computed(() => propModelValue.value === propValue.value);

    const handleChange = (e: Event) => {
      e.stopPropagation();
      emit('changeInput');
      void nextTick(() => {
        setCheckedStatus();
      });
    };

    function onBlur(e: FocusEvent) {
      emit('blur', e);
    }

    function setCheckedStatus() {
      if (inputDomRef.value) {
        inputDomRef.value.checked = isChecked.value;
      }
    }

    watch(isChecked, () => {
      setCheckedStatus();
    });

    return () =>
      propViewable.value ? (
        <label style={{ display: isChecked.value ? 'inline-block' : 'none' }}>
          <div class={classHelper.e('label')}>{slots?.default?.()}</div>
        </label>
      ) : (
        <label>
          <div class={cls(classHelper.e('input'), classHelper.is('checked', isChecked.value))}>
            <input
              ref={inputDomRef}
              type="radio"
              value={propValue.value}
              checked={isChecked.value}
              disabled={propDisabled.value}
              class={classHelper.em('input', 'original')}
              name={propName.value}
              data-model-value={propModelValue.value}
              onChange={handleChange}
              onBlur={onBlur}
            />
            <div class={classHelper.em('input', 'cursor')}></div>
          </div>
          <div class={classHelper.e('label')}>{slots?.default?.()}</div>
        </label>
      );
  },
});
