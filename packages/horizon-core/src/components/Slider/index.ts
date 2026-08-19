export interface SliderTrackMetrics {
  left: number;
  width: number;
}

export function getSliderTrackMetrics(element: Element | null): SliderTrackMetrics {
  if (!element) return { left: 0, width: 0 };
  const { left, width } = element.getBoundingClientRect();
  return { left, width };
}

export function focusSliderThumb(element: HTMLElement | null): void {
  element?.focus();
}

export function captureSliderPointer(element: Element | null, pointerId: number): void {
  if (element && 'setPointerCapture' in element) element.setPointerCapture(pointerId);
}
