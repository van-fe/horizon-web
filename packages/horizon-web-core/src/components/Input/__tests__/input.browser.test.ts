import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  blurInputElement,
  calculateInputAutoSizeStyle,
  calculateInputNodeStyling,
  focusInputElement,
  selectInputElement,
} from '../index';

afterEach(() => {
  vi.restoreAllMocks();
  document.querySelectorAll('[data-input-test]').forEach(node => node.remove());
});

function createTextarea(): HTMLTextAreaElement {
  const textarea = document.createElement('textarea');
  textarea.dataset.inputTest = '';
  textarea.id = `input-${Math.random()}`;
  textarea.style.boxSizing = 'border-box';
  textarea.style.padding = '4px 0 6px';
  textarea.style.borderTop = '1px solid';
  textarea.style.borderBottom = '2px solid';
  document.body.appendChild(textarea);
  return textarea;
}

describe('Input Web Core', () => {
  it('measures and clamps textarea rows', () => {
    const textarea = createTextarea();
    vi.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockImplementation(function () {
      return this instanceof HTMLTextAreaElement && this.getAttribute('aria-hidden') === 'true'
        ? this.value === ' '
          ? 30
          : 90
        : 0;
    });
    expect(calculateInputNodeStyling(textarea)).toMatchObject({
      boxSizing: 'border-box',
      paddingSize: 10,
      borderSize: 3,
    });
    expect(calculateInputAutoSizeStyle(textarea, false, 2, 3)).toMatchObject({
      height: '73px',
      minHeight: '53px',
      maxHeight: '73px',
      resize: 'none',
    });
  });

  it('focuses, selects and blurs native fields', () => {
    const input = document.createElement('input');
    input.dataset.inputTest = '';
    input.value = 'Horizon';
    document.body.appendChild(input);
    focusInputElement(input);
    expect(document.activeElement).toBe(input);
    selectInputElement(input);
    expect(input.selectionStart).toBe(0);
    expect(input.selectionEnd).toBe(input.value.length);
    blurInputElement(input);
    expect(document.activeElement).not.toBe(input);
  });
});
