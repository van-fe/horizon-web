import type { ButtonProps } from '../composables/useProps';

export const iconSizeMapping: Record<Exclude<ButtonProps['size'], undefined>, number> = {
  mini: 12,
  small: 12,
  medium: 16,
  large: 16,
  huge: 16,
};

export const onlyIconSizeMapping: Record<Exclude<ButtonProps['size'], undefined>, number> = {
  mini: 12,
  small: 12,
  medium: 16,
  large: 24,
  huge: 32,
};
