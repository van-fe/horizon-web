import type { InjectionKey, Ref } from 'vue';
import type { SegmentedValue } from '@aurora/core';

export interface SegmentedContext {
  activeKey: Readonly<Ref<SegmentedValue | undefined>>;
  onClick: (key: SegmentedValue) => void;
  createTab: (value: Readonly<Ref<SegmentedValue>>) => (el: Element | null) => void;
}

export const contextKey: InjectionKey<SegmentedContext> = Symbol('segmentedContextKey');
