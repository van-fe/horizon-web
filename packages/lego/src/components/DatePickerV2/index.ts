import { default as DatePickerV2 } from './src/DatePickerV2';
import { withInstall } from '@nio-fe/shared';

export const NDatePickerV2 = withInstall(DatePickerV2);
export default NDatePickerV2;

export type {
  NDatePickerV2BaseSupportType,
  NDatePickerV2TypeFormat,
  NDatePickerV2SupportType,
  NDatePickerV2AccessDatetimeType,
  NDatePickerV2DisabledDateMethodType,
  NDatePickerV2DisabledTimeMethodType,
  NDatePickerV2ShowDotType,
  NDatePickerV2ShortcutsType,
  NDatePickerV2ShowDateTooltipType,
  NDatePickerV2ShowTimeTooltipType,
  NDatePickerV2DateCellType,
} from './src/utils/types';
