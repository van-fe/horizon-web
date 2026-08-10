import type { ReactElement } from 'react';
import { act, createElement as h } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { buttonActionTestVectors, resolveButtonAction } from '@aurora/core';
import { Button } from '../components/Button';
import { Switch } from '../components/Switch';
import { HorizonWebProvider } from '../provider';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: ReturnType<typeof createRoot>;

async function render(element: ReactElement): Promise<void> {
  await act(async () => root.render(element));
}

async function click(element: Element): Promise<void> {
  await act(async () => {
    element.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  });
}

beforeEach(() => {
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
});

afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
});

describe('React Button', () => {
  it.each(buttonActionTestVectors)(
    'consumes the shared action vector: $name',
    ({ input, expected }) => {
      expect(resolveButtonAction(input)).toBe(expected);
    },
  );

  it('renders the shared Horizon class contract and native button semantics', async () => {
    await render(h(Button, { icon: h('span', { 'data-icon': true }), suffix: 'Next' }, 'Save'));

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

    await click(container.querySelector('button')!);
    expect(navigate).toHaveBeenCalledWith('/settings', { replace: true });
    expect(asyncAction).not.toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('guards duplicate async actions and exposes loading state', async () => {
    let finish!: () => void;
    const asyncAction = vi.fn(() => new Promise<void>(resolve => (finish = resolve)));
    const onActionFinished = vi.fn();
    await render(h(Button, { asyncAction, asyncState: 'loading', onActionFinished }, 'Save'));

    const button = container.querySelector('button')!;
    await click(button);
    expect(button.classList).toContain('is-loading');
    await click(button);
    expect(asyncAction).toHaveBeenCalledOnce();

    await act(async () => finish());
    expect(onActionFinished).toHaveBeenCalledOnce();
    expect(button.classList).not.toContain('is-loading');
  });
});

describe('React Switch', () => {
  it('supports uncontrolled native input interaction', async () => {
    const onChange = vi.fn();
    await render(h(Switch, { defaultValue: false, label: 'Automatic updates', onChange }));

    const input = container.querySelector<HTMLInputElement>('input[role="switch"]')!;
    expect(input.checked).toBe(false);
    await click(input);
    expect(input.checked).toBe(true);
    expect(onChange).toHaveBeenCalledWith(true, { reason: 'toggle' });
  });

  it('keeps controlled value authoritative until the parent updates it', async () => {
    const onChange = vi.fn();
    await render(h(Switch, { onChange, value: false }));

    const input = container.querySelector<HTMLInputElement>('input[role="switch"]')!;
    await click(input);
    expect(input.checked).toBe(false);
    expect(onChange).toHaveBeenCalledWith(true, { reason: 'toggle' });

    await render(h(Switch, { onChange, value: true }));
    expect(input.checked).toBe(true);
  });

  it('blocks disabled, readonly, and pending guarded transitions', async () => {
    let finish!: (accepted: boolean) => void;
    const onChange = vi.fn();
    await render(
      h(Switch, {
        beforeChange: () => new Promise<boolean>(resolve => (finish = resolve)),
        onChange,
      }),
    );

    const input = container.querySelector<HTMLInputElement>('input[role="switch"]')!;
    await click(input);
    expect(input.getAttribute('aria-busy')).toBe('true');
    await click(input);
    expect(onChange).not.toHaveBeenCalled();

    await act(async () => finish(true));
    expect(onChange).toHaveBeenCalledOnce();
    expect(input.checked).toBe(true);

    await render(h(Switch, { disabled: true, onChange, value: false }));
    await click(input);
    expect(onChange).toHaveBeenCalledOnce();

    await render(h(Switch, { onChange, readOnly: true, value: false }));
    await click(input);
    expect(onChange).toHaveBeenCalledOnce();
  });
});
