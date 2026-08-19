import { act, createElement as h, createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Slider } from '../../../index';
import type { SliderHandle } from '../../../index';
import { dispatch, getContainer, render } from '../../../__tests__/harness';

describe('React Slider', () => {
  it('updates an uncontrolled value from track clicks and keyboard input', async () => {
    const onChange = vi.fn();
    await render(h(Slider, { defaultValue: 20, onChange, step: 10 }));
    const container = getContainer();
    const track = container.querySelector<HTMLElement>('.h-slider__track')!;
    vi.spyOn(track, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, 100, 8));
    await dispatch(track.parentElement!, new MouseEvent('click', { bubbles: true, clientX: 60 }));
    expect(onChange).toHaveBeenLastCalledWith(60);
    const thumb = container.querySelector<HTMLElement>('[role="slider"]')!;
    await dispatch(thumb, new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowRight' }));
    expect(onChange).toHaveBeenLastCalledWith(70);
    await dispatch(thumb, new KeyboardEvent('keydown', { bubbles: true, key: 'Home' }));
    expect(onChange).toHaveBeenLastCalledWith(0);
  });

  it('selects the closest range thumb and calculates non-zero-min progress', async () => {
    const onChange = vi.fn();
    await render(
      h(Slider, { defaultValue: [20, 80], max: 80, min: 20, onChange, range: true, step: 10 }),
    );
    const container = getContainer();
    const track = container.querySelector<HTMLElement>('.h-slider__track')!;
    vi.spyOn(track, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, 100, 8));
    expect(container.querySelector<HTMLElement>('.h-slider__progress')?.style.width).toBe('100%');
    await dispatch(track.parentElement!, new MouseEvent('click', { bubbles: true, clientX: 80 }));
    expect(onChange).toHaveBeenCalledWith([20, 70]);
  });

  it('renders separators, tooltip, number input and supports its ref command', async () => {
    const ref = createRef<SliderHandle>();
    await render(
      h(Slider, {
        defaultValue: 50,
        formatTooltip: value => `${value}%`,
        ref,
        showInput: true,
        showSeparators: true,
        step: 25,
      }),
    );
    const container = getContainer();
    expect(container.querySelectorAll('.h-slider__separator--item')).toHaveLength(3);
    const thumb = container.querySelector<HTMLElement>('[role="slider"]')!;
    await act(async () => thumb.focus());
    expect(container.querySelector('[role="tooltip"]')?.textContent).toBe('50%');
    expect((container.querySelector('[type="number"]') as HTMLInputElement).valueAsNumber).toBe(50);
    await act(async () => ref.current?.focus());
    expect(document.activeElement).toBe(thumb);
  });

  it('keeps disabled sliders inert', async () => {
    const onChange = vi.fn();
    await render(h(Slider, { defaultValue: 40, disabled: true, onChange }));
    const thumb = getContainer().querySelector<HTMLElement>('[role="slider"]')!;
    await dispatch(thumb, new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowRight' }));
    expect(onChange).not.toHaveBeenCalled();
    expect(thumb.getAttribute('aria-disabled')).toBe('true');
    expect(thumb.tabIndex).toBe(-1);
  });
});
