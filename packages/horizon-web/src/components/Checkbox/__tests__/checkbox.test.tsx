import { mount } from '@vue/test-utils';
import { HCheckbox, HCheckboxGroup, HCheckboxButton } from '..';
import { describe, expect, test } from 'vitest';
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
