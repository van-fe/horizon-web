import type { LegoSetupContext } from '@/@aurora/shared/types';
import type { Ref } from 'vue';
import type { SelectEmits } from '../composables/useEmits';
import type { SelectExposes } from '../composables/useExposes';
import type { SelectProps, OptionProps } from '../composables/useProps';
import type { SelectSlots } from '../composables/useSlots';
import type { ModelValueType } from '../utils/types';

export default function useConfirm(
  props: SelectProps,
  context: LegoSetupContext<SelectEmits, SelectSlots, SelectExposes>,
  options: {
    modelValueSet: Ref<Set<OptionProps['value']>>;
    presetModelValueSet: Ref<Set<OptionProps['value']>>;
    prevOptionValue: ModelValueType;
    setPopperVisible: (visible: boolean) => void;
    judgeWhetherInputCanFocus: () => void;
  },
) {
  function handleConfirm(hidePopper = true, manual = true) {
    options.modelValueSet.value = new Set(options.presetModelValueSet.value.values());

    if (manual) {
      options.prevOptionValue = Array.from(options.modelValueSet.value.values());
    }

    hidePopper && options.setPopperVisible(false);

    if (!hidePopper) {
      options.judgeWhetherInputCanFocus();
    }
  }

  function handleCancel() {
    options.setPopperVisible(false);

    context.emit('cancel');
  }

  return {
    handleConfirm,
    handleCancel,
  };
}
