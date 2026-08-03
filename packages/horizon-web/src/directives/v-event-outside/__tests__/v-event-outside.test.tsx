import { mount } from '@vue/test-utils';
import { HVEventOutside } from '../index';
import { describe, expect, test, vi } from 'vitest';

describe('v-event-outside.tsx', () => {
  test('basic', async () => {
    const onMouseDown = vi.fn();

    const wrapper = mount(
      () => (
        <div class="wrapper" style="width: 300px; height: 300px;">
          <div
            v-event-outside={{
              handler: onMouseDown,
              events: ['mousedown'],
            }}
            style="width: 100px; height: 100px;"
          >
            Modal
          </div>
        </div>
      ),
      {
        attachTo: document.body,
        global: {
          directives: {
            [HVEventOutside.name]: HVEventOutside,
          },
        },
      },
    );

    const element = wrapper.find('.wrapper');

    await element.trigger('mousedown');

    expect(onMouseDown).toHaveBeenCalledOnce();
  });
});
