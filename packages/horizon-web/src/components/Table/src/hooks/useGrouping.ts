import { computed, reactive, type ComputedRef, type SetupContext } from 'vue';
import get from 'lodash/get';
import type { TableProps } from '../composables/useProps';
import type { TableEmits } from '../composables/useEmits';
import type {
  HTableAggregationMethod,
  HTableAggregationType,
  HTableGroupContext,
  HTableGroupRowDataType,
  HTableTransformedRowDataType,
} from '../utils/types';
import { HTableGroupContextKey, HTableTransformedRowContextKey } from '../utils/types';

function aggregate(
  type: HTableAggregationType | HTableAggregationMethod,
  rows: HTableTransformedRowDataType[],
  field: string,
) {
  const values = rows.map(row => get(row, field));
  if (typeof type === 'function') return type(values, rows, field);
  if (type === 'count') return rows.length;

  const numbers = values.filter(value => typeof value === 'number' && Number.isFinite(value));
  if (!numbers.length) return undefined;
  if (type === 'sum') return numbers.reduce((total, value) => total + value, 0);
  if (type === 'average') {
    return numbers.reduce((total, value) => total + value, 0) / numbers.length;
  }
  if (type === 'min') return Math.min(...numbers);
  return Math.max(...numbers);
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

  const groupFields = computed(() => {
    if (!options.props.groupBy) return [];
    return typeof options.props.groupBy === 'function'
      ? [options.props.groupBy]
      : Array.isArray(options.props.groupBy)
        ? options.props.groupBy
        : [options.props.groupBy];
  });

  function isExpanded(key: string) {
    if (options.props.expandedGroupKeys) {
      return options.props.expandedGroupKeys.includes(key);
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

    const appendGroups = (
      source: HTableTransformedRowDataType[],
      level: number,
      parentPath: string[],
    ) => {
      const groupField = groupFields.value[level];
      const grouped = new Map<string, { value: unknown; rows: HTableTransformedRowDataType[] }>();
      source.forEach(row => {
        const value = typeof groupField === 'function' ? groupField(row) : get(row, groupField);
        const segment = serializeGroupValue(value);
        const current = grouped.get(segment) ?? {
          value,
          rows: [] as HTableTransformedRowDataType[],
        };
        current.rows.push(row);
        grouped.set(segment, current);
      });

      grouped.forEach((group, segment) => {
        const path = [...parentPath, segment];
        const key = `group:${level}:${path.map(encodeURIComponent).join('/')}`;
        nextGroupKeys.push(key);
        const aggregates = Object.fromEntries(
          Object.entries(options.props.aggregations).map(([field, type]) => [
            field,
            aggregate(type, group.rows, field),
          ]),
        );
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
            visible: computed(() => ({})),
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
