import type { HoverVisibilityReason } from './contract';
import { HOVER_DEFAULTS } from './contract';

export interface HoverControllerOptions {
  disabled?: boolean;
  showDelay?: number;
  hideDelay?: number;
  onVisibleChange?: (visible: boolean, reason: HoverVisibilityReason) => void;
}

export interface HoverControllerSnapshot {
  visible: boolean;
  pending: boolean;
}

export interface HoverTimerRuntime {
  setTimeout(callback: () => void, delay: number): unknown;
  clearTimeout(timer: unknown): void;
}

const defaultTimerRuntime = globalThis as unknown as HoverTimerRuntime;

export class HoverController {
  private options: HoverControllerOptions;
  private visible = false;
  private timer: unknown;
  private destroyed = false;

  constructor(
    options: HoverControllerOptions = {},
    private readonly timerRuntime: HoverTimerRuntime = defaultTimerRuntime,
  ) {
    this.options = options;
  }

  snapshot(): HoverControllerSnapshot {
    return { visible: this.visible, pending: this.timer !== undefined };
  }

  setOptions(options: HoverControllerOptions): void {
    const wasDisabled = this.options.disabled ?? HOVER_DEFAULTS.disabled;
    this.options = options;
    const disabled = options.disabled ?? HOVER_DEFAULTS.disabled;
    if (!wasDisabled && disabled) this.clearPending();
  }

  requestVisible(visible: boolean, reason: HoverVisibilityReason): void {
    if (this.destroyed || (this.options.disabled ?? HOVER_DEFAULTS.disabled)) return;
    this.scheduleVisible(visible, reason, true);
  }

  show(): void {
    if (this.destroyed) return;
    this.scheduleVisible(true, 'show', false);
  }

  hide(): void {
    if (this.destroyed) return;
    this.scheduleVisible(false, 'hide', false);
  }

  destroy(): void {
    this.destroyed = true;
    this.clearPending();
  }

  private scheduleVisible(
    visible: boolean,
    reason: HoverVisibilityReason,
    respectDisabled: boolean,
  ): void {
    this.clearPending();
    const delay = visible
      ? (this.options.showDelay ?? HOVER_DEFAULTS.showDelay)
      : (this.options.hideDelay ?? HOVER_DEFAULTS.hideDelay);
    if (delay === 0) {
      this.commit(visible, reason);
      return;
    }
    this.timer = this.timerRuntime.setTimeout(() => {
      this.timer = undefined;
      if (!respectDisabled || !(this.options.disabled ?? HOVER_DEFAULTS.disabled)) {
        this.commit(visible, reason);
      }
    }, delay);
  }

  private commit(visible: boolean, reason: HoverVisibilityReason): void {
    if (this.visible === visible) return;
    this.visible = visible;
    this.options.onVisibleChange?.(visible, reason);
  }

  private clearPending(): void {
    if (this.timer !== undefined) this.timerRuntime.clearTimeout(this.timer);
    this.timer = undefined;
  }
}
