import type { ReactElement } from 'react';
import { ComponentClassBlock } from '@aurora/theme';

export function LoadingIcon({ namespace }: { namespace: string }): ReactElement {
  const classHelper = new ComponentClassBlock('loading-icon', namespace.toLowerCase());
  return (
    <svg
      aria-hidden="true"
      className={`${classHelper.block} ${namespace.toLowerCase()}-button__loading-icon`}
      focusable="false"
      viewBox="25 25 50 50"
    >
      <circle
        className={classHelper.e('path')}
        cx="50"
        cy="50"
        fill="none"
        r="20"
        strokeWidth="4.8"
      />
    </svg>
  );
}
