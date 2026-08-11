import type { ReactElement } from 'react';
import { act, createElement as h, createRef, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { TooltipHandle } from '..';
import { Tooltip } from '..';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: ReturnType<typeof createRoot>;

async function render(element: ReactElement): Promise<void> {
  await act(async () => root.render(element));
}

async function dispatch(element: EventTarget, event: Event): Promise<void> {
  await act(async () => element.dispatchEvent(event));
}

beforeEach(() => {
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
});

afterEach(async () => {
  vi.useRealTimers();
  await act(async () => root.unmount());
  container.remove();
  document.querySelectorAll('[role="tooltip"]').forEach(element => element.remove());
});

describe('React Tooltip', () => {
  it('opens on hover after the shared delay and exposes accessible ownership', async () => {
    vi.useFakeTimers();
    await render(
      h(Tooltip, { content: 'Helpful details', showAfter: 20 }, h('button', null, 'Help')),
    );
    const trigger = container.querySelector('button')!;

    await dispatch(trigger, new MouseEvent('mouseover', { bubbles: true }));
    expect(document.querySelector('[role="tooltip"]')).toBeNull();
    await act(async () => vi.advanceTimersByTimeAsync(20));

    const tooltip = document.querySelector('[role="tooltip"]')!;
    expect(tooltip.textContent).toBe('Helpful details');
    expect(trigger.getAttribute('aria-describedby')).toBe(tooltip.id);
    expect(tooltip.getAttribute('data-popper-placement')).not.toBeNull();
  });

  it('supports click dismissal by Escape and outside pointer', async () => {
    await render(
      h(
        StrictMode,
        null,
        h(
          Tooltip,
          { content: 'Click details', hideAfter: 0, showAfter: 0, trigger: 'click' },
          h('button', null, 'Toggle'),
        ),
      ),
    );
    const trigger = container.querySelector('button')!;
    await dispatch(trigger, new MouseEvent('click', { bubbles: true, cancelable: true }));
    expect(document.querySelector('[role="tooltip"]')).not.toBeNull();

    await dispatch(document, new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }));
    expect(document.querySelector('[role="tooltip"]')).toBeNull();

    await dispatch(trigger, new MouseEvent('click', { bubbles: true, cancelable: true }));
    await dispatch(document.body, new PointerEvent('pointerdown', { bubbles: true }));
    expect(document.querySelector('[role="tooltip"]')).toBeNull();
  });

  it('keeps controlled state authoritative and reports native reasons', async () => {
    const onOpenChange = vi.fn();
    await render(
      h(
        Tooltip,
        { content: 'Controlled', onOpenChange, open: false, showAfter: 0 },
        h('button', null, 'Hover'),
      ),
    );
    await dispatch(container.querySelector('button')!, new MouseEvent('mouseover', { bubbles: true }));

    expect(onOpenChange).toHaveBeenCalledWith(true, { reason: 'hover' });
    expect(document.querySelector('[role="tooltip"]')).toBeNull();
  });

  it('renders in a custom portal and exposes an imperative handle', async () => {
    const portal = document.createElement('section');
    document.body.append(portal);
    const ref = createRef<TooltipHandle>();
    await render(
      h(
        Tooltip,
        { content: 'Imperative', portalContainer: portal, ref, showAfter: 0 },
        h('button', null, 'Open'),
      ),
    );

    await act(async () => ref.current?.open());
    expect(portal.querySelector('[role="tooltip"]')?.textContent).toBe('Imperative');
    await act(async () => ref.current?.close());
    expect(portal.querySelector('[role="tooltip"]')).toBeNull();
    portal.remove();
  });
});
