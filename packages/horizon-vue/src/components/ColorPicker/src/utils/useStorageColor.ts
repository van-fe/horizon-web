import type { RemovableRef } from '@vueuse/core';
import { useLocalStorage } from '@vueuse/core';

const recentlyColors = useLocalStorage<string[]>('color-picker-recently-colors', []);
const customStoredColors = useLocalStorage<string[]>('color-picker-custom-stored-colors', []);

export function getRecentlyColors(): RemovableRef<string[]> {
  return recentlyColors;
}

export function recordRecentlyColor(color: string) {
  const index = recentlyColors.value.indexOf(color);
  if (index >= 0) {
    recentlyColors.value.splice(index, 1);
  }

  if (recentlyColors.value.length >= 10) {
    recentlyColors.value.pop();
  }

  recentlyColors.value.unshift(color);
}

export function getCustomStoredColors(): RemovableRef<string[]> {
  return customStoredColors;
}

export function recordCustomStoredColor(color: string) {
  const index = customStoredColors.value.indexOf(color);
  if (index >= 0) {
    customStoredColors.value.splice(index, 1);
  }

  if (customStoredColors.value.length >= 40) {
    customStoredColors.value.pop();
  }

  customStoredColors.value.unshift(color);
}

export function removeCustomStoredColor(color: string) {
  const index = customStoredColors.value.indexOf(color);
  if (index >= 0) {
    customStoredColors.value.splice(index, 1);
  }
}
