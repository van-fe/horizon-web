import { computed, defineComponent, inject } from 'vue';
import dayjs from '~/utils/useDayJs';
import { cls, ComponentClassBlock, type LegoSetupContext } from '@nio-fe/shared';
import type { DatePickerV2DatePanelComponentsProps } from '../../composables/useProps';
import { useDatePickerV2DatePanelComponentsProps } from '../../composables/useProps';
import {
  type DatePickerV2TimePanelComponentsEmits,
  useDatePickerV2DatePanelComponentsEmit,
} from '../../composables/useEmits';
import useDateCell from '../../hooks/useDateCell';
import useLocaleLang from '~/utils/useLocaleLang';
import {
  NDatePickerV2FormatInjectKey,
  NDatePickerV2PropsInjectKey,
  NDatePickerV2SlotsInjectKey,
} from '../../utils/injectKeys';
import type { DatePickerV2DatePanelComponentExposes } from '../../composables/useExposes';
import { useDatePickerV2DatePanelComponentExposes } from '../../composables/useExposes';
import type { Dayjs } from 'dayjs';
import { transformWeekPickedDate } from '../../hooks/useData';
import tooltip from '~/directives/v-tooltip/src';

export default defineComponent({
  name: 'DayPanel',
  directives: {
    tooltip,
  },
  props: useDatePickerV2DatePanelComponentsProps,
  emits: useDatePickerV2DatePanelComponentsEmit,
  exposes: useDatePickerV2DatePanelComponentExposes,
  setup(
    props: DatePickerV2DatePanelComponentsProps,
    context: LegoSetupContext<
      DatePickerV2TimePanelComponentsEmits,
      {},
      DatePickerV2DatePanelComponentExposes
    >,
  ) {
    const classHelper = new ComponentClassBlock('date-picker-v2-panel-body');

    const parentProps = inject(NDatePickerV2PropsInjectKey)!;
    const parentSlots = inject(NDatePickerV2SlotsInjectKey)!;
    const pickerType = inject(NDatePickerV2FormatInjectKey)!;

    const {
      panelFirstDate,
      panelLastDate,
      isInRange,
      activeClassName,
      isDisabled,
      handleClickDateCell,
      handleHoverDateCell,
    } = useDateCell(props, 'day', context);

    const panelStartDate = computed(() =>
      transformWeekPickedDate(panelFirstDate.value, parentProps.firstDayOfWeek),
    );

    const weeks = computed(() =>
      new Array(7).fill(0).map((_, i) => (i + parentProps.firstDayOfWeek) % 7),
    );

    const renderAmount = computed(() => {
      let amount =
        panelLastDate.value
          .add((6 - panelLastDate.value.day() + parentProps.firstDayOfWeek) % 7, 'day')
          .diff(panelStartDate.value, 'day') + 1;

      if (parentProps.fixedSixRows && amount / 7 <= 5) {
        amount += 7;
      }

      return amount;
    });

    function isWeekHover(date: Dayjs) {
      if (props.previewDate && pickerType.value === 'week') {
        const firstDate = transformWeekPickedDate(props.previewDate, parentProps.firstDayOfWeek);

        return date.isSameOrAfter(firstDate) && date.isSameOrBefore(firstDate.add(6, 'days'));
      }

      return false;
    }

    return () => (
      <div
        class={cls(
          classHelper.e('day'),
          classHelper.is('week-picker', pickerType.value === 'week'),
        )}
        onMouseleave={() => context.emit('hoverDateCell', undefined)}
      >
        {weeks.value.map(week => (
          <div class={cls(classHelper.em('day', 'item-week'))}>
            {useLocaleLang(`datePicker.weeksArr[${week}]`).value}
          </div>
        ))}
        {new Array(renderAmount.value).fill(0).map((_, i) => {
          const date: Dayjs = panelStartDate.value.add(i, 'day');

          const tooltipRet = parentProps.showDateTooltip?.(date);
          const isToday = date.isSame(dayjs(), 'day');
          const isRange = isInRange(date);
          const hasDot = parentProps.showDot?.(date, 'day') ?? false;
          const isPrev = date.isBefore(panelFirstDate.value, 'day');
          const isNext = date.isAfter(panelLastDate.value, 'day');
          const isDisable = isDisabled(date);
          const activeClassNameList = activeClassName(date);

          return (
            <div
              v-tooltip={tooltipRet?.show ? tooltipRet.content : undefined}
              class={cls(
                classHelper.em('day', 'item'),
                classHelper.e('grid-item'),
                classHelper.is('range', isRange),
                classHelper.is('today', isToday),
                classHelper.is('prev', isPrev),
                classHelper.is('next', isNext),
                classHelper.is('disabled', isDisable),
                classHelper.has('dot', hasDot),
                classHelper.is('week-hover', isWeekHover(date)),
                activeClassNameList,
              )}
              onClick={() => handleClickDateCell(date)}
              onMouseenter={() => handleHoverDateCell(date)}
            >
              {parentSlots.default?.({
                grid: {
                  date,
                  text: date.date().toString(),
                  index: i,
                  isToday,
                  isNotCurrent: isPrev || isNext,
                  isCurrent: !isPrev && !isNext,
                  isSelected:
                    activeClassNameList.includes(classHelper.is('start-active')) ||
                    activeClassNameList.includes(classHelper.is('end-active')) ||
                    activeClassNameList.includes(classHelper.is('active')),
                  isDisabled: isDisable,
                  isBegin: activeClassNameList.includes(classHelper.is('start-active')),
                  isEnd: activeClassNameList.includes(classHelper.is('end-active')),
                  isRange,
                  isCurrentLastDate: date.isSame(panelLastDate.value, 'date'),
                  hasDot,
                  tooltip: tooltipRet,
                },
              }) ?? (
                <div
                  class={cls(classHelper.e('grid-item-inner'), classHelper.em('day', 'item-inner'))}
                >
                  {parentProps.formatDateCellText?.('day', date, date.date().toString()) ??
                    date.date()}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  },
});
