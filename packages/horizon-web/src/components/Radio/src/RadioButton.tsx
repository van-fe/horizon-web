import { defineComponent, inject, computed, toRefs, provide } from 'vue';
import { useRadioButtonProps, handleChange, handleBlur } from './composables/useProps';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import type { LegoSetupContext } from '@aurora/utils';
import { useColors } from '~/globalMethods';
import Radio from './composables/useRadio';
import type { RadioEmits } from './composables/useEmits';
import { useRadioEmits } from './composables/useEmits';
import {
  NFormDisabledInjectedKey,
  NFormItemTriggerInjectedKey,
} from '~/components/Form/src/utils/injectedKeys';
import { NRadioGroupInjectedKey } from '~/components/Radio/src/utils/injectedKeys';
import type { RadioSlots } from './composables/useSlots';
import { useRadioSlots } from './composables/useSlots';
import useSize from '~/utils/useSize';
import { NApplicationCompatibilityInjectedKey } from '~/components/Application/src/utils/injectedKeys';

export default defineComponent({
  name: `${useNamespace()}RadioButton`,
  components: { Radio },
  props: useRadioButtonProps,
  emits: useRadioEmits,
  slots: useRadioSlots,
  setup(props, { slots, emit }: LegoSetupContext<RadioEmits, RadioSlots>) {
    const {
      modelValue: propModelValue,
      disabled: propDisabled,
      viewable: propViewable,
      size: propSize,
      label: propLabel,
      value: propValue,
      fill: propFill,
      name: propName,
    } = toRefs(props);
    const classHelper = new ComponentClassBlock('radio-button');
    const NRadioGroup = inject(NRadioGroupInjectedKey, undefined);
    provide('type', 'radio-button');
    const isGroup = computed(() => !!NRadioGroup);

    // form disabled inject
    const formDisabled = inject(NFormDisabledInjectedKey, undefined);
    const isDisabled = computed(
      () => NRadioGroup?.disabled ?? propDisabled?.value ?? formDisabled?.value ?? false,
    );
    const radioButtonValue = computed(() => propValue.value || propLabel.value);

    const viewable = computed(() => (isGroup.value ? NRadioGroup!.viewable : propViewable.value));
    const size = computed(() => (isGroup.value ? NRadioGroup!.size : propSize.value));

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

    const modelValue = computed(() => (isGroup.value ? NRadioGroup!.value : propModelValue.value));
    const color = computed(() => useColors(propFill.value));
    const changeRadioButton = () => {
      handleChange(radioButtonValue.value, emit, NRadioGroup, formItemTrigger);
    };

    function onBlur(e: FocusEvent) {
      handleBlur(e, emit, NRadioGroup, formItemTrigger);
    }

    return () => (
      <Radio
        class={[
          classHelper.block,
          modelValue.value === radioButtonValue.value
            ? isDisabled.value
              ? classHelper.m('checked-disabled')
              : classHelper.m('checked')
            : isDisabled.value && classHelper.m('disabled'),
          classHelper.m(sizeRef.value as string),
          viewable.value && 'n-radio--viewable',
        ]}
        style={{
          backgroundColor: color.value,
          borderColor: color.value,
        }}
        modelValue={modelValue.value}
        disabled={isDisabled.value}
        value={radioButtonValue.value}
        viewable={viewable.value}
        name={propName.value ?? NRadioGroup?.name}
        onChangeInput={changeRadioButton}
        onBlur={onBlur}
      >
        {slots?.default?.() || radioButtonValue.value}
      </Radio>
    );
  },
});
