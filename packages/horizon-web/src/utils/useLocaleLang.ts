import { computed, inject } from 'vue';
import get from 'lodash/get';
import { defaultLocale, localeInjectKey } from '~/provides';
import type { En } from '~/locales/en';
import type { Paths } from '@aurora/utils';

export default function (path: Paths<(typeof En)['horizon-web']>, def?: string) {
  const locale = inject(localeInjectKey, defaultLocale);

  return computed(() => get(locale?.value?.langService.td()?.horizon-web, path) || def);
}

export function getCurrentLocale() {
  const locale = inject(localeInjectKey, defaultLocale);

  return computed(() => locale?.value?.current);
}
