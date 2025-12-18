import type { LegoSetupContext } from '@aurora/utils';
import { generatorInjectedKeyName } from '@aurora/utils';
import type { ComputedRef, InjectionKey, UnwrapNestedRefs, Ref } from 'vue';
import type { TableProps } from '../composables/useProps';
import type { TableEmits } from '../composables/useEmits';
import type { TableSlots } from '../composables/useSlots';
import type {
  NTableColumnData,
  NTableFixedValue,
  NTableInsertedColumnData,
  NTableRowDataType,
  NTableSortOrderEnum,
  NTableTransformedRowDataType,
} from './types';
import type { JSX } from 'vue/jsx-runtime';

export const NTablePropsInjectKey = Symbol(
  generatorInjectedKeyName('table', 'props'),
) as InjectionKey<TableProps>;

export const NTableEmitsInjectKey = Symbol(
  generatorInjectedKeyName('table', 'emits'),
) as InjectionKey<LegoSetupContext<TableEmits>['emit']>;

export const NTableSlotsInjectKey = Symbol(
  generatorInjectedKeyName('table', 'slots'),
) as InjectionKey<LegoSetupContext<{}, TableSlots>['slots']>;

export const NTableSizeInjectKey = Symbol(
  generatorInjectedKeyName('table', 'size'),
) as InjectionKey<ComputedRef<Exclude<TableProps['size'], undefined>>>;

export const NTableExpandedNodesUuidInjectKey = Symbol(
  generatorInjectedKeyName('table', 'expanded-nodes-uuid'),
) as InjectionKey<UnwrapNestedRefs<Set<string | number>>>;

export const NTableColumnIncreaseCollectionInjectKey = Symbol(
  generatorInjectedKeyName('table', 'column-increase-collection'),
) as InjectionKey<(column: NTableInsertedColumnData) => void>;

export const NTableColumnDecreaseCollectionInjectKey = Symbol(
  generatorInjectedKeyName('table', 'column-decrease-collection'),
) as InjectionKey<(uuid: string) => void>;

export const NTableColumnAnalysisInjectKey = Symbol(
  generatorInjectedKeyName('table', 'column-analysis'),
) as InjectionKey<Ref<{ columnGroups: NTableColumnData[][]; flattenColumns: NTableColumnData[] }>>;

export const NTableFlattenDataInjectKey = Symbol.for(
  generatorInjectedKeyName('table', 'flatten-data'),
) as InjectionKey<Ref<NTableTransformedRowDataType[]>>;

export const NTableCurrentSortsInjectKey = Symbol.for(
  generatorInjectedKeyName('table', 'current-sorts'),
) as InjectionKey<Ref<Map<NTableColumnData, NTableSortOrderEnum>>>;

export const NTableSetSortInjectKey = Symbol.for(
  generatorInjectedKeyName('table', 'set-sort'),
) as InjectionKey<
  (
    column: NTableColumnData,
    sortOrder?: NTableSortOrderEnum | false,
    multiFunctionKeyPressed?: boolean,
  ) => void
>;

export const NTableSortRowInjectKey = Symbol.for(
  generatorInjectedKeyName('table', 'sort-row'),
) as InjectionKey<(a: NTableTransformedRowDataType, b: NTableTransformedRowDataType) => number>;

export const NTableScrollbarTrackSpacingInjectKey = Symbol.for(
  generatorInjectedKeyName('table', 'scrollbar-track-spacing'),
) as InjectionKey<Ref<[[number, number], [number, number]]>>;

export const NTableSetChildrenByRowKeyValueInjectKey = Symbol.for(
  generatorInjectedKeyName('table', 'set-children-by-row-key-value'),
) as InjectionKey<(rowKeyValue: any, childrenData: NTableRowDataType[]) => void>;

export const NTableFieldMapFormattedInjectKey = Symbol.for(
  generatorInjectedKeyName('table', 'field-map-formatted'),
) as InjectionKey<ComputedRef<Record<'children' | 'isLeaf', string>>>;

export const NTableFooterRowHeightInjectKey = Symbol.for(
  generatorInjectedKeyName('table', 'footer-row-height'),
) as InjectionKey<Ref<number[]>>;

export const NTableRefreshLayoutInjectKey = Symbol.for(
  generatorInjectedKeyName('table', 'refresh-layout'),
) as InjectionKey<() => void>;

export const NTableUseHeaderResizerPluginInjectKey = Symbol.for(
  generatorInjectedKeyName('table', 'use-header-resizer-plugin'),
) as InjectionKey<(column: NTableColumnData, showDivider: boolean) => JSX.Element>;

export const NTableGetLastFixedLeftColumnInjectKey = Symbol.for(
  generatorInjectedKeyName('table', 'get-last-fixed-left-column'),
) as InjectionKey<() => null | NTableColumnData>;

export const NTableGetLastFixedRightColumnInjectKey = Symbol.for(
  generatorInjectedKeyName('table', 'get-last-fixed-right-column'),
) as InjectionKey<() => null | NTableColumnData>;

export const NTableIsColumnsHaveFixedInjectKey = Symbol.for(
  generatorInjectedKeyName('table', 'is-columns-have-fixed'),
) as InjectionKey<ComputedRef<boolean>>;

export const NTableGetColumnFixedStateInjectKey = Symbol.for(
  generatorInjectedKeyName('table', 'get-column-fixed-state'),
) as InjectionKey<(uuid: string, checkStore?: Map<string, NTableFixedValue>) => NTableFixedValue>;
