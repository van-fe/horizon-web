import { resolveFloatButtonBadgeLayout } from '@aurora/core';
import type { BadgeProps } from '~/components/Badge/src/composables/useProps';
import type { FloatButtonProps } from '~/components/FloatButton/src/composables/useProps';

export function getBadgeDefaultOption(
  badgeProp: FloatButtonProps['badge'],
  shape: FloatButtonProps['shape'],
  hasIcon: boolean,
  hasDescription: boolean,
) {
  const layout = resolveFloatButtonBadgeLayout(badgeProp, shape, hasIcon, hasDescription);
  return {
    align: layout.align as BadgeProps['align'] | undefined,
    offset: { top: `${layout.top}px`, right: `${layout.right}px` },
    ...(typeof badgeProp === 'boolean' ? {} : badgeProp),
  };
}
