import { getCurrentLocale } from '~/utils/useLocaleLang';
import type { Ref } from 'vue';
import { computed } from 'vue';
import { LocaleSupportLang } from '@aurora/locale';
import valueFormatJson from '~/locales/dateFormat.json';
import useShowTimeZone from '~/utils/useShowTimeZone';

export default function useFormat(formatProp: Ref<string | undefined>) {
  const locale = getCurrentLocale();
  const showTimeZone = useShowTimeZone('timeline');

  const valueFormatMapping = computed(
    () => valueFormatJson[locale.value ?? LocaleSupportLang.En],
  );

  const format = computed(() => {
    if (formatProp?.value) {
      return formatProp?.value;
    } else {
      return valueFormatMapping.value?.date + (showTimeZone.value ? ' [UTC]Z' : '');
    }
  });

  return {
    format,
    valueFormatMapping,
  };
}
