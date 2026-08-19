import { afterEach, describe, expect, it } from 'vitest';
import { focusCollapseHeader } from '..';

afterEach(() => document.body.replaceChildren());

describe('Collapse browser primitives', () => {
  it('focuses enabled headers across direct and nested renderer DOM shapes', () => {
    const root = document.createElement('div');
    root.innerHTML = `
      <section data-collapse-key="first">
        <div role="button" tabindex="0">First</div>
      </section>
      <section data-collapse-key="second">
        <button type="button">Second</button>
      </section>
      <section data-collapse-key="disabled">
        <button type="button" disabled>Disabled</button>
      </section>
    `;
    document.body.append(root);

    expect(focusCollapseHeader(root)).toBe(true);
    expect(document.activeElement?.textContent).toBe('First');
    expect(focusCollapseHeader(root, 'second')).toBe(true);
    expect(document.activeElement?.textContent).toBe('Second');
    expect(focusCollapseHeader(root, 'disabled')).toBe(false);
    expect(focusCollapseHeader(root, 'missing')).toBe(false);
    expect(focusCollapseHeader(null)).toBe(false);
  });
});
