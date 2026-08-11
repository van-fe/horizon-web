import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import { nextTick } from 'vue';
import HDialog from '../src/Dialog';

function pointer(type: string, options: PointerEventInit) {
  return new PointerEvent(type, { bubbles: true, cancelable: true, ...options });
}

describe('Dialog draggable interactions', () => {
  test('ignores disabled, hidden, and non-primary drag starts', async () => {
    const disabled = mount(() => <HDialog visible to={null} title="Disabled" draggable={false} />, {
      attachTo: document.body,
    });
    await nextTick();
    disabled.get('.h-dialog__header').element.dispatchEvent(
      pointer('pointerdown', { button: 0, clientX: 10, clientY: 10, pointerId: 1 }),
    );
    window.dispatchEvent(
      pointer('pointermove', { button: 0, clientX: 50, clientY: 60, pointerId: 1 }),
    );
    expect(disabled.get('[role="dialog"]').attributes('style')).not.toContain('left:');

    const hidden = mount(() => <HDialog visible={false} to={null} title="Hidden" draggable />, {
      attachTo: document.body,
    });
    await nextTick();
    hidden.get('.h-dialog__header').element.dispatchEvent(
      pointer('pointerdown', { button: 0, clientX: 10, clientY: 10, pointerId: 2 }),
    );
    expect(hidden.get('[role="dialog"]').attributes('style')).not.toContain('left:');

    const enabled = mount(() => <HDialog visible to={null} title="Right click" draggable />, {
      attachTo: document.body,
    });
    await nextTick();
    enabled.get('.h-dialog__header').element.dispatchEvent(
      pointer('pointerdown', { button: 2, clientX: 10, clientY: 10, pointerId: 3 }),
    );
    expect(enabled.get('[role="dialog"]').attributes('style')).not.toContain('left:');
  });

  test('moves from the default position and preserves position on subsequent drags', async () => {
    const wrapper = mount(() => <HDialog visible to={null} title="Move me" draggable />, {
      attachTo: document.body,
    });
    await nextTick();
    const dialog = wrapper.get('[role="dialog"]');
    const element = dialog.element as HTMLElement;
    element.getBoundingClientRect = () => ({ x: 20, y: 30, top: 30, left: 20 }) as DOMRect;
    const header = wrapper.get('.h-dialog__header').element;

    header.dispatchEvent(
      pointer('pointerdown', { button: 0, clientX: 25, clientY: 35, pointerId: 10 }),
    );
    window.dispatchEvent(
      pointer('pointermove', { button: 0, clientX: 65, clientY: 85, pointerId: 10 }),
    );
    window.dispatchEvent(pointer('pointerup', { button: 0, pointerId: 10 }));
    await nextTick();
    expect(dialog.attributes('style')).toContain('transform: none');
    expect(dialog.attributes('style')).toContain('left:');
    expect(dialog.attributes('style')).toContain('right: auto');

    header.dispatchEvent(
      pointer('pointerdown', { button: 0, clientX: 65, clientY: 85, pointerId: 11 }),
    );
    window.dispatchEvent(
      pointer('pointermove', { button: 0, clientX: 70, clientY: 90, pointerId: 11 }),
    );
    window.dispatchEvent(pointer('pointerup', { button: 0, pointerId: 11 }));
    await nextTick();
    expect(dialog.attributes('style')).toContain('left:');
  });
});
