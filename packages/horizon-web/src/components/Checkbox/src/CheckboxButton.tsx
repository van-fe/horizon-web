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
  HFormDisabledInjectedKey,
  HFormItemTriggerInjectedKey,
} from '~/components/Form/src/utils/injectedKeys';
import { HCheckboxGroupInjectedKey } from './utils/injectedKeys';
import useSize from '~/utils/useSize';

export default defineComponent({
  name: `${useNamespace()}CheckboxButton`,
  desc: "按钮样式的多选项",
  descLocales: { en: "A button-styled checkbox option." },
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

    const HCheckboxGroup = inject(HCheckboxGroupInjectedKey, undefined);

    provide('type', 'checkbox-button');
    const isGroup = computed(() => !!HCheckboxGroup);
    const viewable = computed(() =>
      isGroup.value ? HCheckboxGroup!.viewable : propViewable.value,
    );
    const size = computed(() => (isGroup.value ? HCheckboxGroup!.size : propSize.value));

    // global size
    const sizeRef = useSize(size, 'medium', {
      small: 'medium',
      middle: 'medium',
    });

    const modelValue = computed(() =>
      isGroup.value && HCheckboxGroup!.value !== false
        ? HCheckboxGroup!.value
        : propModelValue.value,
    );
    const color = computed(() => useColors(propFill.value));

    // form disabled inject
    const formDisabled = inject(HFormDisabledInjectedKey, undefined);
    const isDisabled = computed(
      () => HCheckboxGroup?.disabled ?? propDisabled.value ?? formDisabled?.value ?? false,
    );

    /** formItemTrigger **/
    const formItemTrigger = inject(HFormItemTriggerInjectedKey, undefined);

    const changeCheckboxButton = () => {
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
