import type { Dayjs } from 'dayjs';
import type { Ref } from 'vue';
import type { HorizonWebComponentInstance } from '@aurora/utils';
import type TimePanel from '../components/TimePanel';
import type { TimePickerTimePanelExposes } from '../composables/useExposes';
import type HPicker from '~/components/Picker/src/Picker';
import type {
  PickerExposes,
  PickerPureInputExposes,
} from '~/components/Picker/src/composables/useExposes';
import type HPickerPureInput from '~/components/Picker/src/components/PickerPureInput';

export type SingleOrArrayPickerDataType<T> = T | [T, T];

/**
 * Disable time judgment method
 * @param time Current time
 * @param type Only given when selecting a time range, representing the start and end times respectively.
 * @return boolean Whether to disabled current time
 */
export type HTimePickerDisabledTimeMethodType = (time: Dayjs, type?: 'start' | 'end') => boolean;

/**
 * The array list which give to TimeColumnPanel to show
 */
export interface HTimePickerPanelOptionType {
  label: string;
  value: Dayjs;
  disabled: boolean;
}

/**
 * Show tooltip type
 */
export type HTimePickerShowTimeTooltipType = (
  time: Dayjs,
  timeType: 'time' | 'hour' | 'minute' | 'second',
) => {
  show: boolean;
  content?: string;
};

export interface HTimePickerDomRefs {
  startTimePanelDomRef: Ref<
    HorizonWebComponentInstance<typeof TimePanel, TimePickerTimePanelExposes> | undefined
  >;
  endTimePanelDomRef: Ref<
    HorizonWebComponentInstance<typeof TimePanel, TimePickerTimePanelExposes> | undefined
  >;
  pickerDomRef: Ref<HorizonWebComponentInstance<typeof HPicker, PickerExposes> | undefined>;
  startInputDomRef: Ref<
    HorizonWebComponentInstance<typeof HPickerPureInput, PickerPureInputExposes> | undefined
  >;
  endInputDomRef: Ref<
    HorizonWebComponentInstance<typeof HPickerPureInput, PickerPureInputExposes> | undefined
  >;
}
