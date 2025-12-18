import { mount } from '@vue/test-utils';
import NCount from '../src/Count';
import { describe, expect, test } from 'vitest';

describe('Count.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => <NCount endValue={10} />);
    const element = wrapper.findComponent(NCount);

    expect(element.exists()).toBe(true);
  });
});
