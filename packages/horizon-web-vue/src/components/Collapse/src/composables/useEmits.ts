import type {
  AdaptComponentApiShape,
  CollapseEventMap,
  CollapseValue,
  ComponentEventValidators,
} from '@aurora/core';
import { isCollapseValue } from '@aurora/core';

type CollapseVueEventMap = AdaptComponentApiShape<
  CollapseEventMap,
  {},
  never,
  { 'update:activeKey': [value: CollapseValue] }
>;

export const useCollapseEmits = {
  /** 展开项变化。 @en Expanded panels changed. */
  change: isCollapseValue,
  /** 更新绑定展开项。 @en Updates the bound expanded panels. */
  'update:activeKey': isCollapseValue,
} satisfies ComponentEventValidators<CollapseVueEventMap>;

export type CollapseEmits = typeof useCollapseEmits;
