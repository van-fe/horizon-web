import { defineComponent, inject } from 'vue';
import dayjs from '~/utils/useDayJs';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock } from '@aurora/utils';
import type { DatePickerDatePanelComponentsProps } from '../../composables/useProps';
import { useDatePickerDatePanelComponentsProps } from '../../composables/useProps';
import type { DatePickerTimePanelComponentsEmits } from '../../composables/useEmits';
import { useDatePickerDatePanelComponentsEmit } from '../../composables/useEmits';
import useDateCell from '../../hooks/useDateCell';
import type { DatePickerDatePanelComponentExposes } from '../../composables/useExposes';
import { useDatePickerDatePanelComponentExposes } from '../../composables/useExposes';
import { NDatePickerPropsInjectKey, NDatePickerSlotsInjectKey } from '../../utils/injectKeys';
import tooltip from '~/directives/v-tooltip/src';

export default defineComponent({
  name: 'YearPanel',
  directives: {
    tooltip,
  },
  props: useDatePickerDatePanelComponentsProps,
  emits: useDatePickerDatePanelComponentsEmit,
  exposes: useDatePickerDatePanelComponentExposes,
  setup(
    props: DatePickerDatePanelComponentsProps,
    context: HorizonWebSetupContext<
      DatePickerTimePanelComponentsEmits,
      {},
      DatePickerDatePanelComponentExposes
    >,
  ) {
    const classHelper = new ComponentClassBlock('date-picker-panel-body');

    const parentProps = inject(NDatePickerPropsInjectKey)!;
    const parentSlots = inject(NDatePickerSlotsInjectKey)!;

    const {
      panelFirstDate,
      panelLastDate,
      isInRange,
      activeClassName,
      isDisabled,
      handleClickDateCell,
    } = useDateCell(props, 'year', context);

    return () => (
      <div
        class={cls(classHelper.e('year'))}
        onMouseleave={() => context.emit('hoverDateCell', undefined)}
      >
        {new Array(12).fill(0).map((_, i) => {
          const date = panelFirstDate.value.add(i, 'year');

          const tooltipRet = parentProps.showYearTooltip?.(date);
          const isToday = date.isSame(dayjs(), 'year');
          const isRange = isInRange(date);
          const hasDot = parentProps.showDot?.(date, 'year') ?? false;
          const isPrev = i === 0;
          const isNext = i === 11;
          const isDisable = isDisabled(date);
          const activeClassNameList = activeClassName(date);

          return (
            <div
              v-tooltip={tooltipRet?.show ? tooltipRet.content : undefined}
              class={cls(
                classHelper.em('year', 'item'),
                classHelper.e('grid-item'),
                classHelper.is('today', isToday),
                classHelper.is('range', isRange),
                classHelper.is('prev', isPrev),
                classHelper.is('next', isNext),
                classHelper.is('disabled', isDisable),
                classHelper.has('dot', hasDot),
                activeClassNameList,
              )}
              onClick={() => handleClickDateCell(date)}
              onMouseenter={() => context.emit('hoverDateCell', date)}
            >
              {parentSlots.year?.({
                grid: {
                  date,
                  text: date.year().toString(),
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
                  isCurrentLastDate: date.isSame(panelLastDate.value, 'year'),
                  hasDot,
                  tooltip: tooltipRet,
                },
              }) ?? (
                <div
                  class={cls(
                    classHelper.e('grid-item-inner'),
                    classHelper.em('year', 'item-inner'),
                  )}
                >
                  {parentProps.formatDateCellText?.('year', date, date.year().toString()) ??
                    date.year()}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  },
});
