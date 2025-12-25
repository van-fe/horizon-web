import type { ComputedRef, SetupContext, ToRefs } from 'vue';
import { provide, watch, ref } from 'vue';
import type {
  HTableRowDataType,
  HTableTransformedRowDataType,
  HTableTreeRowDataType,
} from '../utils/types';
import { HTableTransformedRowContextKey } from '../utils/types';
import { nanoid } from 'nanoid';
import type { TableProps } from '../composables/useProps';
import { warn } from '~/utils/useLog';
import type { TableEmits } from '../composables/useEmits';
import { HTableSetChildrenByRowKeyValueInjectKey } from '../utils/injectKeys';

export default function useDataAnalysis(
  tableProp: ToRefs<TableProps>,
  emit: SetupContext<TableEmits>['emit'],
  options: {
    fieldMapFormatted: ComputedRef<Record<keyof HTableTreeRowDataType, string>>;
  },
) {
  const flattenData = ref<HTableTransformedRowDataType[]>([]);

  watch(
    tableProp.data,
    val => {
      reloadData(val);
    },
    {
      immediate: true,
      deep: true,
    },
  );

  function reloadData(data: HTableTransformedRowDataType[] = tableProp.data.value) {
    flattenData.value = [];

    const transformRow = (
      row: HTableRowDataType,
      parent?: HTableTransformedRowDataType,
      level = 0,
    ) => {
      const res: HTableTransformedRowDataType = {
        ...row,
        [HTableTransformedRowContextKey]: {
          uuid: tableProp.rowKey?.value ? row[tableProp.rowKey.value] : nanoid(),
          index: 0,
          visible: ref({}),
          parentUuid: parent?.[HTableTransformedRowContextKey].uuid ?? null,
          level,
        },
      };

      flattenData.value.push(res);

      if (
        row[options.fieldMapFormatted.value.children] &&
        row[options.fieldMapFormatted.value.children].length
      ) {
        if (!tableProp.rowKey?.value) {
          warn('table', `You haven't set rowKey to table, so the tree data won't deal correctly.`);
        }

        row[options.fieldMapFormatted.value.children].map((curr: HTableRowDataType) =>
          transformRow(curr, res, level + 1),
        );
      }

      return res;
    };

    data.map(curr => transformRow(curr));

    flattenData.value.forEach((row, idx) => {
      row[HTableTransformedRowContextKey].index = idx;
    });
  }

  function setChildrenByRowKey(rowKeyValue: any, childrenData: HTableRowDataType[]) {
    if (!tableProp.rowKey?.value) {
      warn('table', `You haven't set rowKey to table.`);
      return;
    }

    const copiedData = tableProp.data.value.concat();

    const action = (data: HTableRowDataType[]) => {
      for (const row of data) {
        if (row[tableProp.rowKey!.value!] === rowKeyValue) {
          row[options.fieldMapFormatted.value.children] = childrenData;
        } else {
          if (Array.isArray(row[options.fieldMapFormatted.value.children])) {
            action(row[options.fieldMapFormatted.value.children]);
          }
        }
      }
    };

    action(copiedData);

    emit('update:data', copiedData);
  }

  provide(HTableSetChildrenByRowKeyValueInjectKey, setChildrenByRowKey);

  return {
    flattenData,
    setChildrenByRowKey,
    reloadData,
  };
}
