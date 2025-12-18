import type { Dayjs } from 'dayjs';
import type { Ref } from 'vue';
import type { LegoComponentInstance } from '@nio-fe/shared';
import type TimePanel from '../components/TimePanel';
import type { TimePickerV2TimePanelExposes } from '../composables/useExposes';
import type NPicker from '~/components/Picker/src/Picker';
import type {
  PickerExposes,
  PickerPureInputExposes,
} from '~/components/Picker/src/composables/useExposes';
import type NPickerPureInput from '~/components/Picker/src/components/NPickerPureInput';

export type SingleOrArrayPickerDataType<T> = T | [T, T];

/**
 * Disable time judgment method
 * @param time Current time
 * @param type Only given when selecting a time range, representing the start and end times respectively.
 * @return boolean Whether to disabled current time
 */
export type NTimePickerV2DisabledTimeMethodType = (time: Dayjs, type?: 'start' | 'end') => boolean;

/**
 * The array list which give to TimeColumnPanel to show
 */
export interface NTimePickerPanelOptionType {
  label: string;
  value: Dayjs;
  disabled: boolean;
}

/**
 * Show tooltip type
 */
export type NTimePickerV2ShowTimeTooltipType = (
  time: Dayjs,
  timeType: 'time' | 'hour' | 'minute' | 'second',
) => {
  show: boolean;
  content?: string;
};

export interface NTimePickerDomRefs {
  startTimePanelDomRef: Ref<
    LegoComponentInstance<typeof TimePanel, TimePickerV2TimePanelExposes> | undefined
  >;
  endTimePanelDomRef: Ref<
    LegoComponentInstance<typeof TimePanel, TimePickerV2TimePanelExposes> | undefined
  >;
  pickerDomRef: Ref<LegoComponentInstance<typeof NPicker, PickerExposes> | undefined>;
  startInputDomRef: Ref<
    LegoComponentInstance<typeof NPickerPureInput, PickerPureInputExposes> | undefined
  >;
  endInputDomRef: Ref<
    LegoComponentInstance<typeof NPickerPureInput, PickerPureInputExposes> | undefined
  >;
}
