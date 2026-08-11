import { afterEach, describe, expect, it } from 'vitest';
import { focusPaginationItem } from '..';

afterEach(() => document.body.replaceChildren());

describe('Pagination browser primitives', () => {
  it('focuses the first enabled action or a semantic page across renderer DOM shapes', () => {
    const root = document.createElement('nav');
    root.innerHTML = `
      <button type="button" disabled>Previous</button>
      <li data-page="1" tabindex="0">One</li>
      <li data-page="2"><button type="button">Two</button></li>
      <li data-page="3"><button type="button" disabled>Three</button></li>
    `;
    document.body.append(root);

    expect(focusPaginationItem(root)).toBe(true);
    expect(document.activeElement?.textContent).toBe('One');
    expect(focusPaginationItem(root, 2)).toBe(true);
    expect(document.activeElement?.textContent).toBe('Two');
    expect(focusPaginationItem(root, 3)).toBe(false);
    expect(focusPaginationItem(root, 4)).toBe(false);
    expect(focusPaginationItem(null)).toBe(false);
  });
});
