import { act, createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { DateLocaleAvailableShownType, LocaleSupportLang } from '@aurora/locale';
import ReactLocaleService, { type ReactLocaleOptions } from '../ReactLocaleService';
import { LangLocale, ReadDirection } from '../components';
import { LocaleProvider } from '../context';

function createOptions(): ReactLocaleOptions {
  return {
    current: LocaleSupportLang.En,
    lang: {
      dictionaries: {
        [LocaleSupportLang.En]: { greeting: 'Hello' },
        [LocaleSupportLang.ZhCN]: { greeting: '你好' },
      },
    },
  };
}

describe('ReactLocaleService', () => {
  it('notifies subscribers when the current locale changes', () => {
    const locale = new ReactLocaleService(createOptions());
    const subscriber = vi.fn();
    const unsubscribe = locale.subscribe(subscriber);

    locale.setCurrent(LocaleSupportLang.ZhCN);

    expect(subscriber).toHaveBeenCalledOnce();
    expect(locale.langService.t('greeting')).toBe('你好');

    unsubscribe();
    locale.setCurrent(LocaleSupportLang.En);
    expect(subscriber).toHaveBeenCalledOnce();
  });

  it('renders localized content through the provider and components', () => {
    const html = renderToStaticMarkup(
      createElement(
        LocaleProvider,
        { options: createOptions() },
        createElement(LangLocale, { value: 'greeting' }),
      ),
    );

    expect(html).toContain('Hello');
    expect(html).toContain('horizon-web-lang-locale');
  });

  it('rerenders hook consumers after changing the current locale', async () => {
    const locale = new ReactLocaleService(createOptions());
    const container = document.createElement('div');
    const root = createRoot(container);

    await act(async () => {
      root.render(
        createElement(LocaleProvider, { locale }, createElement(LangLocale, { value: 'greeting' })),
      );
    });
    expect(container.textContent).toBe('Hello');

    await act(async () => locale.setCurrent(LocaleSupportLang.ZhCN));
    expect(container.textContent).toBe('你好');

    await act(async () => root.unmount());
  });

  it('renders the reading direction from the current locale', () => {
    const locale = new ReactLocaleService(createOptions());
    locale.setCurrent(LocaleSupportLang.AE);

    const html = renderToStaticMarkup(
      createElement(LocaleProvider, { locale }, createElement(ReadDirection, null, 'مرحبا')),
    );

    expect(html).toContain('dir="rtl"');
  });

  it('keeps date formatting API available on the service', () => {
    const locale = new ReactLocaleService(createOptions());
    expect(
      locale.dateService.d(new Date('2026-08-06'), DateLocaleAvailableShownType.SHORT),
    ).toContain('2026');
  });
});
