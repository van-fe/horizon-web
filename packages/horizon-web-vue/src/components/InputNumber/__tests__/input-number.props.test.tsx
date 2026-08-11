import { mount } from '@vue/test-utils';
import HInputNumber from '../src/InputNumber';
import { describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import type { InputNumberProps } from '../src/composables/useProps';
import { sleep } from '~/utils/tools';
import { IconClose, IconSearch } from '@aurora/icon';

describe('InputNumber.tsx props', () => {
  test('inputStyle, size and wheelToChange affect classes and native wheel cancellation', async () => {
    const wrapper = mount(HInputNumber, {
      attachTo: document.body,
      props: {
        inputStyle: 'emphasize',
        size: 'large',
        wheelToChange: false,
        prefixIcon: IconClose,
      },
    });
    const input = wrapper.get('input');
    const groupInner = wrapper.get('.h-input-number__group--inner');
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['h-input-number--emphasize', 'h-input-number--large']),
    );
    expect(wrapper.findComponent(IconClose).props('size')).toBe(14);

    const unfocusedWheel = new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: 1 });
    input.element.dispatchEvent(unfocusedWheel);
    expect(unfocusedWheel.defaultPrevented).toBe(false);

    await groupInner.trigger('mouseenter');
    expect(wrapper.classes()).toContain('is-inner-active');
    await groupInner.trigger('mouseleave');
    expect(wrapper.classes()).not.toContain('is-inner-active');

    await wrapper.get('.h-input-number__prefix').trigger('click');
    expect(document.activeElement).toBe(input.element);

    await input.trigger('focus');
    const blockedWheel = new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: 1 });
    input.element.dispatchEvent(blockedWheel);
    expect(blockedWheel.defaultPrevented).toBe(true);

    await wrapper.setProps({ wheelToChange: true });
    const allowedWheel = new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: 1 });
    input.element.dispatchEvent(allowedWheel);
    expect(allowedWheel.defaultPrevented).toBe(false);

    await wrapper.setProps({ size: 'small', disabled: true });
    expect(wrapper.findComponent(IconClose).props('size')).toBe(9);
    await input.trigger('blur');
    await groupInner.trigger('mouseenter');
    expect(wrapper.classes()).not.toContain('is-inner-active');
    wrapper.unmount();
  });

  test('status.error', () => {
    const wrapper = mount(() => <HInputNumber status="error" />);

    expect(wrapper.classes()).toContain('is-error');
  });

  test('model-value', async () => {
    const modelValue = ref();
    const wrapper = mount(() => <HInputNumber v-model={modelValue.value} />);
    const input = wrapper.find('input');

    expect(input.attributes()).toHaveProperty('data-focus-visible-proxy');

    await input.setValue('12');

    expect(modelValue.value).eq(12);
  });

  test('min & max', async () => {
    const modelValue = ref();
    const wrapper = mount(() => <HInputNumber v-model={modelValue.value} min={0} max={10} />);
    const input = wrapper.find('input');

    await input.setValue('-10');

    expect(modelValue.value).eq(0);

    await input.setValue('12');

    expect(modelValue.value).eq(10);
  });

  test('min & max is string', async () => {
    const modelValue = ref();
    const wrapper = mount(() => <HInputNumber v-model={modelValue.value} min="0" max="10" />);
    const input = wrapper.find('input');

    await input.setValue('-10');

    expect(modelValue.value).eq(0);

    await input.setValue('12');

    expect(modelValue.value).eq(10);
  });

  test('step', async () => {
    const modelValue = ref();
    const wrapper = mount(() => <HInputNumber v-model={modelValue.value} step={5} />);
    const element = wrapper.findComponent(HInputNumber);

    const stepUp = element.find('.h-input-number__step-up');
    const stepDown = element.find('.h-input-number__step-down');

    await stepUp.trigger('click');

    expect(modelValue.value).eq(5);

    await stepDown.trigger('click');

    expect(modelValue.value).eq(0);
  });

  test('stepStrictly', async () => {
    const modelValue = ref();
    const wrapper = mount(() => (
      <HInputNumber v-model={modelValue.value} stepStrictly={true} step={5} />
    ));
    const input = wrapper.find('input');

    await input.setValue('4');

    expect(modelValue.value).eq(5);

    await input.setValue('2');

    expect(modelValue.value).eq(0);
  });

  test('precision', async () => {
    const modelValue = ref();
    const wrapper = mount(() => <HInputNumber v-model={modelValue.value} precision={1} />);
    const input = wrapper.find('input');

    await input.setValue('12.33');

    expect(modelValue.value).eq(12.3);
  });

  test('precisionType', async () => {
    const modelValue = ref(1.255);
    mount(() => <HInputNumber v-model={modelValue.value} precision={2} />);

    await nextTick();

    expect(modelValue.value).eq(1.26);
  });

  test('disabled', async () => {
    const modelValue = ref();
    const disabled = ref(false);
    const onFocus = vi.fn();

    const wrapper = mount(() => (
      <HInputNumber v-model={modelValue.value} disabled={disabled.value} onFocus={onFocus} />
    ));
    const input = wrapper.find('input');

    await input.trigger('focus');

    expect(onFocus).toHaveBeenCalledOnce();

    disabled.value = true;

    await nextTick();

    await input.trigger('focus');

    expect(input.attributes('disabled')).not.toBeUndefined();
    expect(onFocus).toHaveBeenCalledOnce();
  });

  test('controls', async () => {
    const controls = ref(true);
    const wrapper = mount(() => <HInputNumber controls={controls.value} />);

    expect(wrapper.find('.h-input-number__step-wrapper').exists()).toBeTruthy();

    controls.value = false;

    await nextTick();

    expect(wrapper.find('.h-input-number__step-wrapper').exists()).not.toBeTruthy();
  });

  test('controlsPosition', async () => {
    const modelValue = ref();
    const controlsPosition = ref<InputNumberProps['controlsPosition']>('right');
    const wrapper = mount(() => (
      <HInputNumber v-model={modelValue.value} controlsPosition={controlsPosition.value} />
    ));

    expect(wrapper.find('.h-input-number__step-up').exists()).toBeTruthy();
    expect(wrapper.find('.h-input-number__step-down').exists()).toBeTruthy();

    await wrapper.find('.h-input-number__step-up').trigger('click');
    expect(modelValue.value).eq(1);

    await wrapper.find('.h-input-number__step-down').trigger('click');
    expect(modelValue.value).eq(0);

    controlsPosition.value = 'between';

    await nextTick();

    expect(wrapper.find('.h-input-number__step-minus').exists()).toBeTruthy();

    await wrapper.find('.h-input-number__step-minus').trigger('click');
    expect(modelValue.value).eq(-1);

    await wrapper.find('.h-input-number__step-up').trigger('click');
    expect(modelValue.value).eq(0);

    const input = wrapper.get('input');
    await input.trigger('keydown', { code: 'ArrowRight' });
    expect(modelValue.value).eq(1);
    await input.trigger('keydown', { code: 'ArrowLeft' });
    expect(modelValue.value).eq(0);
    await wrapper.find('.h-input-number__step-minus').trigger('mousedown');
    await wrapper.find('.h-input-number__step-minus').trigger('mouseup');
  });

  test('step controls remain inert at both bounds and while disabled', async () => {
    const modelValue = ref(1);
    const wrapper = mount(() => (
      <HInputNumber v-model={modelValue.value} min={1} max={1} enableLangPress />
    ));

    await wrapper.get('.h-input-number__step-up').trigger('click');
    await wrapper.get('.h-input-number__step-down').trigger('click');
    await wrapper.get('.h-input-number__step-up').trigger('mousedown');
    expect(modelValue.value).toBe(1);

    const disabledValue = ref(0);
    const disabled = mount(() => <HInputNumber v-model={disabledValue.value} disabled />);
    await disabled.get('.h-input-number__step-up').trigger('click');
    expect(disabledValue.value).toBe(0);
  });

  test('name', async () => {
    const wrapper = mount(() => <HInputNumber name="test" />);

    expect(wrapper.find('input').attributes('name')).eq('test');
  });

  test('placeholder', async () => {
    const wrapper = mount(() => <HInputNumber placeholder="test" />);

    expect(wrapper.find('input').attributes('placeholder')).eq('test');
  });

  test('clearable', async () => {
    const modelValue = ref(12);
    const clearable = ref(false);
    const wrapper = mount(() => (
      <HInputNumber v-model={modelValue.value} clearable={clearable.value} />
    ));

    expect(wrapper.find('.h-input-number__clear').exists()).not.toBeTruthy();

    clearable.value = true;

    await nextTick();

    const clear = wrapper.find('.h-input-number__clear');

    expect(clear.exists()).toBeTruthy();

    await clear.trigger('click');

    expect(modelValue.value).toBeNull();
  });

  test('readonly', async () => {
    const modelValue = ref(12);
    const readonly = ref(false);
    const wrapper = mount(() => (
      <HInputNumber v-model={modelValue.value} readonly={readonly.value} />
    ));

    await wrapper.find('input').setValue('13');

    expect(modelValue.value).eq(13);

    readonly.value = true;

    await nextTick();

    await wrapper.find('input').setValue('14');

    expect(modelValue.value).eq(14);
    expect(wrapper.find('.h-input-number__step-wrapper').exists()).toBeFalsy();
  });

  test('lang press', async () => {
    const modelValue = ref(1);
    const langPressFrequency = ref(200);
    const wrapper = mount(() => (
      <HInputNumber
        v-model={modelValue.value}
        enableLangPress={true}
        langPressFrequency={langPressFrequency.value}
      />
    ));

    const increaseBtn = wrapper.find('.h-input-number__step-up');
    const decreaseBtn = wrapper.find('.h-input-number__step-down');

    await increaseBtn.trigger('mousedown');
    await sleep(1200);
    await increaseBtn.trigger('mouseup');

    expect(modelValue.value).eq(5);

    langPressFrequency.value = 100;

    await increaseBtn.trigger('mousedown');

    await sleep(800);

    await increaseBtn.trigger('mouseleave');

    expect(modelValue.value).eq(8);

    await decreaseBtn.trigger('mousedown');
    await sleep(1200);
    await decreaseBtn.trigger('mouseup');

    expect(modelValue.value).eq(1);
  });

  test('icon', async () => {
    const wrapper = mount(() => <HInputNumber prefixIcon="clear" suffixIcon="point" />);

    expect(wrapper.find('.h-input-number__prefix').find('.h-icon_clear').exists()).toBeTruthy();
    expect(wrapper.find('.h-input-number__suffix').find('.h-icon_point').exists()).toBeTruthy();

    const wrapper2 = mount(() => <HInputNumber prefixIcon={IconClose} suffixIcon={IconSearch} />);

    expect(wrapper2.find('.h-input-number__prefix').findComponent(IconClose).exists()).toBeTruthy();
    expect(
      wrapper2.find('.h-input-number__suffix').findComponent(IconSearch).exists(),
    ).toBeTruthy();
  });
});
