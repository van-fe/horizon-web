import type { CSSProperties, ReactElement } from 'react';
import { cls, ComponentClassBlock } from '@aurora/theme';

export interface LoadingIconProps {
  namespace: string;
  className?: string;
  size?: number;
}

export function LoadingIcon({ namespace, className, size }: LoadingIconProps): ReactElement {
  const classHelper = new ComponentClassBlock('loading-icon', namespace.toLowerCase());
  const style: CSSProperties | undefined = size ? { width: size, height: size } : undefined;

  return (
    <svg
      aria-hidden="true"
      className={cls(classHelper.block, className)}
      focusable="false"
      style={style}
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
