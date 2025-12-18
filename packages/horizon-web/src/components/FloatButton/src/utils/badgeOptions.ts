import type { FloatButtonProps } from '~/components/FloatButton/src/composables/useProps';
import type { BadgeProps } from '~/components/Badge/src/composables/useProps';

export function getBadgeDefaultOption(
  badgeProp: FloatButtonProps['badge'],
  shape: FloatButtonProps['shape'],
  hasIcon: boolean,
  hasDescription: boolean,
) {
  let align: BadgeProps['align'] | undefined = undefined;
  let top = 0;
  let right = 0;

  switch (shape) {
    case 'circle':
      top += 3;
      right += 3;

      if (typeof badgeProp === 'boolean' || !badgeProp?.type || badgeProp.type === 'dot') {
        top += 2;
        right += 2;
      } else {
        if ((hasIcon || hasDescription) && !(hasIcon && hasDescription)) {
          align = 'fix-left';
        }
      }

      break;
    case 'square':
      break;
  }

  return {
    align,
    offset: { top: `${top}px`, right: `${right}px` },
    ...(typeof badgeProp === 'boolean' ? {} : badgeProp),
  };
}
