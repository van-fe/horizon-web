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
  HFormDisabledInjectedKey,
  HFormItemTriggerInjectedKey,
} from '~/components/Form/src/utils/injectedKeys';
import { HCheckboxGroupInjectedKey } from './utils/injectedKeys';
import useSize from '~/utils/useSize';

export default defineComponent({
  name: `${useNamespace()}Checkbox`,
  desc: '一组备选项中进行多选',
  descLocales: { en: 'Checkbox controls for selecting one or more options.' },
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
    const HCheckboxGroup = inject(HCheckboxGroupInjectedKey, undefined);
    const isGroup = computed(() => !!HCheckboxGroup);
    const viewable = computed(() =>
      isGroup.value ? HCheckboxGroup!.viewable : propViewable.value,
    );
    const modelValue = computed(() =>
      isGroup.value && HCheckboxGroup!.value !== false
        ? HCheckboxGroup!.value
        : propModelValue.value,
    );
    const size = computed(() => (isGroup.value ? HCheckboxGroup!.size : propSize.value));

    const sizeRef = useSize(size, 'medium', {
      small: 'medium',
      middle: 'medium',
    });

    // form disabled inject
    const formDisabled = inject(HFormDisabledInjectedKey, undefined);
    const isDisabled = computed(
      () => HCheckboxGroup?.disabled ?? propDisabled.value ?? formDisabled?.value ?? false,
    );

    /** formItemTrigger **/
    const formItemTrigger = inject(HFormItemTriggerInjectedKey, undefined);

    const changeCheckbox = () => {
      handleChange(
        modelValue.value,
        propLabel.value,
        emit,
        HCheckboxGroup,
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
      handleBlur(evt, emit, HCheckboxGroup, formItemTrigger);
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
