import { act, createElement as h, createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { dispatch, getContainer, render } from '../../../__tests__/harness';
import { Hover } from '..';
import type { HoverHandle } from '..';

function enter(target: Element): Promise<void> {
  return dispatch(target, new MouseEvent('mouseover', { bubbles: true }));
}

function leave(target: Element): Promise<void> {
  return dispatch(target, new MouseEvent('mouseout', { bubbles: true }));
}

describe('React Hover', () => {
  it('renders one target and updates render state on pointer entry and leave', async () => {
    const onVisibleChange = vi.fn();
    await render(h(Hover, { onVisibleChange }, ({ hover }) => h('button', null, String(hover))));
    const target = getContainer().querySelector('button')!;
    expect(target).toHaveTextContent('false');
    await enter(target);
    expect(target).toHaveTextContent('true');
    await leave(target);
    expect(target).toHaveTextContent('false');
    expect(onVisibleChange.mock.calls).toEqual([[true], [false]]);
  });

  it('applies delays and cancels an opposite pending transition', async () => {
    vi.useFakeTimers();
    await render(
      h(Hover, { showDelay: 50, hideDelay: 30 }, ({ hover }) => h('button', null, String(hover))),
    );
    const target = getContainer().querySelector('button')!;
    await enter(target);
    await leave(target);
    await act(async () => vi.advanceTimersByTime(50));
    expect(target).toHaveTextContent('false');
    await enter(target);
    await act(async () => vi.advanceTimersByTime(50));
    expect(target).toHaveTextContent('true');
    await leave(target);
    await act(async () => vi.advanceTimersByTime(30));
    expect(target).toHaveTextContent('false');
    vi.useRealTimers();
  });

  it('preserves target handlers while disabled blocks state changes', async () => {
    const childEnter = vi.fn();
    const onMouseEnter = vi.fn();
    await render(
      h(
        Hover,
        { disabled: true, onMouseEnter },
        h('button', { onMouseEnter: childEnter }, 'target'),
      ),
    );
    await enter(getContainer().querySelector('button')!);
    expect(childEnter).toHaveBeenCalledTimes(1);
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
  });

  it('supports show and hide commands through its ref', async () => {
    const ref = createRef<HoverHandle>();
    await render(h(Hover, { ref }, ({ hover }) => h('output', null, String(hover))));
    await act(async () => ref.current?.show());
    expect(getContainer().querySelector('output')).toHaveTextContent('true');
    await act(async () => ref.current?.hide());
    expect(getContainer().querySelector('output')).toHaveTextContent('false');
  });
});
