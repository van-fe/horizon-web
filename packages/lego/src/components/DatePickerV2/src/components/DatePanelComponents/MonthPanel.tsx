import { defineComponent, inject } from 'vue';
import dayjs from '~/utils/useDayJs';
import { cls, ComponentClassBlock, type LegoSetupContext } from '@nio-fe/shared';
import type { DatePickerV2DatePanelComponentsProps } from '../../composables/useProps';
import { useDatePickerV2DatePanelComponentsProps } from '../../composables/useProps';
import {
  type DatePickerV2TimePanelComponentsEmits,
  useDatePickerV2DatePanelComponentsEmit,
} from '../../composables/useEmits';
import useLocaleLang from '~/utils/useLocaleLang';
import useDateCell from '../../hooks/useDateCell';
import type { DatePickerV2DatePanelComponentExposes } from '../../composables/useExposes';
import { useDatePickerV2DatePanelComponentExposes } from '../../composables/useExposes';
import { NDatePickerV2PropsInjectKey, NDatePickerV2SlotsInjectKey } from '../../utils/injectKeys';
import tooltip from '~/directives/v-tooltip/src';

export default defineComponent({
  name: 'MonthPanel',
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
    } = useDateCell(props, 'month', context);

    return () => (
      <div
        class={cls(classHelper.e('month'))}
        onMouseleave={() => context.emit('hoverDateCell', undefined)}
      >
        {new Array(12).fill(0).map((_, i) => {
          const date = panelFirstDate.value.add(i, 'month');

          const tooltipRet = parentProps.showMonthTooltip?.(date);
          const isToday = date.isSame(dayjs(), 'month');
          const content = useLocaleLang(`datePicker.months[${date.month()}]`).value as string;
          const isRange = isInRange(date);
          const hasDot = parentProps.showDot?.(date, 'month') ?? false;
          const isDisable = isDisabled(date);
          const activeClassNameList = activeClassName(date);

          return (
            <div
              v-tooltip={tooltipRet?.show ? tooltipRet.content : undefined}
              class={cls(
                classHelper.em('month', 'item'),
                classHelper.e('grid-item'),
                classHelper.is('range', isRange),
                classHelper.is('today', isToday),
                classHelper.is('disabled', isDisable),
                classHelper.has('dot', hasDot),
                activeClassNameList,
              )}
              onClick={() => handleClickDateCell(date)}
              onMouseenter={() => context.emit('hoverDateCell', date)}
            >
              {parentSlots.month?.({
                grid: {
                  date,
                  text: content,
                  index: i,
                  isToday,
                  isNotCurrent: false,
                  isCurrent: true,
                  isSelected:
                    activeClassNameList.includes(classHelper.is('start-active')) ||
                    activeClassNameList.includes(classHelper.is('end-active')) ||
                    activeClassNameList.includes(classHelper.is('active')),
                  isDisabled: isDisable,
                  isBegin: activeClassNameList.includes(classHelper.is('start-active')),
                  isEnd: activeClassNameList.includes(classHelper.is('end-active')),
                  isRange,
                  isCurrentLastDate: date.isSame(panelLastDate.value, 'month'),
                  hasDot,
                  tooltip: tooltipRet,
                },
              }) ?? (
                <div
                  class={cls(
                    classHelper.e('grid-item-inner'),
                    classHelper.em('month', 'item-inner'),
                  )}
                >
                  {parentProps.formatDateCellText?.('month', date, content) ?? content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  },
});
