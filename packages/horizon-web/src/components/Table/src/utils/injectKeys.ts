import type { HorizonWebSetupContext } from '@aurora/utils';
import { generatorInjectedKeyName } from '@aurora/utils';
import type { ComputedRef, InjectionKey, UnwrapNestedRefs, Ref } from 'vue';
import type { TableProps } from '../composables/useProps';
import type { TableEmits } from '../composables/useEmits';
import type { TableSlots } from '../composables/useSlots';
import type {
  HTableColumnData,
  HTableFixedValue,
  HTableInsertedColumnData,
  HTableRowDataType,
  HTableRowKeyType,
  HTableSortOrderEnum,
  HTableTransformedRowDataType,
} from './types';
import type { JSX } from 'vue/jsx-runtime';

export const HTablePropsInjectKey = Symbol(
  generatorInjectedKeyName('table', 'props'),
) as InjectionKey<TableProps>;

export const HTableEmitsInjectKey = Symbol(
  generatorInjectedKeyName('table', 'emits'),
) as InjectionKey<HorizonWebSetupContext<TableEmits>['emit']>;

export const HTableSlotsInjectKey = Symbol(
  generatorInjectedKeyName('table', 'slots'),
) as InjectionKey<HorizonWebSetupContext<{}, TableSlots>['slots']>;

export const HTableSizeInjectKey = Symbol(
  generatorInjectedKeyName('table', 'size'),
) as InjectionKey<ComputedRef<Exclude<TableProps['size'], undefined>>>;

export const HTableExpandedNodesUuidInjectKey = Symbol(
  generatorInjectedKeyName('table', 'expanded-nodes-uuid'),
) as InjectionKey<UnwrapNestedRefs<Set<string | number>>>;

export const HTableExpandedRowsInjectKey = Symbol(
  generatorInjectedKeyName('table', 'expanded-rows'),
) as InjectionKey<Ref<Set<HTableRowKeyType>>>;

export const HTableColumnIncreaseCollectionInjectKey = Symbol(
  generatorInjectedKeyName('table', 'column-increase-collection'),
) as InjectionKey<(column: HTableInsertedColumnData) => void>;

export const HTableColumnDecreaseCollectionInjectKey = Symbol(
  generatorInjectedKeyName('table', 'column-decrease-collection'),
) as InjectionKey<(uuid: string) => void>;

export const HTableColumnAnalysisInjectKey = Symbol(
  generatorInjectedKeyName('table', 'column-analysis'),
) as InjectionKey<Ref<{ columnGroups: HTableColumnData[][]; flattenColumns: HTableColumnData[] }>>;

export const HTableFlattenDataInjectKey = Symbol.for(
  generatorInjectedKeyName('table', 'flatten-data'),
) as InjectionKey<Ref<HTableTransformedRowDataType[]>>;

export const HTableCurrentSortsInjectKey = Symbol.for(
  generatorInjectedKeyName('table', 'current-sorts'),
) as InjectionKey<Ref<Map<HTableColumnData, HTableSortOrderEnum>>>;

export const HTableSetSortInjectKey = Symbol.for(
  generatorInjectedKeyName('table', 'set-sort'),
) as InjectionKey<
  (
    column: HTableColumnData,
    sortOrder?: HTableSortOrderEnum | false,
    multiFunctionKeyPressed?: boolean,
  ) => void
>;

export const HTableSortRowInjectKey = Symbol.for(
  generatorInjectedKeyName('table', 'sort-row'),
) as InjectionKey<(a: HTableTransformedRowDataType, b: HTableTransformedRowDataType) => number>;

export const HTableScrollbarTrackSpacingInjectKey = Symbol.for(
  generatorInjectedKeyName('table', 'scrollbar-track-spacing'),
) as InjectionKey<Ref<[[number, number], [number, number]]>>;

export const HTableSetChildrenByRowKeyValueInjectKey = Symbol.for(
  generatorInjectedKeyName('table', 'set-children-by-row-key-value'),
) as InjectionKey<(rowKeyValue: any, childrenData: HTableRowDataType[]) => void>;

export const HTableFieldMapFormattedInjectKey = Symbol.for(
  generatorInjectedKeyName('table', 'field-map-formatted'),
) as InjectionKey<ComputedRef<Record<'children' | 'isLeaf', string>>>;

export const HTableFooterRowHeightInjectKey = Symbol.for(
  generatorInjectedKeyName('table', 'footer-row-height'),
) as InjectionKey<Ref<number[]>>;

export const HTableRefreshLayoutInjectKey = Symbol.for(
  generatorInjectedKeyName('table', 'refresh-layout'),
) as InjectionKey<() => void>;

export const HTableUseHeaderResizerPluginInjectKey = Symbol.for(
  generatorInjectedKeyName('table', 'use-header-resizer-plugin'),
) as InjectionKey<(column: HTableColumnData, showDivider: boolean) => JSX.Element>;

export const HTableGetLastFixedLeftColumnInjectKey = Symbol.for(
  generatorInjectedKeyName('table', 'get-last-fixed-left-column'),
) as InjectionKey<() => null | HTableColumnData>;

export const HTableGetLastFixedRightColumnInjectKey = Symbol.for(
  generatorInjectedKeyName('table', 'get-last-fixed-right-column'),
) as InjectionKey<() => null | HTableColumnData>;

export const HTableIsColumnsHaveFixedInjectKey = Symbol.for(
  generatorInjectedKeyName('table', 'is-columns-have-fixed'),
) as InjectionKey<ComputedRef<boolean>>;

export const HTableGetColumnFixedStateInjectKey = Symbol.for(
  generatorInjectedKeyName('table', 'get-column-fixed-state'),
) as InjectionKey<(uuid: string, checkStore?: Map<string, HTableFixedValue>) => HTableFixedValue>;

export const HTableScrollWrapInjectKey = Symbol.for(
  generatorInjectedKeyName('table', 'scroll-wrap'),
) as InjectionKey<ComputedRef<HTMLElement | undefined>>;
