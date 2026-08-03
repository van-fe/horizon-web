import { mount } from '@vue/test-utils';
import HCount from '../src/Count';
import { describe, expect, test } from 'vitest';

describe('Count.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => <HCount endValue={10} />);
    const element = wrapper.findComponent(HCount);

    expect(element.exists()).toBe(true);
  });
});
