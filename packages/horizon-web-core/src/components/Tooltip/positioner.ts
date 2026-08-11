export type WebPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

export type PositionStrategy = 'fixed' | 'absolute';

export interface RectLike {
  top: number;
  right: number;
  bottom: number;
  left: number;
  width: number;
  height: number;
}

export interface FloatingSize {
  width: number;
  height: number;
}

export interface PositionViewport {
  width: number;
  height: number;
  scrollX?: number;
  scrollY?: number;
}

export interface PositionerOptions {
  placement?: WebPlacement;
  strategy?: PositionStrategy;
  distance?: number;
  skidding?: number;
  flip?: boolean;
  shift?: boolean;
  padding?: number;
  fallbackPlacements?: WebPlacement[];
  arrowElement?: HTMLElement | null;
  arrowPadding?: number;
  hideWhenReferenceHidden?: boolean;
  autoUpdate?: boolean;
  observeResize?: boolean;
  onPosition?: (snapshot: PositionSnapshot) => void;
}

export interface PositionSnapshot {
  x: number;
  y: number;
  placement: WebPlacement;
  strategy: PositionStrategy;
  referenceHidden: boolean;
  arrowX?: number;
  arrowY?: number;
}

export interface PositionerInstance {
  readonly snapshot: PositionSnapshot | undefined;
  update(): Promise<PositionSnapshot>;
  setOptions(options: PositionerOptions): void;
  destroy(): void;
}

type Side = 'top' | 'bottom' | 'left' | 'right';
type Alignment = 'start' | 'end' | undefined;

function splitPlacement(placement: WebPlacement): [Side, Alignment] {
  const [side, alignment] = placement.split('-') as [Side, Alignment];
  return [side, alignment];
}

function oppositePlacement(placement: WebPlacement): WebPlacement {
  const [side, alignment] = splitPlacement(placement);
  const opposite: Record<Side, Side> = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
  };
  return `${opposite[side]}${alignment ? `-${alignment}` : ''}` as WebPlacement;
}

function baseCoordinates(
  reference: RectLike,
  floating: FloatingSize,
  placement: WebPlacement,
  distance: number,
  skidding: number,
): { x: number; y: number } {
  const [side, alignment] = splitPlacement(placement);
  let x = reference.left + (reference.width - floating.width) / 2;
  let y = reference.top + (reference.height - floating.height) / 2;

  if (side === 'top') y = reference.top - floating.height - distance;
  if (side === 'bottom') y = reference.bottom + distance;
  if (side === 'left') x = reference.left - floating.width - distance;
  if (side === 'right') x = reference.right + distance;

  if (side === 'top' || side === 'bottom') {
    if (alignment === 'start') x = reference.left;
    if (alignment === 'end') x = reference.right - floating.width;
    x += skidding;
  } else {
    if (alignment === 'start') y = reference.top;
    if (alignment === 'end') y = reference.bottom - floating.height;
    y += skidding;
  }

  return { x, y };
}

function overflowScore(
  coordinates: { x: number; y: number },
  floating: FloatingSize,
  viewport: PositionViewport,
  padding: number,
): number {
  return (
    Math.max(0, padding - coordinates.x) +
    Math.max(0, padding - coordinates.y) +
    Math.max(0, coordinates.x + floating.width - (viewport.width - padding)) +
    Math.max(0, coordinates.y + floating.height - (viewport.height - padding))
  );
}

