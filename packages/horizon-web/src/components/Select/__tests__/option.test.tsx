import { mount } from '@vue/test-utils';
import HSelect from '../src/Select';
import HOption from '../src/Option';
import { describe, expect, test, vi } from 'vitest';
import { nextTick, ref, shallowRef } from 'vue';
import { IconCloseFilled } from '@aurora/icon';
import HPickerInput from '../../Picker/src/components/PickerInput';

describe('Option.tsx', () => {
  describe('props', () => {
    test('disabled', async () => {
      const value = ref<number[]>([]);

      const optionList = [
        { value: 1, label: '上海', disabled: true },
        { value: 2, label: '北京' },
        { value: 3, label: '合肥' },
      ];

      const wrapper = mount(() => (
        <HSelect v-model={value.value} multiple={true} clearable toBody={false}>
          {optionList.map(option => (
            <HOption
              label={option.label}
              value={option.value}
              disabled={option?.disabled ?? false}
            />
          ))}
        </HSelect>
      ));

      const trigger = wrapper.findComponent(HPickerInput);

      await trigger.trigger('click');

      const option1 = wrapper.find('.h-select-option[data-value="1"]');

      expect(option1.classes('is-disabled')).eq(true);

      value.value.push(1);

      await nextTick();

      const selectedTag = wrapper.find('.h-picker__input .h-tag');

      expect(selectedTag.exists()).eq(true);
      expect(selectedTag.classes('is-show-close')).eq(false);

      await trigger.trigger('mouseenter');

      const clearIcon = wrapper.findComponent(IconCloseFilled);

      expect(clearIcon.exists()).eq(true);

      await clearIcon.trigger('click');

      expect(value.value.length).eq(1);
      expect(value.value[0]).eq(1);
    });

    test('max-lines', async () => {
      const wrapper = mount(
        () => (
          <HSelect toBody={false}>
            <HOption value={1} label="A" maxLines={3} />
            <HOption value={2} label="B" />
            <HOption value={3} label="C" />
          </HSelect>
        ),
        {
          attachTo: document.body,
        },
      );

      await wrapper.findComponent(HSelect).trigger('click');

      const [opt1, opt2, opt3] = wrapper.findAll('.h-select-option');

      expect(opt1.attributes('style')).contains('--h-select-max-line--option: 3;');
      expect(opt2.attributes('style')).contains('--h-select-max-line--option: 1;');
      expect(opt3.attributes('style')).contains('--h-select-max-line--option: 1;');
    });

    test('value set object', async () => {
      const modelValue = shallowRef({ value: 1 });

      const wrapper = mount(
        () => (
          <HSelect v-model={modelValue.value} toBody={false}>
            <HOption value={{ value: 1 }} label="A" />
            <HOption value={{ value: 2 }} label="B" />
            <HOption value={{ value: 3 }} label="C" />
          </HSelect>
        ),
        {
          attachTo: document.body,
        },
      );

      await wrapper.findComponent(HSelect).trigger('click');

      const [opt1, opt2, opt3] = wrapper.findAllComponents(HOption);

      expect(opt1.classes('is-active')).toBeTruthy();
      expect(opt2.classes('is-active')).toBeFalsy();
      expect(opt3.classes('is-active')).toBeFalsy();
      expect(wrapper.find('input').element.value).toEqual('A');
    });

    test('value is boolean', async () => {
      const modelValue = ref();
      const onChange = vi.fn();

      const wrapper = mount(
        () => (
          <HSelect v-model={modelValue.value} toBody={false} onChange={onChange}>
            <HOption value={true} label="TRUE" />
            <HOption value={false} label="FALSE" />
          </HSelect>
        ),
        {
          attachTo: document.body,
        },
      );

      await wrapper.findComponent(HSelect).trigger('click');

      const [opt1, opt2] = wrapper.findAllComponents(HOption);

      expect(modelValue.value).toBeUndefined();
      expect(onChange).toHaveBeenCalledTimes(0);

      await opt1.trigger('click');

      expect(modelValue.value).toBeTruthy();
      expect(onChange).toHaveBeenCalledOnce();
      expect(onChange).toHaveBeenCalledWith(null, true);

      await opt2.trigger('click');

      expect(modelValue.value).toBeFalsy();
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenCalledWith(null, false);
    });
  });
});
