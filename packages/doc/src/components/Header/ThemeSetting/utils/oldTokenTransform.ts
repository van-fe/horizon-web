import v1TokenTransform from './v1TokenTransform';
import v2TokenTransform from './v2TokenTransform';
import type defaultTheme from '~/config/themes/default.json';

const cacheKeyV1 = 'theme-setting';
const cacheKeyV2 = 'theme-setting-v2';
const cacheKeyV3 = 'theme-setting-v3';

export const currentCacheKey = cacheKeyV3;

export type CurrentConfigType = {
  basic: typeof defaultTheme.basic;
  element: typeof defaultTheme.element;
};

export function getLocalCacheTokens(): CurrentConfigType | null {
  const v1VersionCacheData = localStorage.getItem(cacheKeyV1);
  const v2VersionCacheData = localStorage.getItem(cacheKeyV2);
  const newVersionCacheData = localStorage.getItem(currentCacheKey);

  if (newVersionCacheData) {
    return JSON.parse(newVersionCacheData);
  } else if (v2VersionCacheData) {
    return v2TokenTransform(JSON.parse(v2VersionCacheData));
  } else if (v1VersionCacheData) {
    return v2TokenTransform(v1TokenTransform(JSON.parse(v1VersionCacheData)));
  } else {
    return null;
  }
}
