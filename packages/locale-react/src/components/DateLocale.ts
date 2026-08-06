import type { HTMLAttributes, ReactElement } from 'react';
import { createElement } from 'react';
import type { DateLocaleAvailableShownType } from '@aurora/locale';
import { useLocale } from '../context';
import { mergeClassName } from './utils';

export interface DateLocaleProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  value: string | number | Date;
  type: DateLocaleAvailableShownType;
}

export function DateLocale({ value, type, className, ...props }: DateLocaleProps): ReactElement {
  const locale = useLocale();
  return createElement(
    'span',
    { ...props, className: mergeClassName('horizon-web-date-locale', className) },
    locale.dateService.d(value, type),
  );
}
