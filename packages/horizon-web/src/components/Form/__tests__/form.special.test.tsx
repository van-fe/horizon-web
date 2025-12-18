import { describe, test, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import type { NFormInstance } from '~/components/Form/src/composables/useProps';
import NForm from '~/components/Form/src/Form';
import NFormItem from '~/components/Form/src/FormItem';
import { nextTick, ref } from 'vue';
import NInput from '~/components/Input/src/Input';
import { sleep } from '~/utils/tools';
import {
  NCascader,
  NColorPicker,
  NDatePicker,
  NInputNumber,
  NOption,
  NSelect,
  NTimePicker,
  NTreeSelect,
} from '~/components';
import NPickerInput from '~/components/Picker/src/components/NPickerInput';
import NPanelTrigger from '~/components/DatePicker/src/calendar-components/panel-trigger';

const baseTreeData = ref([]);

describe('Form.tsx special', () => {
  test('check all form components whether can set error class to itself', async () => {
    const formData = ref<Record<string, unknown>>({
      username: '',
      age: null,
      date: '',
      dateRange: [],
      time: '',
      color: '',
      select: '',
      cascader: [],
      treeSelect: '',
    });

    const formRef = ref<NFormInstance | null>(null);

    const wrapper = mount(() => (
      <NForm ref={formRef} model={formData.value}>
        <NFormItem prop="username" required={true}>
          <NInput v-model={formData.value.username} />
        </NFormItem>
        <NFormItem prop="age" required={true}>
          <NInputNumber v-model={formData.value.age} />
        </NFormItem>
        <NFormItem prop="date" required={true}>
          <NDatePicker v-model={formData.value.date} />
        </NFormItem>
        <NFormItem prop="dateRange" required={true}>
          <NDatePicker v-model={formData.value.dateRange} type="daterange" class="range-picker" />
        </NFormItem>
        <NFormItem prop="time" required={true}>
          <NTimePicker v-model={formData.value.time} />
        </NFormItem>
        <NFormItem prop="color" required={true}>
          <NColorPicker modelValue={formData.value.color as string} />
        </NFormItem>
        <NFormItem prop="color" required={true}>
          <NColorPicker modelValue={formData.value.color as string} trigger-type="square" />
        </NFormItem>
        <NFormItem prop="select" required={true}>
          <NSelect modelValue={formData.value.color as string} trigger-type="square">
            <NOption value={1} label={1} />
          </NSelect>
        </NFormItem>
        <NFormItem prop="cascader" required={true}>
          <NCascader
            modelValue={formData.value.cascader as string[]}
            options={[{ value: 'guide', label: 'Guide', children: [] }]}
          />
        </NFormItem>
        <NFormItem prop="treeSelect" required={true}>
          <NTreeSelect v-model={formData.value.treeSelect} treeData={baseTreeData.value} />
        </NFormItem>
      </NForm>
    ));

    try {
      await formRef.value?.validate();
    } catch (e) {}

    await nextTick();

    expect(wrapper.findComponent(NInput).classes('n-input__error--normal')).toBeTruthy();
    expect(wrapper.findComponent(NInputNumber).classes('is-error')).toBeTruthy();
    expect(
      wrapper.findComponent(NSelect).findComponent(NPickerInput).classes('is-error'),
    ).toBeTruthy();
    expect(
      wrapper.findComponent(NTimePicker).findComponent(NInput).classes('n-input__error--normal'),
    ).toBeTruthy();
    expect(
      wrapper.findComponent(NCascader).findComponent(NPickerInput).classes('is-error'),
    ).toBeTruthy();
    expect(
      wrapper.findComponent(NTreeSelect).findComponent(NPickerInput).classes('is-error'),
    ).toBeTruthy();

    // two kind of date-picker
    const datePickers = wrapper.findAllComponents(NDatePicker);
    const datePicker = datePickers.find(curr => !curr.classes('range-picker'));
    const dateRangePicker = datePickers.find(curr => curr.classes('range-picker'));

    expect(datePicker?.exists()).toBeTruthy();
    expect(dateRangePicker?.exists()).toBeTruthy();

    expect(datePicker?.findComponent(NInput).classes('n-input__error--normal')).toBeTruthy();
    expect(dateRangePicker?.findComponent(NPanelTrigger).classes('is-error')).toBeTruthy();

    // two kind of color-picker
    const colorPickers = wrapper.findAllComponents(NColorPicker);

    expect(colorPickers[0].findComponent(NPickerInput).classes('is-error')).toBeTruthy();
    expect(colorPickers[1].findComponent(NPickerInput).classes('is-error')).toBeTruthy();
  });

  test('item validate-trigger set false do not trigger validate', async () => {
    const form = ref({
      a: '1',
    });

    const onValidate = vi.fn();

    const wrapper = mount(
      () => (
        <NForm model={form.value} onValidate={onValidate}>
          <NFormItem prop="a" validateTrigger={false} required={true}>
            <NInput v-model={form.value.a} />
          </NFormItem>
        </NForm>
      ),
      {
        attachTo: document.body,
      },
    );

    const input = wrapper.find('input');
    await input.setValue('');

    await sleep();

    expect(onValidate).toHaveBeenCalledTimes(0);
  });
});
