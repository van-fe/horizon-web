import type {
  DescriptionBreakpoint,
  DescriptionLabelPosition,
  DescriptionType,
} from '@aurora/core';
import type { InjectionKey, Ref } from 'vue';

export interface DescriptionsContext {
  type: Ref<DescriptionType>;
  labelPosition: Ref<DescriptionLabelPosition>;
  labelWidth: Ref<string>;
  width: Ref<number | undefined>;
  breakpoint: Ref<DescriptionBreakpoint | undefined>;
  labelClass: Ref<string | undefined>;
  valueClass: Ref<string | undefined>;
  reportLabelWidth(id: symbol, width?: number): void;
}

export const DESCRIPTIONS_CONTEXT = Symbol('HDescriptions') as InjectionKey<DescriptionsContext>;
