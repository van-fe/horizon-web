/** Resolves whether a controlled Tag can be activated by user interaction. */
export function canActivateTag(options: {
  active?: boolean;
  clickable?: boolean;
  disabled?: boolean;
}): boolean {
  return !options.disabled && (options.clickable !== false || typeof options.active === 'boolean');
}

/** Produces the controlled activation proposal without mutating renderer state. */
export function toggleTagActive(active: boolean | undefined): boolean | undefined {
  return typeof active === 'boolean' ? !active : undefined;
}

/** Normalizes a minimum visible count to the current item range. */
export function normalizeTagVisibleCount(value: number, itemCount: number): number {
  if (itemCount <= 0) return 0;
  if (!Number.isFinite(value)) return itemCount;
  return Math.max(0, Math.min(itemCount, Math.trunc(value)));
}
