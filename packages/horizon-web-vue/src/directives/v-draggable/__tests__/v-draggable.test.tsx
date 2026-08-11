import { mount } from '@vue/test-utils';
import HVDraggable from '../src';
import { describe, expect, test } from 'vitest';

describe('v-draggable.tsx', () => {
  test('basic', async () => {
    const wrapper = mount(
      () => (
        <div class="wrapper" style="width: 300px; height: 300px;">
          <div class="item" v-draggable style="width: 100px; height: 100px;">
            Modal
          </div>
        </div>
      ),
      {
        attachTo: document.body,
        global: {
          directives: {
            [HVDraggable.name]: HVDraggable,
          },
        },
      },
    );

    const element = wrapper.find('.item');

    const moveDownEvent = new MouseEvent('mousedown', {
      clientX: 0,
      clientY: 0,
    });

    element.element.dispatchEvent(moveDownEvent);

    const moveMoveEvent = new MouseEvent('mousemove', {
      clientX: 100,
      clientY: 100,
    });

    document.dispatchEvent(moveMoveEvent);

    await element.trigger('mouseup');

    expect(window.getComputedStyle(element.element).top).eq('100px');
  });
});
