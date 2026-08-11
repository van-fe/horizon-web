import { describe, expect, it } from 'vitest';
import {
  isPopoverHideEvent,
  isPopoverPlacement,
  isPopoverStrategy,
  isPopoverTheme,
  isPopoverTrigger,
  POPOVER_DEFAULTS,
} from '..';

describe('Popover contract', () => {
  it('publishes stable renderer-neutral defaults', () => {
    expect(POPOVER_DEFAULTS).toMatchObject({
      trigger: 'hover',
      placement: 'top',
      distance: 8,
      hideDelay: 100,
      portal: true,
      theme: 'light',
    });
  });

  it('validates public enum values', () => {
    expect(isPopoverTrigger('click')).toBe(true);
    expect(isPopoverTrigger('contextmenu')).toBe(false);
    expect(isPopoverPlacement('bottom-end')).toBe(true);
    expect(isPopoverPlacement('center')).toBe(false);
    expect(isPopoverTheme('dark')).toBe(true);
    expect(isPopoverStrategy('absolute')).toBe(true);
    expect(isPopoverHideEvent('mouseup')).toBe(true);
  });
});
