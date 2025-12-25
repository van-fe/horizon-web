import type { HorizonWebSetupContext } from '@aurora/utils';
import { defineComponent, inject, computed, toRefs, provide } from 'vue';
import type { CheckboxUnionType } from './utils/types';
import {
  useCheckboxButtonProps,
  handleChange,
  isChecked,
  handleBlur,
} from './composables/useProps';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import { useColors } from '~/globalMethods';
import Checkbox from './composables/useCheckbox';
import type { CheckboxEmits } from './composables/useEmits';
import { useCheckboxEmits } from './composables/useEmits';
import type { CheckboxButtonSlots } from './composables/useSlots';
import { useCheckboxButtonSlots } from './composables/useSlots';
import {
  NFormDisabledInjectedKey,
  NFormItemTriggerInjectedKey,
} from '~/components/Form/src/utils/injectedKeys';
import { NCheckboxGroupInjectedKey } from './utils/injectedKeys';
import useSize from '~/utils/useSize';
import { NApplicationCompatibilityInjectedKey } from '~/components/Application/src/utils/injectedKeys';

export default defineComponent({
  name: `${useNamespace()}CheckboxButton`,
  components: { Checkbox },
  props: useCheckboxButtonProps,
  emits: useCheckboxEmits,
  slots: useCheckboxButtonSlots,
  setup(props, { slots, emit }: HorizonWebSetupContext<CheckboxEmits, CheckboxButtonSlots>) {
    const {
      modelValue: propModelValue,
      disabled: propDisabled,
      viewable: propViewable,
      size: propSize,
      label: propLabel,
      trueLabel: propTrueLabel,
      falseLabel: propFalseLabel,
      fill: propFill,
    } = toRefs(props);
    const classHelper = new ComponentClassBlock('checkbox-button');

    const NCheckboxGroup = inject(NCheckboxGroupInjectedKey, undefined);

    provide('type', 'checkbox-button');
    const isGroup = computed(() => !!NCheckboxGroup);
    const viewable = computed(() =>
      isGroup.value ? NCheckboxGroup!.viewable : propViewable.value,
    );
    const size = computed(() => (isGroup.value ? NCheckboxGroup!.size : propSize.value));

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
        compatibility?.value?.split(',').includes('checkbox.size') &&
        props.forceNewestSize === false
      ) {
        return oldStandardSizeRef.value;
      } else {
        return newStandardSizeRef.value;
      }
    });

    const modelValue = computed(() =>
      isGroup.value && NCheckboxGroup!.value !== false
        ? NCheckboxGroup!.value
        : propModelValue.value,
    );
    const color = computed(() => useColors(propFill.value));

    // form disabled inject
    const formDisabled = inject(NFormDisabledInjectedKey, undefined);
    const isDisabled = computed(
      () => NCheckboxGroup?.disabled ?? propDisabled.value ?? formDisabled?.value ?? false,
    );

    /** formItemTrigger **/
    const formItemTrigger = inject(NFormItemTriggerInjectedKey, undefined);

    const changeCheckboxButton = () => {
      handleChange(
        modelValue.value,
        propLabel.value,
        emit,
        NCheckboxGroup,
        formItemTrigger,
        propTrueLabel.value,
        propFalseLabel.value,
      );
    };

    const onBlur = (evt: FocusEvent) => {
      handleBlur(evt, emit, NCheckboxGroup, formItemTrigger);
    };

    return () => (
      <Checkbox
        class={[
          classHelper.block,
          isChecked(
            modelValue.value as CheckboxUnionType | CheckboxUnionType[],
            propLabel.value,
            propTrueLabel.value,
          )
            ? isDisabled.value
              ? classHelper.m('checked-disabled')
              : classHelper.m('checked')
            : classHelper.m('disabled', isDisabled.value),
          classHelper.m(sizeRef.value),
          viewable.value && `${useNamespace()}-checkbox--viewable`,
        ]}
        style={{
          backgroundColor: color.value,
          borderColor: color.value,
        }}
        modelValue={modelValue.value}
        disabled={isDisabled.value}
        label={propLabel.value}
        trueLabel={propTrueLabel.value}
        viewable={viewable.value}
        onChangeInput={changeCheckboxButton}
        onBlur={onBlur}
      >
        {slots?.default?.() ||
          propLabel.value ||
          (isChecked(
            modelValue.value as CheckboxUnionType | CheckboxUnionType[],
            propLabel.value,
            propTrueLabel.value,
          )
            ? propTrueLabel.value
            : propFalseLabel.value)}
      </Checkbox>
    );
  },
});
