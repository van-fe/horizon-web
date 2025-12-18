import type { DatePickerProps } from '../composables/useProps';
import type { NDatePickerBaseSupportType } from './types';
import { camelCapitalCaseToKebabCase } from '@aurora/utils';

export function transformType<T extends DatePickerProps['type']>(
  type: T,
): NDatePickerBaseSupportType {
  const kebabCaseType = camelCapitalCaseToKebabCase(type);

  switch (kebabCaseType) {
    case 'dateminutes':
      return 'date-minutes';
    case 'dateseconds':
      return 'date-seconds';
    case 'daterange':
      return 'date-range';
    case 'datetimerange':
      return 'datetime-range';
    case 'dateminutesrange':
      return 'date-minutes-range';
    case 'datesecondsrange':
      return 'date-seconds-range';
    case 'monthrange':
      return 'month-range';
    case 'yearrange':
      return 'year-range';
    default:
      return kebabCaseType;
  }
}
