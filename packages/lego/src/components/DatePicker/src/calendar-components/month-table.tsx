import { defineComponent, toRefs, computed, inject } from 'vue';
import { ComponentClassBlock, cls, useNamespace } from '@nio-fe/shared';
import dayjs from '../composables/dayjs';
import { NDatejs } from '../composables/NDatejs';
import { useDateContentProps } from '../composables/useProps';
import tooltip from '~/directives/v-tooltip';
import TableCell from './table-cell';
import type { DateGridType } from '../composables/useProps';

export default defineComponent({
  name: `${useNamespace()}MonthContent`,
  directives: {
    tooltip,
  },
  components: {
    TableCell,
  },
  props: useDateContentProps,
  emits: ['pick', 'handleRangeStoreList'],
  setup(props, { emit }) {
    const classHelper = new ComponentClassBlock('date-picker-year-month');
    const { panelDate, rangeStoreList } = toRefs(props);
    const NDatePicker = inject('N_DATE_PICKER') as any;
    const { disabledDate, isRange, showDateTooltip, legoLocale, selectedPicker } = toRefs(
      NDatePicker.props,
    );
    // 渲染第一个面板年月日对象
    const calendarDate = computed(() => dayjs(panelDate.value).toObject());

    const list = computed(() => {
      const result: DateGridType[] = [];

      for (let i = 0; i < 12; i++) {
        const $date = dayjs([calendarDate.value.years, i, 1]);
        const date = $date.toDate();
        const isDisabled = disabledDate.value?.(date);
        const text = `${legoLocale.value?.datePicker.months[$date.month()]}`;
        const tooltip = showDateTooltip.value?.(date);

        // 单元格属性及方法
        result.push({
          $date,
          date,
          text,
          isDisabled,
          tooltip,
        });
      }
      return result;
    });

    function handleIsSelected(item: DateGridType) {
      return (
        !item.isDisabled &&
        (isRange.value ? false : item.$date!.isSame(dayjs(selectedPicker.value), 'month'))
      );
    }
    function handleIsToday(item: DateGridType) {
      return dayjs().isSame(item.$date, 'month');
    }
    function handleIsBegin(item: DateGridType) {
      return (
        isRange.value &&
        rangeStoreList.value[0] &&
        item.$date!.isSame(dayjs(rangeStoreList.value[0] as Date), 'month')
      );
    }
    function handleIsRange(item: DateGridType) {
      return (
        isRange.value &&
        NDatejs.isRange(
          item.date as Date,
          rangeStoreList.value[0] as Date,
          rangeStoreList.value[1] as Date,
        )
      );
    }
    function handleIsEnd(item: DateGridType) {
      return (
        isRange.value &&
        rangeStoreList.value[1] &&
        item.$date!.isSame(dayjs(rangeStoreList.value[1] as Date), 'month')
      );
    }
    function handleRenderBoxClass(item: DateGridType) {
      return [
        cls(classHelper.e('render-box')),
        {
          [classHelper.em('render-box', 'selected')]: handleIsSelected(item),
          [classHelper.em('render-box', 'disabled')]: item.isDisabled,
          [classHelper.em('render-box', 'today')]: handleIsToday(item),
          [classHelper.em('render-box', 'begin')]: handleIsBegin(item),
          [classHelper.em('render-box', 'end')]: handleIsEnd(item),
          [classHelper.em('render-box', 'range')]: handleIsRange(item),
        },
      ];
    }
    function onHandleClick(item: DateGridType) {
      if (item.isDisabled) {
        return;
      }
      emit('pick', item.date);
    }
    function onMousemove(item: DateGridType) {
      if (item.isDisabled) {
        return;
      }
      emit('handleRangeStoreList', item.date);
    }
    function onMouseleave() {
      // 鼠标移出浮层 不记录选中的区间 给个无效日期
      emit('handleRangeStoreList', {});
    }

    return () => (
      <div class={classHelper.block}>
        <div class={[cls(classHelper.e('left')), isRange.value ? 'range' : '']}>
          <ul class={cls(classHelper.e('body'))} onMouseleave={onMouseleave}>
            {list.value.map(item => {
              return (
                <li
                  class={handleRenderBoxClass(item)}
                  onClick={onHandleClick.bind(this, item)}
                  onMousemove={onMousemove.bind(this, item)}
                >
                  <TableCell
                    cellClass={classHelper.e('grid')}
                    innerCellClass={classHelper.e('inner-grid')}
                    item={item}
                  ></TableCell>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  },
});
