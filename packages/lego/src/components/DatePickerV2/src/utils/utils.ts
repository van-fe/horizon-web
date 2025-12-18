import type { DatePickerV2Props } from '../composables/useProps';
import type { NDatePickerV2BaseSupportType } from './types';
import { camelCapitalCaseToKebabCase } from '@nio-fe/shared';

export function transformType<T extends DatePickerV2Props['type']>(
  type: T,
): NDatePickerV2BaseSupportType {
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
