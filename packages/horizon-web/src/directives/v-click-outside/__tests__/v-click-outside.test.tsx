import { mount } from '@vue/test-utils';
import HVClickOutside from '../index';
import { describe, expect, test, vi } from 'vitest';

describe('v-click-outside.tsx', () => {
  test('basic', async () => {
    const onClick = vi.fn();

    const wrapper = mount(
      () => (
        <div class="wrapper" style="width: 300px; height: 300px;">
          <div v-click-outside={() => onClick()} style="width: 100px; height: 100px;">
            Modal
          </div>
        </div>
      ),
      {
        attachTo: document.body,
        global: {
          directives: {
            [HVClickOutside.name]: HVClickOutside,
          },
        },
      },
    );

    const element = wrapper.find('.wrapper');

    await element.trigger('click');

    expect(onClick).toHaveBeenCalledOnce();
  });
});
