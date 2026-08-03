import { computed, ref, toRef } from 'vue';
import type { Slots } from 'vue';
import type { InputNumberProps } from '../composables/useProps';
import useSize from '~/utils/useSize';

/** UI-only derived state for InputNumber. */
export function useInputNumberLayout(props: Readonly<InputNumberProps>, slots: Slots) {
  const sizeRef = useSize(toRef(props, 'size'), 'medium');
  const isMouseOver = ref(false);
  const iconSize = computed(() => {
    if (sizeRef.value === 'large') return 14;
    if (sizeRef.value === 'small') return 9;
    return 12;
  });
  const hasPrefix = computed(() => !!(slots.prefix || props.prefixIcon));
  const hasSuffix = computed(() => !!(slots.suffix || props.suffixIcon));
  const prefixWrapperExist = computed(
    () => hasPrefix.value || (props.controlsPosition === 'between' && props.controls && !props.readonly),
  );
  const suffixWrapperExist = computed(
    () =>
      hasSuffix.value ||
      (['between', 'right'].includes(props.controlsPosition) && props.controls && !props.readonly),
  );

  function handleMouseEnter(disabled: boolean) {
    if (!disabled) isMouseOver.value = true;
  }

  function handleMouseLeave() {
    isMouseOver.value = false;
  }

  return {
    hasPrefix,
    hasSuffix,
    iconSize,
    handleMouseEnter,
    handleMouseLeave,
    isMouseOver,
    prefixWrapperExist,
    sizeRef,
    suffixWrapperExist,
  };
}
