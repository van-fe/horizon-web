import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { HorizonWebProvider, useHorizonWebConfig } from '../provider';

function NamespaceProbe() {
  return createElement('span', null, useHorizonWebConfig().namespace);
}

describe('HorizonWebProvider', () => {
  it('is SSR-safe and exposes renderer configuration', () => {
    const html = renderToStaticMarkup(
      createElement(HorizonWebProvider, { namespace: 'X' }, createElement(NamespaceProbe)),
    );

    expect(html).toContain('X');
  });

  it('uses the shared theme namespace by default', () => {
    expect(renderToStaticMarkup(createElement(NamespaceProbe))).toContain('H');
  });
});
