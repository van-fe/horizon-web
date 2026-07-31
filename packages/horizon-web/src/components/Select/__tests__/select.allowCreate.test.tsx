import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import { ref } from 'vue';
import { HOption, HSelect } from '../index';
import type { Ref } from 'vue';
import type { SelectProps } from '../src/composables/useProps';
import HPickerInput from '../../Picker/src/components/PickerInput';
import HPickerPopper from '../../Picker/src/components/PickerPopper';

const sleep = (time = 300) => new Promise(resolve => setTimeout(resolve, time));

const basicRender = (modelValue: Ref<string | undefined>, props?: Partial<SelectProps>) => {
  const list = [
    {
      label: '上海',
      value: '1',
    },
    {
      label: '合肥',
      value: '2',
    },
    {
      label: '北京',
      value: '3',
    },
  ];
  return mount(() => (
    <HSelect allowCreate={true} v-model={modelValue.value} {...(props ?? {})} toBody={false}>
      {list.map(item => (
        <HOption label={item.label} value={item.value} />
      ))}
    </HSelect>
  ));
};

describe('allowCreate works same as search', () => {
  test('not matched option hidden', async () => {
    const modelValue = ref<string>();
    const wrapper = basicRender(modelValue);

    const InputComponent = wrapper.findComponent(HPickerInput);
    const OptionPanelComponent = wrapper.findComponent(HPickerPopper);

    const inpEl = InputComponent.find('.h-picker__input input');

    await inpEl.setValue('上海');

    await sleep(300);

    const optionList = OptionPanelComponent.findAll('.h-select-option').filter(
      item => !item.classes('is-hide'),
    );

    expect(optionList.length).toBe(1);

    const htmlContent = optionList[0].html();

    expect(htmlContent).contains('<div class="h-select-option__content">上海</div>');
  });
});

describe('auto selected when enter fire', () => {
  const customCreate = async (props?: Partial<SelectProps>, value = '南京') => {
    const modelValue = ref<string>();
    const wrapper = basicRender(modelValue, props);

    const InputComponent = wrapper.findComponent(HPickerInput);
    const OptionPanelComponent = wrapper.findComponent(HPickerPopper);
    const inpEl = InputComponent.find('.h-picker__input input');

    await inpEl.trigger('focus');
    await inpEl.setValue(value);
    await sleep(300);

    const addItem = OptionPanelComponent.find('.h-select__create-option');
    await addItem.trigger('click');

    return {
      wrapper,
      modelValue,
      OptionPanelComponent,
    };
  };

  test('should create custom option as expected', async () => {
    const { modelValue, OptionPanelComponent } = await customCreate();

    await sleep(300);
    expect(modelValue.value).toBe('南京');
    expect(OptionPanelComponent.html()).toContain(
      '<div class="h-select-option__content">南京</div>',
    );
  });

  test('should not create custom with beforeCreate returned false', async () => {
    const { OptionPanelComponent } = await customCreate({
      beforeCreate: () => false,
    });

    expect(OptionPanelComponent.html()).not.toContain(
      '<div class="h-select-option__content">南京</div>',
    );
  });
});
