import { afterEach, describe, expect, test, vi } from 'vitest';
import calculateAutoSizeStyle, { calculateNodeStyling } from '../src/utils/calculateNodeHeight';

afterEach(() => {
  vi.restoreAllMocks();
  document.querySelectorAll('textarea[data-contract-node]').forEach(node => node.remove());
});

function createTextarea(boxSizing: 'border-box' | 'content-box', id?: string) {
  const textarea = document.createElement('textarea');
  textarea.dataset.contractNode = '';
  if (id) textarea.id = id;
  textarea.style.boxSizing = boxSizing;
  textarea.style.paddingTop = '4px';
  textarea.style.paddingBottom = '6px';
  textarea.style.borderTop = '1px solid';
  textarea.style.borderBottom = '2px solid';
  textarea.style.width = '160px';
  document.body.append(textarea);
  return textarea;
}

describe('Input textarea real-browser height calculation', () => {
  test('calculateNodeStyling caches identified nodes and skips anonymous cache entries', () => {
    const cached = createTextarea('border-box', 'cached-textarea');
    const first = calculateNodeStyling(cached, true);
    cached.style.paddingTop = '20px';
    const second = calculateNodeStyling(cached, true);
    expect(second).toBe(first);
    expect(first).toMatchObject({ boxSizing: 'border-box', paddingSize: 10, borderSize: 3 });
    expect(first.sizingStyle).toContain('box-sizing:border-box');

    const anonymous = createTextarea('content-box');
    const anonymousFirst = calculateNodeStyling(anonymous, true);
    anonymous.style.paddingTop = '10px';
    const anonymousSecond = calculateNodeStyling(anonymous, true);
    expect(anonymousSecond).not.toBe(anonymousFirst);
    expect(anonymousSecond.paddingSize).toBe(16);
  });

  test('border-box rows clamp height, preserve wrap and expose min/max geometry', () => {
    const textarea = createTextarea('border-box', 'border-box-textarea');
    textarea.value = 'several lines';
    textarea.setAttribute('wrap', 'off');
    vi.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockImplementation(function (
      this: HTMLElement,
    ) {
      if (this instanceof HTMLTextAreaElement && this.getAttribute('aria-hidden') === 'true') {
        return this.value === ' ' ? 30 : 90;
      }
      return 0;
    });

    const style = calculateAutoSizeStyle(textarea, false, 2, 3);
    expect(style).toMatchObject({
      height: '73px',
      minHeight: '53px',
      maxHeight: '73px',
      overflowY: '',
      resize: 'none',
    });
    expect(document.querySelector('textarea[aria-hidden="true"]')?.getAttribute('wrap')).toBe(
      'off',
    );
  });

  test('content-box uses placeholder, removes wrap and hides overflow below max rows', () => {
    const textarea = createTextarea('content-box', 'content-box-textarea');
    textarea.placeholder = 'placeholder content';
    vi.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockImplementation(function (
      this: HTMLElement,
    ) {
      if (this instanceof HTMLTextAreaElement && this.getAttribute('aria-hidden') === 'true') {
        return this.value === ' ' ? 30 : 45;
      }
      return 0;
    });

    const style = calculateAutoSizeStyle(textarea, false, null, 5);
    expect(style).toMatchObject({
      height: '35px',
      maxHeight: '100px',
      overflowY: 'hidden',
      resize: 'none',
    });
    expect(style.minHeight).toBeUndefined();
    expect(document.querySelector('textarea[aria-hidden="true"]')?.hasAttribute('wrap')).toBe(
      false,
    );
  });

  test('unbounded and zero-row calculations omit optional min/max styles', () => {
    const textarea = createTextarea('border-box', 'unbounded-textarea');
    vi.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(24);

    const unbounded = calculateAutoSizeStyle(textarea);
    expect(unbounded).toMatchObject({
      height: '27px',
      resize: 'none',
    });
    expect(unbounded.minHeight).toBeUndefined();
    expect(unbounded.maxHeight).toBeUndefined();
    const zeroRows = calculateAutoSizeStyle(textarea, false, 0, 0);
    expect(zeroRows).toMatchObject({ height: '13px', minHeight: '13px', maxHeight: '13px' });
  });
});
