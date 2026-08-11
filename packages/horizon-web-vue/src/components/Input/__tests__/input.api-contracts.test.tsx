import { flushPromises, mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import HInput from '../src/Input';
import { useInputEmits } from '../src/composables/useEmits';
import type { HorizonWebComponentInstance } from '@aurora/utils';
import type { InputExposes } from '../src/composables/useExposes';

describe('Input public API contracts', () => {
  test('native props, all slots and keyboard/composition events remain observable', async () => {
    const modelValue = ref('secret');
    const onUpdate = vi.fn((value: string) => (modelValue.value = value));
    const onClick = vi.fn();
    const onInput = vi.fn();
    const onChange = vi.fn();
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    const onClear = vi.fn();
    const onKeydown = vi.fn();
    const onKeypress = vi.fn();
    const onKeyup = vi.fn();
    const onCompositionstart = vi.fn();
    const onCompositionupdate = vi.fn();
    const onCompositionend = vi.fn();
    const wrapper = mount(() => (
      <HInput
        modelValue={modelValue.value}
        type="password"
        size="large"
        placeholder="Password"
        clearable
        readonly
        showPassword
        maxlength={12}
        minlength={3}
        inputStyle="no-border"
        tabindex={3}
        autocomplete="new-password"
        unselectable="on"
        data-contract="native"
        onUpdate:modelValue={onUpdate}
        onClick={onClick}
        onInput={onInput}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onClear={onClear}
        onKeydown={onKeydown}
        onKeypress={onKeypress}
        onKeyup={onKeyup}
        onCompositionstart={onCompositionstart}
        onCompositionupdate={onCompositionupdate}
        onCompositionend={onCompositionend}
      >
        {{
          prefix: () => <span data-test="prefix">Prefix</span>,
          suffix: () => <span data-test="suffix">Suffix</span>,
          prepend: () => <span data-test="prepend">Prepend</span>,
          append: () => <span data-test="append">Append</span>,
        }}
      </HInput>
    ));
    const input = wrapper.get('input');

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['h-input--large', 'h-input--no-border', 'h-input--with-prepend', 'h-input--with-append']),
    );
    expect(input.attributes()).toMatchObject({
      type: 'password',
      readonly: '',
      maxlength: '12',
      minlength: '3',
      tabindex: '3',
      autocomplete: 'new-password',
      unselectable: 'on',
      'data-contract': 'native',
    });
    for (const slot of ['prefix', 'suffix', 'prepend', 'append']) {
      expect(wrapper.get(`[data-test="${slot}"]`).text()).toBe(
        `${slot[0].toUpperCase()}${slot.slice(1)}`,
      );
    }
    expect(wrapper.find('.h-input--clear-action-with-multi').exists()).toBe(true);

    await input.trigger('focus');
    await input.trigger('click');
    await input.trigger('keydown', { key: 'ArrowLeft' });
    await input.trigger('keypress', { key: 'a' });
    await input.trigger('keyup', { key: 'ArrowLeft' });
    await input.trigger('compositionstart', { data: 'p' });
    await input.trigger('compositionupdate', { data: '拼' });
    await input.trigger('compositionend', { data: '拼' });
    await input.trigger('blur');

    expect(onFocus.mock.calls[0][0]).toBeInstanceOf(FocusEvent);
    expect(onClick.mock.calls[0][0]).toBeInstanceOf(MouseEvent);
    expect(onKeydown.mock.calls[0][0]).toBeInstanceOf(KeyboardEvent);
    expect(onKeypress.mock.calls[0][0]).toBeInstanceOf(KeyboardEvent);
    expect(onKeyup.mock.calls[0][0]).toBeInstanceOf(KeyboardEvent);
    expect(onCompositionstart.mock.calls[0][0]).toBeInstanceOf(CompositionEvent);
    expect(onCompositionupdate.mock.calls[0][0]).toBeInstanceOf(CompositionEvent);
    expect(onCompositionend.mock.calls[0][0]).toBeInstanceOf(CompositionEvent);
    expect(onBlur.mock.calls[0][0]).toBeInstanceOf(FocusEvent);

    await wrapper.get('.h-input--password-action').trigger('click');
    await nextTick();
    expect(input.attributes('type')).toBe('text');
    await wrapper.get('.h-input--clear-action-with-multi').trigger('click');
    await flushPromises();
    expect(onUpdate).toHaveBeenCalledWith('');
    expect(onInput).toHaveBeenCalledWith('', expect.any(MouseEvent));
    expect(onChange).toHaveBeenCalledWith('');
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  test('textarea native props, resize, limit and auto-size branches render public styles', async () => {
    const wrapper = mount(HInput, {
      props: {
        modelValue: '12345',
        type: 'textarea',
        rows: 4,
        resize: 'horizontal',
        inputStyle: 'emphasize',
        showLimit: true,
        maxlength: 8,
        minlength: 2,
        tabindex: 2,
        autocomplete: 'off',
      },
    });
    const textarea = wrapper.get('textarea');
    expect(wrapper.classes()).toContain('h-input__textarea--emphasize');
    expect(wrapper.classes()).toContain('h-input--limit-with-multi-line');
    expect(textarea.attributes()).toMatchObject({
      rows: '4',
      maxlength: '8',
      minlength: '2',
      tabindex: '2',
      autocomplete: 'off',
    });
    expect(textarea.attributes('style')).toContain('resize: horizontal');
    expect(wrapper.get('.h-input__textarea-limit').text()).toBe('5/8');
    await textarea.trigger('click');
    await textarea.setValue('');
    expect(wrapper.get('.h-input__textarea-limit').text()).toBe('0/8');

    await wrapper.setProps({ autoSize: { minRows: 2, maxRows: 3 }, enableOutOfExceeded: true });
    await nextTick();
    expect(textarea.attributes('rows')).toBeUndefined();
    expect(textarea.attributes('maxlength')).toBeUndefined();
    expect(textarea.attributes('style')).toContain('resize: none');
    await wrapper.setProps({ autoSize: true });
    await nextTick();
    expect(textarea.attributes('style')).toContain('resize: none');
  });

  test('embedded fit-content forwards classes, styles, attrs and native input timing', async () => {
    const nativeInput = vi.fn();
    const wrapper = mount(HInput, {
      attrs: {
        class: 'consumer-root',
        style: { color: 'rgb(1, 2, 3)' },
        'aria-label': 'Embedded search',
      },
      props: {
        embedded: true,
        fitContent: true,
        fitContentMinWidth: '3rem',
        fitContentClass: 'contract-fit',
        fitContentMirrorClass: 'contract-mirror',
        embeddedClass: 'contract-native',
        embeddedStyle: { width: '100%' },
        embeddedInputHandler: nativeInput,
        placeholder: 'Search',
        tabindex: 4,
      },
    });
    const input = wrapper.get('input');
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['contract-fit', 'consumer-root']));
    expect(wrapper.get('.contract-mirror').attributes('style')).toContain('min-width: 3rem');
    expect(wrapper.get('.contract-mirror').text()).toBe('Search');
    expect(input.classes()).toContain('contract-native');
    expect(input.attributes('style')).toContain('width: 100%');
    expect(input.attributes('aria-label')).toBe('Embedded search');
    expect(input.attributes('tabindex')).toBe('4');
    await input.setValue('query');
    expect(nativeInput).toHaveBeenCalledWith(expect.any(Event));

    const empty = mount(HInput, {
      props: { embedded: true, fitContent: true, modelValue: '', placeholder: undefined },
    });
    expect(empty.get('.h-input__fit-content-mirror').text()).toBe('');
    await empty.get('input').trigger('compositionend', { data: '' });
    empty.unmount();
  });

  test('invalid type falls back to text and empty normal limit renders zero', async () => {
    const wrapper = mount(HInput, {
      props: {
        type: 'email' as 'text',
        size: 'small',
        modelValue: '',
        showLimit: true,
        maxlength: 5,
        prefixIcon: 'search',
      },
    });
    expect(wrapper.get('input').attributes('type')).toBe('text');
    expect(wrapper.get('.h-input__limit').text()).toBe('0/5');
    expect(wrapper.find('svg').attributes('style')).toContain('width: 12px');
    await wrapper.get('input').trigger('compositionend', { data: '' });
  });

  test('exposes focus, blur and select for textarea as real browser controls', async () => {
    const inputRef = ref<HorizonWebComponentInstance<typeof HInput, InputExposes> | null>(null);
    const wrapper = mount(() => <HInput ref={inputRef} type="textarea" modelValue="select me" />, {
      attachTo: document.body,
    });
    const textarea = wrapper.get('textarea').element as HTMLTextAreaElement;
    inputRef.value?.focus();
    await nextTick();
    expect(document.activeElement).toBe(textarea);
    inputRef.value?.select();
    expect(textarea.selectionStart).toBe(0);
    expect(textarea.selectionEnd).toBe(textarea.value.length);
    inputRef.value?.blur();
    expect(document.activeElement).not.toBe(textarea);
    wrapper.unmount();
  });

  test('emit validators accept exact public payloads and reject defensive inputs', () => {
    const mouse = new MouseEvent('click');
    const event = new Event('input');
    const focus = new FocusEvent('focus');
    const key = new KeyboardEvent('keydown');
    const composition = new CompositionEvent('compositionstart');

    expect(useInputEmits['update:modelValue']('value')).toBe(true);
    expect(useInputEmits['update:modelValue'](1 as never)).toBe(false);
    expect(useInputEmits.click(mouse)).toBe(true);
    expect(useInputEmits.click(event as MouseEvent)).toBe(false);
    expect(useInputEmits.input('value', event)).toBe(true);
    expect(useInputEmits.input(1 as never, event)).toBe(false);
    expect(useInputEmits.input('value', {} as Event)).toBe(false);
    expect(useInputEmits.change('value')).toBe(true);
    expect(useInputEmits.change(1 as never)).toBe(false);
    expect(useInputEmits.focus(focus)).toBe(true);
    expect(useInputEmits.focus(event as FocusEvent)).toBe(false);
    expect(useInputEmits.blur(focus)).toBe(true);
    expect(useInputEmits.blur(event as FocusEvent)).toBe(false);
    expect(useInputEmits.clear()).toBe(true);
    for (const validator of [useInputEmits.keydown, useInputEmits.keypress, useInputEmits.keyup]) {
      expect(validator(key)).toBe(true);
      expect(validator(event as KeyboardEvent)).toBe(false);
    }
    for (const validator of [
      useInputEmits.compositionstart,
      useInputEmits.compositionupdate,
      useInputEmits.compositionend,
    ]) {
      expect(validator(composition)).toBe(true);
      expect(validator(event as CompositionEvent)).toBe(false);
    }
  });
});
