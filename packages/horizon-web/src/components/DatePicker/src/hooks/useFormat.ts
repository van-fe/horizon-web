import { getCurrentLocale } from '~/utils/useLocaleLang';
import type { ToRefs, Ref, ComputedRef } from 'vue';
import { provide, computed } from 'vue';
import type { DatePickerProps } from '../composables/useProps';
import { LocaleSupportLang } from '@aurora/locale';
import valueFormatJson from '~/locales/dateFormat.json';
import dateSwitcherShowFormat from '../utils/dateSwitcherShowFormat.json';
import {
  HDatePickerDateSwitcherShowFormatMappingMappingInjectKey,
  HDatePickerValueFormatMappingInjectKey,
} from '../utils/injectKeys';
import type { HDatePickerBaseSupportType } from '../utils/types';
import useShowTimeZone from '~/utils/useShowTimeZone';

export default function useFormat(
  propRefs: ToRefs<DatePickerProps>,
  options: {
    visible: Ref<boolean>;
    pickerType: ComputedRef<HDatePickerBaseSupportType>;
  },
) {
  const locale = getCurrentLocale();
  const showTimeZone = useShowTimeZone('date-picker');

  const valueFormatMapping = computed(
    () => valueFormatJson[locale.value ?? LocaleSupportLang.En],
  );

  const dateSwitcherShowFormatMapping = computed(
    () => dateSwitcherShowFormat[locale.value ?? LocaleSupportLang.En],
  );

  const valueFormat = computed<string>(() => {
    if (propRefs.valueFormat?.value) {
      return propRefs.valueFormat.value;
    } else {
      return (
        valueFormatMapping.value?.[options.pickerType.value] + (showTimeZone.value ? ' [UTC]Z' : '')
      );
    }
  });

  const format = computed(() => {
    if (propRefs.format?.value) {
      return propRefs.format.value;
    } else {
      return (
        valueFormatMapping.value?.[options.pickerType.value] + (showTimeZone.value ? ' [UTC]Z' : '')
      );
    }
  });

  provide(HDatePickerValueFormatMappingInjectKey, valueFormatMapping);
  provide(
    HDatePickerDateSwitcherShowFormatMappingMappingInjectKey,
    dateSwitcherShowFormatMapping,
  );

  return {
    format,
    valueFormat,
    valueFormatMapping,
  };
}
