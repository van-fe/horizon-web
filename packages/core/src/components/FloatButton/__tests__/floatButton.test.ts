import { describe, expect, it, vi } from 'vitest';
import {
  FLOAT_BUTTON_DEFAULTS,
  FLOAT_BUTTON_GROUP_DEFAULTS,
  FloatButtonGroupController,
  floatButtonApiContract,
  floatButtonGroupManifest,
  floatButtonManifest,
  isFloatButtonBadge,
  isFloatButtonGroupTrigger,
  isFloatButtonShape,
  isFloatButtonTarget,
  isFloatButtonTooltip,
  isFloatButtonVariant,
  resolveFloatButtonAdsorbedPosition,
  resolveFloatButtonBadgeLayout,
  resolveFloatButtonStackBottomOffset,
  resolveFloatButtonStackPosition,
} from '..';

describe('FloatButton contracts', () => {
  it('defines stable defaults, validators and manifests', () => {
    expect(FLOAT_BUTTON_DEFAULTS).toEqual({
      variant: 'normal',
      shape: 'circle',
      target: '_self',
      badge: false,
      draggable: false,
      adsorbBottom: false,
      defaultVisible: true,
    });
    expect(FLOAT_BUTTON_GROUP_DEFAULTS).toMatchObject({
      useCollapse: false,
      trigger: 'click',
      defaultVisible: true,
      defaultExpanded: false,
    });
    expect(isFloatButtonVariant('primary')).toBe(true);
    expect(isFloatButtonVariant('danger')).toBe(false);
    expect(isFloatButtonShape('square')).toBe(true);
    expect(isFloatButtonTarget('_blank')).toBe(true);
    expect(isFloatButtonTarget('window')).toBe(false);
    expect(isFloatButtonGroupTrigger('hover')).toBe(true);
    expect(isFloatButtonGroupTrigger('focus')).toBe(false);
    expect(isFloatButtonTooltip('Help')).toBe(true);
    expect(isFloatButtonTooltip({ content: 'Help' })).toBe(true);
    expect(isFloatButtonTooltip([])).toBe(false);
    expect(isFloatButtonBadge(true)).toBe(true);
    expect(isFloatButtonBadge({ type: 'dot' })).toBe(true);
    expect(isFloatButtonBadge(null)).toBe(false);
    expect(floatButtonApiContract.validators?.shape?.('circle')).toBe(true);
    expect(floatButtonManifest.contract.exposes.map(field => field.name)).toEqual([
      'show',
      'hide',
      'focus',
    ]);
    expect(floatButtonGroupManifest.contract.exposes.map(field => field.name)).toEqual([
      'show',
      'hide',
      'expand',
      'fold',
      'toggle',
    ]);
  });

  it('resolves every badge layout branch', () => {
    expect(resolveFloatButtonBadgeLayout(true, 'circle', false, false)).toEqual({
      align: undefined,
      top: 5,
      right: 5,
    });
    expect(resolveFloatButtonBadgeLayout({ type: 'dot' }, 'circle', true, false)).toEqual({
      align: undefined,
      top: 5,
      right: 5,
    });
    expect(resolveFloatButtonBadgeLayout({ type: 'num' }, 'circle', true, false)).toEqual({
      align: 'fix-left',
      top: 3,
      right: 3,
    });
    expect(resolveFloatButtonBadgeLayout({ type: 'num' }, 'circle', true, true)).toEqual({
      align: undefined,
      top: 3,
      right: 3,
    });
    expect(resolveFloatButtonBadgeLayout({ type: 'dot' }, 'square', false, false)).toEqual({
      top: 0,
      right: 0,
    });
  });

  it('derives stack state and bottom offset without mutation', () => {
    const items = [
      { id: 'first', hasIconAndDescription: true },
      { id: 'second', hasIconAndDescription: false },
      { id: 'third', hasIconAndDescription: true },
    ] as const;
    const position = resolveFloatButtonStackPosition(items, 'third');
    expect(position).toEqual({ inStack: true, index: 2, precedingLargeCount: 1 });
    expect(
      resolveFloatButtonStackBottomOffset(position, {
        baseBottom: 24,
        gap: 16,
        buttonSize: 40,
        largeButtonSize: 56,
      }),
    ).toBe(152);
    expect(
      resolveFloatButtonStackBottomOffset(resolveFloatButtonStackPosition(items, 'missing'), {
        baseBottom: 24,
        gap: 16,
        buttonSize: 40,
        largeButtonSize: 56,
      }),
    ).toBeUndefined();
    expect(items).toHaveLength(3);
  });

  it('adsorbs to the right or bottom with the supplied viewport metrics', () => {
    const viewport = { width: 1000, height: 800 };
    const size = { width: 40, height: 40 };
    expect(
      resolveFloatButtonAdsorbedPosition({ x: 700, y: 100 }, viewport, size, 24, true),
    ).toEqual({ x: 936, y: 100 });
    expect(
      resolveFloatButtonAdsorbedPosition({ x: 100, y: 700 }, viewport, size, 24, true),
    ).toEqual({ x: 100, y: 736 });
    expect(
      resolveFloatButtonAdsorbedPosition({ x: 100, y: 700 }, viewport, size, 24, false),
    ).toEqual({ x: 936, y: 700 });
  });
});

