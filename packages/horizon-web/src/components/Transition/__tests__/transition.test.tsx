import { mount } from '@vue/test-utils';
import HTransition from '../src/Transition';
import { describe, expect, test, vi } from 'vitest';

describe('Transition.tsx', () => {
  test('basic', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const wrapper = mount(() => (
      <HTransition>
        <div>BOX</div>
      </HTransition>
    ));
    const element = wrapper.findComponent(HTransition);

    expect(element.exists()).toBe(true);
    expect(warn.mock.calls.flat().join(' ')).not.toContain(
      'invoked outside of the render function',
    );
    warn.mockRestore();
  });
});
