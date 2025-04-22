import { getCurrentLocale } from '~/utils/useLocaleLang';
import type { ToRefs, Ref, ComputedRef } from 'vue';
import { provide, computed } from 'vue';
import type { DatePickerV2Props } from '../composables/useProps';
import { LocaleSupportLangV2 } from '@nio-fe/locale';
import valueFormatJson from '~/locales/dateFormat.json';
import dateSwitcherShowFormat from '../utils/dateSwitcherShowFormat.json';
import {
  NDatePickerV2DateSwitcherShowFormatMappingMappingInjectKey,
  NDatePickerV2FormatInjectKey,
  NDatePickerV2ValueFormatMappingInjectKey,
} from '../utils/injectKeys';
import type { NDatePickerV2BaseSupportType } from '../utils/types';
import useShowTimeZone from '~/utils/useShowTimeZone';

export default function useFormat(
  propRefs: ToRefs<DatePickerV2Props>,
  options: {
    visible: Ref<boolean>;
    pickerType: ComputedRef<NDatePickerV2BaseSupportType>;
  },
) {
  const locale = getCurrentLocale();
  const showTimeZone = useShowTimeZone('date-picker');

  const valueFormatMapping = computed(
    () => valueFormatJson[locale.value ?? LocaleSupportLangV2.En],
  );

  const dateSwitcherShowFormatMapping = computed(
    () => dateSwitcherShowFormat[locale.value ?? LocaleSupportLangV2.En],
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
      return propRefs.format?.value;
    } else {
      return (
        valueFormatMapping.value?.[options.pickerType.value] + (showTimeZone.value ? ' [UTC]Z' : '')
      );
    }
  });

  provide(NDatePickerV2ValueFormatMappingInjectKey, valueFormatMapping);
  provide(
    NDatePickerV2DateSwitcherShowFormatMappingMappingInjectKey,
    dateSwitcherShowFormatMapping,
  );
  provide(NDatePickerV2FormatInjectKey, format);

  return {
    format,
    valueFormat,
    valueFormatMapping,
  };
}