describe('FloatButtonGroupController', () => {
  it('uses contextual expansion when collapse is disabled', () => {
    const controller = new FloatButtonGroupController({ defaultExpanded: false });
    expect(controller.snapshot).toEqual({ visible: true, expanded: true, useCollapse: false });
    expect(controller.fold()).toBe(false);
    controller.setOptions({ useCollapse: true });
    expect(controller.snapshot.expanded).toBe(false);
  });

  it('manages uncontrolled visibility and expansion with reasons', () => {
    const onVisibleChange = vi.fn();
    const onExpandedChange = vi.fn();
    const controller = new FloatButtonGroupController({
      useCollapse: true,
      onVisibleChange,
      onExpandedChange,
    });

    expect(controller.hide()).toBe(true);
    expect(controller.snapshot.visible).toBe(false);
    expect(controller.show()).toBe(true);
    expect(controller.expand('hover')).toBe(true);
    expect(controller.snapshot.expanded).toBe(true);
    expect(controller.toggle('click')).toBe(true);
    expect(controller.snapshot.expanded).toBe(false);
    expect(onVisibleChange.mock.calls).toEqual([[false], [true]]);
    expect(onExpandedChange.mock.calls).toEqual([
      [true, { reason: 'hover' }],
      [false, { reason: 'click' }],
    ]);
  });

  it('reports controlled requests without mutating synchronized state', () => {
    const onVisibleChange = vi.fn();
    const onExpandedChange = vi.fn();
    const controller = new FloatButtonGroupController({
      visible: true,
      expanded: false,
      useCollapse: true,
      onVisibleChange,
      onExpandedChange,
    });

    expect(controller.hide()).toBe(true);
    expect(controller.expand()).toBe(true);
    expect(controller.snapshot).toMatchObject({ visible: true, expanded: false });
    expect(onVisibleChange).toHaveBeenCalledWith(false);
    expect(onExpandedChange).toHaveBeenCalledWith(true, { reason: 'imperative' });
    controller.setOptions({ visible: false, expanded: true });
    expect(controller.snapshot).toMatchObject({ visible: false, expanded: true });
  });

  it('can replace callbacks and switch back to uncontrolled state', () => {
    const first = vi.fn();
    const second = vi.fn();
    const controller = new FloatButtonGroupController({
      expanded: false,
      useCollapse: true,
      onExpandedChange: first,
    });
    controller.setOptions({ expanded: undefined, onExpandedChange: second });
    expect(controller.expand('click')).toBe(true);
    expect(controller.snapshot.expanded).toBe(true);
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledWith(true, { reason: 'click' });
  });
});
