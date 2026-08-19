export interface DismissableLayerOptions {
  node: HTMLElement;
  branches?: Iterable<HTMLElement | null | undefined>;
  dismissOnEscape?: boolean;
  dismissOnOutsidePointer?: boolean;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  onPointerDownOutside?: (event: PointerEvent) => void;
  onDismiss: (reason: 'escape' | 'outside-pointer') => void;
}

export interface DismissableLayer {
  destroy(): void;
}

const layerStacks = new WeakMap<Document, DismissableLayerOptions[]>();

function getStack(document: Document): DismissableLayerOptions[] {
  const current = layerStacks.get(document);
  if (current) return current;
  const stack: DismissableLayerOptions[] = [];
  layerStacks.set(document, stack);
  return stack;
}

export function createDismissableLayer(options: DismissableLayerOptions): DismissableLayer {
  const ownerDocument = options.node.ownerDocument;
  const stack = getStack(ownerDocument);
  stack.push(options);

  const isTopLayer = () => stack.at(-1) === options;
  const containsTarget = (target: EventTarget | null) => {
    if (!(target instanceof Node)) return false;
    if (options.node.contains(target)) return true;
    return Array.from(options.branches ?? []).some(branch => branch?.contains(target));
  };
  const onKeyDown = (event: KeyboardEvent) => {
    if (!isTopLayer() || options.dismissOnEscape === false || event.key !== 'Escape') return;
    options.onEscapeKeyDown?.(event);
    if (!event.defaultPrevented) options.onDismiss('escape');
  };
  const onPointerDown = (event: PointerEvent) => {
    if (!isTopLayer() || options.dismissOnOutsidePointer === false || containsTarget(event.target)) {
      return;
    }
    options.onPointerDownOutside?.(event);
    if (!event.defaultPrevented) options.onDismiss('outside-pointer');
  };

  ownerDocument.addEventListener('keydown', onKeyDown, true);
  ownerDocument.addEventListener('pointerdown', onPointerDown, true);

  return {
    destroy() {
      const index = stack.indexOf(options);
      if (index >= 0) stack.splice(index, 1);
      ownerDocument.removeEventListener('keydown', onKeyDown, true);
      ownerDocument.removeEventListener('pointerdown', onPointerDown, true);
    },
  };
}
