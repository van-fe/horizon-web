import { mount } from '@vue/test-utils';
import NAffix from '../src/Affix';
import { describe, expect, test } from 'vitest';

describe('Affix.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => <NAffix />);
    const element = wrapper.findComponent(NAffix);

    expect(element.exists()).toBe(true);
  });
});
