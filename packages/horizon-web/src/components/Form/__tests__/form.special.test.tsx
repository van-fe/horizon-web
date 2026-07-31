import { describe, test, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import type { HFormInstance } from '~/components/Form/src/composables/useProps';
import HForm from '~/components/Form/src/Form';
import HFormItem from '~/components/Form/src/FormItem';
import { nextTick, ref } from 'vue';
import HInput from '~/components/Input/src/Input';
import { sleep } from '~/utils/tools';
import {
  HCascader,
  HColorPicker,
  HDatePicker,
  HInputNumber,
  HOption,
  HSelect,
  HTimePicker,
  HTreeSelect,
} from '~/components';
import HPickerInput from '~/components/Picker/src/components/PickerInput';

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

    const formRef = ref<HFormInstance | null>(null);

    const wrapper = mount(() => (
      <HForm ref={formRef} model={formData.value}>
        <HFormItem prop="username" required={true}>
          <HInput v-model={formData.value.username} />
        </HFormItem>
        <HFormItem prop="age" required={true}>
          <HInputNumber v-model={formData.value.age} />
        </HFormItem>
        <HFormItem prop="date" required={true}>
          <HDatePicker v-model={formData.value.date} />
        </HFormItem>
        <HFormItem prop="dateRange" required={true}>
          <HDatePicker v-model={formData.value.dateRange} type="daterange" class="range-picker" />
        </HFormItem>
        <HFormItem prop="time" required={true}>
          <HTimePicker v-model={formData.value.time} />
        </HFormItem>
        <HFormItem prop="color" required={true}>
          <HColorPicker modelValue={formData.value.color as string} />
        </HFormItem>
        <HFormItem prop="color" required={true}>
          <HColorPicker modelValue={formData.value.color as string} trigger-type="square" />
        </HFormItem>
        <HFormItem prop="select" required={true}>
          <HSelect modelValue={formData.value.color as string} trigger-type="square">
            <HOption value={1} label={1} />
          </HSelect>
        </HFormItem>
        <HFormItem prop="cascader" required={true}>
          <HCascader
            modelValue={formData.value.cascader as string[]}
            options={[{ value: 'guide', label: 'Guide', children: [] }]}
          />
        </HFormItem>
        <HFormItem prop="treeSelect" required={true}>
          <HTreeSelect v-model={formData.value.treeSelect} treeData={baseTreeData.value} />
        </HFormItem>
      </HForm>
    ));

    try {
      await formRef.value?.validate();
    } catch (e) {
      console.debug(e);
    }

    await nextTick();

    expect(wrapper.findComponent(HInput).classes('h-input__error--normal')).toBeTruthy();
    expect(wrapper.findComponent(HInputNumber).classes('is-error')).toBeTruthy();
    expect(
      wrapper.findComponent(HSelect).findComponent(HPickerInput).classes('is-error'),
    ).toBeTruthy();
    expect(
      wrapper.findComponent(HTimePicker).findComponent(HInput).classes('is-error'),
    ).toBeTruthy();
    expect(
      wrapper.findComponent(HCascader).findComponent(HPickerInput).classes('is-error'),
    ).toBeTruthy();
    expect(
      wrapper.findComponent(HTreeSelect).findComponent(HPickerInput).classes('is-error'),
    ).toBeTruthy();

    // two kind of date-picker
    const datePickers = wrapper.findAllComponents(HDatePicker);
    const datePicker = datePickers.find(curr => !curr.classes('range-picker'));
    const dateRangePicker = datePickers.find(curr => curr.classes('range-picker'));

    expect(datePicker?.exists()).toBeTruthy();
    expect(dateRangePicker?.exists()).toBeTruthy();

    expect(datePicker?.findComponent(HPickerInput).classes('is-error')).toBeTruthy();
    expect(dateRangePicker?.findComponent(HPickerInput).classes('is-error')).toBeTruthy();

    // two kind of color-picker
    const colorPickers = wrapper.findAllComponents(HColorPicker);

    expect(colorPickers[0].findComponent(HPickerInput).classes('is-error')).toBeTruthy();
    expect(colorPickers[1].findComponent(HPickerInput).classes('is-error')).toBeTruthy();
  });

  test('item validate-trigger set false do not trigger validate', async () => {
    const form = ref({
      a: '1',
    });

    const onValidate = vi.fn();

    const wrapper = mount(
      () => (
        <HForm model={form.value} onValidate={onValidate}>
          <HFormItem prop="a" validateTrigger={false} required={true}>
            <HInput v-model={form.value.a} />
          </HFormItem>
        </HForm>
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
