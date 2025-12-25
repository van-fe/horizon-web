import { mount, shallowMount } from '@vue/test-utils';
import type { HFormInstance, HFormRule } from '../index';
import { HForm, HFormItem } from '../index';
import {
  HInput,
  HInputNumber,
  HDatePicker,
  HTimePicker,
  HColorPicker,
  HSelect,
  HOption,
  HCascader,
  HTreeSelect,
  HTag,
} from '../../index';
import { describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import HPickerInput from '../../Picker/src/components/PickerInput';
import baseTreeData from '../../Cascader/__tests__/options.json';
import type { FormProps } from '../src/composables/useProps';

describe('Form.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <HForm />);
    const element = wrapper.findComponent(HForm);

    await expect(element.exists()).toBeTruthy();
  });

  describe('props', () => {
    test('size', async () => {
      const size = ref<'small' | 'medium' | 'large'>('medium');
      const wrapper = mount(() => <HForm size={size.value} />);
      const element = wrapper.findComponent(HForm);

      await expect(element.classes(`n-form--${size.value}`)).toBeTruthy();
      size.value = 'large';

      await nextTick();

      await expect(element.classes(`n-form--${size.value}`)).toBeTruthy();
    });

    test('check form.size whether can affect inside components.size', async () => {
      const size = ref<'small' | 'medium' | 'large'>('small');
      const wrapper = mount(() => (
        <HForm size={size.value}>
          <HFormItem>
            <HInput />
          </HFormItem>
        </HForm>
      ));
      const element = wrapper.findComponent(HInput);

      await expect(element.classes(`n-input--${size.value}`)).toBeTruthy();
    });

    test('validateTrigger', async () => {
      const form = ref({
        name: '',
      });

      const rules: Record<keyof (typeof form)['value'], HFormRule | HFormRule[]> = {
        name: {
          required: true,
          message: 'Required',
        },
      };

      const onValidate = vi.fn();

      const wrapper = mount(() => (
        <HForm model={form.value} rules={rules} validateTrigger="blur" onValidate={onValidate}>
          <HFormItem prop="name">
            <HInput v-model={form.value.name} />
          </HFormItem>
        </HForm>
      ));

      const input = wrapper.findComponent(HInput).find('input');

      await input.trigger('focus');
      await input.trigger('blur');

      expect(onValidate).toHaveBeenCalled();
    });

    test('validateTrigger is array', async () => {
      const form = ref({
        name: '',
      });

      const rules: Record<keyof (typeof form)['value'], HFormRule | HFormRule[]> = {
        name: [
          {
            required: true,
            message: 'Required',
          },
          {
            max: 5,
            message: 'Max',
          },
        ],
      };

      const onValidate = vi.fn();

      const wrapper = mount(() => (
        <HForm
          model={form.value}
          rules={rules}
          validateTrigger={['blur', 'change']}
          onValidate={onValidate}
        >
          <HFormItem prop="name">
            <HInput v-model={form.value.name} />
          </HFormItem>
        </HForm>
      ));

      const input = wrapper.findComponent(HInput).find('input');

      await input.trigger('focus');
      await input.trigger('blur');

      expect(onValidate).toHaveBeenCalledOnce();

      await input.setValue('one word');

      expect(onValidate).toHaveBeenCalledTimes(2);
    });

    test('validateTrigger only trigger on manual', async () => {
      const form = ref({
        name: '',
      });

      const rules: Record<keyof (typeof form)['value'], HFormRule | HFormRule[]> = {
        name: [
          {
            required: true,
            message: 'Required',
          },
          {
            max: 5,
            message: 'Max',
          },
        ],
      };

      const onValidate = vi.fn();
      const formRef = ref<null | HFormInstance>(null);

      const wrapper = mount(() => (
        <HForm
          ref={formRef}
          model={form.value}
          rules={rules}
          validateTrigger={false}
          onValidate={onValidate}
        >
          <HFormItem prop="name">
            <HInput v-model={form.value.name} />
          </HFormItem>
        </HForm>
      ));

      const input = wrapper.findComponent(HInput).find('input');

      await input.trigger('focus');
      await input.trigger('blur');

      expect(onValidate).toHaveBeenCalledTimes(0);

      await input.setValue('one word');

      expect(onValidate).toHaveBeenCalledTimes(0);

      formRef.value
        ?.validate()
        .then()
        .catch(error => {
          expect(error[0].message).eq('Max');
        });

      expect(onValidate).toHaveBeenCalledTimes(1);
    });

    test('disabled', async () => {
      const formData = ref<Record<string, unknown>>({
        username: '',
        age: null,
        date: '',
        time: '',
        color: '',
        select: '',
        cascader: [],
        treeSelect: '',
      });

      const formRef = ref<HFormInstance | null>(null);

      const disabled = ref(true);

      const wrapper = mount(() => (
        <HForm ref={formRef} model={formData.value} disabled={disabled.value}>
          <HFormItem prop="username" required={true}>
            <HInput v-model={formData.value.username} />
          </HFormItem>
          <HFormItem prop="age" required={true}>
            <HInputNumber v-model={formData.value.age} />
          </HFormItem>
          <HFormItem prop="date" required={true}>
            <HDatePicker v-model={formData.value.date} />
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
            <HTreeSelect v-model={formData.value.treeSelect} treeData={baseTreeData} />
          </HFormItem>
        </HForm>
      ));

      expect(wrapper.findComponent(HInput).html()).contains('disabled');
      expect(wrapper.findComponent(HInputNumber).html()).contains('disabled');
      expect(wrapper.findComponent(HDatePicker).html()).contains('disabled');
      expect(wrapper.findComponent(HTimePicker).html()).contains('disabled');
      expect(wrapper.findComponent(HColorPicker).html()).contains('disabled');
      expect(wrapper.findComponent(HSelect).html()).contains('disabled');
      expect(wrapper.findComponent(HSelect).html()).contains('disabled');
      expect(wrapper.findComponent(HTreeSelect).html()).contains('disabled');

      disabled.value = false;

      await nextTick();

      expect(wrapper.findComponent(HInput).html()).not.contains('disabled');
      expect(wrapper.findComponent(HInputNumber).html()).not.contains('disabled');
      expect(wrapper.findComponent(HDatePicker).html()).not.contains('disabled');
      expect(wrapper.findComponent(HTimePicker).html()).not.contains('disabled');
      expect(wrapper.findComponent(HColorPicker).html()).not.contains('disabled');
      expect(wrapper.findComponent(HSelect).html()).not.contains('disabled');
      expect(wrapper.findComponent(HSelect).html()).not.contains('disabled');
      expect(wrapper.findComponent(HTreeSelect).html()).not.contains('--disabled');
    });

    test('compact', async () => {
      const compact = ref(false);

      const wrapper = mount(() => <HForm compact={compact.value}></HForm>);

      expect(wrapper.classes('is-spacing-compact')).toBeFalsy();
      compact.value = true;
      await nextTick();
      expect(wrapper.classes('is-spacing-compact')).toBeTruthy();
    });

    test('spacing', async () => {
      const spacing = ref<FormProps['spacing']>('default');

      const wrapper = mount(() => <HForm spacing={spacing.value}></HForm>);

      expect(wrapper.classes(`is-spacing-${spacing.value}`)).toBeTruthy();

      spacing.value = 'static';
      await nextTick();
      expect(wrapper.classes(`is-spacing-${spacing.value}`)).toBeTruthy();

      spacing.value = 'compact';
      await nextTick();
      expect(wrapper.classes(`is-spacing-${spacing.value}`)).toBeTruthy();
    });
  });

  describe('methods', () => {
    test('validate', async () => {
      const formData = ref<{
        username: string;
        age: null | number;
      }>({
        username: '',
        age: null,
      });

      const rules: Record<keyof (typeof formData)['value'], HFormRule | HFormRule[]> = {
        username: {
          required: true,
          message: 'error',
        },
        age: [
          {
            required: true,
            message: 'error',
          },
          {
            type: 'number',
            min: 0,
            max: 120,
            message: 'out of range',
          },
        ],
      };

      const formRef = ref<HFormInstance | null>(null);

      mount(() => (
        <HForm ref={formRef} model={formData.value} rules={rules}>
          <HFormItem prop="username">
            <HInput v-model={formData.value.username} />
          </HFormItem>
          <HFormItem prop="age">
            <HInputNumber v-model={formData.value.age} />
          </HFormItem>
        </HForm>
      ));

      await nextTick();

      formRef.value?.validate().catch(err => {
        expect(err).toHaveLength(2);
      });
    });

    test('resetFields', async () => {
      const form = ref({
        name: 'abc',
      });

      const formRef = ref<null | HFormInstance>(null);

      const wrapper = mount(() => (
        <HForm ref={formRef} model={form.value}>
          <HFormItem prop="name">
            <HInput v-model={form.value.name} />
          </HFormItem>
        </HForm>
      ));

      const input = wrapper.findComponent(HInput).find('input');

      await input.setValue('bcd');

      expect(form.value.name).eq('bcd');

      formRef.value?.resetFields();

      await nextTick();

      expect(form.value.name).eq('abc');
    });

    test('disabled', async () => {
      const disabled = ref(true);

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
        <HForm ref={formRef} model={formData.value} disabled={disabled.value}>
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
            <HTreeSelect v-model={formData.value.treeSelect as string} treeData={baseTreeData} />
          </HFormItem>
        </HForm>
      ));

      expect(
        wrapper.findComponent(HInput).find('input').attributes('disabled'),
      ).not.toBeUndefined();
      expect(wrapper.findComponent(HInputNumber).classes('is-disabled')).toBeTruthy();
      expect(
        wrapper.findComponent(HSelect).findComponent(HPickerInput).classes('is-disabled'),
      ).toBeTruthy();
      expect(
        wrapper.findComponent(HTimePicker).find('input').attributes('disabled'),
      ).not.toBeUndefined();
      expect(
        wrapper.findComponent(HCascader).findComponent(HPickerInput).classes('is-disabled'),
      ).toBeTruthy();
      expect(
        wrapper.findComponent(HTreeSelect).findComponent(HPickerInput).classes('is-disabled'),
      ).toBeTruthy();

      // two kind of date-picker
      const datePickers = wrapper.findAllComponents(HDatePicker);
      const datePicker = datePickers.find(curr => !curr.classes('range-picker'));
      const dateRangePicker = datePickers.find(curr => curr.classes('range-picker'));

      expect(datePicker?.exists()).toBeTruthy();
      expect(dateRangePicker?.exists()).toBeTruthy();

      expect(datePicker?.find('input').attributes('disabled')).not.toBeUndefined();
      expect(dateRangePicker?.find('input').attributes('disabled')).not.toBeUndefined();

      // two kind of color-picker
      const colorPickers = wrapper.findAllComponents(HColorPicker);

      expect(colorPickers[0].findComponent(HPickerInput).classes('is-disabled')).toBeTruthy();
      expect(colorPickers[1].findComponent(HPickerInput).classes('is-disabled')).toBeTruthy();

      disabled.value = false;

      await nextTick();

      expect(wrapper.findComponent(HInput).find('input').attributes('disabled')).toBeUndefined();
      expect(wrapper.findComponent(HInputNumber).classes('is-disabled')).toBeFalsy();
      expect(
        wrapper.findComponent(HSelect).findComponent(HPickerInput).classes('is-disabled'),
      ).toBeFalsy();
      expect(
        wrapper.findComponent(HTimePicker).find('input').attributes('disabled'),
      ).toBeUndefined();
      expect(
        wrapper.findComponent(HCascader).findComponent(HPickerInput).classes('is-disabled'),
      ).toBeFalsy();
      expect(
        wrapper.findComponent(HTreeSelect).findComponent(HPickerInput).classes('is-disabled'),
      ).toBeFalsy();

      // two kind of date-picker
      expect(datePicker?.find('input').attributes('disabled')).toBeUndefined();
      expect(dateRangePicker?.find('input').attributes('disabled')).toBeUndefined();

      // two kind of color-picker
      expect(colorPickers[0].findComponent(HPickerInput).classes('is-disabled')).toBeFalsy();
      expect(colorPickers[1].findComponent(HPickerInput).classes('is-disabled')).toBeFalsy();
    });

    test('disabled set form-component inside', async () => {
      const formDisabled = ref<boolean>();
      const disabled = ref<boolean | undefined>(true);

      const formData = ref({
        username: '',
        age: null,
        date: '',
        dateRange: [],
        time: '',
        color: '',
        select: '',
        selectMultiple: [1],
        cascader: [],
        cascaderMultiple: [['guide', 'disciplines', 'feedback']],
        treeSelect: '',
        treeSelectMultiple: ['feedback'],
      });

      const formRef = ref<HFormInstance | null>(null);

      const wrapper = mount(() => (
        <HForm ref={formRef} model={formData.value} disabled={formDisabled.value}>
          <HFormItem prop="username" required={true}>
            <HInput v-model={formData.value.username} disabled={disabled.value} />
          </HFormItem>
          <HFormItem prop="age" required={true}>
            <HInputNumber v-model={formData.value.age} disabled={disabled.value} />
          </HFormItem>
          <HFormItem prop="date" required={true}>
            <HDatePicker v-model={formData.value.date} disabled={disabled.value} />
          </HFormItem>
          <HFormItem prop="dateRange" required={true}>
            <HDatePicker
              v-model={formData.value.dateRange}
              type="daterange"
              class="range-picker"
              disabled={disabled.value}
            />
          </HFormItem>
          <HFormItem prop="time" required={true}>
            <HTimePicker v-model={formData.value.time} disabled={disabled.value} />
          </HFormItem>
          <HFormItem prop="color" required={true}>
            <HColorPicker v-model={formData.value.color} disabled={disabled.value} />
          </HFormItem>
          <HFormItem prop="color" required={true}>
            <HColorPicker
              v-model={formData.value.color}
              trigger-type="square"
              disabled={disabled.value}
            />
          </HFormItem>
          <HFormItem prop="select" required={true}>
            <HSelect v-model={formData.value.select} disabled={disabled.value}>
              <HOption value={1} label={1} />
            </HSelect>
          </HFormItem>
          <HFormItem prop="selectMultiple" required={true}>
            <HSelect
              v-model={formData.value.selectMultiple}
              multiple={true}
              disabled={disabled.value}
            >
              <HOption value={1} label="1" />
            </HSelect>
          </HFormItem>
          <HFormItem prop="cascader" required={true}>
            <HCascader
              v-model={formData.value.cascader}
              options={baseTreeData}
              disabled={disabled.value}
            />
          </HFormItem>
          <HFormItem prop="cascaderMultiple" required={true}>
            <HCascader
              v-model={formData.value.cascaderMultiple}
              options={baseTreeData}
              multiple={true}
              disabled={disabled.value}
            />
          </HFormItem>
          <HFormItem prop="treeSelect" required={true}>
            <HTreeSelect
              v-model={formData.value.treeSelect}
              disabled={disabled.value}
              treeData={baseTreeData}
            />
          </HFormItem>
          <HFormItem prop="treeSelectMultiple" required={true}>
            <HTreeSelect
              v-model={formData.value.treeSelectMultiple}
              treeData={baseTreeData}
              multiple={true}
              disabled={disabled.value}
            />
          </HFormItem>
        </HForm>
      ));

      await nextTick();

      // two kind of date-picker
      const datePickers = wrapper.findAllComponents(HDatePicker);
      const datePicker = datePickers.find(curr => !curr.classes('range-picker'));
      const dateRangePicker = datePickers.find(curr => curr.classes('range-picker'));

      // two kind of color-picker
      const colorPickers = wrapper.findAllComponents(HColorPicker);

      function checkAllDisabled() {
        expect(
          wrapper.findComponent(HInput).find('input').attributes('disabled'),
        ).not.toBeUndefined();
        expect(wrapper.findComponent(HInputNumber).classes('is-disabled')).toBeTruthy();
        expect(
          wrapper.findAllComponents(HSelect)[0].findComponent(HPickerInput).classes('is-disabled'),
        ).toBeTruthy();
        expect(
          wrapper.findAllComponents(HSelect)[1].findComponent(HPickerInput).classes('is-disabled'),
        ).toBeTruthy();
        expect(
          wrapper.findAllComponents(HSelect)[1].findComponent(HTag).classes('is-disabled'),
        ).toBeTruthy();
        expect(
          wrapper
            .findAllComponents(HCascader)[0]
            .findComponent(HPickerInput)
            .classes('is-disabled'),
        ).toBeTruthy();
        expect(
          wrapper
            .findAllComponents(HCascader)[1]
            .findComponent(HPickerInput)
            .classes('is-disabled'),
        ).toBeTruthy();
        expect(
          wrapper.findAllComponents(HCascader)[1].findComponent(HTag).classes('is-disabled'),
        ).toBeTruthy();
        expect(
          wrapper
            .findAllComponents(HTreeSelect)[0]
            .findComponent(HPickerInput)
            .classes('is-disabled'),
        ).toBeTruthy();
        expect(
          wrapper
            .findAllComponents(HTreeSelect)[1]
            .findComponent(HPickerInput)
            .classes('is-disabled'),
        ).toBeTruthy();
        expect(
          wrapper.findAllComponents(HTreeSelect)[1].findComponent(HTag).classes('is-disabled'),
        ).toBeTruthy();

        expect(datePicker?.exists()).toBeTruthy();
        expect(dateRangePicker?.exists()).toBeTruthy();

        expect(
          wrapper.findComponent(HTimePicker).find('input').attributes('disabled'),
        ).not.toBeUndefined();
        expect(datePicker?.find('input').attributes('disabled')).not.toBeUndefined();
        expect(dateRangePicker?.find('input').attributes('disabled')).not.toBeUndefined();

        expect(colorPickers[0].findComponent(HPickerInput).classes('is-disabled')).toBeTruthy();
        expect(colorPickers[1].findComponent(HPickerInput).classes('is-disabled')).toBeTruthy();
      }

      function checkAllNotDisabled() {
        expect(wrapper.findComponent(HInput).find('input').attributes('disabled')).toBeUndefined();
        expect(wrapper.findComponent(HInputNumber).classes('is-disabled')).toBeFalsy();
        expect(
          wrapper.findComponent(HSelect).findComponent(HPickerInput).classes('is-disabled'),
        ).toBeFalsy();
        expect(
          wrapper.findComponent(HTimePicker).find('input').attributes('disabled'),
        ).toBeUndefined();
        expect(
          wrapper.findComponent(HCascader).findComponent(HPickerInput).classes('is-disabled'),
        ).toBeFalsy();
        expect(
          wrapper.findComponent(HTreeSelect).findComponent(HPickerInput).classes('is-disabled'),
        ).toBeFalsy();

        // two kind of date-picker
        expect(datePicker?.find('input').attributes('disabled')).toBeUndefined();
        expect(dateRangePicker?.find('input').attributes('disabled')).toBeUndefined();

        // two kind of color-picker
        expect(colorPickers[0].findComponent(HPickerInput).classes('is-disabled')).toBeFalsy();
        expect(colorPickers[1].findComponent(HPickerInput).classes('is-disabled')).toBeFalsy();
      }

      checkAllDisabled();

      disabled.value = false;
      await nextTick();

      checkAllNotDisabled();

      formDisabled.value = true;
      disabled.value = undefined;
      await nextTick();

      checkAllDisabled();

      formDisabled.value = false;
      await nextTick();

      checkAllNotDisabled();

      disabled.value = true;
      await nextTick();

      checkAllDisabled();
    });
  });

  describe('emits', () => {
    test('validate', async () => {
      const form = ref({
        name: '',
      });

      const rules: Record<keyof (typeof form)['value'], HFormRule | HFormRule[]> = {
        name: [
          {
            required: true,
            message: 'Required',
          },
          {
            max: 5,
            message: 'Max',
          },
        ],
      };

      const onValidate = vi.fn();

      const wrapper = mount(() => (
        <HForm model={form.value} rules={rules} onValidate={onValidate}>
          <HFormItem prop="name">
            <HInput v-model={form.value.name} />
          </HFormItem>
        </HForm>
      ));

      const input = wrapper.findComponent(HInput).find('input');

      await input.setValue('a char name');

      expect(onValidate).toHaveBeenCalled();
    });
  });
});
