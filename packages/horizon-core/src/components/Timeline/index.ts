import { normalizeTimelineTimestamp } from '@aurora/core';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat.js';
import 'dayjs/locale/de.js';
import 'dayjs/locale/en.js';
import 'dayjs/locale/en-sg.js';
import 'dayjs/locale/nb.js';
import 'dayjs/locale/sv.js';
import 'dayjs/locale/zh-cn.js';
import 'dayjs/locale/zh-tw.js';

dayjs.extend(advancedFormat);

const TIMELINE_DAYJS_LOCALES: Readonly<Record<string, string>> = Object.freeze({
  de: 'de',
  'de-de': 'de',
  en: 'en',
  'en-gb': 'en',
  'en-sg': 'en-sg',
  'en-us': 'en',
  nb: 'nb',
  'nb-no': 'nb',
  no: 'nb',
  sv: 'sv',
  'sv-se': 'sv',
  'zh-cn': 'zh-cn',
  'zh-tw': 'zh-tw',
});

export interface FormatTimelineTimestampOptions {
  format: string;
  locale?: string;
}

/** Formats a normalized timeline timestamp with the Horizon Web Day.js token contract. */
export function formatTimelineTimestamp(
  value: unknown,
  { format, locale = 'en' }: FormatTimelineTimestampOptions,
): string | undefined {
  const date = normalizeTimelineTimestamp(value);
  const dayjsLocale = TIMELINE_DAYJS_LOCALES[locale.toLowerCase()] ?? 'en';
  if (!date) {
    const supportedInput =
      value instanceof Date || typeof value === 'string' || typeof value === 'number';
    return supportedInput
      ? dayjs(new Date(Number.NaN)).locale(dayjsLocale).format(format)
      : undefined;
  }
  return dayjs(date).locale(dayjsLocale).format(format);
}

export interface ApplyTimelineFoldVisibilityOptions {
  hidden: boolean;
  indexes: readonly number[];
  items: readonly HTMLElement[];
  ownerId: string;
}

/** Applies an owning fold marker without stealing items hidden by another fold control. */
export function applyTimelineFoldVisibility({
  hidden,
  indexes,
  items,
  ownerId,
}: ApplyTimelineFoldVisibilityOptions): void {
  for (const index of indexes) {
    const item = items[index];
    if (!item) continue;

    if (hidden) {
      item.classList.add('hidden');
      if (item.dataset.hiddenUid === undefined) {
        item.dataset.hiddenUid = ownerId;
      }
    } else if (item.dataset.hiddenUid === ownerId) {
      item.classList.remove('hidden');
      delete item.dataset.hiddenUid;
    }
  }
}
