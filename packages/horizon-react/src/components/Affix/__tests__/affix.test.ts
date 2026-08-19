import { act, createElement as h, createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { getContainer, render } from '../../../__tests__/harness';
import { Affix, type AffixHandle } from '..';

function rect(values: Partial<DOMRect> = {}): DOMRect {
  return {
    x: 0,
    y: 0,
    top: 0,
    right: 100,
    bottom: 40,
    left: 0,
    width: 100,
    height: 40,
    toJSON: () => ({}),
    ...values,
  } as DOMRect;
}

afterEach(() => vi.restoreAllMocks());

describe('React Affix', () => {
  it('preserves natural content before reaching the boundary', async () => {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(
      rect({ top: 20, bottom: 60 }),
    );
    await render(h(Affix, { className: 'custom', title: 'Toolbar' }, 'toolbar'));
    const content = getContainer().querySelector<HTMLElement>('.h-affix')!;
    expect(content).toHaveTextContent('toolbar');
    expect(content).toHaveClass('custom');
    expect(content.style.position).toBe('');
    expect(getContainer().querySelector('[aria-hidden="true"]')).toBeNull();
  });

  it('affixes with a placeholder and reports state changes', async () => {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(
      rect({ top: -20, bottom: 20, left: 18, width: 240 }),
    );
    const onChange = vi.fn();
    await render(h(Affix, { offset: 12, onChange, zIndex: 9 }, 'toolbar'));
    const content = getContainer().querySelector<HTMLElement>('.h-affix')!;
    expect(content.style.position).toBe('fixed');
    expect(content.style.top).toBe('12px');
    expect(content.style.left).toBe('18px');
    expect(content.style.width).toBe('240px');
    expect(content.style.zIndex).toBe('9');
    expect(getContainer().querySelector('[aria-hidden="true"]')).not.toBeNull();
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('uses target boundaries and exposes recalculation', async () => {
    const target = document.createElement('div');
    Object.defineProperty(target, 'clientTop', { configurable: true, value: 2 });
    Object.defineProperty(target, 'clientHeight', { configurable: true, value: 200 });
    document.body.append(target);
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
      this: HTMLElement,
    ) {
      return this === target
        ? rect({ top: 100, bottom: 304, height: 204 })
        : rect({ top: 80, bottom: 120, left: 24, width: 180 });
    });
    const ref = createRef<AffixHandle>();
    await render(h(Affix, { offset: 8, ref, target }, 'filters'));
    expect(ref.current?.element?.style.top).toBe('110px');
    act(() => ref.current?.updatePosition());
    expect(ref.current?.element).toHaveTextContent('filters');
    target.remove();
  });
});
