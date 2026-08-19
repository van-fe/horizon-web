import { act, createElement as h } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { buttonActionTestVectors, resolveButtonAction } from '@aurora/core';
import { click, getContainer, render } from '../../../__tests__/harness';
import { HorizonWebProvider } from '../../../provider';
import { Button } from '..';

describe('React Button', () => {
  it.each(buttonActionTestVectors)(
    'consumes the shared action vector: $name',
    ({ input, expected }) => {
      expect(resolveButtonAction(input)).toBe(expected);
    },
  );

  it('renders the shared Horizon class contract and native button semantics', async () => {
    await render(h(Button, { icon: h('span', { 'data-icon': true }), suffix: 'Next' }, 'Save'));
    const container = getContainer();
    const button = container.querySelector('button')!;
    expect(button.classList).toContain('h-button', 'h-button--primary', 'h-button--medium');
    expect(button.getAttribute('type')).toBe('button');
    expect(container.querySelector('.h-button__icon [data-icon]')).not.toBeNull();
    expect(container.querySelector('.h-button__suffix')?.textContent).toBe('Next');
  });

  it('uses the Provider navigation adapter before async and press actions', async () => {
    const navigate = vi.fn();
    const asyncAction = vi.fn();
    const onClick = vi.fn();
    await render(
      h(
        HorizonWebProvider,
        { navigate },
        h(Button, { asyncAction, onClick, replace: true, to: '/settings' }, 'Settings'),
      ),
    );

    await click(getContainer().querySelector('button')!);
    expect(navigate).toHaveBeenCalledWith('/settings', { replace: true });
    expect(asyncAction).not.toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('guards duplicate async actions and exposes loading state', async () => {
    let finish!: () => void;
    const asyncAction = vi.fn(() => new Promise<void>(resolve => (finish = resolve)));
    const onActionFinished = vi.fn();
    await render(h(Button, { asyncAction, asyncState: 'loading', onActionFinished }, 'Save'));

    const button = getContainer().querySelector('button')!;
    await click(button);
    expect(button.classList).toContain('is-loading');
    await click(button);
    expect(asyncAction).toHaveBeenCalledOnce();

    await act(async () => finish());
    expect(onActionFinished).toHaveBeenCalledOnce();
    expect(button.classList).not.toContain('is-loading');
  });
});
