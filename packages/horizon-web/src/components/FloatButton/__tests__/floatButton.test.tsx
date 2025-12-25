import { mount } from '@vue/test-utils';
import HFloatButton from '../src/FloatButton';
import { describe, expect, test } from 'vitest';

describe('FloatButton.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => <HFloatButton />);
    const element = wrapper.findComponent(HFloatButton);

    expect(element.exists()).toBe(true);
  });
});
