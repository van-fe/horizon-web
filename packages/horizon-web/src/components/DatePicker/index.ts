import { default as DatePicker } from './src/DatePicker';
import { withInstall } from '@aurora/utils';

export const HDatePicker = withInstall(DatePicker);
export default HDatePicker;

export type {
  HDatePickerBaseSupportType,
  HDatePickerTypeFormat,
  HDatePickerSupportType,
  HDatePickerAccessDatetimeType,
  HDatePickerDisabledDateMethodType,
  HDatePickerDisabledTimeMethodType,
  HDatePickerShowDotType,
  HDatePickerShortcutsType,
  HDatePickerShowDateTooltipType,
  HDatePickerShowTimeTooltipType,
  HDatePickerDateCellType,
} from './src/utils/types';
