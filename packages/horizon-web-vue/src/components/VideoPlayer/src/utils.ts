import type { Source } from './composables/useProps';

export function formatVideoTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '00:00';
  const wholeSeconds = Math.floor(seconds);
  const hours = Math.floor(wholeSeconds / 3600);
  const minutes = Math.floor((wholeSeconds % 3600) / 60);
  const rest = wholeSeconds % 60;
  return hours > 0
    ? `${hours}:${String(minutes).padStart(2, '0')}:${String(rest).padStart(2, '0')}`
    : `${String(minutes).padStart(2, '0')}:${String(rest).padStart(2, '0')}`;
}

export function getVideoSourceLabel(source: Source, index: number, sourceText: string) {
  return source.label || source.quality || `${sourceText} ${index + 1}`;
}
