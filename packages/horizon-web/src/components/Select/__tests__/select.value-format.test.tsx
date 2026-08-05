import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import { sleep } from '~/utils/tools';
import HPickerInput from '../../Picker/src/components/PickerInput';
import HOption from '../src/Option';
import HSelect from '../src/Select';
import SimpleOption from '../src/components/SimpleOption';
import type { OptionProps } from '../src/composables/useProps';
import type { ModelValueType } from '../src/utils/types';

type Member = {
  value: string;
  label: string;
  region: string;
};

type Reviewer = {
  id: string;
  name: string;
  region: string;
};

const members: Member[] = [
  { value: 'u-104', label: 'Mia Chen', region: 'Shanghai' },
  { value: 'u-208', label: 'Noah Li', region: 'Singapore' },
  { value: 'u-316', label: 'Ava Wang', region: 'Frankfurt' },
];

function valueFormat(option: Partial<OptionProps> & Record<string, unknown>): Reviewer {
  return {
    id: option.value as string,
    name: option.label as string,
    region: option.region as string,
  };
}

function serialized<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

describe('Select value-format', () => {
  test('echoes an arbitrary business object without rewriting the controlled value', async () => {
    const modelValue = ref<Reviewer>(valueFormat(members[0]));
    const onUpdate = vi.fn((value: ModelValueType) => (modelValue.value = value as Reviewer));

    const wrapper = mount(() => (
      <HSelect
        modelValue={modelValue.value}
        valueFormat={valueFormat}
        toBody={false}
        onUpdate:modelValue={onUpdate}
      >
        {members.map(member => (
          <HOption {...member} />
        ))}
      </HSelect>
    ));

    await sleep(0);

    expect(wrapper.findComponent(HPickerInput).text()).toBe('Mia Chen');
    expect(wrapper.findAllComponents(HOption).map(option => option.classes('is-active'))).toEqual([
      true,
      false,
      false,
    ]);

    modelValue.value = valueFormat(members[1]);
    await nextTick();
    await sleep(0);

    expect(wrapper.findComponent(HPickerInput).text()).toBe('Noah Li');
    expect(onUpdate).not.toHaveBeenCalled();
  });

  test('restores a serialized formatted value after selection', async () => {
    const modelValue = ref<Reviewer>();
    const onUpdate = vi.fn((value: ModelValueType) => (modelValue.value = value as Reviewer));

    const wrapper = mount(() => (
      <HSelect
        modelValue={modelValue.value}
        valueFormat={valueFormat}
        toBody={false}
        onUpdate:modelValue={onUpdate}
      >
        {members.map(member => (
          <HOption {...member} />
        ))}
      </HSelect>
    ));

    await wrapper.findAllComponents(HOption)[0].trigger('click');

    const echoedValue = serialized(modelValue.value);
    onUpdate.mockClear();
    modelValue.value = echoedValue;

    await nextTick();
    await sleep(0);

    expect(modelValue.value).toEqual(valueFormat(members[0]));
    expect(wrapper.findComponent(HPickerInput).text()).toBe('Mia Chen');
    expect(wrapper.findAllComponents(HOption)[0].classes('is-active')).toBe(true);
    expect(onUpdate).not.toHaveBeenCalled();
  });

  test('does not format and emit an externally synchronized raw value', async () => {
    const modelValue = ref<string | Reviewer>('u-104');
    const onUpdate = vi.fn(
      (value: ModelValueType) => (modelValue.value = value as string | Reviewer),
    );
    const onChange = vi.fn();

    const wrapper = mount(() => (
      <HSelect
        modelValue={modelValue.value}
        valueFormat={valueFormat}
        toBody={false}
        onUpdate:modelValue={onUpdate}
        onChange={onChange}
      >
        {members.map(member => (
          <HOption {...member} />
        ))}
      </HSelect>
    ));

    modelValue.value = 'u-208';
    await nextTick();
    await sleep(0);

    expect(wrapper.findComponent(HPickerInput).text()).toBe('Noah Li');
    expect(onUpdate).not.toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();
  });

  test('echoes and deselects formatted values in multiple mode without duplicates', async () => {
    const modelValue = ref<Reviewer[]>(members.slice(0, 2).map(valueFormat));
    const onUpdate = vi.fn((value: ModelValueType) => (modelValue.value = value as Reviewer[]));
    const onDeselect = vi.fn();

    const wrapper = mount(() => (
      <HSelect
        modelValue={modelValue.value}
        valueFormat={valueFormat}
        multiple={true}
        toBody={false}
        onUpdate:modelValue={onUpdate}
        onDeselect={onDeselect}
      >
        {members.map(member => (
          <HOption {...member} />
        ))}
      </HSelect>
    ));

    await sleep(0);

    expect(wrapper.findAllComponents(HOption).map(option => option.classes('is-active'))).toEqual([
      true,
      true,
      false,
    ]);

    await wrapper.findAllComponents(HOption)[0].trigger('click');

    expect(serialized(modelValue.value)).toEqual([valueFormat(members[1])]);
    expect(onDeselect).toHaveBeenCalledWith('u-104');

    await wrapper.find('.h-tag__close').trigger('click');

    expect(modelValue.value).toEqual([]);
    expect(onDeselect).toHaveBeenLastCalledWith('u-208');
  });

  test('uses formatted membership when hiding selected options and toggling check-all', async () => {
    const hiddenModelValue = ref<Reviewer[]>([valueFormat(members[0])]);
    const checkAllModelValue = ref<Reviewer[]>(members.slice(0, 2).map(valueFormat));

    const hiddenWrapper = mount(() => (
      <HSelect
        v-model={hiddenModelValue.value}
        valueFormat={valueFormat}
        multiple={true}
        selectedVisible={false}
        toBody={false}
      >
        {members.slice(0, 2).map(member => (
          <HOption {...member} />
        ))}
      </HSelect>
    ));
    const checkAllWrapper = mount(() => (
      <HSelect
        v-model={checkAllModelValue.value}
        valueFormat={valueFormat}
        multiple={true}
        useCheckAll={true}
        useCheckAllSummary={true}
        toBody={false}
      >
        {members.slice(0, 2).map(member => (
          <HOption {...member} />
        ))}
      </HSelect>
    ));

    await sleep(0);

    expect(hiddenWrapper.findAllComponents(HOption)[0].classes('is-hide')).toBe(true);
    expect(checkAllWrapper.findAll('.h-tag')).toHaveLength(1);

    await checkAllWrapper.find('.h-select__check-all').trigger('click');

    expect(checkAllModelValue.value).toEqual([]);
  });

  test('resolves a formatted value after options are loaded asynchronously', async () => {
    const options = ref<Member[]>([]);
    const modelValue = ref<Reviewer>(valueFormat(members[1]));
    const onUpdate = vi.fn((value: ModelValueType) => (modelValue.value = value as Reviewer));

    const wrapper = mount(() => (
      <HSelect
        modelValue={modelValue.value}
        valueFormat={valueFormat}
        options={options.value}
        useVirtualScroll={false}
        toBody={false}
        onUpdate:modelValue={onUpdate}
      />
    ));

    options.value = members;
    await nextTick();
    await sleep(0);

    expect(wrapper.findComponent(HPickerInput).text()).toBe('Noah Li');
    expect(wrapper.findAllComponents(HOption)[1].classes('is-active')).toBe(true);
    expect(onUpdate).not.toHaveBeenCalled();
  });

  test('preserves disabled formatted values when clearing multiple selections', async () => {
    const modelValue = ref<Reviewer[]>(members.slice(0, 2).map(valueFormat));

    const wrapper = mount(() => (
      <HSelect
        v-model={modelValue.value}
        valueFormat={valueFormat}
        multiple={true}
        clearable={true}
        toBody={false}
      >
        <HOption {...members[0]} disabled={true} />
        <HOption {...members[1]} />
      </HSelect>
    ));

    await wrapper.findComponent(HPickerInput).trigger('mouseenter');
    await wrapper.find('.h-picker__input--icon.is-clear').trigger('click');

    expect(serialized(modelValue.value)).toEqual([valueFormat(members[0])]);
  });

  test('restores formatted active state with virtual-scroll options', async () => {
    const modelValue = ref<Reviewer>(valueFormat(members[2]));

    const wrapper = mount(() => (
      <HSelect
        v-model={modelValue.value}
        valueFormat={valueFormat}
        options={members}
        toBody={false}
      />
    ));

    await wrapper.findComponent(HSelect).trigger('click');
    await sleep(300);

    expect(wrapper.findComponent(HPickerInput).text()).toBe('Ava Wang');
    expect(
      wrapper.findAllComponents(SimpleOption).map(option => option.classes('is-active')),
    ).toEqual([false, false, true]);
  });

  test('does not mutate a frozen formatter result', async () => {
    const formattedValue = Object.freeze(valueFormat(members[0]));
    const formatter = vi.fn(() => formattedValue);
    const modelValue = ref<Reviewer>();

    const wrapper = mount(() => (
      <HSelect v-model={modelValue.value} valueFormat={formatter} toBody={false}>
        <HOption {...members[0]} />
      </HSelect>
    ));

    await wrapper.findComponent(HOption).trigger('click');

    expect(serialized(modelValue.value)).toEqual(formattedValue);
    expect(Reflect.ownKeys(formattedValue)).toEqual(['id', 'name', 'region']);
  });

  test('deselects a cloned object-valued option', async () => {
    const optionValue = { id: 1, scope: 'team' };
    const modelValue = ref([{ ...optionValue }]);

    const wrapper = mount(() => (
      <HSelect v-model={modelValue.value} multiple={true} toBody={false}>
        <HOption value={optionValue} label="Team" />
      </HSelect>
    ));

    await wrapper.findComponent(HOption).trigger('click');

    expect(modelValue.value).toEqual([]);
  });

  test('selects a zero-valued option with the keyboard', async () => {
    const modelValue = ref<number>();

    const wrapper = mount(
      () => (
        <HSelect v-model={modelValue.value} toBody={false}>
          <HOption value={0} label={0} />
        </HSelect>
      ),
      { attachTo: document.body },
    );
    const input = wrapper.findComponent(HPickerInput);

    await input.trigger('click');
    await input.trigger('keydown', { key: 'ArrowDown' });
    await sleep(0);
    await input.trigger('keydown', { key: 'Enter' });

    expect(modelValue.value).toBe(0);
    expect(input.text()).toBe('0');
  });
});
