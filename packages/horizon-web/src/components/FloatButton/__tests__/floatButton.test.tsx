import { mount } from '@vue/test-utils';
import NFloatButton from '../src/FloatButton';
import { describe, expect, test } from 'vitest';

describe('FloatButton.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => <NFloatButton />);
    const element = wrapper.findComponent(NFloatButton);

    expect(element.exists()).toBe(true);
  });
});
