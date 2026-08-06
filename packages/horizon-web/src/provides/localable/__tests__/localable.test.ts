import type { ComputedRef } from 'vue';
import { createApp } from 'vue';
import VueLocaleService from '@aurora/locale-vue';
import localableProvide, { localeInjectKey } from '../index';

describe('localableProvide', () => {
  it('keeps each app bound to its own locale instance', () => {
    const firstApp = createApp({});
    const secondApp = createApp({});

    localableProvide(firstApp);
    const firstLocale = firstApp._context.provides[
      localeInjectKey as symbol
    ] as ComputedRef<VueLocaleService>;

    localableProvide(secondApp);
    const secondLocale = secondApp._context.provides[
      localeInjectKey as symbol
    ] as ComputedRef<VueLocaleService>;

    expect(firstLocale.value).toBe(VueLocaleService.getInstance(firstApp));
    expect(secondLocale.value).toBe(VueLocaleService.getInstance(secondApp));
    expect(firstLocale.value).not.toBe(secondLocale.value);
  });
});
