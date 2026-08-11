import dayjs from '~/utils/useDayJs';

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
  format: string;
  includeEndTime: boolean;
  minTime?: string;
  maxTime?: string;
}

export function parseTimeToMinutes(value: string | undefined): number | undefined {
  if (!value || !/^\d{2}:\d{2}$/.test(value)) return undefined;

  const [hours, minutes] = value.split(':').map(Number);
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return undefined;

  return hours * 60 + minutes;
}

function minutesToValue(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const minute = minutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

function formatTime(minutes: number, format: string): string {
  return dayjs().startOf('day').add(minutes, 'minute').format(format);
}

export function createTimeSelectOptions({
  start,
  end,
  step,
  format,
  includeEndTime,
  minTime,
  maxTime,
}: CreateTimeSelectOptions): TimeSelectOption[] {
  const startMinutes = parseTimeToMinutes(start);
  const endMinutes = parseTimeToMinutes(end);
  const stepMinutes = parseTimeToMinutes(step);
  const minMinutes = parseTimeToMinutes(minTime);
  const maxMinutes = parseTimeToMinutes(maxTime);

  if (
    startMinutes === undefined ||
    endMinutes === undefined ||
    stepMinutes === undefined ||
    stepMinutes <= 0 ||
    startMinutes > endMinutes
  ) {
    return [];
  }

  const values: number[] = [];
  for (let current = startMinutes; current < endMinutes; current += stepMinutes) {
    values.push(current);
  }

  if (includeEndTime && values.at(-1) !== endMinutes) {
    values.push(endMinutes);
  }

  return values.map(minutes => ({
    value: minutesToValue(minutes),
    label: formatTime(minutes, format),
    disabled:
      (minMinutes !== undefined && minutes < minMinutes) ||
      (maxMinutes !== undefined && minutes > maxMinutes),
  }));
}
