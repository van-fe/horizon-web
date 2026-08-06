import type { HTMLAttributes, ReactElement } from 'react';
import { createElement } from 'react';
import type { LocaleNumberFormatterOptions } from '@aurora/locale';
import { useLocale } from '../context';
import { mergeClassName } from './utils';

export interface NumberLocaleProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  value: number | string;
  option?: LocaleNumberFormatterOptions;
}

export function NumberLocale({
  value,
  option,
  className,
  ...props
}: NumberLocaleProps): ReactElement {
  const locale = useLocale();
  return createElement(
    'span',
    { ...props, className: mergeClassName('horizon-web-number-locale', className) },
    locale.numberService.n(Number(value), option),
  );
}
