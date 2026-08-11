import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { HorizonWebProvider, useHorizonWebConfig } from '../provider';

function NamespaceProbe() {
  return createElement('span', null, useHorizonWebConfig().namespace);
}

function PopconfirmLabelsProbe() {
  const { popconfirmLabels } = useHorizonWebConfig();
  return createElement('span', null, `${popconfirmLabels.confirm}/${popconfirmLabels.cancel}`);
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

  it('merges Popconfirm labels with provider defaults', () => {
    const html = renderToStaticMarkup(
      createElement(
        HorizonWebProvider,
        { popconfirmLabels: { confirm: 'Proceed' } },
        createElement(PopconfirmLabelsProbe),
      ),
    );

    expect(html).toContain('Proceed/Cancel');
  });
});
