import { afterEach, describe, expect, it, vi } from 'vitest';
import { createAffixController, resolveAffixTarget } from '..';

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

afterEach(() => {
  vi.restoreAllMocks();
  document.body.innerHTML = '';
});

describe('Affix Web Core', () => {
  it('resolves selectors and safely falls back', () => {
    const target = document.createElement('div');
    target.id = 'affix-target';
    document.body.append(target);
    const warning = vi.fn();
    expect(resolveAffixTarget('#affix-target', document, warning)).toBe(target);
    expect(resolveAffixTarget('[', document, warning)).toBe(window);
    expect(warning).toHaveBeenCalledWith('[');
  });

  it('measures fixed geometry and preserves the natural box', () => {
    const content = document.createElement('div');
    document.body.append(content);
    vi.spyOn(content, 'getBoundingClientRect').mockReturnValue(
      rect({ top: -10, bottom: 30, left: 16, width: 220 }),
    );
    const states: Array<{ affixed: boolean; contentStyle: { top?: string; width?: string } }> = [];
    const controller = createAffixController({
      getContent: () => content,
      getPlaceholder: () => null,
      getTarget: () => window,
      getPosition: () => 'top',
      getOffset: () => 12,
      getZIndex: () => 8,
      onStateChange: state => states.push(state),
    });
    expect(states.at(-1)?.affixed).toBe(true);
    expect(states.at(-1)?.contentStyle.top).toBe('12px');
    expect(states.at(-1)?.contentStyle.width).toBe('220px');
    expect(controller.state.placeholderStyle?.height).toBe('40px');
    controller.destroy();
  });

  it('uses the inner edge of an element boundary', () => {
    const target = document.createElement('div');
    const content = document.createElement('div');
    document.body.append(target, content);
    Object.defineProperty(target, 'clientTop', { configurable: true, value: 2 });
    Object.defineProperty(target, 'clientHeight', { configurable: true, value: 200 });
    vi.spyOn(target, 'getBoundingClientRect').mockReturnValue(rect({ top: 100, height: 204 }));
    vi.spyOn(content, 'getBoundingClientRect').mockReturnValue(rect({ top: 80, bottom: 120 }));
    const controller = createAffixController({
      getContent: () => content,
      getPlaceholder: () => null,
      getTarget: () => target,
      getPosition: () => 'top',
      getOffset: () => 8,
      getZIndex: () => undefined,
      onStateChange: () => undefined,
    });
    expect(controller.state.contentStyle.top).toBe('110px');
    controller.destroy();
  });
});
