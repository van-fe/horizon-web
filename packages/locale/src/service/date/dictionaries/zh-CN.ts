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
  },
  [DateLocaleAvailableShownType.SHORT_TIME]: {
    hour: 'numeric',
    minute: 'numeric',
  },
  [DateLocaleAvailableShownType.LONG_TIME]: {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  },
};
