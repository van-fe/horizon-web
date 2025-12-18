import type { LegoSetupContext } from '@aurora/utils';
import type { SelectEmits } from '../composables/useEmits';
import type { SelectExposes } from '../composables/useExposes';
import type { OptionProps } from '../composables/useProps';
import type { SelectSlots } from '../composables/useSlots';
import type { SelectDomRefs } from '../utils/types';
import type { Ref, VNode } from 'vue';
import type { JSX } from 'vue/jsx-runtime';

export default function useExposes(
  context: LegoSetupContext<SelectEmits, SelectSlots, SelectExposes>,
  options: {
    handleConfirm: () => void;
    handleCancel: () => void;
    focusInput: () => void;
    manualControlPopperVisible: (visible: boolean) => void;
    focusedOptionValue: Ref<OptionProps['value'] | undefined>;
    handleClear: () => void;
    renderedModelValueTags: Ref<Array<VNode | JSX.Element>>;
    domRefs: SelectDomRefs;
  },
) {
  context.expose({
    confirmHandle: options.handleConfirm,
    cancelHandle: options.handleCancel,
    setInputAble: options.focusInput,
    changePanelVisible: options.manualControlPopperVisible,
    focusOption: (optionValue?: OptionProps['value']) =>
      (options.focusedOptionValue.value = optionValue),
    clear: options.handleClear,
    renderedModelValueTags: options.renderedModelValueTags,
    focus: () => {
      options.domRefs.pickerDomRef.value?.focus();
    },
    blur: () => {
      options.domRefs.pickerDomRef.value?.forceBlur();
    },
  });

  return {
    confirmHandle: options.handleConfirm,
    cancelHandle: options.handleCancel,
  };
}
