import { defineComponent, inject, onBeforeUnmount, onMounted } from 'vue';
import { ComponentClassBlock, cls, useNamespace } from '@aurora/utils';
import type { HorizonWebSetupContext } from '@aurora/utils';
import type { TableColumnProps } from './composables/useProps';
import { useTableColumnProps } from './composables/useProps';
import type { TableColumnEmits } from './composables/useEmits';
import { useTableColumnEmits } from './composables/useEmits';
import type { TableColumnSlots } from './composables/useSlots';
import { useTableColumnSlots } from './composables/useSlots';
import type { TableColumnExposes } from './composables/useExposes';
import { useTableColumnExposes } from './composables/useExposes';
import useColumn from './hooks/useColumn';
import { nanoid } from 'nanoid';
import {
  HTableColumnAnalysisInjectKey,
  HTableEmitsInjectKey,
  HTableFlattenDataInjectKey,
} from './utils/injectKeys';
import { formatFixed } from './hooks/useLayout';
import type { HTableRowKeyType } from './utils/types';
import { HTableColumnSelectionKey } from './utils/types';

export default defineComponent({
  name: `${useNamespace()}TableColumn`,
  props: useTableColumnProps,
  emits: useTableColumnEmits,
  slots: useTableColumnSlots,
  exposes: useTableColumnExposes,
  setup(
    props: TableColumnProps,
    {
      emit,
      slots,
      expose,
    }: HorizonWebSetupContext<TableColumnEmits, TableColumnSlots, TableColumnExposes>,
  ) {
    const uuid = nanoid();
    const classHelper = new ComponentClassBlock('table-column');

    const parentEmit = inject(HTableEmitsInjectKey)!;
    const analysisColumns = inject(HTableColumnAnalysisInjectKey)!;
    const flattenData = inject(HTableFlattenDataInjectKey)!;

    const { columns, increaseChild, decreaseChild } = useColumn(flattenData, parentEmit);

    expose({
      clearSelection: (ignoreSelectable: boolean = false) => {
        analysisColumns?.value.flattenColumns
          ?.find(column => column.uuid === uuid)
          ?.[HTableColumnSelectionKey].handleClear(ignoreSelectable);
      },
      getSelectionRows: () => {
        return analysisColumns?.value.flattenColumns
          ?.find(column => column.uuid === uuid)
          ?.[HTableColumnSelectionKey].getSelectionRows();
      },
      toggleRowSelection: (
        rowKey: HTableRowKeyType | HTableRowKeyType[],
        selected?: boolean,
        ignoreSelectable: boolean = false,
      ) => {
        analysisColumns?.value.flattenColumns
          ?.find(column => column.uuid === uuid)
          ?.[HTableColumnSelectionKey].toggleRowSelection(rowKey, selected, ignoreSelectable);
      },
    });

    onMounted(() => {
      increaseChild?.({
        uuid,
        props,
        emit,
        slots,
        children: columns.value,
      });
    });

    onBeforeUnmount(() => {
      decreaseChild?.(uuid);
    });

    return () => (
      <div class={cls(classHelper.block)}>
        <div class={cls(classHelper.e('hidden-inner'))}>
          {slots.default?.({
            row: {},
            rowIndex: -1,
            column: {},
            columnIndex: -1,
            fixed: formatFixed(props.fixed),
          })}
        </div>
      </div>
    );
  },
});
