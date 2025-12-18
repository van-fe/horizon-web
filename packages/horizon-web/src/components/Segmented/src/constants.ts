import type { InjectionKey, Ref } from 'vue';
import type { NSegmentedValue } from './composables/useProps';

export interface SegmentedContext {
  activeKey: Readonly<Ref<NSegmentedValue | undefined>>;
  onClick: (key: NSegmentedValue) => void;
  createTab: (key: NSegmentedValue) => (el: Element | null) => void;
}

export const contextKey: InjectionKey<SegmentedContext> = Symbol('segmentedContextKey');
