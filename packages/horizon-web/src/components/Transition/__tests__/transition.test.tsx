import { mount } from '@vue/test-utils';
import NTransition from '../src/Transition';
import { describe, expect, test } from 'vitest';

describe('Transition.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(() => (
      <NTransition>
        <div>BOX</div>
      </NTransition>
    ));
    const element = wrapper.findComponent(NTransition);

    expect(element.exists()).toBe(true);
  });
});
