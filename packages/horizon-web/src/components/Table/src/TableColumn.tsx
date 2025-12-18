import { defineComponent, inject, onBeforeUnmount, onMounted } from 'vue';
import { ComponentClassBlock, cls, useNamespace } from '@aurora/shared';
import type { LegoSetupContext } from '@aurora/shared';
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
  NTableColumnAnalysisInjectKey,
  NTableEmitsInjectKey,
  NTableFlattenDataInjectKey,
} from './utils/injectKeys';
import { formatFixed } from './hooks/useLayout';
import type { NTableRowKeyType } from './utils/types';
import { NTableColumnSelectionKey } from './utils/types';

export default defineComponent({
  name: `${useNamespace()}TableColumnV3`,
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
    }: LegoSetupContext<TableColumnEmits, TableColumnSlots, TableColumnExposes>,
  ) {
    const uuid = nanoid();
    const classHelper = new ComponentClassBlock('table-column-v3');

    const parentEmit = inject(NTableEmitsInjectKey)!;
    const analysisColumns = inject(NTableColumnAnalysisInjectKey)!;
    const flattenData = inject(NTableFlattenDataInjectKey)!;

    const { columns, increaseChild, decreaseChild } = useColumn(flattenData, parentEmit);

    expose({
      clearSelection: (ignoreSelectable: boolean = false) => {
        analysisColumns?.value.flattenColumns
          ?.find(column => column.uuid === uuid)
          ?.[NTableColumnSelectionKey].handleClear(ignoreSelectable);
      },
      getSelectionRows: () => {
        return analysisColumns?.value.flattenColumns
          ?.find(column => column.uuid === uuid)
          ?.[NTableColumnSelectionKey].getSelectionRows();
      },
      toggleRowSelection: (
        rowKey: NTableRowKeyType | NTableRowKeyType[],
        selected?: boolean,
        ignoreSelectable: boolean = false,
      ) => {
        analysisColumns?.value.flattenColumns
          ?.find(column => column.uuid === uuid)
          ?.[NTableColumnSelectionKey].toggleRowSelection(rowKey, selected, ignoreSelectable);
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
