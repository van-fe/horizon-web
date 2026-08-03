import { mount } from '@vue/test-utils';
import HAffix from '../src/Affix';
import { describe, expect, test } from 'vitest';

describe('Affix.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => <HAffix />);
    const element = wrapper.findComponent(HAffix);

    expect(element.exists()).toBe(true);
  });
});
