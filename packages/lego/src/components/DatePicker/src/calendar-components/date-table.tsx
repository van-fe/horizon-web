import { defineComponent, ref, toRefs, computed, inject } from 'vue';
import { ComponentClassBlock, cls, useNamespace } from '@nio-fe/shared';
import dayjs from '../composables/dayjs';
import { NDatejs } from '../composables/NDatejs';
import { useDateContentProps } from '../composables/useProps';
import type { DateGridType } from '../composables/useProps';
import type { Dayjs } from 'dayjs';
import tooltip from '~/directives/v-tooltip';
import TableCell from './table-cell';

export default defineComponent({
  name: `${useNamespace()}DateTable`,
  directives: {
    tooltip,
  },
  components: {
    TableCell,
  },
  props: useDateContentProps,
  emits: ['pick', 'handleRangeStoreList', 'notifyDateTotal'],
  setup(props, { emit }) {
    const classHelper = new ComponentClassBlock('date-picker-panel-table');
    const NDatePicker = inject('N_DATE_PICKER') as any;

    const {
      disabledDate,
      isRange,
      showBeforeAfterDate,
      fixedSixRows,
      firstDayOfWeek,
      showDateTooltip,
      showDot,
      type,
      legoLocale,
      selectedPicker,
    } = toRefs(NDatePicker.props);
    const { panelDate, rangeStoreList } = toRefs(props);

    const weeksList = computed(() => {
      const weeks = Object.entries(legoLocale.value?.datePicker.weeks || {}).map(item => item[1]);
      const before = weeks.slice(0, firstDayOfWeek.value);
      const after = weeks.slice(firstDayOfWeek.value);
      return after.concat(before);
    });
    // 渲染第一个面板年月日对象calendarDate
    const calendarDate = computed(() => dayjs(panelDate.value).toObject());

    const list = computed(() => {
      const result: DateGridType[] = [];
      // 获取当前月份第一天
      const currentFirstDay: Dayjs = dayjs([
        calendarDate.value.years,
        calendarDate.value.months,
        1,
      ]);
      // 获取当前是周几 往前移动几天
      // 往前移动天数
      const moveDays = computed(() => {
        const diff = currentFirstDay.day() - firstDayOfWeek.value;
        if (firstDayOfWeek.value <= 6 && firstDayOfWeek.value >= 0) {
          return diff >= 0 ? diff : diff + 7;
        }
        return diff;
      });
      // 当前开始的第一天时间戳
      const startDateTime: number = currentFirstDay.subtract(moveDays.value, 'days').valueOf();
      const panelCurrentDays = currentFirstDay.daysInMonth();
      const total = fixedSixRows.value ? 42 : panelCurrentDays + moveDays.value > 35 ? 42 : 35;
      // 通知日期个数
      emit('notifyDateTotal', total);

      // 循环7x6天
      for (let index = 0; index < total; index++) {
        const $date = dayjs(startDateTime).add(index, 'd');
        const date = $date.toDate();
        const isNotCurrent =
          calendarDate.value.years !== $date.year() || calendarDate.value.months !== $date.month();
        const isCurrent = weekType.value || !isNotCurrent;
        const text = showBeforeAfterDate.value ? $date.date() : isCurrent ? $date.date() : '';
        const isCurrentLastDay = !weekType.value && panelCurrentDays + moveDays.value - 1 === index;
        const isDisabled = isCurrent && disabledDate.value?.(date);
        const tooltip = isCurrent && showDateTooltip.value?.(date);
        const isDot = showDot.value?.(date);

        // 单元格属性及方法
        result.push({
          $date,
          date,
          text,
          isNotCurrent,
          isCurrent,
          isDisabled,
          isCurrentLastDay,
          tooltip,
          isDot,
          index,
        });
      }
      return result;
    });
    const weekType = computed(() => type.value === 'week');
    const mouseMoveRowIndex = ref();

    function handleIsSelected(item: DateGridType) {
      return (
        !item.isDisabled &&
        (isRange.value
          ? false
          : item.isCurrent && item.$date!.isSame(dayjs(selectedPicker.value), 'day'))
      );
    }
    function handleIsToday(item: DateGridType) {
      return item.text !== '' && dayjs().isSame(item.$date, 'day');
    }
    function handleIsBegin(item: DateGridType) {
      return (
        isRange.value &&
        item.isCurrent &&
        rangeStoreList.value[0] &&
        item.$date!.isSame(dayjs(rangeStoreList.value[0] as Date), 'day')
      );
    }
    function handleIsRange(item: DateGridType) {
      return (
        isRange.value &&
        item.isCurrent &&
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
        item.isCurrent &&
        rangeStoreList.value[1] &&
        item.$date!.isSame(dayjs(rangeStoreList.value[1] as Date), 'day')
      );
    }
    // 获取当前cell属于哪一行
    function handleCellRowIndex(index?: number) {
      return Math.floor((index as number) / 7);
    }
    function handleIsRow(item: DateGridType) {
      return weekType.value && handleCellRowIndex(item.index) === mouseMoveRowIndex.value;
    }
    function handleIsRowDisabled(item: DateGridType) {
      const rowIndex = handleCellRowIndex(item.index);
      const startIndex = rowIndex * 7;

      return weekType.value && checkCurrentRowDisabledCell(startIndex);
    }
    function handleRenderBoxClass(item: DateGridType) {
      return [
        cls(classHelper.e('render-box')),
        {
          [classHelper.em('render-box', 'selected')]: handleIsSelected(item),
          [classHelper.em('render-box', 'today')]: handleIsToday(item),
          [classHelper.em('render-box', 'begin')]: handleIsBegin(item),
          [classHelper.em('render-box', 'end')]: handleIsEnd(item),
          [classHelper.em('render-box', 'range')]: handleIsRange(item),
          [classHelper.em('render-box', 'row')]: handleIsRow(item),
          [classHelper.em('render-box', 'disabled-row')]: handleIsRowDisabled(item),
          [classHelper.em('render-box', 'current')]: item.isCurrent,
          [classHelper.em('render-box', 'current-last')]: item.isCurrentLastDay,
          [classHelper.em('render-box', 'no-current')]: item.isNotCurrent,
          [classHelper.em('render-box', 'disabled')]: item.isDisabled,
        },
      ];
    }
    function handleInnerCellClass(item: DateGridType) {
      return cls([
        classHelper.e('inner-grid'),
        item.isDot ? classHelper.em('inner-grid', 'dot') : '',
      ]);
    }
    function onHandleClick(item: DateGridType) {
      if (item.isDisabled || !item.isCurrent) {
        return;
      }
      if (weekType.value) {
        // 判断当前行，有无禁选值，有，则禁选
        const rowIndex = handleCellRowIndex(item.index);
        const startIndex = rowIndex * 7;

        if (checkCurrentRowDisabledCell(startIndex)) {
          return;
        }
        emit('pick', list.value[startIndex].date);
        emit('pick', list.value[startIndex + 6].date);
        return;
      }
      emit('pick', item.date);
    }
    function checkCurrentRowDisabledCell(startIndex: number) {
      let hasDisabledCell = false;

      for (let index = startIndex; index < startIndex + 6; index++) {
        if (list.value[index].isDisabled) {
          hasDisabledCell = true;
          break;
        }
      }
      return hasDisabledCell;
    }
    function onMousemove(item: DateGridType) {
      if (weekType.value) {
        mouseMoveRowIndex.value = handleCellRowIndex(item.index);
      }
      if (item.isDisabled || !item.isCurrent) {
        return;
      }
      emit('handleRangeStoreList', item.date);
    }
    function onMouseleave() {
      if (weekType.value) {
        mouseMoveRowIndex.value = null;
      }
      // 鼠标移出浮层 不记录选中的区间 给个无效日期
      emit('handleRangeStoreList', {});
    }

    return () => (
      <div class={classHelper.block}>
        <div class={cls(classHelper.e('header'))}>
          {weeksList.value.map(week => (
            <div class={cls(classHelper.e('cell'))}>
              <span>{week}</span>
            </div>
          ))}
        </div>
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
                  innerCellClass={handleInnerCellClass(item)}
                  item={item}
                ></TableCell>
              </li>
            );
          })}
        </ul>
      </div>
    );
  },
});
