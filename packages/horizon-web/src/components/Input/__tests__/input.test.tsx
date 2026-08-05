import { mount, shallowMount } from '@vue/test-utils';
import HInput from '../src/Input';
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
      <HInput
        modelValue={inputValue.value}
        placeholder="Please input"
        onFocus={handleFocus}
        onChange={handleChange}
      />
    ));

    const inputElm = wrapper.findComponent(HInput);

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
    const wrapper = shallowMount(() => <HInput disabled />);

    expect(wrapper.attributes('disabled')).not.toBeNull();
  });

  test('status.error', () => {
    const wrapper = mount(() => <HInput status="error" />);

    expect(wrapper.classes()).toContain('h-input__error--normal');
  });

  test('prefix', async () => {
    const icon = ref('time');

    const wrapper = mount(() => <HInput prefix-icon={icon.value} />);
    const timeIcon = wrapper.find('.h-icon_time');

    expect(timeIcon.exists()).toBe(true);

    icon.value = 'close';
    await nextTick();

    expect(wrapper.find('.h-icon_close').exists()).toBe(true);
  });

  test('suffix', () => {
    const wrapper = mount(() => <HInput suffix-icon="time" />);
    const suffixIcon = wrapper.find('.h-icon_time');

    expect(suffixIcon.exists()).toBe(true);
  });

  test('size', async () => {
    const size = ref<'small' | 'large'>('small');

    const wrapper = mount(() => <HInput size={size.value} />);
    expect(wrapper.classes()).toContain('h-input--small');

    size.value = 'large';
    await nextTick();

    expect(wrapper.classes()).toContain('h-input--large');
  });

  test('type', async () => {
    const wrapper = mount(() => <HInput type="text" />);
    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);
    expect(input.attributes()).toHaveProperty('data-focus-visible-proxy');

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

  test('embedded fit-content input reuses native input behavior', async () => {
    const modelValue = ref('Horizon');
    const onInput = vi.fn();
    const wrapper = mount(() => (
      <HInput
        v-model={modelValue.value}
        embedded
        fitContent
        fitContentMinWidth={24}
        onInput={onInput}
      />
    ));

    expect(wrapper.classes()).toContain('h-input__fit-content');
    expect(wrapper.find('.h-input__fit-content-mirror').attributes('style')).toContain(
      'min-width: 24px',
    );
    expect(wrapper.find('input').attributes()).not.toHaveProperty('data-focus-visible-proxy');

    await wrapper.find('input').setValue('Web');

    expect(modelValue.value).toBe('Web');
    expect(onInput).toHaveBeenCalledWith('Web', expect.any(Event));
    expect(wrapper.find('.h-input__fit-content-mirror').text()).toBe('Web');
  });

  test('input.max-length', async () => {
    const modelValue = ref('12345678901111');
    const wrapper = mount(() => (
      <HInput
        v-model={modelValue.value}
        maxlength={10}
        showLimit={true}
        enableOutOfExceeded={true}
      />
    ));

    expect(wrapper.find('.h-input__limit').exists()).toBe(true);
    expect(wrapper.classes('is-out-of-exceeded')).toBe(true);
  });

  test('textarea.max-length', async () => {
    const modelValue = ref('12345678901111');
    const wrapper = mount(() => (
      <HInput
        v-model={modelValue.value}
        type="textarea"
        maxlength={10}
        showLimit={true}
        enableOutOfExceeded={true}
      />
    ));

    expect(wrapper.find('.h-input__textarea-limit').exists()).toBe(true);
    expect(wrapper.find('textarea').attributes()).toHaveProperty('data-focus-visible-proxy');
    expect(wrapper.classes('is-out-of-exceeded')).toBe(true);
  });

  describe('event', () => {
    test('basic', async () => {
      const modelValue = ref('');
      const onInput = vi.fn();
      const onFocus = vi.fn();
      const onBlur = vi.fn();

      const wrapper = mount(() => (
        <HInput modelValue={modelValue.value} onInput={onInput} onFocus={onFocus} onBlur={onBlur} />
      ));
      const element = wrapper.find('input');

      await element.trigger('focus');

      expect(onFocus).toHaveBeenCalledOnce();

      await element.setValue('input');

      expect(onInput).toHaveBeenCalled();

      await element.trigger('blur');

      expect(onBlur).toHaveBeenCalledOnce();
    });

    test('Do not trigger "change event" before input manually', async () => {
      const modelValue = ref('111');
      const onChange = vi.fn();
      const wrapper = mount(() => <HInput modelValue={modelValue.value} onChange={onChange} />);

      expect(onChange).toHaveBeenCalledTimes(0);

      const inputElement = wrapper.find('input');

      await inputElement.trigger('focus');
      await inputElement.setValue('222');
      await inputElement.trigger('blur');

      expect(onChange).toHaveBeenCalledOnce();
    });

    test('clear', async () => {
      const inputRef = ref<(typeof HInput & InputExposes) | null>(null);
      const modelValue = ref('1234');
      const onClear = vi.fn();
      const onFocus = vi.fn();

      const wrapper = mount(() => (
        <HInput
          ref={inputRef}
          modelValue={modelValue.value}
          clearable={true}
          onClear={onClear}
          onFocus={onFocus}
        />
      ));
      const element = wrapper.find('input');
      const clearIcon = wrapper.find('.h-input--clear-action');

      expect(clearIcon.exists()).toBe(true);

      await clearIcon.trigger('click');

      expect(element.element.value.length).toBe(0);

      expect(onClear).toHaveBeenCalled();
      // happy-dom bug
      // expect(onFocus).toHaveBeenCalled();
    });

    test('click', async () => {
      const inputRef = ref<(typeof HInput & InputExposes) | null>(null);
      const onClick = vi.fn();

      const wrapper = mount(() => <HInput ref={inputRef} clearable={true} onClick={onClick} />);
      const element = wrapper.find('input');

      await element.trigger('click');

      expect(onClick).toHaveBeenCalled();
    });
  });
});
