import { defineComponent, ref, watch } from 'vue';
import HButton from '~/components/Button/src/Button';
import { cls, ComponentClassBlock, isBoolean } from '@aurora/utils';

export default defineComponent({
  name: 'CollapseButton',
  components: {
    HButton,
  },
  props: {
    modelValue: {
      type: Boolean,
    },
  },
  emits: {
    'update:modelValue': (val: boolean) => isBoolean(val),
  },
  setup(props, { emit }) {
    const classHelper = new ComponentClassBlock('menu');

    const currentValue = ref(props.modelValue);

    watch(
      () => props.modelValue,
      val => {
        currentValue.value = val;
      },
    );

    watch(currentValue, val => {
      emit('update:modelValue', val);
    });

    function onClick() {
      currentValue.value = !currentValue.value;
    }

    return () => (
      <HButton
        type="normal"
        text={true}
        iconSize={24}
        class={cls(
          classHelper.e('collapse-button'),
          classHelper.is('collapsed', currentValue.value),
        )}
        onClick={onClick}
      >
        {{
          icon: () => (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11 19C11 18.1716 11.6716 17.5 12.5 17.5L18.5 17.5C19.3284 17.5 20 18.1716 20 19L11 19ZM8.46967 16.7803C9.05546 16.1945 9.05546 15.2448 8.46967 14.659L6.81066 13L20 13C20 12.1716 19.3284 11.5 18.5 11.5L6.81066 11.5L8.46967 9.84099C9.05546 9.2552 9.05546 8.30546 8.46967 7.71967L4.46967 11.7197C4.17678 12.0126 4.17678 12.4874 4.46967 12.7803L8.46967 16.7803ZM11 5.5L20 5.5C20 6.32843 19.3284 7 18.5 7L12.5 7C11.6716 7 11 6.32843 11 5.5Z"
                  fill="currentColor"
                />
              </g>
            </svg>
          ),
        }}
      </HButton>
    );
  },
});
