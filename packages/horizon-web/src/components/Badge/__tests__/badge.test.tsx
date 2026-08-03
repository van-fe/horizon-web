import { mount } from '@vue/test-utils';
import HBadge from '../src/Badge';
import { describe, expect, test } from 'vitest';

describe('Badge.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => (
      <HBadge>
        <div style="background: gray; width: 50px; height: 50px;"></div>
      </HBadge>
    ));
    const element = wrapper.findComponent(HBadge);

    expect(element.exists()).toBe(true);
  });
});
