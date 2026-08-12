import { describe, expect, it, vi } from 'vitest';
import {
  canPickerOpen,
  isPickerConfirmAreaSize,
  isPickerDelay,
  isPickerDimension,
  isPickerFitInputWidth,
  isPickerInputStatus,
  isPickerInputVariant,
  isPickerPanelStatus,
  isPickerTrigger,
  PickerController,
  PICKER_DEFAULTS,
  pickerApiContract,
  resolvePickerStatus,
} from '..';

describe('Picker contract', () => {
  it('publishes defaults and validates common values', () => {
    expect(pickerApiContract.defaults).toBe(PICKER_DEFAULTS);
    expect(isPickerTrigger('never')).toBe(true);
    expect(isPickerTrigger('focus')).toBe(false);
    expect(isPickerInputVariant('no-border')).toBe(true);
    expect(isPickerInputVariant('filled')).toBe(false);
    expect(isPickerInputStatus('warning')).toBe(true);
    expect(isPickerInputStatus('pending')).toBe(false);
    expect(isPickerPanelStatus('loading')).toBe(true);
    expect(isPickerPanelStatus('error')).toBe(false);
    expect(isPickerConfirmAreaSize('small')).toBe(true);
    expect(isPickerConfirmAreaSize('large')).toBe(false);
    expect(isPickerFitInputWidth('fit-content')).toBe(true);
    expect(isPickerFitInputWidth('stretch')).toBe(false);
    expect(isPickerDelay(0)).toBe(true);
    expect(isPickerDelay(-1)).toBe(false);
    expect(isPickerDimension('18rem')).toBe(true);
    expect(isPickerDimension('')).toBe(false);
  });

  it('resolves status and open availability', () => {
    expect(resolvePickerStatus(false, 'loading')).toBe('panel-hide');
    expect(resolvePickerStatus(true, 'normal')).toBe('panel-visible');
    expect(resolvePickerStatus(true, 'empty')).toBe('empty');
    expect(canPickerOpen({ trigger: 'click' })).toBe(true);
    expect(canPickerOpen({ trigger: 'never' })).toBe(false);
    expect(canPickerOpen({ trigger: 'click', readonly: true })).toBe(false);
    expect(canPickerOpen({ trigger: 'click', disabled: true })).toBe(false);
    expect(canPickerOpen({ trigger: 'click', canOpen: false })).toBe(false);
  });
});

describe('PickerController', () => {
  it('coordinates value, open, focus, composition, confirmation and clearing', () => {
    const onValueChange = vi.fn();
    const onOpenChange = vi.fn();
    const onFocusChange = vi.fn();
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    const controller = new PickerController({
      value: 'before',
      onValueChange,
      onOpenChange,
      onFocusChange,
      onConfirm,
      onCancel,
      onClear: () => '',
    });

    expect(controller.focus()).toBe(true);
    expect(controller.focus()).toBe(false);
    expect(controller.input('after')).toBe(true);
    controller.startComposition();
    expect(controller.snapshot.composing).toBe(true);
    controller.endComposition();
    expect(controller.open('focus')).toBe(true);
    expect(controller.snapshot.status).toBe('panel-visible');
    expect(controller.confirm()).toBe(true);
    expect(onConfirm).toHaveBeenCalledOnce();
    expect(onOpenChange).toHaveBeenLastCalledWith(false, { reason: 'confirm' });

    controller.open();
    expect(controller.cancel()).toBe(true);
    expect(onCancel).toHaveBeenCalledOnce();
    expect(controller.clear()).toEqual({ cleared: true, value: '' });
    expect(onValueChange).toHaveBeenLastCalledWith('');
    expect(controller.blur()).toBe(true);
    expect(onFocusChange.mock.calls).toEqual([[true], [false]]);
  });

  it('supports controlled sync and closes when availability changes', () => {
    const onOpenChange = vi.fn();
    const controller = new PickerController({ value: 1, open: true, onOpenChange });
    controller.syncState({ value: 2, open: true });
    expect(controller.snapshot.value).toBe(2);
    expect(onOpenChange).not.toHaveBeenCalled();

    controller.setOptions({ panelStatus: 'loading' });
    expect(controller.snapshot.status).toBe('loading');
    controller.setOptions({ disabled: true });
    expect(controller.snapshot.open).toBe(false);
    expect(onOpenChange).toHaveBeenCalledWith(false, { reason: 'disabled' });
    expect(controller.open()).toBe(false);
    expect(controller.input(3)).toBe(false);
    expect(controller.clear()).toEqual({ cleared: false });
  });

  it('honors never/read-only modes and ignores commands after destroy', () => {
    const controller = new PickerController({ value: 'x', trigger: 'never' });
    expect(controller.open()).toBe(false);
    controller.setOptions({ trigger: 'click', readonly: true });
    expect(controller.open()).toBe(false);
    controller.setOptions({ readonly: false, canOpen: true });
    expect(controller.toggle()).toBe(true);
    expect(controller.toggle()).toBe(true);
    controller.destroy();
    expect(controller.focus()).toBe(false);
    expect(controller.open()).toBe(false);
    expect(controller.close()).toBe(false);
    expect(controller.confirm()).toBe(false);
    expect(controller.cancel()).toBe(false);
    expect(controller.clear()).toEqual({ cleared: false });
  });
});
