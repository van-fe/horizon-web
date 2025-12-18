import { mount } from '@vue/test-utils';
import { NCheckbox, NCheckboxGroup, NCheckboxButton } from '..';
import { describe, expect, test } from 'vitest';
import { ref, nextTick } from 'vue';

describe('Checkbox.tsx', () => {
  test('basic', async () => {
    const modelValue = ref();
    const wrapper = mount(() => (
      <div>
        <NCheckbox modelValue={modelValue.value} label="1" />
        <NCheckbox modelValue={modelValue.value} label="2" />
      </div>
    ));

    const elements = wrapper.findAllComponents(NCheckbox);

    expect(elements.length).toBe(2);
  });
});

test('sizeBorder', async () => {
  const size = ref<'small' | 'medium' | 'large'>('small');

  const wrapperBorder = mount(() => <NCheckbox size={size.value} border={true} />);
  const wrapperNoneBorder = mount(() => <NCheckbox size={size.value} border={false} />);

  const checkboxBorder = wrapperBorder.findComponent(NCheckbox);
  const checkboxNoneBorder = wrapperNoneBorder.findComponent(NCheckbox);

  expect(checkboxBorder.classes()).toContain('n-checkbox--medium');
  expect(checkboxNoneBorder.classes()).not.toContain('n-checkbox--medium');

  size.value = 'medium';
  await nextTick();
  expect(checkboxBorder.classes()).toContain('n-checkbox--medium');
  expect(checkboxNoneBorder.classes()).not.toContain('n-checkbox--medium');

  size.value = 'large';
  await nextTick();
  expect(checkboxBorder.classes()).toContain('n-checkbox--large');
  expect(checkboxNoneBorder.classes()).not.toContain('n-checkbox--large');
});

test('sizeButton', async () => {
  const size = ref<'small' | 'medium' | 'large'>('small');
  const wrapper = mount(() => <NCheckboxButton size={size.value} />);

  const checkboxButton = wrapper.findComponent(NCheckboxButton);

  expect(checkboxButton.classes()).toContain('n-checkbox-button--medium');

  size.value = 'medium';
  await nextTick();
  expect(checkboxButton.classes()).toContain('n-checkbox-button--medium');

  size.value = 'large';
  await nextTick();
  expect(checkboxButton.classes()).toContain('n-checkbox-button--large');
});

test('sizeGroup', async () => {
  const size = ref<'small' | 'medium' | 'large'>('small');
  const modelValue = ref([]);
  const wrapperBorder = mount(() => (
    <NCheckboxGroup modelValue={modelValue.value} size={size.value}>
      <NCheckbox border={true} />
    </NCheckboxGroup>
  ));
  const wrapperNoneBorder = mount(() => (
    <NCheckboxGroup modelValue={modelValue.value} size={size.value}>
      <NCheckbox border={false} />
    </NCheckboxGroup>
  ));
  const wrapperButton = mount(() => (
    <NCheckboxGroup modelValue={modelValue.value} size={size.value}>
      <NCheckboxButton />
    </NCheckboxGroup>
  ));

  const elementCheckboxBorder = wrapperBorder.findComponent(NCheckbox);
  const elementCheckboxNoneBorder = wrapperNoneBorder.findComponent(NCheckbox);
  const elementCheckboxButton = wrapperButton.findComponent(NCheckboxButton);

  expect(elementCheckboxBorder.exists()).toBe(true);
  expect(elementCheckboxNoneBorder.exists()).toBe(true);
  expect(elementCheckboxButton.exists()).toBe(true);

  expect(elementCheckboxBorder.classes()).toContain('n-checkbox--medium');
  expect(elementCheckboxNoneBorder.classes()).not.toContain('n-checkbox--medium');
  expect(elementCheckboxButton.classes()).toContain('n-checkbox-button--medium');

  size.value = 'medium';
  await nextTick();
  expect(elementCheckboxBorder.classes()).toContain('n-checkbox--medium');
  expect(elementCheckboxNoneBorder.classes()).not.toContain('n-checkbox--medium');
  expect(elementCheckboxButton.classes()).toContain('n-checkbox-button--medium');

  size.value = 'large';
  await nextTick();
  expect(elementCheckboxBorder.classes()).toContain('n-checkbox--large');
  expect(elementCheckboxNoneBorder.classes()).not.toContain('n-checkbox--large');
  expect(elementCheckboxButton.classes()).toContain('n-checkbox-button--large');
});

