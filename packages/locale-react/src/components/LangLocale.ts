import type { HTMLAttributes, ReactElement } from 'react';
import { createElement } from 'react';
import type { LocaleSupportLang } from '@aurora/locale';
import { useLocale } from '../context';
import { mergeClassName } from './utils';

export interface LangLocaleProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  value: string;
  lang?: LocaleSupportLang;
}

export function LangLocale({ value, lang, className, ...props }: LangLocaleProps): ReactElement {
  const locale = useLocale();
  return createElement(
    'span',
    { ...props, className: mergeClassName('horizon-web-lang-locale', className) },
    locale.langService.t(value, lang),
  );
}
