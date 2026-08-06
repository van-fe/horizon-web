import type { PropsWithChildren, ReactElement } from 'react';
import { createContext, createElement, useContext, useState, useSyncExternalStore } from 'react';
import ReactLocaleService, { type ReactLocaleOptions } from './ReactLocaleService';

type LocaleProviderWithOptions = {
  options: ReactLocaleOptions;
  locale?: never;
};

type LocaleProviderWithInstance = {
  locale: ReactLocaleService;
  options?: never;
};

export type LocaleProviderProps = PropsWithChildren<
  LocaleProviderWithOptions | LocaleProviderWithInstance
>;

export const ReactLocaleContext = createContext<ReactLocaleService | null>(null);

export function LocaleProvider({ children, locale, options }: LocaleProviderProps): ReactElement {
  const [localeService] = useState(() => {
    if (locale) return locale;
    if (options) return new ReactLocaleService(options);
    throw new Error('LocaleProvider requires either locale or options.');
  });

  return createElement(ReactLocaleContext.Provider, { value: localeService }, children);
}

export function useLocale(): ReactLocaleService {
  const locale = useContext(ReactLocaleContext);

  if (!locale) {
    throw new Error('useLocale must be used inside a LocaleProvider.');
  }

  useSyncExternalStore(locale.subscribe, locale.getSnapshot, locale.getSnapshot);
  return locale;
}
