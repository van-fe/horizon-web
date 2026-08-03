import '@vue/runtime-core';
import type {
  LocaleDateLocaleMethod,
  LocaleLangMethod,
  LocaleNumberLocaleMethod,
} from '@aurora/locale';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    t: LocaleLangMethod;
    d: LocaleDateLocaleMethod;
    n: LocaleNumberLocaleMethod;
  }
}
