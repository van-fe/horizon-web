import { LocaleSupportLang } from '@aurora/locale';
import { createApp } from 'vue';
import { describe, expect, it } from 'vitest';
import VueLocaleService, { type VueLocaleOptions } from '../VueLocaleService';

function createOptions(greeting: string): VueLocaleOptions {
  return {
    current: LocaleSupportLang.En,
    lang: {
      dictionaries: {
        [LocaleSupportLang.En]: { greeting },
      },
    },
  };
}

describe('VueLocaleService', () => {
  it('registers locale features on an app', () => {
    const app = createApp({});

    app.use(VueLocaleService, createOptions('Hello'));

    expect(app.config.globalProperties.t('greeting')).toBe('Hello');
    expect(app.component('HLangLocale')).toBeDefined();
    expect(app.component('HDateLocale')).toBeDefined();
    expect(app.component('HNumberLocale')).toBeDefined();
    expect(app.directive('read-direction')).toBeDefined();
  });

  it('creates and registers an independent instance for each app', () => {
    const firstApp = createApp({});
    const secondApp = createApp({});

    firstApp.use(VueLocaleService, createOptions('First'));
    secondApp.use(VueLocaleService, createOptions('Second'));

    const firstInstance = VueLocaleService.getInstance(firstApp);
    const secondInstance = VueLocaleService.getInstance(secondApp);

    expect(firstInstance).toBeDefined();
    expect(secondInstance).toBeDefined();
    expect(firstInstance).not.toBe(secondInstance);
    expect(firstApp.config.globalProperties.t('greeting')).toBe('First');
    expect(secondApp.config.globalProperties.t('greeting')).toBe('Second');
    expect(VueLocaleService.currInstance).toBe(secondInstance);
  });
});
