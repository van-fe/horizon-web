import type { WatermarkOptions } from '../composables/useOptions';

export function transOptions(
  value: string | string[] | Partial<WatermarkOptions>,
): Partial<WatermarkOptions> {
  if (typeof value === 'string' || Array.isArray(value)) {
    return { content: value };
  }
  return value;
}
