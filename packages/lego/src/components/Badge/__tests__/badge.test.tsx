import { mount } from '@vue/test-utils';
import NBadge from '../src/Badge';
import { describe, expect, test } from 'vitest';

describe('Badge.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => (
      <NBadge>
        <div style="background: gray; width: 50px; height: 50px;"></div>
      </NBadge>
    ));
    const element = wrapper.findComponent(NBadge);

    expect(element.exists()).toBe(true);
  });
});
