import { mount, shallowMount } from '@vue/test-utils';
import NInput from '../src/Input';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import type { InputExposes } from '../src/composables/useExposes';

describe('Input.tsx', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('basic', async () => {
    const inputValue = ref('input');
    const handleFocus = vi.fn();
    const handleChange = vi.fn();

    const wrapper = shallowMount(() => (
      <NInput
        modelValue={inputValue.value}
        placeholder="Please input"
        onFocus={handleFocus}
        onChange={handleChange}
      />
    ));

    const inputElm = wrapper.findComponent(NInput);

    await inputElm.trigger('focus');

    expect(inputElm.exists()).toBe(true);
    expect(handleFocus).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledTimes(0);
    expect(wrapper.attributes('placeholder')).toMatchInlineSnapshot(`"Please input"`);
    expect(wrapper.attributes('modelvalue')).toMatchInlineSnapshot(`"input"`);

    inputValue.value = 'input-value-change';
    await nextTick();

    expect(wrapper.attributes('modelvalue')).toMatchInlineSnapshot(`"input-value-change"`);
  });

  test('disabled', () => {
    const wrapper = shallowMount(() => <NInput disabled />);

    expect(wrapper.attributes('disabled')).not.toBeNull();
  });

  test('status.error', () => {
    const wrapper = mount(() => <NInput status="error" />);

    expect(wrapper.classes()).toContain('n-input__error--normal');
  });

  test('prefix', async () => {
    const icon = ref('time');

    const wrapper = mount(() => <NInput prefix-icon={icon.value} />);
    const timeIcon = wrapper.find('.n-icon_time');

    expect(timeIcon.exists()).toBe(true);

    icon.value = 'close';
    await nextTick();

    expect(wrapper.find('.n-icon_close').exists()).toBe(true);
  });

  test('suffix', () => {
    const wrapper = mount(() => <NInput suffix-icon="time" />);
    const suffixIcon = wrapper.find('.n-icon_time');

    expect(suffixIcon.exists()).toBe(true);
  });

  test('size', async () => {
    const size = ref<'small' | 'large'>('small');

    const wrapper = mount(() => <NInput size={size.value} />);
    expect(wrapper.classes()).toContain('n-input--small');

    size.value = 'large';
    await nextTick();

    expect(wrapper.classes()).toContain('n-input--large');
  });

  test('type', async () => {
    const wrapper = mount(() => <NInput type="text" />);
    expect(wrapper.find('input').exists()).toBe(true);

    // todo:: need to provide type modified dynamically
    // await wrapper.setProps({
    //   type: 'textarea',
    // });
    // console.info(wrapper.html());
    // expect(wrapper.find('textarea').exists()).toBe(true);

    // await wrapper.setProps({
    //   type: 'password',
    //   showPassword: true,
    // });
    // const inputElement = wrapper.find('input');
    // expect(inputElement.exists()).toBe(true);
    // expect(inputElement.attributes('type')).toBe('password');
  });

  test('input.max-length', async () => {
    const modelValue = ref('12345678901111');
    const wrapper = mount(() => (
      <NInput
        v-model={modelValue.value}
        maxlength={10}
        showLimit={true}
        enableOutOfExceeded={true}
      />
    ));

    expect(wrapper.find('.n-input__limit').exists()).toBe(true);
    expect(wrapper.classes('is-out-of-exceeded')).toBe(true);
  });

  test('textarea.max-length', async () => {
    const modelValue = ref('12345678901111');
    const wrapper = mount(() => (
      <NInput
        v-model={modelValue.value}
        type="textarea"
        maxlength={10}
        showLimit={true}
        enableOutOfExceeded={true}
      />
    ));

    expect(wrapper.find('.n-input__textarea-limit').exists()).toBe(true);
    expect(wrapper.classes('is-out-of-exceeded')).toBe(true);
  });

  describe('event', () => {
    test('basic', async () => {
      const modelValue = ref('');
      const onInput = vi.fn();
      const onFocus = vi.fn();
      const onBlur = vi.fn();

      const wrapper = mount(() => (
        <NInput modelValue={modelValue.value} onInput={onInput} onFocus={onFocus} onBlur={onBlur} />
      ));
      const element = wrapper.find('input');

      await element.trigger('focus');

      expect(onFocus).toHaveBeenCalled();

      await element.setValue('input');

      expect(onInput).toHaveBeenCalled();

      await element.trigger('blur');

      expect(onBlur).toHaveBeenCalled();
    });

    test('Do not trigger "change event" before input manually', async () => {
      const modelValue = ref('111');
      const onChange = vi.fn();
      const wrapper = mount(() => <NInput modelValue={modelValue.value} onChange={onChange} />);

      expect(onChange).toHaveBeenCalledTimes(0);

      const inputElement = wrapper.find('input');

      await inputElement.trigger('focus');
      await inputElement.setValue('222');
      await inputElement.trigger('blur');

      expect(onChange).toHaveBeenCalledOnce();
    });

    test('clear', async () => {
      const inputRef = ref<(typeof NInput & InputExposes) | null>(null);
      const modelValue = ref('1234');
      const onClear = vi.fn();
      const onFocus = vi.fn();

      const wrapper = mount(() => (
        <NInput
          ref={inputRef}
          modelValue={modelValue.value}
          clearable={true}
          onClear={onClear}
          onFocus={onFocus}
        />
      ));
      const element = wrapper.find('input');
      const clearIcon = wrapper.find('.n-input--clear-action');

      expect(clearIcon.exists()).toBe(true);

      await clearIcon.trigger('click');

      expect(element.element.value.length).toBe(0);

      expect(onClear).toHaveBeenCalled();
      // happy-dom bug
      // expect(onFocus).toHaveBeenCalled();
    });

    test('click', async () => {
      const inputRef = ref<(typeof NInput & InputExposes) | null>(null);
      const onClick = vi.fn();

      const wrapper = mount(() => <NInput ref={inputRef} clearable={true} onClick={onClick} />);
      const element = wrapper.find('input');

      await element.trigger('click');

      expect(onClick).toHaveBeenCalled();
    });
  });
});
