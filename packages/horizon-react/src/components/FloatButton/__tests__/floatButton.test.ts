import { act, createElement as h, createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { HorizonWebProvider } from '../../../provider';
import { click, dispatch, getContainer, render } from '../../../__tests__/harness';
import {
  FloatButton,
  FloatButtonGroup,
  type FloatButtonGroupHandle,
  type FloatButtonHandle,
} from '..';

describe('React FloatButton', () => {
  it('renders semantic button and link actions with accessible labels', async () => {
    const onClick = vi.fn();
    await render(
      h(
        HorizonWebProvider,
        { floatButtonLabels: { button: 'Quick action' } },
        h(FloatButton, { icon: '+', onClick }),
      ),
    );
    let action = getContainer().querySelector<HTMLElement>('.h-float-button')!;
    expect(action.tagName).toBe('BUTTON');
    expect(action).toHaveAttribute('type', 'button');
    expect(action).toHaveAttribute('aria-label', 'Quick action');
    await click(action);
    expect(onClick).toHaveBeenCalledOnce();

    await render(h(FloatButton, { description: 'Help', href: '/help', target: '_blank' }));
    action = getContainer().querySelector('.h-float-button')!;
    expect(action.tagName).toBe('A');
    expect(action).toHaveAttribute('href', '/help');
    expect(action).toHaveAttribute('target', '_blank');
    expect(action).not.toHaveAttribute('aria-label');
  });

  it('combines description, tooltip and shared badge layout', async () => {
    await render(
      h(FloatButton, {
        badge: { content: 8, type: 'num' },
        description: 'Inbox',
        icon: 'I',
        tooltip: 'Open inbox',
      }),
    );
    const action = getContainer().querySelector<HTMLElement>('.h-float-button')!;
    expect(action.querySelector('.h-float-button__inner_all')).not.toBeNull();
    expect(action.querySelector('.h-badge__content')).toHaveTextContent('8');
    await dispatch(action, new MouseEvent('mouseover', { bubbles: true }));
    await act(async () => new Promise(resolve => setTimeout(resolve, 210)));
    expect(document.querySelector('[role="tooltip"]')).toHaveTextContent('Open inbox');
  });

  it('supports controlled visibility and imperative visibility commands', async () => {
    const ref = createRef<FloatButtonHandle>();
    const onVisibleChange = vi.fn();
    await render(
      h(FloatButton, {
        defaultVisible: true,
        description: 'Action',
        onVisibleChange,
        ref,
      }),
    );
    await act(async () => ref.current?.hide());
    expect(ref.current?.element?.style.display).toBe('none');
    expect(onVisibleChange).toHaveBeenCalledWith(false);
    await act(async () => ref.current?.show());
    expect(ref.current?.element?.style.display).not.toBe('none');

    await render(
      h(FloatButton, { description: 'Controlled', onVisibleChange, ref, visible: true }),
    );
    await act(async () => ref.current?.hide());
    expect(ref.current?.element?.style.display).not.toBe('none');
    expect(onVisibleChange).toHaveBeenLastCalledWith(false);
  });

  it('stacks visible actions with the shared ordering algorithm', async () => {
    await render(
      h(
        'div',
        null,
        h(FloatButton, { description: 'First', icon: '1' }),
        h(FloatButton, { description: 'Second' }),
      ),
    );
    const actions = getContainer().querySelectorAll<HTMLElement>('.h-float-button');
    expect(actions[0].style.bottom).toContain('* 0');
    expect(actions[1].style.bottom).toContain('* 1');
    expect(actions[1].style.bottom).toContain('* 1)');
  });

  it('drags through Web Core and adsorbs with the Core geometry helper', async () => {
    const onDragStart = vi.fn();
    const onDragging = vi.fn();
    const onDragEnd = vi.fn();
    await render(
      h(FloatButton, {
        description: 'Move',
        draggable: true,
        onDragEnd,
        onDragStart,
        onDragging,
      }),
    );
    const action = getContainer().querySelector<HTMLElement>('.h-float-button')!;
    vi.spyOn(action, 'getBoundingClientRect').mockReturnValue({
      bottom: 140,
      height: 40,
      left: 100,
      right: 140,
      top: 100,
      width: 40,
      x: 100,
      y: 100,
      toJSON: () => ({}),
    });
    await dispatch(
      action,
      new PointerEvent('pointerdown', {
        bubbles: true,
        button: 0,
        clientX: 110,
        clientY: 110,
        isPrimary: true,
        pointerId: 4,
      }),
    );
    await dispatch(
      document,
      new PointerEvent('pointermove', {
        bubbles: true,
        clientX: 150,
        clientY: 170,
        isPrimary: true,
        pointerId: 4,
      }),
    );
    expect(action.style.left).toBe('140px');
    expect(action.style.top).toBe('160px');
    await dispatch(
      document,
      new PointerEvent('pointerup', {
        bubbles: true,
        clientX: 150,
        clientY: 170,
        isPrimary: true,
        pointerId: 4,
      }),
    );
    expect(Number.parseFloat(action.style.left)).toBe(window.innerWidth - 64);
    expect(onDragStart).toHaveBeenCalledOnce();
    expect(onDragging).toHaveBeenCalledOnce();
    expect(onDragEnd).toHaveBeenCalledOnce();
  });
});

describe('React FloatButtonGroup', () => {
  it('applies group shape, variant and visibility to its actions', async () => {
    await render(
      h(
        FloatButtonGroup,
        { shape: 'square', variant: 'primary', visible: true },
        h(FloatButton, { description: 'Child' }),
      ),
    );
    const action = getContainer().querySelector('.h-float-button')!;
    expect(action).toHaveClass('h-float-button--square');
    expect(action).toHaveClass('h-float-button--primary');
  });

  it('expands and folds a collapsible group through click interaction', async () => {
    const onClick = vi.fn();
    const onExpand = vi.fn();
    const onExpandedChange = vi.fn();
    const onFold = vi.fn();
    await render(
      h(
        FloatButtonGroup,
        { onClick, onExpand, onExpandedChange, onFold, useCollapse: true },
        h(FloatButton, { description: 'Child action' }),
      ),
    );
    const trigger = getContainer().querySelector<HTMLElement>('.h-float-button')!;
    expect(trigger).toHaveAttribute('aria-label', 'Expand floating actions');
    await click(trigger);
    expect(onClick).toHaveBeenCalledOnce();
    expect(onExpandedChange).toHaveBeenCalledWith(true, { reason: 'click' });
    expect(onExpand).toHaveBeenCalledOnce();
    expect(document.querySelector('.h-float-button-group__container')).not.toHaveAttribute(
      'hidden',
    );

    await click(trigger);
    expect(onExpandedChange).toHaveBeenLastCalledWith(false, { reason: 'click' });
    expect(onFold).toHaveBeenCalledOnce();
  });

  it('keeps controlled expansion authoritative and exposes group commands', async () => {
    const ref = createRef<FloatButtonGroupHandle>();
    const onExpandedChange = vi.fn();
    await render(
      h(
        FloatButtonGroup,
        { expanded: false, onExpandedChange, ref, useCollapse: true },
        h(FloatButton, { description: 'Controlled child' }),
      ),
    );
    await act(async () => ref.current?.expand());
    expect(onExpandedChange).toHaveBeenCalledWith(true, { reason: 'imperative' });
    expect(getContainer().querySelector('.h-float-button')).toHaveAttribute(
      'aria-label',
      'Expand floating actions',
    );
    await act(async () => ref.current?.hide());
    expect(getContainer().querySelector<HTMLElement>('.h-float-button')?.style.display).toBe(
      'none',
    );
  });
});
