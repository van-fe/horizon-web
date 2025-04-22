import { defineComponent, ref, toRefs, computed, watch, inject } from 'vue';
import { ComponentClassBlock, cls, useNamespace } from '@nio-fe/shared';
import dayjs from '../composables/dayjs';
import RangeHeader from './range-header';
import PanelTable from './panel-table';
import PanelFooter from './panel-footer';
import { NButton } from '../../../Button';
import { NRadio, NRadioGroup } from '../../../Radio';
import { NDatejs } from '../composables/NDatejs';
import { usePanelContentProps } from '../composables/useProps';
import type {
  FooterSlotsParamsType,
  ObjectMapType,
  PickerOptionsProps,
  DatePickerType,
} from '../composables/useProps';
import type { PanelTimeType } from '~/components/TimePicker/src/composables/useProps';
import { DATE_FORMATS_DEFAULT } from '../composables/default';

export default defineComponent({
  name: `${useNamespace()}PanelContent`,
  components: {
    RangeHeader,
    PanelTable,
    PanelFooter,
    NButton,
    NRadioGroup,
    NRadio,
  },
  props: usePanelContentProps,
  emits: [
    'updateDateModelValue',
    'hidePanel',
    'changePanelDate',
    'changeRightPanelDate',
    'changeDateType',
    'changePanelTime',
    'handleRangeStoreList',
    'handleHoverList',
    'setMergeDateTimeList',
    'pick',
    'changeTimePicker',
    'handleNow',
    'cancel',
    'confirm',
    'changePickerDate',
    'updateTimePosition',
    'notifyTimePicker',
    'changeSelectTimeStatus',
    'changeRangeTime',
    'shortcutClick',
  ],
  setup(props, { emit }) {
    const classHelper = new ComponentClassBlock('date-picker-content');
    const { picker, panelDate, rightPanelDate, rangeStore, isFooter, rangeHeaderVisible } =
      toRefs(props);
    const NDatePicker = inject('N_DATE_PICKER') as any;
    const {
      type,
      isRange,
      isEvenPanel,
      panelTime,
      panelTimeVisible,
      timePicker,
      timePickerType,
      timeDefaultFormat,
      pickerOptions,
      showNow,
      showCancelButton,
      confirmButtonText,
      cancelButtonText,
      confirmButtonProps,
      cancelButtonProps,
      shortcuts,
      defaultPickerValue,
      defaultTime,
      legoLocale,
      unlinkPanelsProps,
      disabledDate,
      disabledTime,
    } = toRefs(NDatePicker.props);

    const footerSlots: undefined | ((params: FooterSlotsParamsType) => void) =
      NDatePicker.footerSlots;
    const footerVisible = computed(() => isFooter.value || footerSlots);
    const footerNowVisible = computed(() => {
      const hideFooterNowList = ['datetimerange', 'dateminutesrange', 'datesecondsrange'];
      return hideFooterNowList.includes(type.value) ? false : showNow.value;
    });

    const defaultNowText = computed(() => legoLocale.value?.datePicker.now);
    const confirmDisabled = ref(true);
    const singlePicker = computed(() => {
      if (!isRange.value) {
        return initDefaultPanelDate(panelDate.value as Date | string);
      }
      return panelDate.value;
    });
    const leftPicker = computed(() => {
      if (isRange.value) {
        return !NDatejs.isEmpty(panelDate.value) && dayjs(panelDate.value).isValid()
          ? dayjs(panelDate.value).toDate()
          : initDefaultPanelDate('');
      }
      return panelDate.value;
    });
    // 连续下月/年
    const rightPicker = computed(() => {
      if (isRange.value) {
        const rangeTypeList = [
          'daterange',
          'datetimerange',
          'dateminutesrange',
          'datesecondsrange',
        ];
        let result;

        if (rangeTypeList.includes(type.value)) {
          // 月份
          result = dayjs(leftPicker.value).add(1, 'month').toDate();
        } else if (type.value === 'monthrange') {
          // 年份
          result = dayjs(leftPicker.value).add(1, 'year').toDate();
        } else {
          // 年份
          result = dayjs(leftPicker.value).add(10, 'year').toDate();
        }
        if (unlinkPanelsProps.value && !NDatejs.isEmpty(rightPanelDate.value)) {
          return rightPanelDate.value;
        }

        return result;
      }
      return new Date();
    });

    const hasShortcuts = computed(() => !!shortcuts.value.length);
    const shortcutsValue = ref('');
    const shortcutsDisabled = computed(() => {
      return rangeStore.value?.selecting;
    });
    // range-header时 是否使用初始值
    const isUseInitModel = ref(true);
    const rangeTime = ref();

    // 设置选择器打开时默认显示的时间
    function initDefaultPanelDate(date: Date | string) {
      const result =
        date ||
        (defaultPickerValue.value
          ? new Date(
              Array.isArray(defaultPickerValue.value)
                ? defaultPickerValue.value[0]
                : defaultPickerValue.value,
            )
          : new Date());
      return result;
    }
    // select time when picking date
    function onPickAndSelectTime(date: Date) {
      emit('changeSelectTimeStatus', true);
      onPick(date);
    }
    function onPickPanelTable(date: Date) {
      emit('changeSelectTimeStatus', false);
      onPick(date);
    }
    function onPick(date: Date) {
      let mergeDateTime = date;
      if (panelTimeVisible.value && defaultTime.value && !picker.value) {
        // 选中日期后默认选中的时刻
        mergeDateTime = NDatejs.setHoursMinutesSecondsMilliseconds(date, defaultTime.value);
        updateTimePicker(mergeDateTime);
        // 更新时间列位置
        if (footerVisible.value) {
          updateTimePosition();
        }
      }

      emit('changePickerDate', NDatejs.dayjsToObject(mergeDateTime));
      emit('pick', mergeDateTime);
      initShortcutsValue();
      onChangeIsUseInitModel(false);
    }
    function onChangeIsUseInitModel(status: boolean) {
      isUseInitModel.value = status;
    }
    function onChangeTimePicker(date: string) {
      const value = NDatejs.parseTodayDateTime(date);
      emit('changeTimePicker', value);
    }
    function onHandleRangeStoreList(date: Date) {
      if (rangeStore.value?.selecting && rangeStore.value?.list.length > 0) {
        emit('handleRangeStoreList', date);
      }
      emit('handleHoverList', date);
    }
    function onChangePanelDate(date: Date | string | number) {
      if (unlinkPanelsProps.value) {
        emit('changeRightPanelDate', rightPicker.value);
      }
      emit('changePanelDate', date);
    }
    function onChangeRightPanelDate(date: Date | string | number) {
      // 解除联动，需要单独处理
      if (unlinkPanelsProps.value) {
        const list = ['daterange', 'datetimerange', 'dateminutesrange', 'datesecondsrange'];
        let result = date;

        if (list.includes(type.value)) {
          result = dayjs(date).add(1, 'month').toDate();
        } else if (type.value === 'monthrange') {
          result = dayjs(date).add(1, 'year').toDate();
        } else if (type.value === 'yearrange') {
          result = dayjs(date).add(10, 'year').toDate();
        }
        emit('changeRightPanelDate', result);
        return;
      }
      emit('changePanelDate', date);
    }
    function onChangeDateType(type: DatePickerType) {
      emit('changeDateType', type);
    }
    function onChangePanelTime(time: PanelTimeType) {
      emit('changePanelTime', time);

      if (isSelectedTime()) {
        const value = NDatejs.formatTime(time as PanelTimeType);
        onChangeTimePicker(value);
      }
    }
    function isSelectedTime() {
      const t = panelTime.value;
      let result;

      switch (timePickerType.value) {
        case 'time':
        case 'minutes':
          result = !NDatejs.isEmpty(t.hours) && !NDatejs.isEmpty(t.minutes);
          break;
        case 'seconds':
          result =
            !NDatejs.isEmpty(t.hours) && !NDatejs.isEmpty(t.minutes) && !NDatejs.isEmpty(t.seconds);
          break;
      }
      return result;
    }
    function selectedShortcut(item: ObjectMapType) {
      const result = typeof item.value === 'function' ? item.value() : item.value;
      if (!isRange.value && !Array.isArray(result)) {
        onPickAndSelectTime(result);
        // 更新时间列
        if (panelTimeVisible.value) {
          updateTimePicker(result);
          updateTimePosition();
        }
        return;
      }
      if (isRange.value && Array.isArray(result)) {
        onPickAndSelectTime(result[0]);
        onPickAndSelectTime(result[1]);
        onChangeIsUseInitModel(true);
        return;
      }
      return;
    }
    function handleClickShortcut(item: ObjectMapType) {
      emit('shortcutClick', item);
    }
    function updateTimePicker(result: Date | string | number) {
      const { hours, minutes, seconds } = NDatejs.dayjsToObject(result);
      const time = {
        hours,
        minutes,
        seconds,
      };
      const value = NDatejs.formatTime(time as PanelTimeType);
      onChangeTimePicker(value);
    }
    function updateTimePosition() {
      emit('updateTimePosition');
    }
    function handleConfirmStatus() {
      const pickerNotNull = Array.isArray(picker.value)
        ? picker.value.length === 2 && picker.value[1] !== ''
        : picker.value !== '';
      // 选择日期时间
      if (panelTimeVisible.value) {
        confirmDisabled.value = !(pickerNotNull && isSelectedTime());
        return;
      }
      const rangeTimeNotNull =
        rangeTime.value &&
        !NDatejs.isEmpty(rangeTime.value[0].hours) &&
        !NDatejs.isEmpty(rangeTime.value[1].hours);
      // 选择日期时间范围
      if (rangeHeaderVisible.value) {
        confirmDisabled.value = !(pickerNotNull && rangeTimeNotNull);
        return;
      }
      // 选择日期
      confirmDisabled.value = !pickerNotNull;
    }
    function initShortcutsValue() {
      if (!hasShortcuts.value) {
        return;
      }

      let result: number[] | number;
      if (Array.isArray(picker.value)) {
        result = picker.value.map(item => {
          return dayjs(item).valueOf();
        });
      } else {
        result = dayjs(picker.value).valueOf();
      }
      const r1 = Array.isArray(result) && result.length === 2;
      const r2 = !Array.isArray(result) && result;

      if (!(r1 || r2)) {
        return;
      }
      // 通过日 时 分 秒 对比是否一致
      const current = shortcuts.value.find((item: ObjectMapType) => {
        const date = (typeof item.value === 'function' && item.value()) || item.value;

        switch (type.value) {
          case 'date':
            return dayjs(date).isSame(dayjs(result as number), 'day');
          case 'daterange':
          case 'datetimerange':
          case 'dateminutesrange':
          case 'datesecondsrange':
            let dayjsType: 'day' | 'minute' | 'second' = 'minute';

            if (type.value === 'daterange') {
              dayjsType = 'day';
            } else if (type.value === 'datesecondsrange') {
              dayjsType = 'second';
            }
            return (
              dayjs(date[0]).isSame(dayjs((result as number[])[0]), dayjsType) &&
              dayjs(date[1]).isSame(dayjs((result as number[])[1]), dayjsType)
            );
          case 'datetime':
          case 'dateminutes':
            return dayjs(date).isSame(dayjs(result as number), 'minute');
          case 'dateseconds':
            return dayjs(date).isSame(dayjs(result as number), 'second');
          default:
            return dayjs(date).isSame(dayjs(result as number), 'day');
            break;
        }
      });
      if (current) {
        shortcutsValue.value = current.label;
        return;
      }
      shortcutsValue.value = '';
    }
    function onHandleNow(date: Date) {
      let result: Date | Date[] | undefined;

      if (!panelTimeVisible.value) {
        if (isRange.value) {
          result = [date, date];
        } else if (type.value === 'date') {
          result = date;
        }
      } else {
        result = NDatejs.handleApproximateDateTime(
          date,
          timePickerType.value,
          DATE_FORMATS_DEFAULT,
          timeDefaultFormat.value,
          pickerOptions.value as PickerOptionsProps,
        );
      }

      selectedShortcut({
        value: () => result,
      });
    }
    function onCancel() {
      emit('cancel');
    }
    function onConfirm() {
      emit('confirm');
    }
    function onSetMergeDateTimeList(list: Date[]) {
      emit('setMergeDateTimeList', list);
    }
    function onNotifyTimePicker(value: boolean) {
      emit('notifyTimePicker', value);
    }
    function onHandleRangeTime(date: PanelTimeType[]) {
      rangeTime.value = date;
      emit('changeRangeTime', date);
    }

    watch(
      [() => panelTime.value, () => picker.value, () => timePicker.value, () => rangeTime.value],
      () => {
        handleConfirmStatus();
        initShortcutsValue();
      },
      {
        immediate: true,
      },
    );

    return () => (
      <div class={classHelper.block}>
        <div v-show={hasShortcuts.value} class={classHelper.e('sidebar')}>
          <NRadioGroup
            size="large"
            modelValue={shortcutsValue.value}
            onUpdate:modelValue={val => (shortcutsValue.value = val as string)}
            disabled={shortcutsDisabled.value}
          >
            {shortcuts.value &&
              shortcuts.value.map((item: ObjectMapType, index: number) => {
                return (
                  <span onClick={handleClickShortcut.bind(this, item)}>
                    <NRadio
                      key={index}
                      label={item.label}
                      onChange={selectedShortcut.bind(this, item)}
                    ></NRadio>
                  </span>
                );
              })}
          </NRadioGroup>
        </div>
        <div
          class={[
            classHelper.e('main'),
            {
              [classHelper.em('main', 'range')]: isRange.value && isEvenPanel.value,
              [classHelper.em('main', 'time')]: timePickerType.value === 'time',
              [classHelper.em('main', 'minutes')]: timePickerType.value === 'minutes',
              [classHelper.em('main', 'seconds')]: timePickerType.value === 'seconds',
            },
          ]}
        >
          {rangeHeaderVisible.value && (
            <RangeHeader
              rangeStore={rangeStore.value}
              isUseInitModel={isUseInitModel.value}
              onPickDate={onPickAndSelectTime}
              onSetMergeDateTimeList={onSetMergeDateTimeList}
              onChangeIsUseInitModel={onChangeIsUseInitModel}
              onChangeRangeTime={onHandleRangeTime}
            ></RangeHeader>
          )}
          <div class={cls(classHelper.e('body'))}>
            {isRange.value ? (
              <div class={cls(classHelper.e('body-wrapper'))}>
                <PanelTable
                  panelDate={leftPicker.value as Date}
                  panelDateList={[leftPicker.value as Date, rightPicker.value as Date]}
                  placement="left"
                  rangeStoreList={rangeStore.value?.list}
                  onChangePanelDate={onChangePanelDate}
                  onHandleRangeStoreList={onHandleRangeStoreList}
                  onNotifyTimePicker={onNotifyTimePicker}
                  onPick={onPickPanelTable}
                  onChangeDateType={onChangeDateType}
                ></PanelTable>
                {isEvenPanel.value && (
                  <PanelTable
                    panelDate={rightPicker.value as Date}
                    panelDateList={[leftPicker.value as Date, rightPicker.value as Date]}
                    placement="right"
                    rangeStoreList={rangeStore.value?.list}
                    onChangePanelDate={onChangeRightPanelDate}
                    onHandleRangeStoreList={onHandleRangeStoreList}
                    onNotifyTimePicker={onNotifyTimePicker}
                    onPick={onPickPanelTable}
                    onChangeDateType={onChangeDateType}
                  ></PanelTable>
                )}
              </div>
            ) : (
              <PanelTable
                panelDate={singlePicker.value}
                panelTime={panelTime.value}
                placement="left"
                rangeStoreList={rangeStore.value?.list}
                onChangePanelDate={onChangePanelDate}
                onChangePanelTime={onChangePanelTime}
                onHandleRangeStoreList={onHandleRangeStoreList}
                onNotifyTimePicker={onNotifyTimePicker}
                onPick={onPickPanelTable}
                onChangeDateType={onChangeDateType}
              ></PanelTable>
            )}
          </div>
          <PanelFooter
            v-show={footerVisible.value}
            v-slots={{ footer: footerSlots }}
            showNow={footerNowVisible.value}
            confirmDisabled={confirmDisabled.value}
            nowButtonText={defaultNowText.value}
            showCancelButton={showCancelButton.value}
            confirmButtonText={confirmButtonText.value}
            cancelButtonText={cancelButtonText.value}
            confirmButtonProps={confirmButtonProps.value}
            cancelButtonProps={cancelButtonProps.value}
            disabledDate={disabledDate.value}
            disabledTime={disabledTime.value}
            onHandleNow={onHandleNow}
            onCancel={onCancel}
            onConfirm={onConfirm}
          ></PanelFooter>
        </div>
      </div>
    );
  },
});
