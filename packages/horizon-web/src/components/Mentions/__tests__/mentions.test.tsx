import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { reactive } from 'vue';
import HMentions from '../src/Mentions';
import { useMentions } from '../src/hooks/useMentions';

describe('Mentions', () => {
  test('derives the active query in the hook', () => {
    const emit = vi.fn();
    const state = useMentions(
      reactive({ modelValue: '@al', options: [{ value: 'alice' }], triggers: ['@'], split: ' ' }) as any,
      emit,
    );
    state.onInput({ target: { value: '@al', selectionStart: 3 } } as unknown as Event);
    expect(state.filteredOptions.value).toEqual([{ value: 'alice' }]);
    expect(emit).toHaveBeenCalledWith('search', 'al', '@');
  });

  test('filters and selects with keyboard', async () => {
    const wrapper = mount(HMentions, {
      props: {
        modelValue: '',
        options: [
          { value: 'alice', label: 'Alice' },
          { value: 'bob', label: 'Bob' },
        ],
        'onUpdate:modelValue': value => wrapper.setProps({ modelValue: value }),
      },
    });
    const input = wrapper.get('textarea');
    await input.setValue('@ali');
    expect(wrapper.findAll('[role="option"]')).toHaveLength(1);
    await input.trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted('select')?.[0]?.[0]).toMatchObject({ value: 'alice' });
    expect(wrapper.props('modelValue')).toBe('@alice ');
  });
});
