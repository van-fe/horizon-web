import type { PropType } from 'vue';
import { defineComponent, inject, toRefs } from 'vue';
import tooltip from '~/directives/v-tooltip';
import type { DateGridType } from '../composables/useProps';
import { useNamespace } from '@nio-fe/shared';

export default defineComponent({
  name: `${useNamespace()}TableCell`,
  directives: {
    tooltip,
  },
  props: {
    item: {
      type: Object as PropType<DateGridType>,
    },
    cellClass: String,
    innerCellClass: String,
  },
  setup(props, {}) {
    const NDatePicker = inject('N_DATE_PICKER') as any;
    const { innerCellClass, cellClass, item } = toRefs(props);

    function dateGridCell(item: DateGridType) {
      const list = NDatePicker.gridSlots?.({
        grid: item,
      })?.filter((e: any) => e.patchFlag !== -2 && e.type.toString() !== 'Symbol(Comment)');

      if (list?.length) {
        return list;
      }
      return (
        <div class={innerCellClass.value}>
          <span>{item.text}</span>
        </div>
      );
    }

    return () => (
      <div
        class={cellClass.value}
        v-tooltip={{
          content: item.value?.tooltip?.content,
          disabled: !item.value?.tooltip?.show,
        }}
      >
        {dateGridCell(item.value as DateGridType)}
      </div>
    );
  },
});
