import { computed, ref, toRef } from 'vue';
import { isDefined } from '@aurora/utils';
import type { InputProps } from '../composables/useProps';
import { useAutoSizeStyle } from '../composables/useAutoSizeStyle';
import { useLimitStyle } from '../composables/useLimitStyle';
import type { InputFieldController } from './useInputField';
import type { InputValueController } from './useInputValue';
import useLocaleLang from '~/utils/useLocaleLang';
import useSize from '~/utils/useSize';
import { warn } from '~/utils/useLog';

/** Owns visual derivatives, password visibility and textarea sizing. */
export function useInputLayout(
  props: Readonly<InputProps>,
  field: InputFieldController,
  value: InputValueController,
) {
  const showPassword = ref(false);
  const sizeRef = useSize(toRef(props, 'size'), 'medium');
  const placeholder = useLocaleLang('input.placeholder');
  const autoSizeStyle = useAutoSizeStyle(field.textareaRef, value.modelValue, toRef(props, 'autoSize'));
  const limitCountStyle = useLimitStyle(field.textareaRef, value.modelValue);

  const checkedType = computed(() => {
    if (['text', 'textarea', 'password'].includes(props.type)) return props.type;
    warn(
      'input',
      'Please use one of these values as the input prop "type": "text"/"textarea"/"password". Or it will be converted to "text".',
    );
    return 'text';
  });
  const isOutOfExceeded = computed(
    () =>
      isDefined(props.maxlength) &&
      props.enableOutOfExceeded &&
      value.localValue.value.length > props.maxlength,
  );
  const iconSize = computed(() => (sizeRef.value === 'small' ? 12 : 16));

  function handleToggleShowPassword() {
    showPassword.value = !showPassword.value;
    field.focus();
  }

  return {
    autoSizeStyle,
    checkedType,
    handleToggleShowPassword,
    iconSize,
    isOutOfExceeded,
    limitCountStyle,
    placeholder,
    showPassword,
    sizeRef,
  };
}
