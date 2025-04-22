import { mount, shallowMount } from '@vue/test-utils';
import type { NFormInstance, NFormRule } from '../index';
import { NForm, NFormItem } from '../index';
import {
  NInput,
  NInputNumber,
  NDatePicker,
  NTimePicker,
  NColorPicker,
  NSelect,
  NOption,
  NCascader,
  NTreeSelect,
  NTag,
} from '../../index';
import { describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import NPickerInput from '../../Picker/src/components/NPickerInput';
import baseTreeData from '../../Cascader/__tests__/options.json';
import type { FormProps } from '../src/composables/useProps';

describe('Form.tsx', () => {
  test('basic', async () => {
    const wrapper = shallowMount(() => <NForm />);
    const element = wrapper.findComponent(NForm);

    await expect(element.exists()).toBeTruthy();
  });

  describe('props', () => {
    test('size', async () => {
      const size = ref<'small' | 'medium' | 'large'>('medium');
      const wrapper = mount(() => <NForm size={size.value} />);
      const element = wrapper.findComponent(NForm);

      await expect(element.classes(`n-form--${size.value}`)).toBeTruthy();
      size.value = 'large';

      await nextTick();

      await expect(element.classes(`n-form--${size.value}`)).toBeTruthy();
    });

    test('check form.size whether can affect inside components.size', async () => {
      const size = ref<'small' | 'medium' | 'large'>('small');
      const wrapper = mount(() => (
        <NForm size={size.value}>
          <NFormItem>
            <NInput />
          </NFormItem>
        </NForm>
      ));
      const element = wrapper.findComponent(NInput);

      await expect(element.classes(`n-input--${size.value}`)).toBeTruthy();
    });

    test('validateTrigger', async () => {
      const form = ref({
        name: '',
      });

      const rules: Record<keyof (typeof form)['value'], NFormRule | NFormRule[]> = {
        name: {
          required: true,
          message: 'Required',
        },
      };

      const onValidate = vi.fn();

      const wrapper = mount(() => (
        <NForm model={form.value} rules={rules} validateTrigger="blur" onValidate={onValidate}>
          <NFormItem prop="name">
            <NInput v-model={form.value.name} />
          </NFormItem>
        </NForm>
      ));

      const input = wrapper.findComponent(NInput).find('input');

      await input.trigger('focus');
      await input.trigger('blur');

      expect(onValidate).toHaveBeenCalled();
    });

    test('validateTrigger is array', async () => {
      const form = ref({
        name: '',
      });

      const rules: Record<keyof (typeof form)['value'], NFormRule | NFormRule[]> = {
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
        <NForm
          model={form.value}
          rules={rules}
          validateTrigger={['blur', 'change']}
          onValidate={onValidate}
        >
          <NFormItem prop="name">
            <NInput v-model={form.value.name} />
          </NFormItem>
        </NForm>
      ));

      const input = wrapper.findComponent(NInput).find('input');

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

      const rules: Record<keyof (typeof form)['value'], NFormRule | NFormRule[]> = {
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
      const formRef = ref<null | NFormInstance>(null);

      const wrapper = mount(() => (
        <NForm
          ref={formRef}
          model={form.value}
          rules={rules}
          validateTrigger={false}
          onValidate={onValidate}
        >
          <NFormItem prop="name">
            <NInput v-model={form.value.name} />
          </NFormItem>
        </NForm>
      ));

      const input = wrapper.findComponent(NInput).find('input');

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

      const formRef = ref<NFormInstance | null>(null);

      const disabled = ref(true);

      const wrapper = mount(() => (
        <NForm ref={formRef} model={formData.value} disabled={disabled.value}>
          <NFormItem prop="username" required={true}>
            <NInput v-model={formData.value.username} />
          </NFormItem>
          <NFormItem prop="age" required={true}>
            <NInputNumber v-model={formData.value.age} />
          </NFormItem>
          <NFormItem prop="date" required={true}>
            <NDatePicker v-model={formData.value.date} />
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
            <NTreeSelect v-model={formData.value.treeSelect} treeData={baseTreeData} />
          </NFormItem>
        </NForm>
      ));

      expect(wrapper.findComponent(NInput).html()).contains('disabled');
      expect(wrapper.findComponent(NInputNumber).html()).contains('disabled');
      expect(wrapper.findComponent(NDatePicker).html()).contains('disabled');
      expect(wrapper.findComponent(NTimePicker).html()).contains('disabled');
      expect(wrapper.findComponent(NColorPicker).html()).contains('disabled');
      expect(wrapper.findComponent(NSelect).html()).contains('disabled');
      expect(wrapper.findComponent(NSelect).html()).contains('disabled');
      expect(wrapper.findComponent(NTreeSelect).html()).contains('disabled');

      disabled.value = false;

      await nextTick();

      expect(wrapper.findComponent(NInput).html()).not.contains('disabled');
      expect(wrapper.findComponent(NInputNumber).html()).not.contains('disabled');
      expect(wrapper.findComponent(NDatePicker).html()).not.contains('disabled');
      expect(wrapper.findComponent(NTimePicker).html()).not.contains('disabled');
      expect(wrapper.findComponent(NColorPicker).html()).not.contains('disabled');
      expect(wrapper.findComponent(NSelect).html()).not.contains('disabled');
      expect(wrapper.findComponent(NSelect).html()).not.contains('disabled');
      expect(wrapper.findComponent(NTreeSelect).html()).not.contains('--disabled');
    });

    test('compact', async () => {
      const compact = ref(false);

      const wrapper = mount(() => <NForm compact={compact.value}></NForm>);

      expect(wrapper.classes('is-spacing-compact')).toBeFalsy();
      compact.value = true;
      await nextTick();
      expect(wrapper.classes('is-spacing-compact')).toBeTruthy();
    });

    test('spacing', async () => {
      const spacing = ref<FormProps['spacing']>('default');

      const wrapper = mount(() => <NForm spacing={spacing.value}></NForm>);

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

      const rules: Record<keyof (typeof formData)['value'], NFormRule | NFormRule[]> = {
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

      const formRef = ref<NFormInstance | null>(null);

      mount(() => (
        <NForm ref={formRef} model={formData.value} rules={rules}>
          <NFormItem prop="username">
            <NInput v-model={formData.value.username} />
          </NFormItem>
          <NFormItem prop="age">
            <NInputNumber v-model={formData.value.age} />
          </NFormItem>
        </NForm>
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

      const formRef = ref<null | NFormInstance>(null);

      const wrapper = mount(() => (
        <NForm ref={formRef} model={form.value}>
          <NFormItem prop="name">
            <NInput v-model={form.value.name} />
          </NFormItem>
        </NForm>
      ));

      const input = wrapper.findComponent(NInput).find('input');

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

      const formRef = ref<NFormInstance | null>(null);

      const wrapper = mount(() => (
        <NForm ref={formRef} model={formData.value} disabled={disabled.value}>
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
            <NTreeSelect v-model={formData.value.treeSelect as string} treeData={baseTreeData} />
          </NFormItem>
        </NForm>
      ));

      expect(
        wrapper.findComponent(NInput).find('input').attributes('disabled'),
      ).not.toBeUndefined();
      expect(wrapper.findComponent(NInputNumber).classes('is-disabled')).toBeTruthy();
      expect(
        wrapper.findComponent(NSelect).findComponent(NPickerInput).classes('is-disabled'),
      ).toBeTruthy();
      expect(
        wrapper.findComponent(NTimePicker).find('input').attributes('disabled'),
      ).not.toBeUndefined();
      expect(
        wrapper.findComponent(NCascader).findComponent(NPickerInput).classes('is-disabled'),
      ).toBeTruthy();
      expect(
        wrapper.findComponent(NTreeSelect).findComponent(NPickerInput).classes('is-disabled'),
      ).toBeTruthy();

      // two kind of date-picker
      const datePickers = wrapper.findAllComponents(NDatePicker);
      const datePicker = datePickers.find(curr => !curr.classes('range-picker'));
      const dateRangePicker = datePickers.find(curr => curr.classes('range-picker'));

      expect(datePicker?.exists()).toBeTruthy();
      expect(dateRangePicker?.exists()).toBeTruthy();

      expect(datePicker?.find('input').attributes('disabled')).not.toBeUndefined();
      expect(dateRangePicker?.find('input').attributes('disabled')).not.toBeUndefined();

      // two kind of color-picker
      const colorPickers = wrapper.findAllComponents(NColorPicker);

      expect(colorPickers[0].findComponent(NPickerInput).classes('is-disabled')).toBeTruthy();
      expect(colorPickers[1].findComponent(NPickerInput).classes('is-disabled')).toBeTruthy();

      disabled.value = false;

      await nextTick();

      expect(wrapper.findComponent(NInput).find('input').attributes('disabled')).toBeUndefined();
      expect(wrapper.findComponent(NInputNumber).classes('is-disabled')).toBeFalsy();
      expect(
        wrapper.findComponent(NSelect).findComponent(NPickerInput).classes('is-disabled'),
      ).toBeFalsy();
      expect(
        wrapper.findComponent(NTimePicker).find('input').attributes('disabled'),
      ).toBeUndefined();
      expect(
        wrapper.findComponent(NCascader).findComponent(NPickerInput).classes('is-disabled'),
      ).toBeFalsy();
      expect(
        wrapper.findComponent(NTreeSelect).findComponent(NPickerInput).classes('is-disabled'),
      ).toBeFalsy();

      // two kind of date-picker
      expect(datePicker?.find('input').attributes('disabled')).toBeUndefined();
      expect(dateRangePicker?.find('input').attributes('disabled')).toBeUndefined();

      // two kind of color-picker
      expect(colorPickers[0].findComponent(NPickerInput).classes('is-disabled')).toBeFalsy();
      expect(colorPickers[1].findComponent(NPickerInput).classes('is-disabled')).toBeFalsy();
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

      const formRef = ref<NFormInstance | null>(null);

      const wrapper = mount(() => (
        <NForm ref={formRef} model={formData.value} disabled={formDisabled.value}>
          <NFormItem prop="username" required={true}>
            <NInput v-model={formData.value.username} disabled={disabled.value} />
          </NFormItem>
          <NFormItem prop="age" required={true}>
            <NInputNumber v-model={formData.value.age} disabled={disabled.value} />
          </NFormItem>
          <NFormItem prop="date" required={true}>
            <NDatePicker v-model={formData.value.date} disabled={disabled.value} />
          </NFormItem>
          <NFormItem prop="dateRange" required={true}>
            <NDatePicker
              v-model={formData.value.dateRange}
              type="daterange"
              class="range-picker"
              disabled={disabled.value}
            />
          </NFormItem>
          <NFormItem prop="time" required={true}>
            <NTimePicker v-model={formData.value.time} disabled={disabled.value} />
          </NFormItem>
          <NFormItem prop="color" required={true}>
            <NColorPicker v-model={formData.value.color} disabled={disabled.value} />
          </NFormItem>
          <NFormItem prop="color" required={true}>
            <NColorPicker
              v-model={formData.value.color}
              trigger-type="square"
              disabled={disabled.value}
            />
          </NFormItem>
          <NFormItem prop="select" required={true}>
            <NSelect v-model={formData.value.select} disabled={disabled.value}>
              <NOption value={1} label={1} />
            </NSelect>
          </NFormItem>
          <NFormItem prop="selectMultiple" required={true}>
            <NSelect
              v-model={formData.value.selectMultiple}
              multiple={true}
              disabled={disabled.value}
            >
              <NOption value={1} label="1" />
            </NSelect>
          </NFormItem>
          <NFormItem prop="cascader" required={true}>
            <NCascader
              v-model={formData.value.cascader}
              options={baseTreeData}
              disabled={disabled.value}
            />
          </NFormItem>
          <NFormItem prop="cascaderMultiple" required={true}>
            <NCascader
              v-model={formData.value.cascaderMultiple}
              options={baseTreeData}
              multiple={true}
              disabled={disabled.value}
            />
          </NFormItem>
          <NFormItem prop="treeSelect" required={true}>
            <NTreeSelect
              v-model={formData.value.treeSelect}
              disabled={disabled.value}
              treeData={baseTreeData}
            />
          </NFormItem>
          <NFormItem prop="treeSelectMultiple" required={true}>
            <NTreeSelect
              v-model={formData.value.treeSelectMultiple}
              treeData={baseTreeData}
              multiple={true}
              disabled={disabled.value}
            />
          </NFormItem>
        </NForm>
      ));

      await nextTick();

      // two kind of date-picker
      const datePickers = wrapper.findAllComponents(NDatePicker);
      const datePicker = datePickers.find(curr => !curr.classes('range-picker'));
      const dateRangePicker = datePickers.find(curr => curr.classes('range-picker'));

      // two kind of color-picker
      const colorPickers = wrapper.findAllComponents(NColorPicker);

      function checkAllDisabled() {
        expect(
          wrapper.findComponent(NInput).find('input').attributes('disabled'),
        ).not.toBeUndefined();
        expect(wrapper.findComponent(NInputNumber).classes('is-disabled')).toBeTruthy();
        expect(
          wrapper.findAllComponents(NSelect)[0].findComponent(NPickerInput).classes('is-disabled'),
        ).toBeTruthy();
        expect(
          wrapper.findAllComponents(NSelect)[1].findComponent(NPickerInput).classes('is-disabled'),
        ).toBeTruthy();
        expect(
          wrapper.findAllComponents(NSelect)[1].findComponent(NTag).classes('is-disabled'),
        ).toBeTruthy();
        expect(
          wrapper
            .findAllComponents(NCascader)[0]
            .findComponent(NPickerInput)
            .classes('is-disabled'),
        ).toBeTruthy();
        expect(
          wrapper
            .findAllComponents(NCascader)[1]
            .findComponent(NPickerInput)
            .classes('is-disabled'),
        ).toBeTruthy();
        expect(
          wrapper.findAllComponents(NCascader)[1].findComponent(NTag).classes('is-disabled'),
        ).toBeTruthy();
        expect(
          wrapper
            .findAllComponents(NTreeSelect)[0]
            .findComponent(NPickerInput)
            .classes('is-disabled'),
        ).toBeTruthy();
        expect(
          wrapper
            .findAllComponents(NTreeSelect)[1]
            .findComponent(NPickerInput)
            .classes('is-disabled'),
        ).toBeTruthy();
        expect(
          wrapper.findAllComponents(NTreeSelect)[1].findComponent(NTag).classes('is-disabled'),
        ).toBeTruthy();

        expect(datePicker?.exists()).toBeTruthy();
        expect(dateRangePicker?.exists()).toBeTruthy();

        expect(
          wrapper.findComponent(NTimePicker).find('input').attributes('disabled'),
        ).not.toBeUndefined();
        expect(datePicker?.find('input').attributes('disabled')).not.toBeUndefined();
        expect(dateRangePicker?.find('input').attributes('disabled')).not.toBeUndefined();

        expect(colorPickers[0].findComponent(NPickerInput).classes('is-disabled')).toBeTruthy();
        expect(colorPickers[1].findComponent(NPickerInput).classes('is-disabled')).toBeTruthy();
      }

      function checkAllNotDisabled() {
        expect(wrapper.findComponent(NInput).find('input').attributes('disabled')).toBeUndefined();
        expect(wrapper.findComponent(NInputNumber).classes('is-disabled')).toBeFalsy();
        expect(
          wrapper.findComponent(NSelect).findComponent(NPickerInput).classes('is-disabled'),
        ).toBeFalsy();
        expect(
          wrapper.findComponent(NTimePicker).find('input').attributes('disabled'),
        ).toBeUndefined();
        expect(
          wrapper.findComponent(NCascader).findComponent(NPickerInput).classes('is-disabled'),
        ).toBeFalsy();
        expect(
          wrapper.findComponent(NTreeSelect).findComponent(NPickerInput).classes('is-disabled'),
        ).toBeFalsy();

        // two kind of date-picker
        expect(datePicker?.find('input').attributes('disabled')).toBeUndefined();
        expect(dateRangePicker?.find('input').attributes('disabled')).toBeUndefined();

        // two kind of color-picker
        expect(colorPickers[0].findComponent(NPickerInput).classes('is-disabled')).toBeFalsy();
        expect(colorPickers[1].findComponent(NPickerInput).classes('is-disabled')).toBeFalsy();
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

      const rules: Record<keyof (typeof form)['value'], NFormRule | NFormRule[]> = {
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
        <NForm model={form.value} rules={rules} onValidate={onValidate}>
          <NFormItem prop="name">
            <NInput v-model={form.value.name} />
          </NFormItem>
        </NForm>
      ));

      const input = wrapper.findComponent(NInput).find('input');

      await input.setValue('a char name');

      expect(onValidate).toHaveBeenCalled();
    });
  });
});
