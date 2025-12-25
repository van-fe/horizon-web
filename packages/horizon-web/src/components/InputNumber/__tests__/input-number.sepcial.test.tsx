import { mount } from '@vue/test-utils';
import HInputNumber from '../src/InputNumber';
import { describe, expect, test, vi } from 'vitest';
import { computed, nextTick, ref } from 'vue';
import type { InputNumberExposes } from '../src/composables/useExposes';
import { sleep } from '~/utils/tools';

describe('InputNumber.tsx special', () => {
  test('do not trigger "change event" before input manually', async () => {
    const modelValue = ref(0);
    const onChange = vi.fn();
    const wrapper = mount(() => <HInputNumber v-model={modelValue.value} onChange={onChange} />);

    expect(onChange).toHaveBeenCalledTimes(0);

    const inputElement = wrapper.find('input');

    await inputElement.setValue('12');

    expect(onChange).toHaveBeenCalledTimes(0);

    await inputElement.trigger('blur');

    await nextTick();

    expect(onChange).toHaveBeenCalledOnce();
  });

  test('do not trigger "change event" when modelValue change', async () => {
    const modelValue = ref(0);
    const onChange = vi.fn();
    mount(() => <HInputNumber v-model={modelValue.value} onChange={onChange} />);

    modelValue.value = 1;

    await nextTick();

    expect(onChange).toHaveBeenCalledTimes(0);
  });

  test('trigger "update:modelValue" when modelValue is less than props.min or gather than props.max', async () => {
    const modelValue = ref(0);
    const onChange = vi.fn();
    mount(() => <HInputNumber v-model={modelValue.value} min={5} onChange={onChange} />);

    await nextTick();

    expect(onChange).toHaveBeenCalledTimes(0);
    expect(modelValue.value).toBe(5);
  });

  test('when modelValue is less than props.min or gather than props.max, the change event trigger correct', async () => {
    const modelValue = ref<number>();
    const onChange = vi.fn();
    const wrapper = mount(() => (
      <HInputNumber v-model={modelValue.value} min={5} onChange={onChange} />
    ));

    const upTrigger = wrapper.find('.n-input-number__step-up');

    await upTrigger.trigger('click');

    expect(modelValue.value).eq(5);
    expect(onChange).toHaveBeenCalledWith(5);
  });

  test('clear', async () => {
    const inputRef = ref<(typeof HInputNumber & InputNumberExposes) | null>(null);
    const modelValue = ref(12);
    const onClear = vi.fn();
    const onFocus = vi.fn();

    const wrapper = mount(() => (
      <HInputNumber
        ref={inputRef}
        v-model={modelValue.value}
        clearable={true}
        onClear={onClear}
        onFocus={onFocus}
      />
    ));

    const element = wrapper.find('input');
    const clearIcon = wrapper.find('.n-input-number__clear');

    expect(clearIcon.exists()).toBe(true);

    await clearIcon.trigger('click');

    expect(element.element.value.length).toBe(0);
    expect(modelValue.value).eq(null);
    expect(onClear).toHaveBeenCalled();
    // happy-dom bug
    // expect(onFocus).toHaveBeenCalled();
  });

  test('keydown to increase or decrease number', async () => {
    const modelValue = ref();
    const modelValue2 = ref();

    const wrapper = mount(() => <HInputNumber v-model={modelValue.value} />);
    const wrapper2 = mount(() => (
      <HInputNumber v-model={modelValue2.value} controlsPosition="between" />
    ));

    const input = wrapper.find('input');
    const input2 = wrapper2.find('input');

    await input.trigger('keydown', {
      code: 'ArrowUp',
    });

    await input2.trigger('keydown', {
      code: 'ArrowRight',
    });

    expect(modelValue.value).eq(1);
    expect(modelValue2.value).eq(1);

    await input.trigger('keydown', {
      code: 'ArrowDown',
    });

    await input2.trigger('keydown', {
      code: 'ArrowLeft',
    });

    expect(modelValue.value).eq(0);
    expect(modelValue2.value).eq(0);
  });

  test('not trigger change event when modelValue is 0', async () => {
    const modelValue = ref(0);
    const onChange = vi.fn();
    const wrapper = mount(() => <HInputNumber v-model={modelValue.value} onChange={onChange} />);
    const input = wrapper.find('input');

    await input.trigger('blur');

    expect(onChange).toHaveBeenCalledTimes(0);
  });

  test('not trigger change event when modelValue is null', async () => {
    const modelValue = ref(null);
    const onChange = vi.fn();
    const wrapper = mount(() => <HInputNumber v-model={modelValue.value} onChange={onChange} />);
    const input = wrapper.find('input');

    await input.trigger('blur');

    expect(onChange).toHaveBeenCalledTimes(0);
  });

  test('not trigger update event when modelValue is undefined', async () => {
    const modelValue = ref();
    const onUpdate = vi.fn();

    mount(() => <HInputNumber v-model={modelValue.value} onUpdate:modelValue={onUpdate} />);

    expect(onUpdate).toHaveBeenCalledTimes(0);
  });

  test('not trigger update event when modelValue has number', async () => {
    const modelValue = ref(12);
    const onUpdate = vi.fn();

    mount(() => <HInputNumber v-model={modelValue.value} onUpdate:modelValue={onUpdate} />);

    expect(onUpdate).toHaveBeenCalledTimes(0);
  });

  test('always show prefix/suffix when disabled', async () => {
    const modelValue = ref(null);
    const wrapper = mount(() => (
      <HInputNumber v-model={modelValue.value} disabled={true}>
        {{
          prefix: () => <span id="prefix">prefix</span>,
          suffix: () => <span id="suffix">suffix</span>,
        }}
      </HInputNumber>
    ));

    expect(wrapper.find('#prefix').exists()).toBeTruthy();
    expect(wrapper.find('#suffix').exists()).toBeTruthy();
  });

  test('do not emit update event while modelValue has changed', async () => {
    const modelValue = ref<null | number>(null);
    const onUpdate = vi.fn();
    mount(() => <HInputNumber v-model={modelValue.value} onUpdate:modelValue={onUpdate} />);

    expect(onUpdate).toHaveBeenCalledTimes(0);

    modelValue.value = 2;

    expect(onUpdate).toHaveBeenCalledTimes(0);
  });

  test('formatter and parser with correct caret position', async () => {
    const value = ref();
    const domRef = ref<(HTMLElement & InputNumberExposes) | null>(null);

    const wrapper = mount(() => (
      <HInputNumber
        ref={domRef}
        v-model={value.value}
        // @ts-ignore
        formatter={(val: string) => `$ ${val.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
        parser={(val: string) => val.replace(/\$\s?|(,*)/g, '')}
      />
    ));

    await wrapper.find('input').setValue('1000');

    expect(value.value).toBe(1000);
    expect(domRef.value?.inputNumber.value).toBe('$ 1,000');

    domRef.value?.focus();

    await nextTick();

    await wrapper.find('input').setValue('100');
    await sleep(0);

    expect(domRef.value?.inputNumber.selectionStart).toBe(5);
    expect(value.value).toBe(100);
    expect(domRef.value?.inputNumber.value).toBe('$ 100');
  });

  test('zero fill', async () => {
    const value = ref(1000);

    const wrapper = mount(() => <HInputNumber v-model={value.value} precision={4} stringMode />);

    expect(wrapper.find('input').element.value).toBe('1000.0000');
    expect(value.value).toBe('1000.0000');
  });

  test('precision update', async () => {
    const precision = ref(2);
    const value = ref(1000);

    const wrapper = mount(() => (
      <HInputNumber v-model={value.value} precision={precision.value} stringMode />
    ));

    expect(wrapper.find('input').element.value).toBe('1000.00');
    expect(value.value).toBe('1000.00');

    precision.value = 0;

    await nextTick();

    expect(wrapper.find('input').element.value).toBe('1000');
    expect(value.value).toBe('1000.00');
  });

  test('precision update with max set', async () => {
    const precision = ref(2);
    const value = ref(10000);

    const wrapper = mount(() => (
      <HInputNumber v-model={value.value} precision={precision.value} max={9999.99} stringMode />
    ));

    expect(wrapper.find('input').element.value).toBe('9999.99');
    expect(value.value).toBe('9999.99');

    precision.value = 0;

    await nextTick();

    expect(wrapper.find('input').element.value).toBe('9999');
    expect(value.value).toBe('9999');

    precision.value = 2;

    await nextTick();

    expect(wrapper.find('input').element.value).toBe('9999.00');
    expect(value.value).toBe('9999.00');
  });

  test.each([
    { input: '123', expected: 123 },
    { input: 'abc-123.45.67e89', expected: -123.456789 },
    { input: '1.23.45', expected: 1.2345 },
    { input: '-.123', expected: -0.123 },
    { input: '123-456', expected: 123456 },
    { input: '12..3', expected: 12.3 },
    { input: '1.2.3.4', expected: 1.234 },
    { input: '--123', expected: -123 },
    { input: '-12-3', expected: -123 },
    { input: '-123.', expected: -123 },
    { input: '-123-', expected: -123 },
    { input: '-123-.', expected: -123 },
    { input: '-123.-', expected: -123 },
    { input: '-', expected: undefined },
    { input: '.', expected: 0 },
  ])('illegal input $input => $expected', async ({ input, expected }) => {
    const onUpdate = vi.fn();

    const wrapper = mount(() => <HInputNumber onUpdate:modelValue={onUpdate} />);

    await wrapper.find('input').setValue(input);

    await sleep();

    if (expected === undefined) {
      expect(onUpdate).toHaveBeenCalledTimes(0);
    } else {
      expect(onUpdate).toHaveBeenCalledWith(expected);
    }
  });

  test('keep display model-value when blur or increase/decrease', async () => {
    const onUpdate = vi.fn();
    const onChange = vi.fn();
    const onInput = vi.fn();

    const value = computed({
      get() {
        return 0;
      },
      set() {
        //
      },
    });

    const wrapper = mount(() => (
      <HInputNumber
        v-model={value.value}
        onChange={onChange}
        onInput={onInput}
        onUpdate:modelValue={onUpdate}
      />
    ));

    await wrapper.find('input').setValue(12);
    await wrapper.find('input').trigger('blur');

    expect(onUpdate).toHaveBeenCalledWith(12);
    expect(onInput).toHaveBeenCalledWith(12);
    expect(onChange).toHaveBeenCalledWith(12);

    expect(wrapper.find('input').element.value).toEqual('0');
  });

  test('do not trigger update:modelValue when focus on input', async () => {
    const value = ref(1);
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    const onUpdate = vi.fn();

    const wrapper = mount(() => (
      <HInputNumber
        v-model={value.value}
        onFocus={onFocus}
        onBlur={onBlur}
        onUpdate:modelValue={onUpdate}
      />
    ));

    await wrapper.find('input').trigger('focus');

    expect(onFocus).toHaveBeenCalledOnce();

    await wrapper.unmount();

    await sleep(1);

    expect(value.value).eq(1);
    expect(onUpdate).toHaveBeenCalledTimes(0);
    // happy-dom bug
    // expect(onBlur).toHaveBeenCalledOnce();
  });

  test('do not trigger update:modelValue when model-value is empty string', async () => {
    const value = ref('');
    const onUpdate = vi.fn();

    const wrapper = mount(() => (
      <HInputNumber v-model={value.value} onUpdate:modelValue={onUpdate} />
    ));

    expect(onUpdate).toHaveBeenCalledTimes(0);

    await wrapper.find('input').setValue('1');

    expect(onUpdate).toHaveBeenCalledTimes(1);
  });

  test('do not throw error when model-value changed to empty string', async () => {
    const value = ref(0);
    const onUpdate = vi.fn();

    const wrapper = mount(() => (
      <HInputNumber v-model={value.value} onUpdate:modelValue={onUpdate} />
    ));

    expect(onUpdate).toHaveBeenCalledTimes(0);

    await wrapper.find('input').setValue('');

    expect(onUpdate).toHaveBeenCalledTimes(1);
    expect(onUpdate).toHaveBeenLastCalledWith(null);
  });

  test('do not blur after input value, press arrow down should display correct value', async () => {
    const value = ref();
    const onUpdate = vi.fn();
    const onBlur = vi.fn();

    const wrapper = mount(() => (
      <HInputNumber v-model={value.value} onUpdate:modelValue={onUpdate} onBlur={onBlur} />
    ));

    expect(onUpdate).toHaveBeenCalledTimes(0);
    expect(onBlur).toHaveBeenCalledTimes(0);

    await wrapper.find('input').setValue(25);
    await wrapper.find('input').trigger('keydown', { code: 'ArrowDown' });

    expect(value.value).eq(24);
    expect(wrapper.find('input').element.value).eq('24');

    await wrapper.find('input').trigger('keydown', { code: 'ArrowUp' });

    expect(value.value).eq(25);
    expect(wrapper.find('input').element.value).eq('25');

    expect(onBlur).toHaveBeenCalledTimes(0);
  });

  test('do not blur after input value, press arrow up should display correct value', async () => {
    const value = ref();
    const onUpdate = vi.fn();
    const onBlur = vi.fn();

    const wrapper = mount(() => (
      <HInputNumber v-model={value.value} onUpdate:modelValue={onUpdate} onBlur={onBlur} />
    ));

    expect(onUpdate).toHaveBeenCalledTimes(0);
    expect(onBlur).toHaveBeenCalledTimes(0);

    await wrapper.find('input').setValue(25);
    await wrapper.find('input').trigger('keydown', { code: 'ArrowUp' });

    expect(value.value).eq(26);
    expect(wrapper.find('input').element.value).eq('26');

    await wrapper.find('input').trigger('keydown', { code: 'ArrowDown' });

    expect(value.value).eq(25);
    expect(wrapper.find('input').element.value).eq('25');

    expect(onBlur).toHaveBeenCalledTimes(0);
  });

  test('should trigger change event whenever model-value changed by user', async () => {
    const value = ref();
    const onUpdate = vi.fn();
    const onChange = vi.fn();
    const onBlur = vi.fn();

    const wrapper = mount(() => (
      <HInputNumber
        v-model={value.value}
        onUpdate:modelValue={onUpdate}
        onBlur={onBlur}
        onChange={onChange}
      />
    ));

    expect(onUpdate).toHaveBeenCalledTimes(0);
    expect(onChange).toHaveBeenCalledTimes(0);
    expect(onBlur).toHaveBeenCalledTimes(0);

    value.value = 5;

    await wrapper.find('input').trigger('blur');

    expect(onUpdate).toHaveBeenCalledTimes(0);
    expect(onChange).toHaveBeenCalledTimes(0);
    expect(onBlur).toHaveBeenCalledTimes(1);

    await wrapper.find('input').setValue('52');

    expect(onUpdate).toHaveBeenCalledTimes(1);

    await wrapper.find('input').trigger('blur');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(2);
  });

  test('should not trigger change event when initial with empty string', async () => {
    const value = ref('');
    const onUpdate = vi.fn();
    const onChange = vi.fn();
    const onBlur = vi.fn();

    const wrapper = mount(() => (
      <HInputNumber
        v-model={value.value}
        onUpdate:modelValue={onUpdate}
        onBlur={onBlur}
        onChange={onChange}
      />
    ));

    expect(onUpdate).toHaveBeenCalledTimes(0);
    expect(onChange).toHaveBeenCalledTimes(0);
    expect(onBlur).toHaveBeenCalledTimes(0);

    await wrapper.find('input').trigger('blur');

    expect(onUpdate).toHaveBeenCalledTimes(0);
    expect(onChange).toHaveBeenCalledTimes(0);
    expect(onBlur).toHaveBeenCalledTimes(1);

    await wrapper.find('input').trigger('blur');

    expect(onUpdate).toHaveBeenCalledTimes(0);
    expect(onChange).toHaveBeenCalledTimes(0);
    expect(onBlur).toHaveBeenCalledTimes(2);
  });

  test('should not trigger change event when value is bigger than max', async () => {
    const value = ref();
    const onUpdate = vi.fn();
    const onChange = vi.fn();
    const onBlur = vi.fn();

    const wrapper = mount(() => (
      <HInputNumber
        v-model={value.value}
        max={9}
        onUpdate:modelValue={onUpdate}
        onBlur={onBlur}
        onChange={onChange}
      />
    ));

    expect(onUpdate).toHaveBeenCalledTimes(0);
    expect(onChange).toHaveBeenCalledTimes(0);
    expect(onBlur).toHaveBeenCalledTimes(0);

    await wrapper.find('input').setValue('10');
    await wrapper.find('input').trigger('blur');

    expect(onUpdate).toHaveBeenCalledWith(9);
    expect(onChange).toHaveBeenCalledWith(9);
    expect(onBlur).toHaveBeenCalledTimes(1);

    await wrapper.find('input').trigger('blur');

    expect(onUpdate).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(2);
  });
});
