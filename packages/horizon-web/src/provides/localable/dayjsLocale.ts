import type { ComputedRef, UnwrapNestedRefs } from 'vue';
import { watch } from 'vue';
import { aeLocale, LocaleSupportLang } from '@aurora/locale';
import dayjs from '~/utils/useDayJs';
import type { VueLocaleService } from '@aurora/locale-vue';

/**
 * Because of old DatePicker, the locale cannot be loaded
 */
export default function (locale: ComputedRef<UnwrapNestedRefs<VueLocaleService>>) {
  watch(
    () => locale.value.current,
    val => {
      let localeVal;

      switch (val) {
        case LocaleSupportLang.AE:
          localeVal = aeLocale;
          break;
        case LocaleSupportLang.DE:
          localeVal = 'de';
          break;
        case LocaleSupportLang.En:
        case LocaleSupportLang.EnGB:
        case LocaleSupportLang.EnUS:
          localeVal = 'en';
          break;
        case LocaleSupportLang.ZhCN:
          localeVal = 'zh-cn';
          break;
        case LocaleSupportLang.ZhTW:
          localeVal = 'zh-tw';
          break;
        case LocaleSupportLang.SG:
          localeVal = 'en-sg';
          break;
        case LocaleSupportLang.SvSE:
          localeVal = 'se';
          break;
      }

      dayjs.locale(localeVal);
    },
    {
      immediate: true,
    },
  );
}
