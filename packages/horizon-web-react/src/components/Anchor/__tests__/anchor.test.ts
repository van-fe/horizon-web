import { act, createElement as h, createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { getContainer, render } from '../../../__tests__/harness';
import { Anchor, type AnchorHandle, AnchorLink } from '..';

afterEach(() => vi.restoreAllMocks());

describe('React Anchor', () => {
  it('renders nested links and activates a clicked section', async () => {
    const section = document.createElement('section');
    section.id = 'intro';
    document.body.append(section);
    const onChange = vi.fn();
    const onLinkClick = vi.fn();
    await render(
      h(
        Anchor,
        { changeHash: false, onChange, onLinkClick },
        h(
          AnchorLink,
          { href: '#intro', title: 'Intro' },
          h(AnchorLink, { href: '#details', title: 'Details' }),
        ),
      ),
    );
    const link = getContainer().querySelector<HTMLAnchorElement>('a')!;
    act(() => link.click());
    expect(link.closest('.h-anchor__link-title')).toHaveClass('is-active');
    expect(onLinkClick).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith('#intro', '');
    section.remove();
  });

  it('supports controlled collapse', async () => {
    const onCollapseChange = vi.fn();
    await render(
      h(
        Anchor,
        { collapsed: true, onCollapseChange, useCollapse: true },
        h(AnchorLink, { href: '#one', title: 'One' }),
      ),
    );
    const button = getContainer().querySelector<HTMLButtonElement>('button')!;
    expect(button).toHaveAttribute('aria-expanded', 'false');
    act(() => button.click());
    expect(onCollapseChange).toHaveBeenCalledWith(false);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('auto-renders headings and exposes commands', async () => {
    const host = document.createElement('main');
    host.innerHTML = '<h1 id="first">First</h1><h2>Second</h2>';
    document.body.append(host);
    const ref = createRef<AnchorHandle>();
    await render(h(Anchor, { autoRender: true, ref, scrollContainer: host }));
    expect(getContainer().querySelectorAll('a')).toHaveLength(2);
    expect(ref.current?.getAnchorList()).toHaveLength(1);
    expect(ref.current?.element).toHaveAttribute('aria-label', 'Page sections');
    host.remove();
  });
});
