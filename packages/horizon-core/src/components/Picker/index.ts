import type { PopoverDismissOptions } from '../Popover';
import { createPopoverDismissableLayer } from '../Popover';

export interface PickerDomAdapterOptions {
  trigger: HTMLElement;
  floating?: HTMLElement | null;
}

export interface PickerDomAdapter {
  readonly trigger: HTMLElement;
  readonly floating: HTMLElement | null;
  setFloating(node: HTMLElement | null): void;
  contains(target: EventTarget | null): boolean;
  focus(): void;
  blur(): void;
  restoreFocus(): void;
  destroy(): void;
}

/** Owns DOM-only focus and containment behavior shared by picker renderers. */
export function createPickerDomAdapter(options: PickerDomAdapterOptions): PickerDomAdapter {
  let floating = options.floating ?? null;
  let destroyed = false;
  let restoreTarget: HTMLElement | null = null;

  return {
    trigger: options.trigger,
    get floating() {
      return floating;
    },
    setFloating(node) {
      if (!destroyed) floating = node;
    },
    contains(target) {
      return (
        !destroyed &&
        target instanceof Node &&
        (options.trigger.contains(target) || Boolean(floating?.contains(target)))
      );
    },
    focus() {
      if (destroyed) return;
      const active = options.trigger.ownerDocument.activeElement;
      restoreTarget = active instanceof HTMLElement && active !== options.trigger ? active : null;
      options.trigger.focus();
    },
    blur() {
      if (!destroyed && options.trigger.ownerDocument.activeElement === options.trigger) {
        options.trigger.blur();
      }
    },
    restoreFocus() {
      if (!destroyed && restoreTarget?.isConnected) restoreTarget.focus();
      restoreTarget = null;
    },
    destroy() {
      destroyed = true;
      floating = null;
      restoreTarget = null;
    },
  };
}

export interface PickerDismissOptions extends Pick<
  PopoverDismissOptions,
  'floating' | 'reference' | 'eventName'
> {
  onDismiss(reason: 'escape' | 'outside-pointer'): void;
}

/** Reuses the shared popover dismiss layer with Picker-specific typing. */
export function createPickerDismissableLayer(options: PickerDismissOptions): () => void {
  return createPopoverDismissableLayer({ ...options, dismissOnEscape: true });
}
