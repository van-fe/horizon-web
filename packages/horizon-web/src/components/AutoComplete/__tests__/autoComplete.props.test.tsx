import { describe, expect, test } from 'vitest';
import AutoCompleteHelper from '~/components/AutoComplete/__tests__/autoCompleteHelper';

describe('AutoComplete.tsx props', () => {
  test('basic', async () => {
    const instance = new AutoCompleteHelper();

    await instance.open();

    expect(instance.element.exists()).toBeTruthy();
  });
});
