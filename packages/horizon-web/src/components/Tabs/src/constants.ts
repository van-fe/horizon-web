import type { InjectionKey, Ref } from 'vue';
import type { UseDndResult } from './composables/useDnd';
import type { HTabType, HTabValue } from './composables/useProps';

export interface TabsContext extends UseDndResult {
  activeKey: Readonly<Ref<HTabValue | undefined>>;
  type: Readonly<Ref<HTabType>>;
  onClick: (key: HTabValue) => void;
  onClose: (key: HTabValue) => void;
  createTab: (key: HTabValue) => (el: Element | null) => void;
  wrapperEl: Ref<HTMLElement | undefined>;
}

export const tabsContextKey: InjectionKey<TabsContext> = Symbol('tabsContextKey');
