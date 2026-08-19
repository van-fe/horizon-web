import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { defineComponent, nextTick, reactive } from 'vue';
import HPopover from '../../Popover/src/Popover';
import HPopContent from '../../Popover/src/PopContent';
import HScrollbar from '../../Scrollbar/src/Scrollbar';
import HMentions from '../src/Mentions';
import { useMentionsEmits } from '../src/composables/useEmits';
import type { HMentionsOption, MentionsProps } from '../src/composables/useProps';
import { useMentions } from '../src/hooks/useMentions';
import '../src/style/index.scss';

const updatePosition = vi.fn();
const HPopoverStub = defineComponent({
  name: 'HPopover',
  inheritAttrs: false,
  props: {
    visible: Boolean,
    placement: String,
  },
  setup(props, { slots, expose }) {
    expose({ updatePosition });
    return () => (
      <span class="popover-stub" data-placement={props.placement}>
        {slots.reference?.()}
        {props.visible ? slots.popper?.() : null}
      </span>
    );
  },
});

function mountMentions(props: Record<string, unknown> = {}) {
  let wrapper: ReturnType<typeof mount>;
  wrapper = mount(HMentions, {
    props: {
      modelValue: '',
      options: [
        { value: 'alice', label: 'Alice' },
        { value: 'bob', label: 'Bob' },
      ],
      'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value }),
      ...props,
    },
    global: {
      stubs: { HPopover: HPopoverStub },
    },
    attachTo: document.body,
  });
  return wrapper;
}

afterEach(() => {
  updatePosition.mockClear();
  document.body.replaceChildren();
});

