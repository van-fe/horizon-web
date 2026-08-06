import type { HTMLAttributes, ReactElement } from 'react';
import { createElement } from 'react';
import type { LocaleDirection } from '../direction';
import { useLocaleDirection } from '../direction';
import { mergeClassName } from './utils';

export interface ReadDirectionProps extends HTMLAttributes<HTMLSpanElement> {
  direction?: LocaleDirection;
}

export function ReadDirection({
  direction,
  className,
  children,
  ...props
}: ReadDirectionProps): ReactElement {
  const localeDirection = useLocaleDirection();
  return createElement(
    'span',
    {
      ...props,
      className: mergeClassName('horizon-web-read-direction', className),
      dir: direction ?? localeDirection,
    },
    children,
  );
}