test('true-label/false-label', async () => {
  const checkboxModelValue = ref('');
  const checkboxButtonModelValue = ref('');
  const checkboxGroupModelValue = ref<string[]>([]);

  const wrapper = mount(() => (
    <NCheckbox
      modelValue={checkboxModelValue.value}
      true-label="true-label"
      false-label="false-label"
    />
  ));
  const wrapper1 = mount(() => (
    <NCheckboxButton
      modelValue={checkboxButtonModelValue.value}
      true-label="true-label"
      false-label="false-label"
    />
  ));
  const wrapper2 = mount(() => (
    <NCheckboxGroup modelValue={checkboxGroupModelValue.value}>
      <NCheckboxButton true-label="true-label" false-label="false-label" />
      <NCheckboxButton true-label="true-label1" false-label="false-label" />
    </NCheckboxGroup>
  ));

  checkboxModelValue.value = 'true-label';
  checkboxButtonModelValue.value = 'true-label';
  checkboxGroupModelValue.value = ['true-label', 'true-label1'];
  await nextTick();
  expect(wrapper.classes()).toContain('n-checkbox--checked');
  expect(wrapper1.classes()).toContain('n-checkbox-button--checked');

  const checkedButtonElArr = wrapper2.findAll('.n-checkbox-button--checked');
  expect(checkedButtonElArr.length).toBe(2);
});

test('checked', async () => {
  const checkboxModelValue = ref(true);
  const checkboxGroupModelValue = ref(['hh']);

  const wrapper = mount(() => <NCheckboxButton modelValue={checkboxModelValue.value} label="hh" />);
  const wrapper1 = mount(() => <NCheckbox modelValue={checkboxModelValue.value} label="hh" />);
  const wrapper2 = mount(() => (
    <NCheckboxGroup modelValue={checkboxGroupModelValue.value}>
      <NCheckboxButton label="hh" />
      <NCheckboxButton label="jj" />
    </NCheckboxGroup>
  ));

  expect(wrapper.classes()).toContain('n-checkbox-button--checked');
  expect(wrapper1.classes()).toContain('n-checkbox--checked');
  const checkedButtonElArr = wrapper2.findAll('.n-checkbox-button--checked');
  expect(checkedButtonElArr.length).toBe(1);
});

test('checkboxGroup', async () => {
  const checkboxGroupModelValue = ref(['hh']);
  const checkboxModelValue = ref(true);

  const wrapper1 = mount(() => (
    <NCheckboxGroup modelValue={checkboxGroupModelValue.value}>
      <NCheckbox label="hh" />
      <NCheckbox label="jj" />
    </NCheckboxGroup>
  ));

  const wrapper11 = mount(() => (
    <NCheckboxGroup>
      <NCheckbox modelValue={checkboxModelValue.value} label="hh" />
      <NCheckbox modelValue={checkboxModelValue.value} label="jj" />
    </NCheckboxGroup>
  ));
  const wrapper2 = mount(() => (
    <NCheckboxGroup modelValue={checkboxGroupModelValue.value}>
      <NCheckboxButton label="hh" />
      <NCheckboxButton label="jj" />
    </NCheckboxGroup>
  ));
  const wrapper22 = mount(() => (
    <NCheckboxGroup>
      <NCheckboxButton modelValue={checkboxModelValue.value} label="hh" />
      <NCheckboxButton modelValue={checkboxModelValue.value} label="jj" />
    </NCheckboxGroup>
  ));

  const checkedElArr = wrapper1.findAll('.n-checkbox--checked');
  expect(checkedElArr.length).toBe(1);
  const checkedCheckboxElArr = wrapper11.findAll('.n-checkbox--checked');
  expect(checkedCheckboxElArr.length).toBe(2);

  const checkedButtonElArr = wrapper2.findAll('.n-checkbox-button--checked');
  expect(checkedButtonElArr.length).toBe(1);
  const checkedCheckboxButtonElArr = wrapper22.findAll('.n-checkbox-button--checked');
  expect(checkedCheckboxButtonElArr.length).toBe(2);
});
