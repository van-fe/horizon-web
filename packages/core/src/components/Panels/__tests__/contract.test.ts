import { describe, expect, it } from 'vitest';
import {
  findEnabledPanelIndex,
  isPanelsKey,
  PANEL_DEFAULTS,
  PANELS_DEFAULTS,
  panelApiContract,
  panelsApiContract,
  resolveActivePanel,
  resolvePanelsTransitionDirection,
} from '..';

const panels = [{ name: 'first' }, { name: 'disabled', disabled: true }, { name: 'last' }] as const;

describe('Panels contract', () => {
  it('defines stable defaults and key validators', () => {
    expect(PANELS_DEFAULTS).toEqual({ animated: false, vertical: false });
    expect(PANEL_DEFAULTS).toEqual({ disabled: false });
    expect(panelsApiContract.validators.value?.('first')).toBe(true);
    expect(panelApiContract.validators.name?.(2)).toBe(true);
    expect(isPanelsKey(Number.POSITIVE_INFINITY)).toBe(false);
  });

  it('finds only enabled panels', () => {
    expect(findEnabledPanelIndex(panels, 'first')).toBe(0);
    expect(findEnabledPanelIndex(panels, 'disabled')).toBe(-1);
    expect(resolveActivePanel(panels, 'last')).toEqual({ name: 'last' });
    expect(resolveActivePanel(panels, 'disabled')).toBeUndefined();
  });

  it('resolves horizontal motion from enabled item order', () => {
    expect(resolvePanelsTransitionDirection(panels, 'first', 'last', false)).toBe('left');
    expect(resolvePanelsTransitionDirection(panels, 'last', 'first', false)).toBe('right');
  });

  it('resolves vertical motion from enabled item order', () => {
    expect(resolvePanelsTransitionDirection(panels, 'first', 'last', true)).toBe('up');
    expect(resolvePanelsTransitionDirection(panels, 'last', 'first', true)).toBe('down');
  });
});
