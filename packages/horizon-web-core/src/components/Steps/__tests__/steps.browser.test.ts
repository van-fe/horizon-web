import { afterEach, describe, expect, it } from 'vitest';
import { focusStepsItem } from '..';

afterEach(() => document.body.replaceChildren());

describe('Steps browser primitives', () => {
  it('focuses Vue-style roots and React-style nested buttons by semantic index', () => {
    const root = document.createElement('ol');
    root.innerHTML = `
      <li data-index="4" tabindex="0">Four</li>
      <li data-index="8"><button type="button">Eight</button></li>
      <li data-index="9"><button type="button" disabled>Nine</button></li>
    `;
    document.body.append(root);

    expect(focusStepsItem(root)).toBe(true);
    expect(document.activeElement?.textContent).toBe('Four');
    expect(focusStepsItem(root, 8)).toBe(true);
    expect(document.activeElement?.textContent).toBe('Eight');
    expect(focusStepsItem(root, 9)).toBe(false);
    expect(focusStepsItem(root, 10)).toBe(false);
    expect(focusStepsItem(null)).toBe(false);
  });
});
