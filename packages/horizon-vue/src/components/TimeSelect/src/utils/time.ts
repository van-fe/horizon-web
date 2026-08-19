import type { CreateTimeSelectOptions as CoreCreateTimeSelectOptions } from '@aurora/core';
import {
  createTimeSelectOptions as createCoreTimeSelectOptions,
  parseTimeSelectMinutes,
  TIME_SELECT_VALUE_FORMAT,
} from '@aurora/core';
import { formatTimeSelectLabel } from '@aurora/horizon-core';

export { TIME_SELECT_VALUE_FORMAT };
export type { TimeSelectOption } from '@aurora/core';

export interface CreateTimeSelectOptions extends Omit<CoreCreateTimeSelectOptions, 'format'> {
  format: string;
}

export const parseTimeToMinutes = parseTimeSelectMinutes;

export function createTimeSelectOptions(options: CreateTimeSelectOptions) {
  return createCoreTimeSelectOptions({
    ...options,
    format: minutes => formatTimeSelectLabel(minutes, options.format),
  });
}
