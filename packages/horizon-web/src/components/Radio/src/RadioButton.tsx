import { defineComponent, inject, computed, toRefs, provide } from 'vue';
import { useRadioButtonProps, handleChange, handleBlur } from './composables/useProps';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { useColors } from '~/globalMethods';
import Radio from './composables/useRadio';
import type { RadioEmits } from './composables/useEmits';
import { useRadioEmits } from './composables/useEmits';
import {
  HFormDisabledInjectedKey,
  HFormItemTriggerInjectedKey,
} from '~/components/Form/src/utils/injectedKeys';
import { HRadioGroupInjectedKey } from '~/components/Radio/src/utils/injectedKeys';
import type { RadioSlots } from './composables/useSlots';
import { useRadioSlots } from './composables/useSlots';
import useSize from '~/utils/useSize';

export default defineComponent({
  name: `${useNamespace()}RadioButton`,
  components: { Radio },
  props: useRadioButtonProps,
  emits: useRadioEmits,
  slots: useRadioSlots,
  setup(props, { slots, emit }: HorizonWebSetupContext<RadioEmits, RadioSlots>) {
    const {
      modelValue: propModelValue,
      disabled: propDisabled,
      viewable: propViewable,
      size: propSize,
      value: propValue,
      fill: propFill,
      name: propName,
    } = toRefs(props);
    const classHelper = new ComponentClassBlock('radio-button');
    const HRadioGroup = inject(HRadioGroupInjectedKey, undefined);
    provide('type', 'radio-button');
    const isGroup = computed(() => !!HRadioGroup);

    // form disabled inject
    const formDisabled = inject(HFormDisabledInjectedKey, undefined);
    const isDisabled = computed(
      () => HRadioGroup?.disabled ?? propDisabled?.value ?? formDisabled?.value ?? false,
    );
    const radioButtonValue = computed(() => propValue.value);

    const viewable = computed(() => (isGroup.value ? HRadioGroup!.viewable : propViewable.value));
    const size = computed(() => (isGroup.value ? HRadioGroup!.size : propSize.value));

    // global size
    const sizeRef = useSize(size, 'medium', {
      small: 'medium',
      middle: 'medium',
    });

    // form-item validate trigger
    const formItemTrigger = inject(HFormItemTriggerInjectedKey, undefined);

    const modelValue = computed(() => (isGroup.value ? HRadioGroup!.value : propModelValue.value));
    const color = computed(() => useColors(propFill.value));
    const changeRadioButton = () => {
      handleChange(radioButtonValue.value, emit, HRadioGroup, formItemTrigger);
    };

    function onBlur(e: FocusEvent) {
      handleBlur(e, emit, HRadioGroup, formItemTrigger);
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
          viewable.value && 'h-radio--viewable',
        ]}
        style={{
          backgroundColor: color.value,
          borderColor: color.value,
        }}
        modelValue={modelValue.value}
        disabled={isDisabled.value}
        value={radioButtonValue.value}
        viewable={viewable.value}
        name={propName.value ?? HRadioGroup?.name}
        onChangeInput={changeRadioButton}
        onBlur={onBlur}
      >
        {slots?.default?.() || radioButtonValue.value}
      </Radio>
    );
  },
});
