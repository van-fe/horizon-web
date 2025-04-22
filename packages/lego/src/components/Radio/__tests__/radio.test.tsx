import { shallowMount, mount } from '@vue/test-utils';
import { NRadio, NRadioGroup, NRadioButton } from '../';
import { describe, expect, test } from 'vitest';
import { ref, nextTick } from 'vue';

describe('Radio.tsx', () => {
  test('basic', async () => {
    const modelValue = ref('1');
    const wrapper = shallowMount(() => (
      <div>
        <NRadio modelValue={modelValue.value} label="1" />
        <NRadio modelValue={modelValue.value} label="2" />
      </div>
    ));
    const elements = wrapper.findAllComponents(NRadio);

    expect(elements.length).toBe(2);
  });
});

test('sizeBorder', async () => {
  const size = ref<'small' | 'medium' | 'large'>('small');

  const wrapperBorder = mount(() => <NRadio size={size.value} border={true} />);
  const wrapperNoneBorder = mount(() => <NRadio size={size.value} border={false} />);

  const radioBorder = wrapperBorder.findComponent(NRadio);
  const radioNoneBorder = wrapperNoneBorder.findComponent(NRadio);

  expect(radioBorder.classes()).toContain('n-radio--medium');
  expect(radioNoneBorder.classes()).not.toContain('n-radio--medium');

  size.value = 'medium';
  await nextTick();
  expect(radioBorder.classes()).toContain('n-radio--medium');
  expect(radioNoneBorder.classes()).not.toContain('n-radio--medium');

  size.value = 'large';
  await nextTick();
  expect(radioBorder.classes()).toContain('n-radio--large');
  expect(radioNoneBorder.classes()).not.toContain('n-radio--large');
});

test('sizeButton', async () => {
  const size = ref<'small' | 'medium' | 'large'>('small');
  const wrapper = mount(() => <NRadioButton size={size.value} />);

  const radio = wrapper.findComponent(NRadioButton);

  expect(radio.classes()).toContain('n-radio-button--medium');

  size.value = 'medium';
  await nextTick();
  expect(radio.classes()).toContain('n-radio-button--medium');

  size.value = 'large';
  await nextTick();
  expect(radio.classes()).toContain('n-radio-button--large');
});

test('sizeGroup', async () => {
  const size = ref<'small' | 'medium' | 'large'>('small');
  const modelValue = ref(false);
  const wrapperRadioBorder = mount(() => (
    <NRadioGroup modelValue={modelValue.value} size={size.value}>
      <NRadio border={true} />
    </NRadioGroup>
  ));
  const wrapperRadioNoneBorder = mount(() => (
    <NRadioGroup modelValue={modelValue.value} size={size.value}>
      <NRadio border={false} />
    </NRadioGroup>
  ));
  const wrapperRadioButton = mount(() => (
    <NRadioGroup modelValue={modelValue.value} size={size.value}>
      <NRadioButton />
    </NRadioGroup>
  ));
  const elementRadioBorder = wrapperRadioBorder.find('.n-radio');
  const elementRadioNoneBorder = wrapperRadioNoneBorder.find('.n-radio');
  const elementRadioButton = wrapperRadioButton.find('.n-radio-button');

  expect(elementRadioBorder.exists()).toBe(true);
  expect(elementRadioNoneBorder.exists()).toBe(true);
  expect(elementRadioButton.exists()).toBe(true);

  expect(elementRadioBorder.classes()).toContain('n-radio--medium');
  expect(elementRadioNoneBorder.classes()).not.toContain('n-radio--medium');
  expect(elementRadioButton.classes()).toContain('n-radio-button--medium');

  size.value = 'medium';
  await nextTick();
  expect(elementRadioBorder.classes()).toContain('n-radio--medium');
  expect(elementRadioNoneBorder.classes()).not.toContain('n-radio--medium');
  expect(elementRadioButton.classes()).toContain('n-radio-button--medium');

  size.value = 'large';
  await nextTick();
  expect(elementRadioBorder.classes()).toContain('n-radio--large');
  expect(elementRadioNoneBorder.classes()).not.toContain('n-radio--large');
  expect(elementRadioButton.classes()).toContain('n-radio-button--large');
});
