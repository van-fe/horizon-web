import type {
  PickerOpenChangeDetails,
  PickerOpenReason,
  PickerPanelStatus,
  PickerStatus,
  PickerTrigger,
} from './contract';
import { PICKER_DEFAULTS } from './contract';

export interface PickerState<Value> {
  value: Value;
  open: boolean;
  focused: boolean;
  composing: boolean;
  disabled: boolean;
  panelStatus: PickerPanelStatus;
}

export interface PickerControllerOptions<Value = unknown> {
  value: Value;
  open?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  trigger?: PickerTrigger;
  canOpen?: boolean;
  panelStatus?: PickerPanelStatus;
  onValueChange?: (value: Value) => void;
  onOpenChange?: (open: boolean, details: PickerOpenChangeDetails) => void;
  onFocusChange?: (focused: boolean) => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClear?: () => Value;
}

export interface PickerClearResult<Value> {
  cleared: boolean;
  value?: Value;
}

export function resolvePickerStatus(open: boolean, panelStatus: PickerPanelStatus): PickerStatus {
  if (!open) return 'panel-hide';
  return panelStatus === 'normal' ? 'panel-visible' : panelStatus;
}

export function canPickerOpen(
  options: Pick<PickerControllerOptions, 'disabled' | 'readonly' | 'trigger' | 'canOpen'>,
): boolean {
  return (
    !options.disabled &&
    !options.readonly &&
    options.trigger !== 'never' &&
    options.canOpen !== false
  );
}

export class PickerController<Value = unknown> {
  private state: PickerState<Value>;
  private options: Required<Omit<PickerControllerOptions<Value>, 'value' | 'open' | 'panelStatus'>>;
  private destroyed = false;

  constructor(options: PickerControllerOptions<Value>) {
    this.state = {
      value: options.value,
      open: options.open ?? PICKER_DEFAULTS.defaultOpen,
      focused: false,
      composing: false,
      disabled: options.disabled ?? PICKER_DEFAULTS.disabled,
      panelStatus: options.panelStatus ?? PICKER_DEFAULTS.panelStatus,
    };
    this.options = {
      disabled: options.disabled ?? PICKER_DEFAULTS.disabled,
      readonly: options.readonly ?? PICKER_DEFAULTS.readonly,
      trigger: options.trigger ?? PICKER_DEFAULTS.trigger,
      canOpen: options.canOpen ?? PICKER_DEFAULTS.canOpen,
      onValueChange: options.onValueChange ?? (() => {}),
      onOpenChange: options.onOpenChange ?? (() => {}),
      onFocusChange: options.onFocusChange ?? (() => {}),
      onConfirm: options.onConfirm ?? (() => {}),
      onCancel: options.onCancel ?? (() => {}),
      onClear: options.onClear ?? (() => options.value),
    };
    if (!canPickerOpen(this.options)) this.state.open = false;
  }

  public get snapshot(): Readonly<PickerState<Value>> & { status: PickerStatus } {
    return { ...this.state, status: resolvePickerStatus(this.state.open, this.state.panelStatus) };
  }

  public setOptions(options: Partial<Omit<PickerControllerOptions<Value>, 'value'>>): void {
    this.options = { ...this.options, ...options };
    this.state = {
      ...this.state,
      disabled: options.disabled ?? this.state.disabled,
      panelStatus: options.panelStatus ?? this.state.panelStatus,
    };
    if (!canPickerOpen(this.options) && this.state.open) {
      this.commitOpen(false, options.disabled ? 'disabled' : 'availability-change');
    }
  }

  public syncState(state: Partial<Pick<PickerState<Value>, 'value' | 'open' | 'disabled'>>): void {
    this.state = { ...this.state, ...state };
    if (!canPickerOpen({ ...this.options, disabled: this.state.disabled })) this.state.open = false;
  }

  public input(value: Value): boolean {
    if (this.destroyed || this.state.disabled || this.options.readonly) return false;
    this.state = { ...this.state, value };
    this.options.onValueChange(value);
    return true;
  }

  public startComposition(): void {
    if (!this.destroyed) this.state = { ...this.state, composing: true };
  }

  public endComposition(): void {
    if (!this.destroyed) this.state = { ...this.state, composing: false };
  }

  public focus(): boolean {
    if (this.destroyed || this.state.disabled || this.state.focused) return false;
    this.state = { ...this.state, focused: true };
    this.options.onFocusChange(true);
    return true;
  }

  public blur(): boolean {
    if (this.destroyed || !this.state.focused) return false;
    this.state = { ...this.state, focused: false };
    this.options.onFocusChange(false);
    return true;
  }

  public open(reason: PickerOpenReason = 'imperative'): boolean {
    if (this.destroyed || !canPickerOpen(this.options)) return false;
    return this.commitOpen(true, reason);
  }

  public close(reason: PickerOpenReason = 'imperative'): boolean {
    return this.commitOpen(false, reason);
  }

  public toggle(reason: PickerOpenReason = 'trigger'): boolean {
    return this.state.open ? this.close(reason) : this.open(reason);
  }

  public confirm(): boolean {
    if (this.destroyed || !this.state.open) return false;
    this.options.onConfirm();
    return this.close('confirm');
  }

  public cancel(): boolean {
    if (this.destroyed || !this.state.open) return false;
    this.options.onCancel();
    return this.close('cancel');
  }

  public clear(): PickerClearResult<Value> {
    if (this.destroyed || this.state.disabled || this.options.readonly) return { cleared: false };
    const value = this.options.onClear();
    this.state = { ...this.state, value };
    this.options.onValueChange(value);
    return { cleared: true, value };
  }

  public destroy(): void {
    this.destroyed = true;
  }

  private commitOpen(open: boolean, reason: PickerOpenReason): boolean {
    if (this.destroyed || open === this.state.open) return false;
    if (open && !canPickerOpen(this.options)) return false;
    this.state = { ...this.state, open };
    this.options.onOpenChange(open, { reason });
    return true;
  }
}
