import type {
  AdaptComponentApiShape,
  ComponentEventValidators,
  TabEventMap,
  TabsEventMap,
  TabsKey,
} from '@aurora/core';
import { isTabsKey } from '@aurora/core';

type TabsVueEventMap = AdaptComponentApiShape<
  TabsEventMap,
  {},
  never,
  { 'update:activeKey': [key: TabsKey] }
>;

export const useTabsEmits = {
  'update:activeKey': (key: TabsKey) => isTabsKey(key),
  change: (key: TabsKey) => isTabsKey(key),
  add: () => true,
  close: (key: TabsKey | undefined) => key === undefined || isTabsKey(key),
  sort: (current: number, target: number, keys: readonly TabsKey[]) =>
    Number.isInteger(current) &&
    Number.isInteger(target) &&
    Array.isArray(keys) &&
    keys.every(isTabsKey),
} satisfies ComponentEventValidators<TabsVueEventMap>;

export const useTabEmits = {
  click: (key: TabsKey) => isTabsKey(key),
  close: (key: TabsKey) => isTabsKey(key),
} satisfies ComponentEventValidators<TabEventMap>;

export type TabsEmits = typeof useTabsEmits;
export type TabEmits = typeof useTabEmits;
