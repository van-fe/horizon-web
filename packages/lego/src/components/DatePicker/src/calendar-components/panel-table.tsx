import { defineComponent, ref, toRefs, computed, inject } from 'vue';
import type { PropType } from 'vue';
import { ComponentClassBlock, cls, useNamespace } from '@nio-fe/shared';
import { NButton } from '../../../Button';
import PanelHeader from './panel-header';
import DateTable from './date-table';
import MonthTable from './month-table';
import YearTable from './year-table';
import PanelTime from '~/components/TimePicker/src/time-components/panel-time';
import type { PanelTimeType } from '~/components/TimePicker/src/composables/useProps';
import type { DatePickerType } from '../composables/useProps';

export default defineComponent({
  name: `${useNamespace()}DatePickerPanel`,
  components: {
    NButton,
    PanelHeader,
    DateTable,
    MonthTable,
    YearTable,
    PanelTime,
  },
  props: {
    panelDate: {
      type: [Array, Date, String] as PropType<Date | string | (Date | string)[]>,
    },
    panelDateList: {
      type: Array,
    },
    placement: String,
    rangeStoreList: Array,
    panelTime: Object,
  },
  emits: [
    'pick',
    'changePanelDate',
    'changeDateType',
    'handleRangeStoreList',
    'changePanelTime',
    'notifyTimePicker',
  ],
  setup(props, { emit }) {
    const classHelper = new ComponentClassBlock('date-picker-panel');
    const classHelperBody = new ComponentClassBlock('date-picker-panel-body');
    const NDatePicker = inject('N_DATE_PICKER') as any;
    const { type, isRange, panelTimeVisible, timePickerType, isEvenPanel, showHeader } = toRefs(
      NDatePicker.props,
    );
    const { panelDate, panelDateList, placement, rangeStoreList, panelTime } = toRefs(props);
    const isRangeLeft = computed(() => {
      return (
        ((isRange.value && isEvenPanel.value) || panelTimeVisible.value) &&
        placement.value === 'left'
      );
    });
    const isSixRowsCells = ref(false);
    const panelHeaderNode = computed(() => {
      return (
        <panel-header
          panelDate={panelDate.value}
          panelDateList={panelDateList.value}
          placement={placement.value}
          rangeStoreList={rangeStoreList.value}
          onChangePanelDate={onChangePanelDate}
          onChangeDateType={onChangeDateType}
        ></panel-header>
      );
    });
    const panelContentNode = computed(() => {
      let contentNode;
      switch (type.value) {
        case 'date':
          contentNode = (
            <date-table
              panelDate={panelDate.value}
              placement={placement.value}
              onPick={onPick}
              onHandleRangeStoreList={onHandleRangeStoreList}
              onNotifyDateTotal={onNotifyDateTotal}
            ></date-table>
          );
          break;
        case 'week':
        case 'daterange':
        case 'datetimerange':
        case 'dateminutesrange':
        case 'datesecondsrange':
          contentNode = (
            <date-table
              panelDate={panelDate.value}
              placement={placement.value}
              rangeStoreList={rangeStoreList.value}
              onPick={onPick}
              onHandleRangeStoreList={onHandleRangeStoreList}
              onNotifyDateTotal={onNotifyDateTotal}
            ></date-table>
          );
          break;
        case 'year':
          contentNode = (
            <year-table
              panelDate={panelDate.value}
              placement={placement.value}
              onPick={onPick}
              onHandleRangeStoreList={onHandleRangeStoreList}
            ></year-table>
          );
          break;
        case 'yearrange':
          contentNode = (
            <year-table
              panelDate={panelDate.value}
              placement={placement.value}
              rangeStoreList={rangeStoreList.value}
              onPick={onPick}
              onHandleRangeStoreList={onHandleRangeStoreList}
            ></year-table>
          );
          break;
        case 'month':
          contentNode = (
            <month-table
              panelDate={panelDate.value}
              placement={placement.value}
              onPick={onPick}
              onHandleRangeStoreList={onHandleRangeStoreList}
            ></month-table>
          );
          break;
        case 'monthrange':
          contentNode = (
            <month-table
              panelDate={panelDate.value}
              placement={placement.value}
              rangeStoreList={rangeStoreList.value}
              onPick={onPick}
              onHandleRangeStoreList={onHandleRangeStoreList}
            ></month-table>
          );
          break;
        default:
          contentNode = (
            <date-table
              panelDate={panelDate.value}
              placement={placement.value}
              onPick={onPick}
              onHandleRangeStoreList={onHandleRangeStoreList}
              onNotifyDateTotal={onNotifyDateTotal}
            ></date-table>
          );
          break;
      }
      return contentNode;
    });

    function onChangePanelDate(date: Date | string | number) {
      emit('changePanelDate', date);
    }
    function onChangeDateType(type: DatePickerType) {
      emit('changeDateType', type);
    }
    function onPick(date: Date) {
      emit('pick', date);
    }
    function onNotifyDateTotal(total: number) {
      isSixRowsCells.value = total > 35;
      emit('notifyTimePicker', !isSixRowsCells.value);
    }
    function onHandleRangeStoreList(date: Date) {
      emit('handleRangeStoreList', date);
    }
    function onChangePanelTime(time: PanelTimeType) {
      emit('changePanelTime', time);
    }

    return () => (
      <div class={classHelper.block}>
        {showHeader.value && panelHeaderNode.value}
        <div class={cls(classHelperBody.block)}>
          <div
            class={[
              cls(classHelper.m('left')),
              isRangeLeft.value ? cls(classHelper.m('range')) : '',
            ]}
          >
            {panelContentNode.value}
          </div>
          {panelTimeVisible.value && (
            <div
              class={[
                cls(classHelper.m('right')),
                cls(classHelper.m(timePickerType.value)),
                { [classHelper.m('six-rows')]: isSixRowsCells.value },
              ]}
            >
              <PanelTime
                panelTime={panelTime.value}
                onChangePanelTime={onChangePanelTime}
              ></PanelTime>
            </div>
          )}
        </div>
      </div>
    );
  },
});
