import type { AutoCompleteOption, AutoCompleteValue } from './contract';

export interface ResolvedAutoCompleteOption<
  Description = unknown,
> extends AutoCompleteOption<Description> {
  id: string;
  value: string;
}

export interface AutoCompleteNavigationResult {
  index: number;
  reachedEnd: boolean;
}

export function normalizeAutoCompleteValue(value: AutoCompleteValue): string {
  return value ?? '';
}

/** Duplicate labels retain their first position and use the last supplied data. */
export function normalizeAutoCompleteOptions<Description>(
  options: readonly AutoCompleteOption<Description>[],
  idPrefix = 'auto-complete-option',
): ResolvedAutoCompleteOption<Description>[] {
  const labels = new Map<string, AutoCompleteOption<Description>>();
  options.forEach(option => labels.set(option.label, option));
  return Array.from(labels.values(), (option, index) => ({
    ...option,
    id: `${idPrefix}-${index}`,
    value: option.value ?? option.label,
  }));
}

export function orderAutoCompleteOptions<Description>(
  options: readonly ResolvedAutoCompleteOption<Description>[],
  selectedValue: AutoCompleteValue,
  moveSelectedToTop: boolean,
): ResolvedAutoCompleteOption<Description>[] {
  if (!moveSelectedToTop || selectedValue == null) return [...options];
  const selectedIndex = options.findIndex(option => option.value === selectedValue);
  if (selectedIndex <= 0) return [...options];
  return [
    options[selectedIndex],
    ...options.slice(0, selectedIndex),
    ...options.slice(selectedIndex + 1),
  ];
}

export function resolveAutoCompleteNavigation(
  optionCount: number,
  currentIndex: number,
  direction: 1 | -1,
): AutoCompleteNavigationResult {
  if (optionCount <= 0) return { index: -1, reachedEnd: direction === 1 };
  const intended = currentIndex + direction;
  return {
    index: Math.min(Math.max(intended, 0), optionCount - 1),
    reachedEnd: direction === 1 && intended > optionCount - 1,
  };
}

export function resolveAutoCompleteOptionHeight(descriptionPosition: 'right' | 'bottom'): number {
  return descriptionPosition === 'bottom' ? 57 : 40;
}
