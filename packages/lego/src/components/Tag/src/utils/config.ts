import type { TagProps } from '../composables/useProps';

export const builtinColorMapping: Record<string, string> = {
  brand: '#00B3BE',
  indigo: '#2F54EB',
  purple: '#722ED1',
  magenta: '#EB2F96',
  orange: '#FF772E',
};

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
