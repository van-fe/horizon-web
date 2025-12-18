import { default as DatePicker } from './src/DatePicker';
import { withInstall } from '@aurora/utils';

export const NDatePicker = withInstall(DatePicker);
export default NDatePicker;

export type {
  NDatePickerBaseSupportType,
  NDatePickerTypeFormat,
  NDatePickerSupportType,
  NDatePickerAccessDatetimeType,
  NDatePickerDisabledDateMethodType,
  NDatePickerDisabledTimeMethodType,
  NDatePickerShowDotType,
  NDatePickerShortcutsType,
  NDatePickerShowDateTooltipType,
  NDatePickerShowTimeTooltipType,
  NDatePickerDateCellType,
} from './src/utils/types';
