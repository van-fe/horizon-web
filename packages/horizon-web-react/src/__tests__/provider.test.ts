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

function DialogLabelsProbe() {
  const { dialogLabels } = useHorizonWebConfig();
  return createElement(
    'span',
    null,
    `${dialogLabels.ok}/${dialogLabels.cancel}/${dialogLabels.close}/${dialogLabels.dialog}`,
  );
}

function DrawerLabelsProbe() {
  const { drawerLabels } = useHorizonWebConfig();
  return createElement(
    'span',
    null,
    `${drawerLabels.ok}/${drawerLabels.cancel}/${drawerLabels.close}/${drawerLabels.drawer}`,
  );
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

  it('merges Dialog labels with provider defaults', () => {
    const html = renderToStaticMarkup(
      createElement(
        HorizonWebProvider,
        { dialogLabels: { ok: 'Save', close: 'Dismiss' } },
        createElement(DialogLabelsProbe),
      ),
    );

    expect(html).toContain('Save/Cancel/Dismiss/Dialog');
  });

  it('merges Drawer labels with provider defaults', () => {
    const html = renderToStaticMarkup(
      createElement(
        HorizonWebProvider,
        { drawerLabels: { ok: 'Apply', close: 'Dismiss' } },
        createElement(DrawerLabelsProbe),
      ),
    );

    expect(html).toContain('Apply/Cancel/Dismiss/Drawer');
  });
});
