import { afterEach, describe, expect, it } from 'vitest';
import { focusTabsItem, scrollTabsViewport } from '..';

afterEach(() => document.body.replaceChildren());

describe('Tabs browser primitives', () => {
  it('focuses enabled tabs across renderer data-key shapes', () => {
    const root = document.createElement('div');
    root.innerHTML = `
      <div role="tab" data-name="one" tabindex="0">One</div>
      <button role="tab" data-tab-key="two" tabindex="-1">Two</button>
      <button role="tab" data-tab-key="disabled" aria-disabled="true">Disabled</button>
    `;
    document.body.append(root);

    expect(focusTabsItem(root)).toBe(true);
    expect(document.activeElement?.textContent).toBe('One');
    expect(focusTabsItem(root, 'two')).toBe(true);
    expect(document.activeElement?.textContent).toBe('Two');
    expect(focusTabsItem(root, 'disabled')).toBe(false);
    expect(focusTabsItem(null)).toBe(false);
  });

  it('pages a viewport within its scroll boundaries', () => {
    const viewport = document.createElement('div');
    viewport.style.cssText = 'width: 100px; overflow: auto;';
    const content = document.createElement('div');
    content.style.cssText = 'width: 260px; height: 1px;';
    viewport.append(content);
    document.body.append(viewport);
    expect(viewport.clientWidth).toBe(100);
    expect(viewport.scrollWidth).toBe(260);
    expect(scrollTabsViewport(viewport, 'right')).toBe(true);
    expect(viewport.scrollLeft).toBe(100);
    expect(scrollTabsViewport(viewport, 'right')).toBe(true);
    expect(viewport.scrollLeft).toBe(160);
    expect(scrollTabsViewport(viewport, 'right')).toBe(false);
    expect(scrollTabsViewport(viewport, 'left')).toBe(true);
    expect(viewport.scrollLeft).toBe(60);
  });
});
