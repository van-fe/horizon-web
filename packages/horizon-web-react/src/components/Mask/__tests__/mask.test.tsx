import { createElement as h, createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { click, getContainer, render } from '../../../__tests__/harness';
import { Mask } from '../../../index';

describe('React Mask', () => {
  it('renders variants and forwards the root ref', async () => {
    const ref = createRef<HTMLDivElement>();
    await render(h(Mask, { absolute: true, ref, variant: 'strong', visible: true }));
    expect(ref.current).toBe(getContainer().querySelector('.h-mask'));
    expect(ref.current?.classList.contains('h-mask--strong')).toBe(true);
    expect(ref.current?.classList.contains('is-absolute')).toBe(true);
    expect(getComputedStyle(ref.current!).position).toBe('absolute');
  });

  it('keeps hidden masks inert while preserving content', async () => {
    await render(h(Mask, { visible: false, zIndex: 12 }, h('button', null, 'Continue')));
    const root = getContainer().querySelector<HTMLElement>('.h-mask')!;
    expect(root.style.opacity).toBe('0');
    expect(root.style.pointerEvents).toBe('none');
    expect(root.style.zIndex).toBe('12');
    expect(root.getAttribute('aria-hidden')).toBe('true');
    expect(root.inert).toBe(true);
    expect(root.querySelector('button')?.textContent).toBe('Continue');
  });

  it('isolates scrim presses from content interaction', async () => {
    const onMaskClick = vi.fn();
    const onContentClick = vi.fn();
    await render(
      h(
        Mask,
        {
          contentFullSize: true,
          onMaskClick,
          scrimClassName: 'audit-scrim',
          scrimStyle: { border: '1px solid red' },
        },
        h('button', { onClick: onContentClick }, 'Continue'),
      ),
    );
    const scrim = getContainer().querySelector<HTMLElement>('.h-mask__scrim')!;
    expect(scrim.classList.contains('audit-scrim')).toBe(true);
    expect(scrim.style.border).toBe('1px solid red');
    expect(
      getContainer().querySelector('.h-mask__content')?.classList.contains('is-full-size'),
    ).toBe(true);
    await click(getContainer().querySelector('button')!);
    expect(onContentClick).toHaveBeenCalledTimes(1);
    expect(onMaskClick).not.toHaveBeenCalled();
    await click(scrim);
    expect(onMaskClick).toHaveBeenCalledTimes(1);
    expect(onMaskClick.mock.calls[0]?.[0].nativeEvent).toBeInstanceOf(MouseEvent);
  });

  it('applies custom and fuzzified appearances with shared theme styles', async () => {
    await render(h(Mask, { color: 'rgb(1, 2, 3)', fuzzified: true, opacity: 0.2 }));
    const root = getContainer().querySelector<HTMLElement>('.h-mask')!;
    const scrim = root.querySelector<HTMLElement>('.h-mask__scrim')!;
    expect(root.classList.contains('is-fuzzified')).toBe(true);
    expect(scrim.style.backgroundColor).toBe('rgb(1, 2, 3)');
    const computedStyle = getComputedStyle(scrim);
    expect(computedStyle.getPropertyValue('backdrop-filter')).toBe('blur(8px)');
    expect(computedStyle.opacity).toBe('1');
  });

  it('contains long localized content in a narrow absolute surface', async () => {
    await render(
      h(
        'div',
        { style: { height: 160, overflow: 'hidden', position: 'relative', width: 390 } },
        h(
          Mask,
          { absolute: true, contentFullSize: true },
          h('span', null, 'VeryLongLocalizedContentWithoutAnyNaturalBreakPoint'.repeat(12)),
        ),
      ),
    );
    const root = getContainer().querySelector<HTMLElement>('.h-mask')!;
    const content = root.querySelector<HTMLElement>('.h-mask__content')!;
    expect(root.scrollWidth).toBeLessThanOrEqual(390);
    expect(content.scrollWidth).toBeLessThanOrEqual(content.clientWidth);
  });
});
