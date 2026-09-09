import type { TagProps } from '../composables/useProps';

export const avatarSizeMapping: Record<Exclude<TagProps['size'], undefined>, number> = {
  small: 14,
  medium: 16,
  large: 24,
};

export const iconSizeMapping: Record<Exclude<TagProps['size'], undefined>, number> = {
  small: 12,
  medium: 12,
  large: 16,
};
