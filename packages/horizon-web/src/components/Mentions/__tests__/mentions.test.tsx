import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { defineComponent, reactive } from 'vue';
import HPopover from '../../Popover/src/Popover';
import HPopContent from '../../Popover/src/PopContent';
import HScrollbar from '../../Scrollbar/src/Scrollbar';
import HMentions from '../src/Mentions';
import { useMentions } from '../src/hooks/useMentions';

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
  });
  return wrapper;
}

afterEach(() => {
  updatePosition.mockClear();
});

describe('Mentions', () => {
  test('derives the active query in the hook', () => {
    const emit = vi.fn();
    const state = useMentions(
      reactive({
        modelValue: '@al',
        options: [{ value: 'alice' }],
        triggers: ['@'],
        split: ' ',
        disabled: false,
      }) as any,
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

    await input.setValue('first line\n@ali');
    updatePosition.mockClear();
    (input.element as HTMLTextAreaElement).scrollTop = 24;
    await input.trigger('scroll');

    expect((mirror.element as HTMLDivElement).scrollTop).toBe(24);
    expect(updatePosition).toHaveBeenCalled();
  });
});
