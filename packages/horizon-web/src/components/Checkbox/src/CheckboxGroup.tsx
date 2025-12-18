import { defineComponent, provide, reactive, toRefs, computed, inject, toRef } from 'vue';
import type { CheckboxUnionType } from './utils/types';
import { useCheckboxGroupProps } from './composables/useProps';
import type { LegoSetupContext } from '@aurora/shared';
import { ComponentClassBlock, useNamespace } from '@aurora/shared';
import type { CheckboxEmits } from './composables/useEmits';
import { useCheckboxEmits } from './composables/useEmits';
import type { CheckboxGroupSlots } from './composables/useSlots';
import { useCheckboxGroupSlots } from './composables/useSlots';
import {
  NFormDisabledInjectedKey,
  NFormItemTriggerInjectedKey,
} from '~/components/Form/src/utils/injectedKeys';
import { NCheckboxGroupInjectedKey } from './utils/injectedKeys';
import useSize from '~/utils/useSize';
import { NApplicationCompatibilityInjectedKey } from '~/components/Application/src/utils/injectedKeys';

export default defineComponent({
  name: `${useNamespace()}CheckboxGroup`,
  props: useCheckboxGroupProps,
  emits: useCheckboxEmits,
  slots: useCheckboxGroupSlots,
  setup(props, { slots, emit }: LegoSetupContext<CheckboxEmits, CheckboxGroupSlots>) {
    const {
      modelValue: propModelValue,
      disabled: propDisabled,
      viewable: propViewable,
    } = toRefs(props);
    const classHelper = new ComponentClassBlock('checkbox-group');

    /** formItemTrigger **/
    const formItemTrigger = inject(NFormItemTriggerInjectedKey, undefined);

    const handleChange = (value: Array<CheckboxUnionType>) => {
      emit('update:modelValue', value);
      emit('change', value);
      formItemTrigger?.('change');
    };

    const handleBlur = (evt: FocusEvent) => {
      emit('blur', evt);
      formItemTrigger?.('blur');
    };

    const compatibility = inject(NApplicationCompatibilityInjectedKey, undefined);

    // global size
    const size = toRef(props, 'size');
    const oldStandardSizeRef = useSize(size, 'medium', {
      small: 'medium',
      medium: 'large',
      middle: 'medium',
    });

    const newStandardSizeRef = useSize(size, 'medium', {
      small: 'medium',
      middle: 'medium',
    });

    const sizeRef = computed(() => {
      if (
        compatibility?.value?.split(',').includes('checkbox.size') &&
        props.forceNewestSize === false
      ) {
        return oldStandardSizeRef.value;
      } else {
        return newStandardSizeRef.value;
      }
    });

    // form disabled inject
    const formDisabled = inject(NFormDisabledInjectedKey, undefined);
    const isDisabled = computed(() => propDisabled?.value ?? formDisabled?.value);

    provide(
      NCheckboxGroupInjectedKey,
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
