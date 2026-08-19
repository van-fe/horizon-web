import { describe, expect, it, vi } from 'vitest';
import { createCommandPaletteHotkeyController } from '..';

describe('CommandPalette hotkey controller', () => {
  it('toggles only while enabled and removes its owner-document listener', () => {
    const onToggle = vi.fn();
    const controller = createCommandPaletteHotkeyController(document, { onToggle });
    const first = new KeyboardEvent('keydown', {
      key: 'k',
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(first);
    expect(first.defaultPrevented).toBe(true);
    expect(onToggle).toHaveBeenCalledOnce();

    controller.update(false);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
    expect(onToggle).toHaveBeenCalledOnce();
    controller.destroy();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
    expect(onToggle).toHaveBeenCalledOnce();
  });
});
