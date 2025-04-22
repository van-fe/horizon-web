import type { ComputedRef, UnwrapNestedRefs } from 'vue';
import { watch } from 'vue';
import { aeLocale, LocaleSupportLangV2 } from '@nio-fe/locale';
import dayjs from '~/utils/useDayJs';
import type { VueLocaleService } from '@nio-fe/locale-vue';

/**
 * Because of old DatePicker, the locale cannot be loaded
 */
export default function (locale: ComputedRef<UnwrapNestedRefs<VueLocaleService>>) {
  watch(
    () => locale.value.current,
    val => {
      let localeVal;

      switch (val) {
        case LocaleSupportLangV2.AE:
          localeVal = aeLocale;
          break;
        case LocaleSupportLangV2.DE:
          localeVal = 'de';
          break;
        case LocaleSupportLangV2.En:
        case LocaleSupportLangV2.EnGB:
        case LocaleSupportLangV2.EnUS:
          localeVal = 'en';
          break;
        case LocaleSupportLangV2.ZhCN:
          localeVal = 'zh-cn';
          break;
        case LocaleSupportLangV2.ZhTW:
          localeVal = 'zh-tw';
          break;
        case LocaleSupportLangV2.SG:
          localeVal = 'en-sg';
          break;
        case LocaleSupportLangV2.SvSE:
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
