import { computed, defineComponent, ref } from 'vue';
import type { HorizonWebComponentInstance, HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, isNil, useNamespace } from '@aurora/utils';
import HSelect from '~/components/Select/src/Select';
import HOption from '~/components/Select/src/Option';
import type { SelectExposes } from '~/components/Select/src/composables/useExposes';
import { useTimeSelectProps } from './composables/useProps';
import type { TimeSelectModelValue, TimeSelectProps } from './composables/useProps';
import { useTimeSelectEmits } from './composables/useEmits';
import type { TimeSelectEmits } from './composables/useEmits';
import { useTimeSelectSlots } from './composables/useSlots';
import type { TimeSelectSlots } from './composables/useSlots';
import { useTimeSelectExposes } from './composables/useExposes';
import type { TimeSelectExposes } from './composables/useExposes';
import { createTimeSelectOptions } from './utils/time';

export default defineComponent({
  name: `${useNamespace()}TimeSelect`,
  desc: '从固定时间间隔生成的选项中选择时间',
  descLocales: { en: 'Select a time from options generated at fixed intervals.' },
  props: useTimeSelectProps,
  emits: useTimeSelectEmits,
  slots: useTimeSelectSlots,
  exposes: useTimeSelectExposes,
  setup(
    props: TimeSelectProps,
    context: HorizonWebSetupContext<TimeSelectEmits, TimeSelectSlots, TimeSelectExposes>,
  ) {
    const classHelper = new ComponentClassBlock('time-select');
    const selectRef = ref<HorizonWebComponentInstance<typeof HSelect, SelectExposes>>();
    const options = computed(() => createTimeSelectOptions(props));

    function normalizeValue(value: unknown): TimeSelectModelValue {
      return typeof value === 'string' || isNil(value) ? value : undefined;
    }

    context.expose({
      focus: () => selectRef.value?.focus(),
      blur: () => selectRef.value?.blur(),
      clear: () => selectRef.value?.clear(),
      changePanelVisible: (visible: boolean) => selectRef.value?.changePanelVisible(visible),
    });

    return () => (
      <HSelect
        ref={selectRef}
        class={cls(classHelper.block)}
        modelValue={props.modelValue}
        disabled={props.disabled}
        clearable={props.clearable}
        filterable={props.editable}
        searchIcon={false}
        size={props.size}
        placeholder={props.placeholder}
        inputStyle={props.inputStyle}
        inputStatus={props.inputStatus}
        placement={props.placement}
        toBody={props.toBody}
        fitInputWidth={props.fitInputWidth}
        optionListMaxHeight={props.optionListMaxHeight}
        emptyText={props.emptyText}
        externalPanelClass={props.panelClass}
        externalPanelStyle={props.panelStyle}
        popoverOptions={props.popoverOptions}
        onUpdate:modelValue={value => context.emit('update:modelValue', normalizeValue(value))}
        onChange={(_inputValue, value) => context.emit('change', normalizeValue(value))}
        onFocus={() => context.emit('focus')}
        onBlur={() => context.emit('blur')}
        onClear={() => context.emit('clear')}
        onDropdownVisibleChange={visible => context.emit('dropdownVisibleChange', visible)}
      >
        {{
          default: () =>
            options.value.map(option => (
              <HOption
                key={option.value}
                value={option.value}
                label={option.label}
                disabled={option.disabled}
              />
            )),
          empty: context.slots.empty,
          panelHeaderRender: context.slots.panelHeaderRender,
          panelFooterRender: context.slots.panelFooterRender,
        }}
      </HSelect>
    );
  },
});
