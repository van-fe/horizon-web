export const TIME_SELECT_VALUE_FORMAT = 'HH:mm';

export interface TimeSelectOption {
  value: string;
  label: string;
  disabled: boolean;
}

export interface CreateTimeSelectOptions {
  start: string;
  end: string;
  step: string;
  includeEndTime: boolean;
  minTime?: string;
  maxTime?: string;
  format?: (minutes: number) => string;
}

export function parseTimeSelectMinutes(value: string | undefined): number | undefined {
  if (!value || !/^\d{2}:\d{2}$/.test(value)) return undefined;
  const [hours, minutes] = value.split(':').map(Number);
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return undefined;
  return hours * 60 + minutes;
}

export function formatTimeSelectValue(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const minute = minutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

export function createTimeSelectOptions({
  start,
  end,
  step,
  includeEndTime,
  minTime,
  maxTime,
  format = formatTimeSelectValue,
}: CreateTimeSelectOptions): TimeSelectOption[] {
  const startMinutes = parseTimeSelectMinutes(start);
  const endMinutes = parseTimeSelectMinutes(end);
  const stepMinutes = parseTimeSelectMinutes(step);
  const minMinutes = parseTimeSelectMinutes(minTime);
  const maxMinutes = parseTimeSelectMinutes(maxTime);
  if (
    startMinutes === undefined ||
    endMinutes === undefined ||
    stepMinutes === undefined ||
    stepMinutes <= 0 ||
    startMinutes > endMinutes
  )
    return [];

  const values: number[] = [];
  for (let current = startMinutes; current < endMinutes; current += stepMinutes)
    values.push(current);
  if (includeEndTime && values.at(-1) !== endMinutes) values.push(endMinutes);

  return values.map(minutes => ({
    value: formatTimeSelectValue(minutes),
    label: format(minutes),
    disabled:
      (minMinutes !== undefined && minutes < minMinutes) ||
      (maxMinutes !== undefined && minutes > maxMinutes),
  }));
}
