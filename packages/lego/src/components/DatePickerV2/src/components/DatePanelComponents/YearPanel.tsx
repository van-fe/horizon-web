import { defineComponent, inject } from 'vue';
import dayjs from '~/utils/useDayJs';
import type { LegoSetupContext } from '@nio-fe/shared';
import { cls, ComponentClassBlock } from '@nio-fe/shared';
import type { DatePickerV2DatePanelComponentsProps } from '../../composables/useProps';
import { useDatePickerV2DatePanelComponentsProps } from '../../composables/useProps';
import type { DatePickerV2TimePanelComponentsEmits } from '../../composables/useEmits';
import { useDatePickerV2DatePanelComponentsEmit } from '../../composables/useEmits';
import useDateCell from '../../hooks/useDateCell';
import type { DatePickerV2DatePanelComponentExposes } from '../../composables/useExposes';
import { useDatePickerV2DatePanelComponentExposes } from '../../composables/useExposes';
import { NDatePickerV2PropsInjectKey, NDatePickerV2SlotsInjectKey } from '../../utils/injectKeys';
import tooltip from '~/directives/v-tooltip/src';

export default defineComponent({
  name: 'YearPanel',
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
