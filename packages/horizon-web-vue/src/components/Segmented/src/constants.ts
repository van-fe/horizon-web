import type { InjectionKey, Ref } from 'vue';
import type { HSegmentedValue } from './composables/useProps';

export interface SegmentedContext {
  activeKey: Readonly<Ref<HSegmentedValue | undefined>>;
  onClick: (key: HSegmentedValue) => void;
  createTab: (value: Readonly<Ref<HSegmentedValue>>) => (el: Element | null) => void;
}

export const contextKey: InjectionKey<SegmentedContext> = Symbol('segmentedContextKey');