export function computePositionSnapshot(
  reference: RectLike,
  floating: FloatingSize,
  options: PositionerOptions = {},
  viewport: PositionViewport,
): PositionSnapshot {
  const requestedPlacement = options.placement ?? 'top';
  const distance = options.distance ?? 0;
  const skidding = options.skidding ?? 0;
  const padding = Math.max(0, options.padding ?? 8);
  const candidates =
    options.flip === false
      ? [requestedPlacement]
      : [
          requestedPlacement,
          ...(options.fallbackPlacements ?? [oppositePlacement(requestedPlacement)]),
        ];

  let placement = candidates[0];
  let coordinates = baseCoordinates(reference, floating, placement, distance, skidding);
  let score = overflowScore(coordinates, floating, viewport, padding);
  for (const candidate of candidates.slice(1)) {
    const nextCoordinates = baseCoordinates(reference, floating, candidate, distance, skidding);
    const nextScore = overflowScore(nextCoordinates, floating, viewport, padding);
    if (nextScore < score) {
      placement = candidate;
      coordinates = nextCoordinates;
      score = nextScore;
    }
    if (score === 0) break;
  }

  if (options.shift !== false) {
    coordinates.x = Math.min(
      Math.max(coordinates.x, padding),
      Math.max(padding, viewport.width - floating.width - padding),
    );
    coordinates.y = Math.min(
      Math.max(coordinates.y, padding),
      Math.max(padding, viewport.height - floating.height - padding),
    );
  }

  const [side] = splitPlacement(placement);
  const arrowPadding = Math.max(0, options.arrowPadding ?? 3);
  const arrowWidth = options.arrowElement?.offsetWidth ?? 0;
  const arrowHeight = options.arrowElement?.offsetHeight ?? 0;
  let arrowX: number | undefined;
  let arrowY: number | undefined;
  if (options.arrowElement) {
    if (side === 'top' || side === 'bottom') {
      arrowX = Math.min(
        Math.max(
          reference.left + reference.width / 2 - coordinates.x - arrowWidth / 2,
          arrowPadding,
        ),
        Math.max(arrowPadding, floating.width - arrowWidth - arrowPadding),
      );
    } else {
      arrowY = Math.min(
        Math.max(
          reference.top + reference.height / 2 - coordinates.y - arrowHeight / 2,
          arrowPadding,
        ),
        Math.max(arrowPadding, floating.height - arrowHeight - arrowPadding),
      );
    }
  }

  return {
    x: coordinates.x + (options.strategy === 'absolute' ? (viewport.scrollX ?? 0) : 0),
    y: coordinates.y + (options.strategy === 'absolute' ? (viewport.scrollY ?? 0) : 0),
    placement,
    strategy: options.strategy ?? 'fixed',
    referenceHidden:
      reference.bottom <= 0 ||
      reference.right <= 0 ||
      reference.top >= viewport.height ||
      reference.left >= viewport.width,
    arrowX,
    arrowY,
  };
}

export function createPositioner(
  reference: HTMLElement,
  floating: HTMLElement,
  initialOptions: PositionerOptions = {},
): PositionerInstance {
  let options = { ...initialOptions };
  let currentSnapshot: PositionSnapshot | undefined;
  let destroyed = false;
  const ownerWindow = reference.ownerDocument.defaultView;
  const resizeObserver =
    options.autoUpdate === false ||
    options.observeResize === false ||
    typeof ResizeObserver === 'undefined'
      ? undefined
      : new ResizeObserver(() => void update());

  async function update(): Promise<PositionSnapshot> {
    const viewport = {
      width: ownerWindow?.innerWidth ?? reference.ownerDocument.documentElement.clientWidth,
      height: ownerWindow?.innerHeight ?? reference.ownerDocument.documentElement.clientHeight,
      scrollX: ownerWindow?.scrollX ?? 0,
      scrollY: ownerWindow?.scrollY ?? 0,
    };
    const snapshot = computePositionSnapshot(
      reference.getBoundingClientRect(),
      { width: floating.offsetWidth, height: floating.offsetHeight },
      options,
      viewport,
    );
    if (destroyed) return snapshot;
    currentSnapshot = snapshot;
    floating.style.position = snapshot.strategy;
    floating.style.left = `${snapshot.x}px`;
    floating.style.top = `${snapshot.y}px`;
    floating.dataset.popperPlacement = snapshot.placement;
    if (options.hideWhenReferenceHidden) {
      if (snapshot.referenceHidden) floating.dataset.popperReferenceHidden = '';
      else delete floating.dataset.popperReferenceHidden;
    }
    if (options.arrowElement) {
      options.arrowElement.style.left = snapshot.arrowX === undefined ? '' : `${snapshot.arrowX}px`;
      options.arrowElement.style.top = snapshot.arrowY === undefined ? '' : `${snapshot.arrowY}px`;
    }
    options.onPosition?.(snapshot);
    return snapshot;
  }

  const scheduleUpdate = () => void update();
  if (options.autoUpdate !== false) {
    ownerWindow?.addEventListener('resize', scheduleUpdate);
    reference.ownerDocument.addEventListener('scroll', scheduleUpdate, true);
    resizeObserver?.observe(reference);
    resizeObserver?.observe(floating);
  }
  void update();

  return {
    get snapshot() {
      return currentSnapshot;
    },
    update,
    setOptions(nextOptions) {
      options = { ...options, ...nextOptions };
      void update();
    },
    destroy() {
      destroyed = true;
      ownerWindow?.removeEventListener('resize', scheduleUpdate);
      reference.ownerDocument.removeEventListener('scroll', scheduleUpdate, true);
      resizeObserver?.disconnect();
    },
  };
}
