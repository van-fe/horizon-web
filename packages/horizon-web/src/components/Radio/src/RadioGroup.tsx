import { computed, defineComponent, inject, provide, reactive, toRefs } from 'vue';
import type { RadioGroupPropsProvideType } from './composables/useProps';
import { useRadioGroupProps } from './composables/useProps';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import type { HorizonWebSetupContext } from '@aurora/utils';
import type { RadioEmits } from './composables/useEmits';
import { useRadioEmits } from './composables/useEmits';
import type { RadioSlots } from './composables/useSlots';
import { useRadioSlots } from './composables/useSlots';
import {
  HFormDisabledInjectedKey,
  HFormItemTriggerInjectedKey,
} from '~/components/Form/src/utils/injectedKeys';
import { HRadioGroupInjectedKey } from './utils/injectedKeys';
import useSize from '~/utils/useSize';

export default defineComponent({
  name: `${useNamespace()}RadioGroup`,
  props: useRadioGroupProps,
  emits: useRadioEmits,
  slots: useRadioSlots,
  setup(props, { slots, emit }: HorizonWebSetupContext<RadioEmits, RadioSlots>) {
    const {
      modelValue: propModelValue,
      disabled: propDisabled,
      viewable: propViewable,
      size,
      name: propName,
    } = toRefs(props);

    // global size
    const sizeRef = useSize(size, 'medium', {
      small: 'medium',
      middle: 'medium',
    });

    // form-item validate trigger
    const formItemTrigger = inject(HFormItemTriggerInjectedKey, undefined);

    // form disabled inject
    const formDisabled = inject(HFormDisabledInjectedKey, undefined);
    const isDisabled = computed(() => propDisabled?.value ?? formDisabled?.value);

    const classHelper = new ComponentClassBlock('radio-group');
    const handleChange = (value: string | number | boolean) => {
      emit('update:modelValue', value);
      emit('change', value);
      formItemTrigger?.('change');
    };

    function handleBlur(evt: FocusEvent) {
      emit('blur', evt);
      formItemTrigger?.('blur');
    }

    provide(
      HRadioGroupInjectedKey,
      reactive<RadioGroupPropsProvideType>({
        value: computed(() => propModelValue.value),
        changeEvent: handleChange,
        blurEvent: handleBlur,
        size: sizeRef,
        disabled: computed(() => isDisabled.value),
        viewable: computed(() => propViewable.value),
        name: propName,
      }),
    );

    return () => <div class={[classHelper.block]}>{slots?.default?.()}</div>;
  },
});
