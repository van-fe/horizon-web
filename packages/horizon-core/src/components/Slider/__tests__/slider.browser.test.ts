import { describe, expect, it, vi } from 'vitest';
import { captureSliderPointer, focusSliderThumb, getSliderTrackMetrics } from '../index';

describe('Slider browser primitives', () => {
  it('reads track metrics and remains safe without an element', () => {
    const track = document.createElement('div');
    vi.spyOn(track, 'getBoundingClientRect').mockReturnValue(new DOMRect(24, 0, 160, 8));
    expect(getSliderTrackMetrics(track)).toEqual({ left: 24, width: 160 });
    expect(getSliderTrackMetrics(null)).toEqual({ left: 0, width: 0 });
  });

  it('focuses a thumb and captures its pointer', () => {
    const thumb = document.createElement('button');
    document.body.append(thumb);
    const capture = vi.fn();
    Object.defineProperty(thumb, 'setPointerCapture', { configurable: true, value: capture });
    focusSliderThumb(thumb);
    captureSliderPointer(thumb, 7);
    expect(document.activeElement).toBe(thumb);
    expect(capture).toHaveBeenCalledWith(7);
    thumb.remove();
  });
});
