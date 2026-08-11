import type { ComputedRef, SetupContext, ToRefs, WatchStopHandle } from 'vue';
import { onScopeDispose, provide, shallowReactive, shallowRef, watch } from 'vue';
import type {
  HTableRowDataType,
  HTableRowKeyType,
  HTableTransformedRowDataType,
  HTableTreeRowDataType,
} from '../utils/types';
import { HTableTransformedRowContextKey } from '../utils/types';
import { nanoid } from 'nanoid';
import type { TableProps } from '../composables/useProps';
import { warn } from '~/utils/useLog';
import type { TableEmits } from '../composables/useEmits';
import { HTableSetChildrenByRowKeyValueInjectKey } from '../utils/injectKeys';

type StableRowContext = Omit<
  HTableTransformedRowDataType[typeof HTableTransformedRowContextKey],
  'visible'
> & {
  visible: Record<string, boolean>;
};

export default function useDataAnalysis(
  tableProp: ToRefs<TableProps>,
  emit: SetupContext<TableEmits>['emit'],
  options: {
    fieldMapFormatted: ComputedRef<Record<keyof HTableTreeRowDataType, string>>;
  },
) {
  const flattenData = shallowRef<HTableTransformedRowDataType[]>([]);
  const unkeyedContexts = new WeakMap<object, StableRowContext>();
  const unkeyedUuids = new WeakMap<object, HTableRowKeyType>();
  let keyedContexts = new Map<HTableRowKeyType, StableRowContext>();

  let stopDataWatch: WatchStopHandle | undefined;

  watch(
    () => tableProp.watchData.value,
    watchData => {
      stopDataWatch?.();
      stopDataWatch = watch(tableProp.data, reloadData, {
        immediate: true,
        deep: watchData,
      });
    },
    { immediate: true },
  );

  onScopeDispose(() => stopDataWatch?.());

  function reloadData(data: HTableRowDataType[] = tableProp.data.value) {
    const nextFlattenData: HTableTransformedRowDataType[] = [];
    const nextKeyedContexts = new Map<HTableRowKeyType, StableRowContext>();
    const reusedKeyedContexts = new Set<HTableRowKeyType>();
    const rowKeyField = tableProp.rowKey?.value;
    const childrenField = options.fieldMapFormatted.value.children;
    const isLeafField = options.fieldMapFormatted.value.isLeaf;
    let warnedMissingTreeRowKey = false;

    type PendingRow = {
      row: HTableRowDataType;
      parentUuid: HTableRowKeyType | null;
      level: number;
      siblingIndex: number;
    };

    const pendingRows: PendingRow[] = [];
    for (let index = data.length - 1; index >= 0; index--) {
      pendingRows.push({ row: data[index], parentUuid: null, level: 0, siblingIndex: index });
    }

    while (pendingRows.length > 0) {
      const { row, parentUuid, level, siblingIndex } = pendingRows.pop()!;
      const rowObject =
        (typeof row === 'object' && row !== null) || typeof row === 'function'
          ? (row as object)
          : undefined;
      let uuid: HTableRowKeyType;
      let context: StableRowContext | undefined;

      if (rowKeyField !== undefined) {
        uuid = row[rowKeyField] as HTableRowKeyType;
        if (!reusedKeyedContexts.has(uuid)) {
          context = keyedContexts.get(uuid);
          reusedKeyedContexts.add(uuid);
        }
      } else if (rowObject) {
        uuid = unkeyedUuids.get(rowObject) ?? nanoid();
        unkeyedUuids.set(rowObject, uuid);
        context = unkeyedContexts.get(rowObject);
      } else {
        uuid = nanoid();
      }

      context ??= {
        uuid,
        index: nextFlattenData.length,
        siblingIndex,
        visible: shallowReactive<Record<string, boolean>>({}),
        parentUuid,
        level,
        isLeaf: row[isLeafField] === true,
      };
      context.uuid = uuid;
      context.index = nextFlattenData.length;
      context.siblingIndex = siblingIndex;
      context.parentUuid = parentUuid;
      context.level = level;
      context.isLeaf = row[isLeafField] === true;

      if (rowKeyField !== undefined) {
        if (!nextKeyedContexts.has(uuid)) nextKeyedContexts.set(uuid, context);
      } else if (rowObject) {
        unkeyedContexts.set(rowObject, context);
      }

      nextFlattenData.push({
        ...row,
        [HTableTransformedRowContextKey]: context,
      } as HTableTransformedRowDataType);

      const children = row[childrenField];
      if (Array.isArray(children) && children.length > 0) {
        if (rowKeyField === undefined && !warnedMissingTreeRowKey) {
          warnedMissingTreeRowKey = true;
          warn('table', `You haven't set rowKey to table, so the tree data won't deal correctly.`);
        }

        for (let index = children.length - 1; index >= 0; index--) {
          pendingRows.push({
            row: children[index],
            parentUuid: uuid,
            level: level + 1,
            siblingIndex: index,
          });
        }
      }
    }

    keyedContexts = nextKeyedContexts;

    flattenData.value = nextFlattenData;
  }

  function setChildrenByRowKey(rowKeyValue: any, childrenData: HTableRowDataType[]) {
    const rowKeyField = tableProp.rowKey?.value;
    if (rowKeyField === undefined) {
      warn('table', `You haven't set rowKey to table.`);
      return;
    }

    const copiedData = tableProp.data.value.concat();

    const childrenField = options.fieldMapFormatted.value.children;
    const rowsToVisit = copiedData.toReversed();
    let updated = false;

    while (rowsToVisit.length > 0) {
      const row = rowsToVisit.pop()!;
      if (row[rowKeyField] === rowKeyValue) {
        row[childrenField] = childrenData;
        updated = true;
        break;
      }

      const children = row[childrenField];
      if (Array.isArray(children)) {
        for (let index = children.length - 1; index >= 0; index--) {
          rowsToVisit.push(children[index]);
        }
      }
    }

    if (updated) reloadData(copiedData);

    emit('update:data', copiedData);
  }

  provide(HTableSetChildrenByRowKeyValueInjectKey, setChildrenByRowKey);

  return {
    flattenData,
    setChildrenByRowKey,
    reloadData,
  };
}
