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

function FloatButtonLabelsProbe() {
  const { floatButtonLabels } = useHorizonWebConfig();
  return createElement(
    'span',
    null,
    `${floatButtonLabels.button}/${floatButtonLabels.expand}/${floatButtonLabels.fold}`,
  );
}

function BacktopLabelsProbe() {
  return createElement('span', null, useHorizonWebConfig().backtopLabels.button);
}

function FormLabelsProbe() {
  return createElement('span', null, useHorizonWebConfig().formLabels.required);
}

function InputNumberLabelsProbe() {
  const labels = useHorizonWebConfig().inputNumberLabels;
  return createElement(
    'span',
    null,
    `${labels.placeholder}/${labels.increase}/${labels.decrease}/${labels.clear}`,
  );
}

function SpinLabelsProbe() {
  return createElement('span', null, useHorizonWebConfig().spinLabels.loading);
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

  it('merges FloatButton labels with provider defaults', () => {
    const html = renderToStaticMarkup(
      createElement(
        HorizonWebProvider,
        { floatButtonLabels: { expand: 'Show actions' } },
        createElement(FloatButtonLabelsProbe),
      ),
    );

    expect(html).toContain('Floating action/Show actions/Collapse floating actions');
  });

  it('merges Backtop labels with provider defaults', () => {
    const html = renderToStaticMarkup(
      createElement(
        HorizonWebProvider,
        { backtopLabels: { button: 'Return to start' } },
        createElement(BacktopLabelsProbe),
      ),
    );

    expect(html).toContain('Return to start');
  });

  it('merges Form labels with provider defaults', () => {
    const html = renderToStaticMarkup(
      createElement(
        HorizonWebProvider,
        { formLabels: { required: 'Enter {prop}' } },
        createElement(FormLabelsProbe),
      ),
    );

    expect(html).toContain('Enter {prop}');
  });

  it('merges InputNumber labels with provider defaults', () => {
    const html = renderToStaticMarkup(
      createElement(
        HorizonWebProvider,
        { inputNumberLabels: { placeholder: 'Amount' } },
        createElement(InputNumberLabelsProbe),
      ),
    );

    expect(html).toContain('Amount/Increase value/Decrease value/Clear value');
  });

  it('merges Spin labels with provider defaults', () => {
    const html = renderToStaticMarkup(
      createElement(
        HorizonWebProvider,
        { spinLabels: { loading: 'Preparing workspace' } },
        createElement(SpinLabelsProbe),
      ),
    );

    expect(html).toContain('Preparing workspace');
  });
});
