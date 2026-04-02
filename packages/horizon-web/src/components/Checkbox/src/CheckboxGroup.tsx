import { defineComponent, provide, reactive, toRefs, computed, inject, toRef } from 'vue';
import type { CheckboxUnionType } from './utils/types';
import { useCheckboxGroupProps } from './composables/useProps';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import type { CheckboxEmits } from './composables/useEmits';
import { useCheckboxEmits } from './composables/useEmits';
import type { CheckboxGroupSlots } from './composables/useSlots';
import { useCheckboxGroupSlots } from './composables/useSlots';
import {
  HFormDisabledInjectedKey,
  HFormItemTriggerInjectedKey,
} from '~/components/Form/src/utils/injectedKeys';
import { HCheckboxGroupInjectedKey } from './utils/injectedKeys';
import useSize from '~/utils/useSize';

export default defineComponent({
  name: `${useNamespace()}CheckboxGroup`,
  props: useCheckboxGroupProps,
  emits: useCheckboxEmits,
  slots: useCheckboxGroupSlots,
  setup(props, { slots, emit }: HorizonWebSetupContext<CheckboxEmits, CheckboxGroupSlots>) {
    const {
      modelValue: propModelValue,
      disabled: propDisabled,
      viewable: propViewable,
    } = toRefs(props);
    const classHelper = new ComponentClassBlock('checkbox-group');

    /** formItemTrigger **/
    const formItemTrigger = inject(HFormItemTriggerInjectedKey, undefined);

    const handleChange = (value: Array<CheckboxUnionType>) => {
      emit('update:modelValue', value);
      emit('change', value);
      formItemTrigger?.('change');
    };

    const handleBlur = (evt: FocusEvent) => {
      emit('blur', evt);
      formItemTrigger?.('blur');
    };

    // global size
    const size = toRef(props, 'size');
    const sizeRef = useSize(size, 'medium', {
      small: 'medium',
      middle: 'medium',
    });

    // form disabled inject
    const formDisabled = inject(HFormDisabledInjectedKey, undefined);
    const isDisabled = computed(() => propDisabled?.value ?? formDisabled?.value);

    provide(
      HCheckboxGroupInjectedKey,
      reactive({
        value: computed(() => propModelValue.value || false),
        changeEvent: handleChange,
        blurEvent: handleBlur,
        size: computed(() => sizeRef.value),
        disabled: computed(() => isDisabled.value),
        viewable: computed(() => propViewable.value),
      }),
    );

    return () => <div class={[classHelper.block]}>{slots?.default?.()}</div>;
  },
});
