import type { PopoverPlacement } from '@aurora/core';
import type {
  PositionerInstance,
  PositionerOptions,
  PositionSnapshot,
  WebPlacement,
} from '../Tooltip';
import { createPositioner } from '../Tooltip';

export interface PopoverSizeOptions {
  sameWidth?: boolean;
  setMinWidth?: boolean;
  sameHeight?: boolean;
}

export interface PopoverPositionerOptions
  extends Omit<PositionerOptions, 'placement' | 'fallbackPlacements'>, PopoverSizeOptions {
  placement?: PopoverPlacement;
  fallbackPlacements?: readonly PopoverPlacement[];
}

export interface PopoverDismissOptions {
  floating: HTMLElement;
  reference?: HTMLElement | null;
  eventName?: 'click' | 'mousedown' | 'mouseup';
  dismissOnEscape?: boolean;
  onDismiss: (reason: 'escape' | 'outside-pointer') => void;
}

/** 监听 Popover 外部事件与 Escape。 @en Observes Popover outside events and Escape dismissal. */
export function createPopoverDismissableLayer(options: PopoverDismissOptions): () => void {
  const ownerDocument = options.floating.ownerDocument;
  const eventName = options.eventName ?? 'click';
  const onOutside = (event: Event) => {
    const target = event.target;
    if (!(target instanceof Node)) return;
    if (options.floating.contains(target) || options.reference?.contains(target)) return;
    options.onDismiss('outside-pointer');
  };
  const onKeyDown = (event: KeyboardEvent) => {
    if (options.dismissOnEscape === false || event.key !== 'Escape') return;
    options.onDismiss('escape');
  };
  ownerDocument.addEventListener(eventName, onOutside, true);
  ownerDocument.addEventListener('keydown', onKeyDown, true);
  return () => {
    ownerDocument.removeEventListener(eventName, onOutside, true);
    ownerDocument.removeEventListener('keydown', onKeyDown, true);
  };
}

function isAutomaticPlacement(placement: PopoverPlacement): boolean {
  return placement === 'auto' || placement.startsWith('auto-');
}

/** 将自动位置解析为当前视口中空间最大的方向。 @en Resolves auto placement to the roomiest viewport side. */
export function resolvePopoverPlacement(
  reference: DOMRect | Pick<DOMRect, 'top' | 'right' | 'bottom' | 'left'>,
  placement: PopoverPlacement,
  viewport: Pick<Window, 'innerWidth' | 'innerHeight'>,
): WebPlacement {
  if (!isAutomaticPlacement(placement)) return placement as WebPlacement;
  const alignment = placement.endsWith('-start')
    ? '-start'
    : placement.endsWith('-end')
      ? '-end'
      : '';
  const spaces = [
    ['top', reference.top],
    ['bottom', viewport.innerHeight - reference.bottom],
    ['left', reference.left],
    ['right', viewport.innerWidth - reference.right],
  ] as const;
  const side = spaces.reduce((best, candidate) => (candidate[1] > best[1] ? candidate : best))[0];
  return `${side}${alignment}` as WebPlacement;
}

/** 同步浮层与触发元素的尺寸约束。 @en Synchronizes floating size constraints with its reference. */
export function syncPopoverReferenceSize(
  reference: HTMLElement,
  floating: HTMLElement,
  options: PopoverSizeOptions,
): void {
  const rect = reference.getBoundingClientRect();
  if (options.sameWidth && !options.setMinWidth) floating.style.width = `${rect.width}px`;
  if (options.sameWidth && options.setMinWidth) floating.style.minWidth = `${rect.width}px`;
  if (options.sameHeight) floating.style.height = `${rect.height}px`;
}

/** 创建带自动位置与尺寸同步的 Popover positioner。 @en Creates a Popover positioner with auto placement and size syncing. */
export function createPopoverPositioner(
  reference: HTMLElement,
  floating: HTMLElement,
  initialOptions: PopoverPositionerOptions = {},
): PositionerInstance {
  let options = { ...initialOptions };
  const ownerWindow = reference.ownerDocument.defaultView;
  const normalize = (): PositionerOptions => {
    syncPopoverReferenceSize(reference, floating, options);
    const viewport = ownerWindow ?? { innerWidth: 0, innerHeight: 0 };
    return {
      ...options,
      placement: resolvePopoverPlacement(
        reference.getBoundingClientRect(),
        options.placement ?? 'top',
        viewport,
      ),
      fallbackPlacements: options.fallbackPlacements
        ?.filter(placement => !isAutomaticPlacement(placement))
        .map(placement => placement as WebPlacement),
    };
  };
  const positioner = createPositioner(reference, floating, normalize());
  return {
    get snapshot(): PositionSnapshot | undefined {
      return positioner.snapshot;
    },
    update() {
      positioner.setOptions(normalize());
      return positioner.update();
    },
    setOptions(nextOptions) {
      options = { ...options, ...nextOptions };
      positioner.setOptions(normalize());
    },
    destroy() {
      positioner.destroy();
    },
  };
}
