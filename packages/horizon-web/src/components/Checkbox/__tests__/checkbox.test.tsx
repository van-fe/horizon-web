import { mount } from '@vue/test-utils';
import { HCheckbox, HCheckboxGroup, HCheckboxButton } from '..';
import { describe, expect, test, vi } from 'vitest';
import { ref, nextTick } from 'vue';

describe('Checkbox.tsx', () => {
  test('basic', async () => {
    const modelValue = ref();
    const wrapper = mount(() => (
      <div>
        <HCheckbox modelValue={modelValue.value} label="1" />
        <HCheckbox modelValue={modelValue.value} label="2" />
      </div>
    ));

    const elements = wrapper.findAllComponents(HCheckbox);

    expect(elements.length).toBe(2);
  });

  test('keeps checkbox inputs tabbable as focus-visible proxies', () => {
    const inputs = [mount(() => <HCheckbox />), mount(() => <HCheckboxButton />)].map(wrapper =>
      wrapper.find('input'),
    );

    inputs.forEach(input => {
      expect(input.attributes()).toHaveProperty('data-focus-visible-proxy');
      expect((input.element as HTMLInputElement).tabIndex).toBe(0);
    });
  });
});

test('sizeBorder', async () => {
  const size = ref<'small' | 'medium' | 'large'>('small');

  const wrapperBorder = mount(() => <HCheckbox size={size.value} border={true} />);
  const wrapperNoneBorder = mount(() => <HCheckbox size={size.value} border={false} />);

  const checkboxBorder = wrapperBorder.findComponent(HCheckbox);
  const checkboxNoneBorder = wrapperNoneBorder.findComponent(HCheckbox);

  expect(checkboxBorder.classes()).toContain('h-checkbox--medium');
  expect(checkboxNoneBorder.classes()).not.toContain('h-checkbox--medium');

  size.value = 'medium';
  await nextTick();
  expect(checkboxBorder.classes()).toContain('h-checkbox--medium');
  expect(checkboxNoneBorder.classes()).not.toContain('h-checkbox--medium');

  size.value = 'large';
  await nextTick();
  expect(checkboxBorder.classes()).toContain('h-checkbox--large');
  expect(checkboxNoneBorder.classes()).not.toContain('h-checkbox--large');
});

test('sizeButton', async () => {
  const size = ref<'small' | 'medium' | 'large'>('small');
  const wrapper = mount(() => <HCheckboxButton size={size.value} />);

  const checkboxButton = wrapper.findComponent(HCheckboxButton);

  expect(checkboxButton.classes()).toContain('h-checkbox-button--medium');

  size.value = 'medium';
  await nextTick();
  expect(checkboxButton.classes()).toContain('h-checkbox-button--medium');

  size.value = 'large';
  await nextTick();
  expect(checkboxButton.classes()).toContain('h-checkbox-button--large');
});

test('sizeGroup', async () => {
  const size = ref<'small' | 'medium' | 'large'>('small');
  const modelValue = ref([]);
  const wrapperBorder = mount(() => (
    <HCheckboxGroup modelValue={modelValue.value} size={size.value}>
      <HCheckbox border={true} />
    </HCheckboxGroup>
  ));
  const wrapperNoneBorder = mount(() => (
    <HCheckboxGroup modelValue={modelValue.value} size={size.value}>
      <HCheckbox border={false} />
    </HCheckboxGroup>
  ));
  const wrapperButton = mount(() => (
    <HCheckboxGroup modelValue={modelValue.value} size={size.value}>
      <HCheckboxButton />
    </HCheckboxGroup>
  ));

  const elementCheckboxBorder = wrapperBorder.findComponent(HCheckbox);
  const elementCheckboxNoneBorder = wrapperNoneBorder.findComponent(HCheckbox);
  const elementCheckboxButton = wrapperButton.findComponent(HCheckboxButton);

  expect(elementCheckboxBorder.exists()).toBe(true);
  expect(elementCheckboxNoneBorder.exists()).toBe(true);
  expect(elementCheckboxButton.exists()).toBe(true);

  expect(elementCheckboxBorder.classes()).toContain('h-checkbox--medium');
  expect(elementCheckboxNoneBorder.classes()).not.toContain('h-checkbox--medium');
  expect(elementCheckboxButton.classes()).toContain('h-checkbox-button--medium');

  size.value = 'medium';
  await nextTick();
  expect(elementCheckboxBorder.classes()).toContain('h-checkbox--medium');
  expect(elementCheckboxNoneBorder.classes()).not.toContain('h-checkbox--medium');
  expect(elementCheckboxButton.classes()).toContain('h-checkbox-button--medium');

  size.value = 'large';
  await nextTick();
  expect(elementCheckboxBorder.classes()).toContain('h-checkbox--large');
  expect(elementCheckboxNoneBorder.classes()).not.toContain('h-checkbox--large');
  expect(elementCheckboxButton.classes()).toContain('h-checkbox-button--large');
});

