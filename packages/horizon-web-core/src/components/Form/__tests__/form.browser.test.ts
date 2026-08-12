import { describe, expect, it, vi } from 'vitest';
import { scrollFormFieldIntoView } from '../index';

describe('Form Web Core', () => {
  it('scrolls a field with stable defaults and handles missing elements', () => {
    const element = document.createElement('div');
    const scrollIntoView = vi.fn();
    element.scrollIntoView = scrollIntoView;
    expect(scrollFormFieldIntoView(element)).toBe(true);
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    expect(scrollFormFieldIntoView(null)).toBe(false);
  });
});
