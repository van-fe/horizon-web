import { Fragment, createElement as h, createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Panel, Panels } from '../../../index';
import { dispatch, getContainer, render } from '../../../__tests__/harness';

function panel(name: string | number, content = String(name), disabled = false) {
  return h(Panel, { disabled, name }, content);
}

describe('React Panels', () => {
  it('renders only the controlled enabled panel with native attributes and refs', async () => {
    const rootRef = createRef<HTMLDivElement>();
    const panelRef = createRef<HTMLDivElement>();
    await render(
      h(
        Panels,
        {
          className: 'consumer-panels',
          panelLabelledBy: 'tab-one',
          ref: rootRef,
          value: 'one',
        },
        h(Panel, { className: 'consumer-panel', name: 'one', ref: panelRef }, 'First'),
        panel('two', 'Second'),
      ),
    );

    const region = getContainer().querySelector('[role="tabpanel"]')!;
    expect(rootRef.current?.classList.contains('consumer-panels')).toBe(true);
    expect(panelRef.current?.classList.contains('consumer-panel')).toBe(true);
    expect(region.getAttribute('aria-labelledby')).toBe('tab-one');
    expect(region.textContent).toBe('First');
    expect(getContainer().textContent).not.toContain('Second');
  });

  it('supports numeric keys and hides disabled active panels', async () => {
    await render(h(Panels, { value: 2 }, panel(1), panel(2), panel(3)));
    expect(getContainer().querySelector('[role="tabpanel"]')?.textContent).toBe('2');

    await render(h(Panels, { value: 2 }, panel(1), panel(2, 'Disabled', true), panel(3)));
    expect(getContainer().querySelector('[role="tabpanel"]')?.textContent).toBe('');
  });

  it('resolves horizontal and vertical animation directions across fragments', async () => {
    await render(
      h(
        Panels,
        { animated: true, value: 'first' },
        h(Fragment, null, panel('first'), panel('middle'), panel('last')),
      ),
    );
    await render(
      h(
        Panels,
        { animated: true, value: 'last' },
        h(Fragment, null, panel('first'), panel('middle'), panel('last')),
      ),
    );
    expect(
      getContainer()
        .querySelector('[role="tabpanel"]')
        ?.classList.contains('h-panels__panel--left'),
    ).toBe(true);
    const leaving = getContainer().querySelector('.h-panels__panel--leaving')!;
    expect(leaving.classList.contains('h-panels__panel--leave-left')).toBe(true);
    expect(leaving.textContent).toBe('first');
    await dispatch(leaving, new AnimationEvent('animationend', { bubbles: true }));
    expect(getContainer().querySelector('.h-panels__panel--leaving')).toBeNull();

    await render(
      h(
        Panels,
        { animated: true, value: 'first', vertical: true },
        ...[panel('first'), panel('middle'), panel('last')],
      ),
    );
    expect(
      getContainer()
        .querySelector('[role="tabpanel"]')
        ?.classList.contains('h-panels__panel--down'),
    ).toBe(true);
  });

  it('keeps long panel content within a 390px container', async () => {
    await render(
      h(
        'div',
        { style: { width: '390px' } },
        h(Panels, { value: 'long' }, panel('long', 'UnbrokenContent'.repeat(80))),
      ),
    );
    const root = getContainer().querySelector('.h-panels') as HTMLElement;
    expect(root.scrollWidth).toBeLessThanOrEqual(root.clientWidth);
  });
});