describe('Mentions', () => {
  test('validates public emit payloads without replacing real interaction coverage', () => {
    expect(useMentionsEmits['update:modelValue']('hello')).toBe(true);
    expect(useMentionsEmits['update:modelValue'](1 as never)).toBe(false);
    expect(useMentionsEmits.select({ value: 'alice' }, '@')).toBe(true);
    expect(useMentionsEmits.select(undefined as never, '@')).toBe(false);
    expect(useMentionsEmits.select({ value: 'alice' }, '')).toBe(false);
    expect(useMentionsEmits.search('', '@')).toBe(true);
    expect(useMentionsEmits.search(undefined as never, '@')).toBe(false);
    expect(useMentionsEmits.search('alice', '')).toBe(false);

    const defaults = mount(HMentions, {
      props: { modelValue: '' },
      global: { stubs: { HPopover: HPopoverStub } },
    });
    expect(defaults.get('textarea').attributes('aria-expanded')).toBe('false');
  });

  test('derives the active query in the hook', () => {
    const emit = vi.fn();
    const state = useMentions(
      reactive({
        modelValue: '@al',
        options: [{ value: 'alice' }],
        triggers: ['@'],
        split: ' ',
        disabled: false,
      }) as MentionsProps,
      emit,
    );

    state.onInput({ target: { value: '@al', selectionStart: 3 } } as unknown as Event);
    state.onSelectionChange({
      target: { value: '@al', selectionStart: 3, selectionEnd: 3 },
    } as unknown as Event);

    expect(state.filteredOptions.value).toEqual([{ value: 'alice' }]);
    expect(emit).toHaveBeenCalledWith('search', 'al', '@');
    expect(emit.mock.calls.filter(([event]) => event === 'search')).toHaveLength(1);
  });

  test('clamps an unfocused hook cursor after a shorter external value', async () => {
    const props = reactive({
      modelValue: '@alice',
      options: [{ value: 'alice' }],
      triggers: ['@'],
      split: ' ',
      disabled: false,
    });
    const state = useMentions(props as MentionsProps, vi.fn());
    state.onInput({ target: { value: '@alice', selectionStart: 6 } } as unknown as Event);
    state.onBlur();

    props.modelValue = 'x';
    await vi.waitFor(() => {
      expect(state.cursor.value).toBe(1);
    });
    expect(state.visible.value).toBe(false);
  });

  test('handles hook fallbacks without a mounted textarea or active option', async () => {
    const emit = vi.fn();
    const props = reactive({
      modelValue: '',
      options: [{ value: 'alice' }, { value: 'bob' }],
      triggers: ['@'],
      split: ' ',
      disabled: false,
    }) as MentionsProps;
    const state = useMentions(props, emit);

    state.onKeydown(new KeyboardEvent('keydown', { key: 'Enter' }));
    state.onInput({ target: { value: '@' } } as unknown as Event);
    expect(state.cursor.value).toBe(1);
    state.onKeyup(new KeyboardEvent('keyup', { key: 'Enter' }));

    state.activeIndex.value = -1;
    state.onKeydown(new KeyboardEvent('keydown', { key: 'ArrowDown', cancelable: true }));
    expect(state.activeIndex.value).toBe(0);
    state.activeIndex.value = -1;
    state.onKeydown(new KeyboardEvent('keydown', { key: 'ArrowUp', cancelable: true }));
    expect(state.activeIndex.value).toBe(1);
    state.onKeydown(new KeyboardEvent('keydown', { key: 'Home' }));

    await state.select(props.options[0]);
    expect(emit).toHaveBeenCalledWith('select', props.options[0], '@');

    props.disabled = true;
    state.onInput({ target: { value: '@', selectionStart: 1 } } as unknown as Event);
    expect(state.visible.value).toBe(false);
    await nextTick();
    props.disabled = false;
    await nextTick();
  });

  test('prefers the longest trigger and renders custom filtered option scope', async () => {
    const filter = vi.fn((keyword: string, option: { label?: string; value: string }) =>
      (option.label ?? option.value).toLocaleLowerCase().startsWith(keyword.toLocaleLowerCase()),
    );
    let wrapper: ReturnType<typeof mount>;
    wrapper = mount(HMentions, {
      props: {
        modelValue: '',
        triggers: ['', '@:', '@'],
        options: [
          { value: 'alice', label: 'Alice' },
          { value: 'bob', label: 'Bob' },
        ],
        filter,
        maxHeight: 120,
        'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value }),
      },
      slots: {
        option: (scope?: { option: HMentionsOption; active: boolean }) =>
          scope
            ? <span data-test="custom-mention-option">{`${scope.option.value}:${scope.active}`}</span>
            : null,
      },
      global: { stubs: { HPopover: HPopoverStub } },
    });

    await wrapper.get('textarea').setValue('@:AL');
    expect(filter).toHaveBeenCalledWith('AL', expect.objectContaining({ value: 'alice' }));
    expect(wrapper.get('[data-test="custom-mention-option"]').text()).toBe('alice:true');
    expect(wrapper.getComponent(HScrollbar).props('maxHeight')).toBe(120);
    expect(wrapper.emitted('search')?.at(-1)).toEqual(['AL', '@:']);

    await wrapper.get('textarea').setValue('@:AL rest');
    expect(wrapper.get('textarea').attributes('aria-expanded')).toBe('false');
  });

  test('renders suggestions through HPopover and selects with keyboard', async () => {
    const wrapper = mountMentions();
    const input = wrapper.get('textarea');

    await input.setValue('@ali');

    expect(wrapper.findComponent(HPopover).exists()).toBe(true);
    expect(wrapper.findAll('[role="option"]')).toHaveLength(1);
    expect(wrapper.get('[role="option"]').classes()).not.toContain('is-disabled');
    await input.trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted('select')?.[0]?.[0]).toMatchObject({ value: 'alice' });
    expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toBe('@alice ');
  });

  test('forwards input attributes and exposes the active option to assistive technology', async () => {
    const wrapper = mountMentions({
      id: 'review-comment',
      class: 'review-field',
      rows: 4,
      options: [{ value: 'alice', disabled: true }, { value: 'bob' }],
    });
    const input = wrapper.get('textarea');

    await input.setValue('@');

    expect(wrapper.get('.h-mentions').classes()).toContain('review-field');
    expect(input.attributes('id')).toBe('review-comment');
    expect(input.attributes('rows')).toBe('4');
    expect(input.attributes('role')).toBe('combobox');
    expect(input.attributes('aria-expanded')).toBe('true');
    expect(input.attributes('aria-activedescendant')).toMatch(/-option-1$/);
    expect(wrapper.get('[data-mention-index="0"]').attributes('aria-disabled')).toBe('true');

    await input.trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted('select')?.[0]?.[0]).toMatchObject({ value: 'bob' });
  });

  test('guards disabled pointer selection and activates an enabled option by hover', async () => {
    const wrapper = mountMentions({
      options: [
        { value: 'alice', disabled: true },
        { value: 'bob' },
        { value: 'carol' },
      ],
    });
    const input = wrapper.get('textarea');
    await input.setValue('@');

    const disabled = wrapper.get('[data-mention-index="0"]').element.parentElement!;
    const pointerDown = new PointerEvent('pointerdown', { bubbles: true, cancelable: true });
    disabled.dispatchEvent(pointerDown);
    expect(pointerDown.defaultPrevented).toBe(true);
    const mouseDown = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
    disabled.dispatchEvent(mouseDown);
    expect(mouseDown.defaultPrevented).toBe(true);
    disabled.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    disabled.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(wrapper.emitted('select')).toBeUndefined();

    const enabledOption = wrapper.findAll('.h-mentions__option')[2];
    await enabledOption.trigger('mouseenter');
    expect(wrapper.get('[data-mention-index="2"]').attributes('aria-selected')).toBe('true');
    await enabledOption.trigger('click');
    await vi.waitFor(() => {
      expect(wrapper.emitted('select')?.at(-1)?.[0]).toMatchObject({ value: 'carol' });
    });
  });

  test('placeholder, maxlength and empty slot render on the native and popup surfaces', async () => {
    let wrapper: ReturnType<typeof mount>;
    wrapper = mount(HMentions, {
      props: {
        modelValue: '',
        placeholder: 'Mention a reviewer',
        maxlength: 12,
        options: [],
        'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value }),
      },
      slots: { empty: () => <span data-test="mentions-empty">No people found</span> },
      global: { stubs: { HPopover: HPopoverStub } },
    });
    const input = wrapper.get('textarea');

    expect(input.attributes()).toMatchObject({
      placeholder: 'Mention a reviewer',
      maxlength: '12',
    });
    await input.setValue('@nobody');
    expect(wrapper.get('[data-test="mentions-empty"]').text()).toBe('No people found');
    expect(wrapper.get('.h-mentions__empty').element).toBeInstanceOf(HTMLElement);
  });

  test('reuses the default Dropdown surface and item style contract', async () => {
    const wrapper = mountMentions({
      options: [{ value: 'alice', disabled: true }, { value: 'bob' }],
    });

    await wrapper.get('textarea').setValue('@');

    const surface = wrapper.get('.h-mentions__dropdown');
    expect(wrapper.findComponent(HPopContent).exists()).toBe(true);
    expect(surface.classes()).toEqual(
      expect.arrayContaining([
        'h-popover__popcontent',
        'h-dropdown__inner',
        'h-dropdown__inner--default',
        'h-dropdown__inner--medium',
      ]),
    );

    const scrollbar = wrapper.getComponent(HScrollbar);
    expect(scrollbar.props('size')).toBe('small');
    expect(scrollbar.props('maxHeight')).toBe(240);
    expect(wrapper.get('[role="listbox"]').classes()).toContain('h-mentions__listbox');

    const items = wrapper.findAll('.h-dropdown-item');
    expect(items).toHaveLength(2);
    expect(items[0].classes()).toContain('is-disabled');
    expect(items[1].classes()).toEqual(expect.arrayContaining(['is-active', 'is-focusable']));
    expect(items[0].get('[role="option"]').classes()).toContain('h-dropdown-item__inner');
    expect(items[0].get('[role="option"]').attributes('aria-disabled')).toBe('true');
  });

  test('re-analyzes a mention after the caret moves', async () => {
    const wrapper = mountMentions({ modelValue: '@al\n@bo' });
    const input = wrapper.get('textarea');

    await input.trigger('focus');
    (input.element as HTMLTextAreaElement).setSelectionRange(3, 3);
    await input.trigger('select');

    expect(wrapper.findAll('[role="option"]')).toHaveLength(1);
    expect(wrapper.get('[role="option"]').text()).toBe('Alice');
    await input.trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toBe('@alice \n@bo');
  });

  test('avoids a duplicate split at the caret and closes on range selection or blur', async () => {
    const wrapper = mountMentions({ modelValue: '@al rest' });
    const input = wrapper.get('textarea');
    await input.trigger('focus');
    (input.element as HTMLTextAreaElement).setSelectionRange(3, 3);
    await input.trigger('select');
    await input.trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toBe('@alice rest');

    await input.setValue('@al');
    (input.element as HTMLTextAreaElement).setSelectionRange(0, 2);
    await input.trigger('select');
    expect(input.attributes('aria-expanded')).toBe('false');

    (input.element as HTMLTextAreaElement).setSelectionRange(3, 3);
    await input.trigger('select');
    expect(input.attributes('aria-expanded')).toBe('true');
    await input.trigger('blur');
    expect(input.attributes('aria-expanded')).toBe('false');
  });

  test('wraps enabled keyboard options, escapes, selects with Tab and reacts to disabled', async () => {
    const wrapper = mountMentions({
      options: [
        { value: 'alice' },
        { value: 'blocked', disabled: true },
        { value: 'carol' },
      ],
    });
    const input = wrapper.get('textarea');
    await input.setValue('@');
    await input.trigger('keyup', { key: 'ArrowDown' });
    await input.trigger('keydown', { key: 'ArrowUp' });
    expect(wrapper.get('[data-mention-index="2"]').attributes('aria-selected')).toBe('true');
    await input.trigger('keydown', { key: 'ArrowDown' });
    expect(wrapper.get('[data-mention-index="0"]').attributes('aria-selected')).toBe('true');
    await input.trigger('keydown', { key: 'Escape' });
    expect(input.attributes('aria-expanded')).toBe('false');

    await input.setValue('@');
    await input.trigger('keydown', { key: 'Tab' });
    expect(wrapper.emitted('select')?.at(-1)?.[0]).toMatchObject({ value: 'alice' });

    await input.setValue('@');
    await wrapper.setProps({ disabled: true });
    expect(input.attributes('disabled')).toBeDefined();
    expect(input.attributes('aria-expanded')).toBe('false');
  });

  test('keeps all-disabled results inactive and reassigns activity as options change', async () => {
    const wrapper = mountMentions({
      options: [
        { value: 'alice', disabled: true },
        { value: 'bob', disabled: true },
      ],
    });
    const input = wrapper.get('textarea');
    await input.setValue('@');
    expect(input.attributes('aria-activedescendant')).toBeUndefined();
    await input.trigger('keydown', { key: 'ArrowDown' });
    expect(input.attributes('aria-activedescendant')).toBeUndefined();

    await wrapper.setProps({ options: [{ value: 'alice' }] });
    await vi.waitFor(() => {
      expect(input.attributes('aria-activedescendant')).toMatch(/-option-0$/);
    });
    await wrapper.setProps({
      options: [{ value: 'alice' }, { value: 'bob' }, { value: 'carol' }],
    });
    await wrapper.findAll('.h-mentions__option')[2].trigger('mouseenter');
    expect(input.attributes('aria-activedescendant')).toMatch(/-option-2$/);
    await wrapper.setProps({ options: [{ value: 'alice' }] });
    await vi.waitFor(() => {
      expect(input.attributes('aria-activedescendant')).toMatch(/-option-0$/);
    });
    await wrapper.setProps({ options: [{ value: 'alice', disabled: true }] });
    await vi.waitFor(() => {
      expect(input.attributes('aria-activedescendant')).toBeUndefined();
    });
  });

  test('re-analyzes an external model update at the focused caret', async () => {
    const wrapper = mountMentions();
    const input = wrapper.get('textarea');

    await input.setValue('@al');
    expect(wrapper.get('[role="option"]').text()).toBe('Alice');

    await wrapper.setProps({ modelValue: '@bo' });
    await vi.waitFor(() => expect(wrapper.get('[role="option"]').text()).toBe('Bob'));
  });

  test('syncs the caret after arrow navigation when the query has no matches', async () => {
    const wrapper = mountMentions();
    const input = wrapper.get('textarea');

    await input.setValue('@zz');
    expect(wrapper.find('[role="option"]').exists()).toBe(false);

    (input.element as HTMLTextAreaElement).setSelectionRange(1, 1);
    await input.trigger('keyup', { key: 'ArrowUp' });

    expect(wrapper.findAll('[role="option"]')).toHaveLength(2);
  });

  test('does not select while an IME composition is active', async () => {
    const wrapper = mountMentions();
    const input = wrapper.get('textarea');

    await input.trigger('compositionstart');
    await input.setValue('@ali');
    await input.trigger('keydown', { key: 'Enter', isComposing: true });
    await input.trigger('keyup', { key: 'ArrowDown', isComposing: true });
    await input.trigger('select');
    expect(wrapper.emitted('select')).toBeUndefined();
    expect(wrapper.find('[role="listbox"]').exists()).toBe(false);

    await input.trigger('compositionend');
    expect(wrapper.findAll('[role="option"]')).toHaveLength(1);
    await input.trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted('select')).toHaveLength(1);
  });

  test('keeps the text mirror scrolled with the textarea and refreshes the popup', async () => {
    const wrapper = mountMentions();
    const input = wrapper.get('textarea');
    const mirror = wrapper.get('.h-mentions__measure');

    await input.setValue(
      `${Array.from({ length: 20 }, (_, index) => `line ${index}`).join('\n')}\n@ali`,
    );
    updatePosition.mockClear();
    (input.element as HTMLTextAreaElement).scrollTop = 24;
    await input.trigger('scroll');

    expect((input.element as HTMLTextAreaElement).scrollTop).toBeGreaterThan(0);
    expect((mirror.element as HTMLDivElement).scrollTop).toBe(
      (input.element as HTMLTextAreaElement).scrollTop,
    );
    expect(updatePosition).toHaveBeenCalled();
  });
});
