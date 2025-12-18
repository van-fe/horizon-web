import { computed, defineComponent, inject, provide, reactive, toRefs } from 'vue';
import type { RadioGroupPropsProvideType } from './composables/useProps';
import { useRadioGroupProps } from './composables/useProps';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import type { LegoSetupContext } from '@aurora/utils';
import type { RadioEmits } from './composables/useEmits';
import { useRadioEmits } from './composables/useEmits';
import type { RadioSlots } from './composables/useSlots';
import { useRadioSlots } from './composables/useSlots';
import {
  NFormDisabledInjectedKey,
  NFormItemTriggerInjectedKey,
} from '~/components/Form/src/utils/injectedKeys';
import { NRadioGroupInjectedKey } from './utils/injectedKeys';
import useSize from '~/utils/useSize';
import { NApplicationCompatibilityInjectedKey } from '~/components/Application/src/utils/injectedKeys';

export default defineComponent({
  name: `${useNamespace()}RadioGroup`,
  props: useRadioGroupProps,
  emits: useRadioEmits,
  slots: useRadioSlots,
  setup(props, { slots, emit }: LegoSetupContext<RadioEmits, RadioSlots>) {
    const {
      modelValue: propModelValue,
      disabled: propDisabled,
      viewable: propViewable,
      size,
      name: propName,
    } = toRefs(props);

    const compatibility = inject(NApplicationCompatibilityInjectedKey, undefined);

    // global size
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
        compatibility?.value?.split(',').includes('radio.size') &&
        props.forceNewestSize === false
      ) {
        return oldStandardSizeRef.value;
      } else {
        return newStandardSizeRef.value;
      }
    });

    // form-item validate trigger
    const formItemTrigger = inject(NFormItemTriggerInjectedKey, undefined);

    // form disabled inject
    const formDisabled = inject(NFormDisabledInjectedKey, undefined);
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
      NRadioGroupInjectedKey,
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
