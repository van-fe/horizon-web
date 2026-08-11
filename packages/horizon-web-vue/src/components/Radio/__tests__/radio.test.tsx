import { shallowMount, mount } from '@vue/test-utils';
import { HRadio, HRadioGroup, HRadioButton } from '..';
import { describe, expect, test } from 'vitest';
import { ref, nextTick } from 'vue';

describe('Radio.tsx', () => {
  test('basic', async () => {
    const modelValue = ref('1');
    const wrapper = shallowMount(() => (
      <div>
        <HRadio modelValue={modelValue.value} value="1" />
        <HRadio modelValue={modelValue.value} value="2" />
      </div>
    ));
    const elements = wrapper.findAllComponents(HRadio);

    expect(elements.length).toBe(2);
  });

  test('keeps radio inputs tabbable as focus-visible proxies', () => {
    const inputs = [mount(() => <HRadio />), mount(() => <HRadioButton />)].map(wrapper =>
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

  const wrapperBorder = mount(() => <HRadio size={size.value} border={true} />);
  const wrapperNoneBorder = mount(() => <HRadio size={size.value} border={false} />);

  const radioBorder = wrapperBorder.findComponent(HRadio);
  const radioNoneBorder = wrapperNoneBorder.findComponent(HRadio);

  expect(radioBorder.classes()).toContain('h-radio--medium');
  expect(radioNoneBorder.classes()).not.toContain('h-radio--medium');

  size.value = 'medium';
  await nextTick();
  expect(radioBorder.classes()).toContain('h-radio--medium');
  expect(radioNoneBorder.classes()).not.toContain('h-radio--medium');

  size.value = 'large';
  await nextTick();
  expect(radioBorder.classes()).toContain('h-radio--large');
  expect(radioNoneBorder.classes()).not.toContain('h-radio--large');
});

test('sizeButton', async () => {
  const size = ref<'small' | 'medium' | 'large'>('small');
  const wrapper = mount(() => <HRadioButton size={size.value} />);

  const radio = wrapper.findComponent(HRadioButton);

  expect(radio.classes()).toContain('h-radio-button--medium');

  size.value = 'medium';
  await nextTick();
  expect(radio.classes()).toContain('h-radio-button--medium');

  size.value = 'large';
  await nextTick();
  expect(radio.classes()).toContain('h-radio-button--large');
});

test('sizeGroup', async () => {
  const size = ref<'small' | 'medium' | 'large'>('small');
  const modelValue = ref(false);
  const wrapperRadioBorder = mount(() => (
    <HRadioGroup modelValue={modelValue.value} size={size.value}>
      <HRadio border={true} />
    </HRadioGroup>
  ));
  const wrapperRadioNoneBorder = mount(() => (
    <HRadioGroup modelValue={modelValue.value} size={size.value}>
      <HRadio border={false} />
    </HRadioGroup>
  ));
  const wrapperRadioButton = mount(() => (
    <HRadioGroup modelValue={modelValue.value} size={size.value}>
      <HRadioButton />
    </HRadioGroup>
  ));
  const elementRadioBorder = wrapperRadioBorder.find('.h-radio');
  const elementRadioNoneBorder = wrapperRadioNoneBorder.find('.h-radio');
  const elementRadioButton = wrapperRadioButton.find('.h-radio-button');

  expect(elementRadioBorder.exists()).toBe(true);
  expect(elementRadioNoneBorder.exists()).toBe(true);
  expect(elementRadioButton.exists()).toBe(true);

  expect(elementRadioBorder.classes()).toContain('h-radio--medium');
  expect(elementRadioNoneBorder.classes()).not.toContain('h-radio--medium');
  expect(elementRadioButton.classes()).toContain('h-radio-button--medium');

  size.value = 'medium';
  await nextTick();
  expect(elementRadioBorder.classes()).toContain('h-radio--medium');
  expect(elementRadioNoneBorder.classes()).not.toContain('h-radio--medium');
  expect(elementRadioButton.classes()).toContain('h-radio-button--medium');

  size.value = 'large';
  await nextTick();
  expect(elementRadioBorder.classes()).toContain('h-radio--large');
  expect(elementRadioNoneBorder.classes()).not.toContain('h-radio--large');
  expect(elementRadioButton.classes()).toContain('h-radio-button--large');
});
