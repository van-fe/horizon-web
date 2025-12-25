import { computed, defineComponent, inject, toRefs } from 'vue';
import type { CheckboxUnionType } from './utils/types';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { useCheckboxProps, handleChange, isChecked, handleBlur } from './composables/useProps';
import { ComponentClassBlock, useNamespace } from '@aurora/utils';
import Checkbox from './composables/useCheckbox';
import type { CheckboxEmits } from './composables/useEmits';
import { useCheckboxEmits } from './composables/useEmits';
import type { CheckboxSlots } from './composables/useSlots';
import type { CheckboxExposes } from './composables/useExposes';
import { useCheckboxExposes } from './composables/useExposes';
import { useCheckboxSlots } from './composables/useSlots';
import {
  NFormDisabledInjectedKey,
  NFormItemTriggerInjectedKey,
} from '~/components/Form/src/utils/injectedKeys';
import { NCheckboxGroupInjectedKey } from './utils/injectedKeys';
import useSize from '~/utils/useSize';
import { NApplicationCompatibilityInjectedKey } from '~/components/Application/src/utils/injectedKeys';

export default defineComponent({
  name: `${useNamespace()}Checkbox`,
  desc: '一组备选项中进行多选',
  components: { Checkbox },
  props: useCheckboxProps,
  emits: useCheckboxEmits,
  slots: useCheckboxSlots,
  exposes: useCheckboxExposes,
  setup(
    props,
    { slots, expose, emit }: HorizonWebSetupContext<CheckboxEmits, CheckboxSlots, CheckboxExposes>,
  ) {
    const {
      modelValue: propModelValue,
      border: propBorder,
      disabled: propDisabled,
      viewable: propViewable,
      indeterminate: propIndeterminate,
      label: propLabel,
      trueLabel: propTrueLabel,
      falseLabel: propFalseLabel,
      size: propSize,
    } = toRefs(props);
    const classHelper = new ComponentClassBlock('checkbox');
    const NCheckboxGroup = inject(NCheckboxGroupInjectedKey, undefined);
    const isGroup = computed(() => !!NCheckboxGroup);
    const viewable = computed(() =>
      isGroup.value ? NCheckboxGroup!.viewable : propViewable.value,
    );
    const modelValue = computed(() =>
      isGroup.value && NCheckboxGroup!.value !== false
        ? NCheckboxGroup!.value
        : propModelValue.value,
    );
    const size = computed(() => (isGroup.value ? NCheckboxGroup!.size : propSize.value));

    const compatibility = inject(NApplicationCompatibilityInjectedKey, undefined);

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
    const isDisabled = computed(
      () => NCheckboxGroup?.disabled ?? propDisabled.value ?? formDisabled?.value ?? false,
    );

    /** formItemTrigger **/
    const formItemTrigger = inject(NFormItemTriggerInjectedKey, undefined);

    const changeCheckbox = () => {
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

    const toggle = () => {
      changeCheckbox();
    };

    expose({
      toggle,
    });

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
          ) && classHelper.m('checked'),
          propBorder.value && classHelper.m('border'),
          propBorder.value && classHelper.m(sizeRef.value),
          isDisabled.value && classHelper.m('disabled'),
          viewable.value && classHelper.m('viewable'),
          propIndeterminate.value && classHelper.m('indeterminate'),
        ]}
        modelValue={modelValue.value}
        disabled={isDisabled.value}
        indeterminate={propIndeterminate.value}
        label={propLabel.value}
        trueLabel={propTrueLabel.value}
        viewable={viewable.value}
        onClick={(evt: MouseEvent) => emit('click', evt)}
        onChangeInput={changeCheckbox}
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
