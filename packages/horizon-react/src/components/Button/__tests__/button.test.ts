import { act, createElement as h, createRef, StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { buttonActionTestVectors, resolveButtonAction } from '@aurora/core';
import { click, getContainer, render } from '../../../__tests__/harness';
import { HorizonWebProvider } from '../../../provider';
import { Button, ButtonGroup } from '..';

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

  it('renders native anchors and blocks disabled anchor activation', async () => {
    const onClick = vi.fn();
    await render(h(Button, { href: '/download', onClick, target: '_blank' }, 'Download'));
    const anchor = getContainer().querySelector('a')!;
    expect(anchor.getAttribute('href')).toBe('/download');
    expect(anchor.getAttribute('target')).toBe('_blank');
    await click(anchor);
    expect(onClick).not.toHaveBeenCalled();

    await render(h(Button, { disabled: true, href: '/download' }, 'Download'));
    const disabledAnchor = getContainer().querySelector('a')!;
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    disabledAnchor.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
    expect(disabledAnchor.getAttribute('aria-disabled')).toBe('true');
    expect(disabledAnchor.tabIndex).toBe(-1);
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

  it('reports async rejection and ignores late completion after unmount', async () => {
    const error = new Error('save failed');
    const onActionError = vi.fn();
    await render(h(Button, { asyncAction: () => Promise.reject(error), onActionError }, 'Save'));
    await click(getContainer().querySelector('button')!);
    await act(async () => undefined);
    expect(onActionError).toHaveBeenCalledWith(error);

    let finish!: () => void;
    const onActionFinished = vi.fn();
    await render(
      h(Button, {
        asyncAction: () => new Promise<void>(resolve => (finish = resolve)),
        onActionFinished,
      }),
    );
    await click(getContainer().querySelector('button')!);
    await render(h('div'));
    await act(async () => finish());
    expect(onActionFinished).not.toHaveBeenCalled();
  });

  it('survives StrictMode lifecycle replay and preserves action state', async () => {
    const asyncAction = vi.fn(async () => undefined);
    await render(h(StrictMode, null, h(Button, { asyncAction }, 'Run')));
    await click(getContainer().querySelector('button')!);
    await act(async () => undefined);
    expect(asyncAction).toHaveBeenCalledOnce();
  });

  it('inherits group variant and size while allowing a local size', async () => {
    await render(
      h(
        ButtonGroup,
        { 'aria-label': 'Pagination', size: 'large', variant: 'danger' },
        h(Button, null, 'Previous'),
        h(Button, { size: 'small' }, 'Next'),
      ),
    );
    const group = getContainer().querySelector('[role="group"]')!;
    const buttons = [...group.querySelectorAll('button')];
    expect(group.classList).toContain('h-button-group');
    expect(buttons[0].classList).toContain('h-button--danger', 'h-button--large');
    expect(buttons[1].classList).toContain('h-button--danger', 'h-button--small');
  });

  it('uses the shared custom-color projection and allows explicit style overrides', async () => {
    await render(
      h(Button, { color: 'brand', style: { '--h-button-background-primary': '#000' } }, 'Create'),
    );
    const button = getContainer().querySelector<HTMLElement>('button')!;
    expect(button.style.getPropertyValue('--h-button-background-primary')).toBe('#000');

    await render(h(Button, { color: 'invalid-color' }, 'Create'));
    expect(
      getContainer()
        .querySelector<HTMLElement>('button')!
        .style.getPropertyValue('--h-button-background-primary'),
    ).toBe('');
  });

  it('projects custom colors for every visual appearance and icon-only loading', async () => {
    await render(
      h(
        'div',
        null,
        h(Button, { color: '#476582', plain: true }, 'Plain'),
        h(Button, { color: '#476582', ghost: true, plain: true }, 'Ghost'),
        h(Button, { color: '#476582', link: true }, 'Link'),
        h(Button, { color: '#476582', text: true }, 'Text'),
        h(Button, { 'aria-label': 'Loading', loading: true }),
      ),
    );
    const buttons = [...getContainer().querySelectorAll<HTMLElement>('button')];
    expect(buttons[0].style.getPropertyValue('--h-button-color-primary-plain')).not.toBe('');
    expect(buttons[1].style.getPropertyValue('--h-button-color-primary-plain-ghost')).not.toBe('');
    expect(buttons[2].style.getPropertyValue('--h-button-color-primary-link')).not.toBe('');
    expect(buttons[3].style.getPropertyValue('--h-button-color-primary-text')).not.toBe('');
    expect(buttons[4].classList).toContain('h-button--equally', 'is-loading');
  });

  it('falls through unavailable application navigation to async and regular press actions', async () => {
    const asyncAction = vi.fn(async () => undefined);
    await render(h(Button, { asyncAction, to: '/missing-router' }, 'Async fallback'));
    await click(getContainer().querySelector('button')!);
    await act(async () => undefined);
    expect(asyncAction).toHaveBeenCalledOnce();

    const onClick = vi.fn();
    await render(h(Button, { onClick }, 'Press'));
    await click(getContainer().querySelector('button')!);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('renders an SSR-safe snapshot', () => {
    expect(renderToString(h(Button, null, 'SSR'))).toContain('h-button--primary');
  });

  it('forwards focus through the native ref', async () => {
    const ref = createRef<HTMLButtonElement | HTMLAnchorElement>();
    await render(h(Button, { ref }, 'Focus'));
    ref.current?.focus();
    expect(document.activeElement).toBe(ref.current);
  });
});
