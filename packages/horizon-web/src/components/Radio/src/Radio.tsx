import { computed, defineComponent, inject, toRefs } from 'vue';
import { useRadioProps, handleChange, handleBlur } from './composables/useProps';
import Radio from './composables/useRadio';
import { cls, ComponentClassBlock, useNamespace } from '@aurora/utils';
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
import { HApplicationCompatibilityInjectedKey } from '~/components/Application/src/utils/injectedKeys';

export default defineComponent({
  name: `${useNamespace()}Radio`,
  desc: 'Radio 用来在一组备选项中进行单选',
  components: { Radio },
  props: useRadioProps,
  emits: useRadioEmits,
  slots: useRadioSlots,
  setup(props, { slots, emit }: HorizonWebSetupContext<RadioEmits, RadioSlots>) {
    const {
      modelValue: propModelValue,
      border: propBorder,
      disabled: propDisabled,
      viewable: propViewable,
      label: propLabel,
      value: propValue,
      size: propSize,
      name: propName,
    } = toRefs(props);
    const classHelper = new ComponentClassBlock('radio');
    const HRadioGroup = inject(HRadioGroupInjectedKey, undefined);
    const isGroup = computed(() => !!HRadioGroup);

    const radioValue = computed(() => {
      return propValue.value !== '' ? propValue.value : propLabel.value;
    });

    // form disabled inject
    const formDisabled = inject(HFormDisabledInjectedKey, undefined);
    const isDisabled = computed(
      () => HRadioGroup?.disabled ?? propDisabled?.value ?? formDisabled?.value ?? false,
    );

    const viewable = computed(() => (isGroup.value ? HRadioGroup!.viewable : propViewable.value));

    const size = computed(() => (isGroup.value ? HRadioGroup!.size : propSize.value));

    const compatibility = inject(HApplicationCompatibilityInjectedKey, undefined);

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
    const formItemTrigger = inject(HFormItemTriggerInjectedKey, undefined);

    const modelValue = computed(() => (isGroup.value ? HRadioGroup!.value : propModelValue.value));
    const changeRadio = () => {
      handleChange(radioValue.value, emit, HRadioGroup, formItemTrigger);
    };

    function onBlur(e: FocusEvent) {
      handleBlur(e, emit, HRadioGroup, formItemTrigger);
    }

    return () => (
      <Radio
        class={cls(
          classHelper.block,
          classHelper.m('checked', modelValue.value === radioValue.value),
          classHelper.m('border', propBorder.value),
          classHelper.m('disabled', isDisabled.value),
          classHelper.m(sizeRef.value as string, propBorder.value),
          classHelper.m('viewable', viewable.value),
        )}
        modelValue={modelValue.value}
        disabled={isDisabled.value}
        value={radioValue.value}
        viewable={viewable.value}
        name={propName.value ?? HRadioGroup?.name}
        onBlur={onBlur}
        onChangeInput={changeRadio}
      >
        {slots?.default?.() || radioValue.value}
      </Radio>
    );
  },
});