test('true-label/false-label', async () => {
  const checkboxModelValue = ref('');
  const checkboxButtonModelValue = ref('');
  const checkboxGroupModelValue = ref<string[]>([]);

  const wrapper = mount(() => (
    <HCheckbox
      modelValue={checkboxModelValue.value}
      true-label="true-label"
      false-label="false-label"
    />
  ));
  const wrapper1 = mount(() => (
    <HCheckboxButton
      modelValue={checkboxButtonModelValue.value}
      true-label="true-label"
      false-label="false-label"
    />
  ));
  const wrapper2 = mount(() => (
    <HCheckboxGroup modelValue={checkboxGroupModelValue.value}>
      <HCheckboxButton true-label="true-label" false-label="false-label" />
      <HCheckboxButton true-label="true-label1" false-label="false-label" />
    </HCheckboxGroup>
  ));

  checkboxModelValue.value = 'true-label';
  checkboxButtonModelValue.value = 'true-label';
  checkboxGroupModelValue.value = ['true-label', 'true-label1'];
  await nextTick();
  expect(wrapper.classes()).toContain('h-checkbox--checked');
  expect(wrapper1.classes()).toContain('h-checkbox-button--checked');

  const checkedButtonElArr = wrapper2.findAll('.h-checkbox-button--checked');
  expect(checkedButtonElArr.length).toBe(2);
});

test('checked', async () => {
  const checkboxModelValue = ref(true);
  const checkboxGroupModelValue = ref(['hh']);

  const wrapper = mount(() => <HCheckboxButton modelValue={checkboxModelValue.value} label="hh" />);
  const wrapper1 = mount(() => <HCheckbox modelValue={checkboxModelValue.value} label="hh" />);
  const wrapper2 = mount(() => (
    <HCheckboxGroup modelValue={checkboxGroupModelValue.value}>
      <HCheckboxButton label="hh" />
      <HCheckboxButton label="jj" />
    </HCheckboxGroup>
  ));

  expect(wrapper.classes()).toContain('h-checkbox-button--checked');
  expect(wrapper1.classes()).toContain('h-checkbox--checked');
  const checkedButtonElArr = wrapper2.findAll('.h-checkbox-button--checked');
  expect(checkedButtonElArr.length).toBe(1);
});

test('checkboxGroup', async () => {
  const checkboxGroupModelValue = ref(['hh']);
  const checkboxModelValue = ref(true);

  const wrapper1 = mount(() => (
    <HCheckboxGroup modelValue={checkboxGroupModelValue.value}>
      <HCheckbox label="hh" />
      <HCheckbox label="jj" />
    </HCheckboxGroup>
  ));

  const wrapper11 = mount(() => (
    <HCheckboxGroup>
      <HCheckbox modelValue={checkboxModelValue.value} label="hh" />
      <HCheckbox modelValue={checkboxModelValue.value} label="jj" />
    </HCheckboxGroup>
  ));
  const wrapper2 = mount(() => (
    <HCheckboxGroup modelValue={checkboxGroupModelValue.value}>
      <HCheckboxButton label="hh" />
      <HCheckboxButton label="jj" />
    </HCheckboxGroup>
  ));
  const wrapper22 = mount(() => (
    <HCheckboxGroup>
      <HCheckboxButton modelValue={checkboxModelValue.value} label="hh" />
      <HCheckboxButton modelValue={checkboxModelValue.value} label="jj" />
    </HCheckboxGroup>
  ));

  const checkedElArr = wrapper1.findAll('.h-checkbox--checked');
  expect(checkedElArr.length).toBe(1);
  const checkedCheckboxElArr = wrapper11.findAll('.h-checkbox--checked');
  expect(checkedCheckboxElArr.length).toBe(2);

  const checkedButtonElArr = wrapper2.findAll('.h-checkbox-button--checked');
  expect(checkedButtonElArr.length).toBe(1);
  const checkedCheckboxButtonElArr = wrapper22.findAll('.h-checkbox-button--checked');
  expect(checkedCheckboxButtonElArr.length).toBe(2);
});

test('native interaction updates a standalone controlled value and emits its contract', async () => {
  const modelValue = ref(false);
  const onChange = vi.fn();
  const wrapper = mount(() => <HCheckbox v-model={modelValue.value} onChange={onChange} />);
  const checkbox = wrapper.findComponent(HCheckbox);

  await wrapper.find('input').setValue(true);

  expect(modelValue.value).toBe(true);
  expect(onChange).toHaveBeenCalledWith(true);
  expect(checkbox.emitted('update:modelValue')).toEqual([[true]]);
  expect(wrapper.classes()).toContain('h-checkbox--checked');
});

test('group interaction adds and removes the option without replacing unrelated values', async () => {
  const modelValue = ref<Array<string>>(['kept']);
  const onChange = vi.fn();
  const wrapper = mount(() => (
    <HCheckboxGroup v-model={modelValue.value} onChange={onChange}>
      <HCheckbox label="added" />
    </HCheckboxGroup>
  ));
  const input = wrapper.find('input');

  await input.setValue(true);
  expect(modelValue.value).toEqual(['kept', 'added']);
  expect(onChange).toHaveBeenLastCalledWith(['kept', 'added']);

  await input.setValue(false);
  expect(modelValue.value).toEqual(['kept']);
  expect(onChange).toHaveBeenLastCalledWith(['kept']);
});

test('disabled state is forwarded to native inputs for standalone, button and group variants', () => {
  const wrappers = [
    mount(() => <HCheckbox disabled />),
    mount(() => <HCheckboxButton disabled />),
    mount(() => (
      <HCheckboxGroup disabled>
        <HCheckbox label="grouped" />
      </HCheckboxGroup>
    )),
  ];

  wrappers.forEach(wrapper => {
    expect(wrapper.find('input').attributes()).toHaveProperty('disabled');
  });
});

test('toggle expose follows the same value contract as native interaction', async () => {
  const modelValue = ref(false);
  const wrapper = mount(() => <HCheckbox v-model={modelValue.value} />);

  wrapper.findComponent(HCheckbox).getCurrentComponent().exposed?.toggle();
  await nextTick();

  expect(modelValue.value).toBe(true);
});
