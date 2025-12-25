import { mount } from '@vue/test-utils';
import HTransition from '../src/Transition';
import { describe, expect, test } from 'vitest';

describe('Transition.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => (
      <HTransition>
        <div>BOX</div>
      </HTransition>
    ));
    const element = wrapper.findComponent(HTransition);

    expect(element.exists()).toBe(true);
  });
});
