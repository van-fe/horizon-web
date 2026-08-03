import { computed, reactive, shallowReactive, type ComputedRef, type SetupContext } from 'vue';
import get from 'lodash/get';
import type { TableProps } from '../composables/useProps';
import type { TableEmits } from '../composables/useEmits';
import type {
  HTableAggregationMethod,
  HTableAggregationType,
  HTableAggregations,
  HTableGroupContext,
  HTableGroupRowDataType,
  HTableTransformedRowDataType,
} from '../utils/types';
import { HTableGroupContextKey, HTableTransformedRowContextKey } from '../utils/types';

interface BuiltInAggregationState {
  type: HTableAggregationType;
  count: number;
  sum: number;
  min: number;
  max: number;
}

interface WorkingGroup {
  value: unknown;
  rows: HTableTransformedRowDataType[];
  aggregationStates: Map<string, BuiltInAggregationState>;
}

const EMPTY_VISIBLE_STATE = shallowReactive<Record<string, boolean>>({});

function createAggregationStates(entries: Array<[string, HTableAggregationType]>) {
  return new Map<string, BuiltInAggregationState>(
    entries.map(([field, type]) => [
      field,
      {
        type,
        count: 0,
        sum: 0,
        min: Infinity,
        max: -Infinity,
      },
    ]),
  );
}

function collectBuiltInAggregations(
  states: Map<string, BuiltInAggregationState>,
  row: HTableTransformedRowDataType,
) {
  states.forEach((state, field) => {
    if (state.type === 'count') return;

    const value = get(row, field);
    if (typeof value !== 'number' || !Number.isFinite(value)) return;

    state.count++;
    state.sum += value;
    if (value < state.min) state.min = value;
    if (value > state.max) state.max = value;
  });
}

function finishAggregations(
  group: WorkingGroup,
  customEntries: Array<[string, HTableAggregationMethod]>,
) {
  const aggregates: Record<string, unknown> = {};

  group.aggregationStates.forEach((state, field) => {
    if (state.type === 'count') {
      aggregates[field] = group.rows.length;
    } else if (state.count === 0) {
      aggregates[field] = undefined;
    } else if (state.type === 'sum') {
      aggregates[field] = state.sum;
    } else if (state.type === 'average') {
      aggregates[field] = state.sum / state.count;
    } else if (state.type === 'min') {
      aggregates[field] = state.min;
    } else {
      aggregates[field] = state.max;
    }
  });

  for (const [field, method] of customEntries) {
    aggregates[field] = method(
      group.rows.map(row => get(row, field)),
      group.rows,
      field,
    );
  }

  return aggregates;
}

function serializeGroupValue(value: unknown) {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }
  return String(value);
}

/**
 * 将可见数据转为可折叠的多级分组行，并计算组内聚合值。
 * @en Converts visible data into collapsible nested groups and calculates aggregates.
 */
export default function useGrouping(options: {
  props: TableProps;
  rows: ComputedRef<HTableTransformedRowDataType[]>;
  emit: SetupContext<TableEmits>['emit'];
}) {
  const expandedKeys = reactive(new Set<string>());
  const collapsedKeys = reactive(new Set<string>());
  let allGroupKeys: string[] = [];

  const controlledExpandedKeys = computed(() =>
    options.props.expandedGroupKeys ? new Set(options.props.expandedGroupKeys) : undefined,
  );

  const groupFields = computed(() => {
    if (!options.props.groupBy) return [];
    return typeof options.props.groupBy === 'function'
      ? [options.props.groupBy]
      : Array.isArray(options.props.groupBy)
        ? options.props.groupBy
        : [options.props.groupBy];
  });

  function isExpanded(key: string) {
    if (controlledExpandedKeys.value) {
      return controlledExpandedKeys.value.has(key);
    }
    return options.props.defaultExpandAllGroups ? !collapsedKeys.has(key) : expandedKeys.has(key);
  }

  function expandedGroupKeys() {
    return allGroupKeys.filter(isExpanded);
  }

  function toggleGroup(key: string) {
    const nextExpanded = !isExpanded(key);
    if (options.props.defaultExpandAllGroups) {
      if (nextExpanded) collapsedKeys.delete(key);
      else collapsedKeys.add(key);
    } else if (nextExpanded) {
      expandedKeys.add(key);
    } else {
      expandedKeys.delete(key);
    }
    const keys = allGroupKeys.filter(current =>
      current === key ? nextExpanded : isExpanded(current),
    );
    options.emit('update:expandedGroupKeys', keys);
    options.emit('groupToggle', key, nextExpanded);
  }

  const rows = computed(() => {
    if (!groupFields.value.length) {
      allGroupKeys = [];
      return options.rows.value;
    }

    const result: HTableTransformedRowDataType[] = [];
    const nextGroupKeys: string[] = [];
    const rowKeyField = options.props.rowKey;
    const aggregationEntries = Object.entries(options.props.aggregations) as Array<
      [string, HTableAggregations[string]]
    >;
    const builtInEntries = aggregationEntries.filter(
      (entry): entry is [string, HTableAggregationType] => typeof entry[1] !== 'function',
    );
    const customEntries = aggregationEntries.filter(
      (entry): entry is [string, HTableAggregationMethod] => typeof entry[1] === 'function',
    );

    const appendGroups = (
      source: HTableTransformedRowDataType[],
      level: number,
      parentPath: string[],
    ) => {
      const groupField = groupFields.value[level];
      const grouped = new Map<string, WorkingGroup>();
      source.forEach(row => {
        const value = typeof groupField === 'function' ? groupField(row) : get(row, groupField);
        const segment = serializeGroupValue(value);
        const current = grouped.get(segment) ?? {
          value,
          rows: [] as HTableTransformedRowDataType[],
          aggregationStates: createAggregationStates(builtInEntries),
        };
        current.rows.push(row);
        collectBuiltInAggregations(current.aggregationStates, row);
        grouped.set(segment, current);
      });

      grouped.forEach((group, segment) => {
        const path = [...parentPath, segment];
        const key = `group:${level}:${path.map(encodeURIComponent).join('/')}`;
        nextGroupKeys.push(key);
        const aggregates = finishAggregations(group, customEntries);
        const context: HTableGroupContext = {
          key,
          value: group.value,
          label: serializeGroupValue(group.value),
          field: typeof groupField === 'string' ? groupField : undefined,
          level,
          rows: group.rows,
          aggregates,
          expanded: isExpanded(key),
        };
        const groupRow = {
          ...aggregates,
          [HTableGroupContextKey]: context,
          [HTableTransformedRowContextKey]: {
            uuid: key,
            index: result.length,
            siblingIndex: result.length,
            visible: EMPTY_VISIBLE_STATE,
            parentUuid: null,
            level,
            isLeaf: false,
          },
        } as HTableGroupRowDataType;
        if (rowKeyField !== undefined) groupRow[rowKeyField] = key;
        result.push(groupRow);

        if (!context.expanded) return;
        if (level + 1 < groupFields.value.length) {
          appendGroups(group.rows, level + 1, path);
        } else {
          result.push(...group.rows);
        }
      });
    };

    appendGroups(options.rows.value, 0, []);
    allGroupKeys = nextGroupKeys;
    return result;
  });

  return {
    expandedGroupKeys,
    isGroupRow: (row: HTableTransformedRowDataType) => HTableGroupContextKey in row,
    rows,
    toggleGroup,
  };
}
