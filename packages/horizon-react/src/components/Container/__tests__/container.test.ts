import { createElement as h, createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { getContainer, render } from '../../../__tests__/harness';
import { Aside, Container, Footer, Header, Main } from '..';

describe('React Container', () => {
  it('infers a vertical layout from direct Header and Footer regions', async () => {
    await render(
      h(
        Container,
        null,
        h(Header, null, 'Header'),
        h(Main, null, 'Main'),
        h(Footer, null, 'Footer'),
      ),
    );
    expect(getContainer().querySelector('section')).toHaveClass('is-vertical');
    expect(getContainer().querySelector('header')).toHaveTextContent('Header');
    expect(getContainer().querySelector('main')).toHaveTextContent('Main');
    expect(getContainer().querySelector('footer')).toHaveTextContent('Footer');
  });

  it('uses horizontal layout for Aside/Main and honors an explicit direction', async () => {
    await render(h(Container, null, h(Aside), h(Main)));
    expect(getContainer().querySelector('section')).not.toHaveClass('is-vertical');
    await render(h(Container, { direction: 'vertical' }, h(Aside), h(Main)));
    expect(getContainer().querySelector('section')).toHaveClass('is-vertical');
  });

  it('normalizes dimensions while preserving native attributes and styles', async () => {
    await render(
      h(
        Container,
        { 'aria-label': 'Workspace', className: 'shell' },
        h(Header, { height: 72, style: { color: 'red' } }),
        h(Aside, { width: '18rem' }),
        h(Main, { id: 'content' }),
        h(Footer, { height: '48px' }),
      ),
    );
    expect(getContainer().querySelector('section')).toHaveAttribute('aria-label', 'Workspace');
    expect(getContainer().querySelector('section')).toHaveClass('shell');
    expect(getContainer().querySelector('header')).toHaveStyle({ height: '72px', color: 'red' });
    expect(getContainer().querySelector('aside')).toHaveStyle({ width: '18rem' });
    expect(getContainer().querySelector('main')).toHaveAttribute('id', 'content');
    expect(getContainer().querySelector('footer')).toHaveStyle({ height: '48px' });
  });

  it('forwards refs for every semantic region', async () => {
    const containerRef = createRef<HTMLElement>();
    const headerRef = createRef<HTMLElement>();
    const asideRef = createRef<HTMLElement>();
    const mainRef = createRef<HTMLElement>();
    const footerRef = createRef<HTMLElement>();
    await render(
      h(
        Container,
        { ref: containerRef },
        h(Header, { ref: headerRef }),
        h(Aside, { ref: asideRef }),
        h(Main, { ref: mainRef }),
        h(Footer, { ref: footerRef }),
      ),
    );
    expect(containerRef.current?.tagName).toBe('SECTION');
    expect(headerRef.current?.tagName).toBe('HEADER');
    expect(asideRef.current?.tagName).toBe('ASIDE');
    expect(mainRef.current?.tagName).toBe('MAIN');
    expect(footerRef.current?.tagName).toBe('FOOTER');
  });
});
