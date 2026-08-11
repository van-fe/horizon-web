export type TooltipTrigger = 'hover' | 'focus' | 'click' | 'contextmenu' | 'manual';

export type TooltipOpenReason =
  | TooltipTrigger
  | 'escape'
  | 'outside-pointer'
  | 'reference-hidden'
  | 'disabled'
  | 'imperative';

export interface TooltipState {
  open: boolean;
  disabled: boolean;
}

export interface TooltipChangeDetails {
  reason: TooltipOpenReason;
}

export interface TooltipControllerOptions {
  open?: boolean;
  disabled?: boolean;
  showDelay?: number;
  hideDelay?: number;
  onOpenChange?: (open: boolean, details: TooltipChangeDetails) => void;
  scheduler?: TooltipScheduler;
}

export interface TooltipScheduler {
  set(callback: () => void, delay: number): unknown;
  clear(handle: unknown): void;
}

export interface TooltipStateAction {
  open: boolean;
  reason: TooltipOpenReason;
}

export interface TooltipStateResult {
  state: TooltipState;
  changed: boolean;
  reason: TooltipOpenReason;
}

export function resolveTooltipState(
  state: TooltipState,
  action: TooltipStateAction,
): TooltipStateResult {
  const open = state.disabled && action.open ? false : action.open;
  return {
    state: { ...state, open },
    changed: open !== state.open,
    reason: action.reason,
  };
}

/**
 * Framework-neutral delayed-open controller. Renderers own events and rendering;
 * this class owns timer cancellation and state transition ordering only.
 */
export class TooltipOpenController {
  private state: TooltipState;
  private options: Required<Pick<TooltipControllerOptions, 'showDelay' | 'hideDelay' | 'scheduler'>> &
    Pick<TooltipControllerOptions, 'onOpenChange'>;
  private showTimer: unknown;
  private hideTimer: unknown;
  private destroyed = false;

  constructor(options: TooltipControllerOptions = {}) {
    this.state = {
      open: options.open ?? false,
      disabled: options.disabled ?? false,
    };
    this.options = {
      showDelay: Math.max(0, options.showDelay ?? 0),
      hideDelay: Math.max(0, options.hideDelay ?? 0),
      onOpenChange: options.onOpenChange,
      scheduler: options.scheduler ?? defaultTooltipScheduler,
    };
  }

  public get snapshot(): Readonly<TooltipState> {
    return this.state;
  }

  public setOptions(options: Omit<TooltipControllerOptions, 'open'>): void {
    this.destroyed = false;
    this.options = {
      showDelay: Math.max(0, options.showDelay ?? this.options.showDelay),
      hideDelay: Math.max(0, options.hideDelay ?? this.options.hideDelay),
      onOpenChange: options.onOpenChange ?? this.options.onOpenChange,
      scheduler: options.scheduler ?? this.options.scheduler,
    };
    if (options.disabled !== undefined) this.setDisabled(options.disabled);
  }

  /** Synchronize a renderer-controlled value without emitting it back. */
  public syncOpen(open: boolean): void {
    this.cancelTimers();
    this.state = { ...this.state, open: this.state.disabled ? false : open };
  }

  public setDisabled(disabled: boolean): void {
    if (disabled === this.state.disabled) return;
    this.state = { ...this.state, disabled };
    if (disabled) {
      this.cancelTimers();
      this.commit(false, 'disabled');
    }
  }

  public requestOpen(reason: TooltipOpenReason): void {
    if (this.destroyed || this.state.disabled) return;
    this.cancelHide();
    this.cancelShow();
    if (this.options.showDelay === 0) {
      this.commit(true, reason);
      return;
    }
    this.showTimer = this.options.scheduler.set(() => {
      this.showTimer = undefined;
      this.commit(true, reason);
    }, this.options.showDelay);
  }

  public requestClose(reason: TooltipOpenReason): void {
    if (this.destroyed) return;
    this.cancelShow();
    this.cancelHide();
    if (this.options.hideDelay === 0) {
      this.commit(false, reason);
      return;
    }
    this.hideTimer = this.options.scheduler.set(() => {
      this.hideTimer = undefined;
      this.commit(false, reason);
    }, this.options.hideDelay);
  }

  public toggle(reason: TooltipOpenReason): void {
    if (this.state.open) this.requestClose(reason);
    else this.requestOpen(reason);
  }

  public openImmediately(reason: TooltipOpenReason = 'imperative'): void {
    this.cancelTimers();
    this.commit(true, reason);
  }

  public closeImmediately(reason: TooltipOpenReason = 'imperative'): void {
    this.cancelTimers();
    this.commit(false, reason);
  }

  public cancelClose(): void {
    this.cancelHide();
  }

  public destroy(): void {
    this.destroyed = true;
    this.cancelTimers();
  }

  private commit(open: boolean, reason: TooltipOpenReason): void {
    if (this.destroyed) return;
    const result = resolveTooltipState(this.state, { open, reason });
    this.state = result.state;
    if (result.changed) this.options.onOpenChange?.(result.state.open, { reason });
  }

  private cancelShow(): void {
    if (this.showTimer === undefined) return;
    this.options.scheduler.clear(this.showTimer);
    this.showTimer = undefined;
  }

  private cancelHide(): void {
    if (this.hideTimer === undefined) return;
    this.options.scheduler.clear(this.hideTimer);
    this.hideTimer = undefined;
  }

  private cancelTimers(): void {
    this.cancelShow();
    this.cancelHide();
  }
}

type TimerRuntime = {
  setTimeout(callback: () => void, delay: number): unknown;
  clearTimeout(handle: unknown): void;
};

const timerRuntime = globalThis as unknown as TimerRuntime;

export const defaultTooltipScheduler: TooltipScheduler = {
  set: (callback, delay) => timerRuntime.setTimeout(callback, delay),
  clear: handle => timerRuntime.clearTimeout(handle),
};
export { tooltipManifest } from './manifest';
