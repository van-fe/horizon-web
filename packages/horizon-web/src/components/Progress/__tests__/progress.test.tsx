import { mount } from '@vue/test-utils';
import HProgress from '../src/Progress';
import { describe, expect, test } from 'vitest';

describe('Progress.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => <HProgress percentage={50} />);
    const element = wrapper.findComponent(HProgress);

    expect(element.exists()).toBe(true);
    expect(wrapper.find('[role="progressbar"]').attributes('aria-valuenow')).toBe('50');
    expect(wrapper.find('[role="progressbar"]').attributes('aria-valuemax')).toBe('100');
  });
});
