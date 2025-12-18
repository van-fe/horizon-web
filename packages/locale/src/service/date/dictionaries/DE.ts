import { DateLocaleAvailableShownType } from '../../../config';

export default {
  [DateLocaleAvailableShownType.SHORT]: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  },
  [DateLocaleAvailableShownType.LONG]: {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hour12: 'short',
  },
  [DateLocaleAvailableShownType.SHORT_TIME]: {
    hour: 'numeric',
    minute: 'numeric',
    hour12: 'short',
  },
  [DateLocaleAvailableShownType.LONG_TIME]: {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: 'short',
  },
};
