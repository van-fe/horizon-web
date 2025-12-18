import type { InjectionKey, Ref } from 'vue';
import type { UseDndResult } from './composables/useDnd';
import type { NTabType, NTabValue } from './composables/useProps';

export interface TabsContext extends UseDndResult {
  activeKey: Readonly<Ref<NTabValue | undefined>>;
  type: Readonly<Ref<NTabType>>;
  onClick: (key: NTabValue) => void;
  onClose: (key: NTabValue) => void;
  createTab: (key: NTabValue) => (el: Element | null) => void;
  wrapperEl: Ref<HTMLElement | undefined>;
}

export const tabsContextKey: InjectionKey<TabsContext> = Symbol('tabsContextKey');
