import type { ReactNode } from 'react';
import { Children, isValidElement } from 'react';

export function getReactText(node: ReactNode): string {
  return Children.toArray(node)
    .map(child => {
      if (typeof child === 'string' || typeof child === 'number') return String(child);
      if (isValidElement<{ children?: ReactNode }>(child))
        return getReactText(child.props.children);
      return '';
    })
    .join('');
}
