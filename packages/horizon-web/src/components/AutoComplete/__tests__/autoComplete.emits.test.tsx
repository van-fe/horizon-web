import { describe, expect, test, vi } from 'vitest';
import AutoCompleteHelper from '~/components/AutoComplete/__tests__/autoCompleteHelper';
import { ref } from 'vue';
import type { AutoCompleteProps } from '~/components/AutoComplete/src/composables/useProps';

describe('AutoComplete.tsx emits', () => {
  test('select', async () => {
    const options = ref<AutoCompleteProps['options']>([]);
    const onSelect = vi.fn();

    const instance = new AutoCompleteHelper({
      options,
      onSelect,
      onSearch: (inputValue: string | null | undefined) => {
        options.value = [];

        if (inputValue) {
          new Array(10).fill(0).forEach((_, index) => {
            const value = inputValue.repeat(index + 1);
            options.value.push({
              label: value,
              value,
            });
          });
        }
      },
    });

    await instance.open();
    await instance.input('2');

    await instance.pickOption();

    expect(onSelect).toHaveBeenCalledOnce();
    expect(onSelect).toHaveBeenCalledWith('2');
    expect(instance.modelValue.value).toEqual('2');
  });
});
