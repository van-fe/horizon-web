import type { Ref } from 'vue';
import { defineComponent, ref, toRefs, computed, watch, inject } from 'vue';
import { ComponentClassBlock, cls, useNamespace } from '@nio-fe/shared';
import dayjs from '../composables/dayjs';
import { NIcon } from '@nio-fe/icon';
import NInput from '~/components/Input';
import NTimePicker from '~/components/TimePicker';
import { DATE_FORMATS_DEFAULT } from '../composables/default';
import { NDatejs } from '../composables/NDatejs';
import { useRangeHeaderProps } from '../composables/useProps';
import type { NTimePickerType } from '~/components/TimePicker/src/composables/useProps';

export default defineComponent({
  name: `${useNamespace()}RangeHeader`,
  components: {
    NIcon,
    NInput,
    NTimePicker,
  },
  props: useRangeHeaderProps,
  emits: [
    'focus',
    'blur',
    'input',
    'clear',
    'pickDate',
    'setMergeDateTimeList',
    'changeIsUseInitModel',
    'changeRangeTime',
  ],
  setup(props, { emit }) {
    const classHelper = new ComponentClassBlock('range-header');
    const NDatePicker = inject('N_DATE_PICKER') as any;
    const {
      type,
      defaultTime,
      pickerOptions,
      legoLocale,
      beginDisabledTime,
      endDisabledTime,
      pickerDate,
    } = toRefs(NDatePicker.props);
    const { rangeStore, isUseInitModel } = toRefs(props);
    const startDate = ref();
    const startTime = ref();
    const endDate = ref();
    const endTime = ref();
    const selectDatePlaceholderText = computed(
      () => legoLocale.value?.datePicker.selectDate || 'Select date',
    );
    const selectTimePlaceholderText = computed(
      () => legoLocale.value?.datePicker.selectTime || 'Select time',
    );
    const isSelecting = computed(() => {
      return rangeStore.value?.selecting;
    });
    const isSelectFinished = computed(() => {
      return rangeStore.value?.list.length === 2;
    });
    const timePickerType = computed(() => {
      let datetimerangeType: NTimePickerType = 'time';

      switch (type.value) {
        case 'dateminutesrange':
          datetimerangeType = 'minutes';
          break;
        case 'datesecondsrange':
          datetimerangeType = 'seconds';
          break;
        default:
          datetimerangeType = 'time';
          break;
      }
      return datetimerangeType;
    });
    function formatDisplayValue(date: Date) {
      // 展示默认语言格式
      return dayjs(date).format(DATE_FORMATS_DEFAULT);
    }
    // 获取升序后的list
    function gerHandleSortList(list: Date[]) {
      if (list.length < 2) {
        return list;
      }
      const [from, to] = list;
      if (dayjs(from).isValid() && dayjs(to).isValid()) {
        return NDatejs.compareDate(from, to) < 0 ? list : [to, from];
      }
      return list;
    }
    // 合并日期和时间
    function updateMergeDateTimeList() {
      if (startTime.value && endTime.value) {
        const start = NDatejs.setHoursMinutesSecondsMilliseconds(startDate.value, startTime.value);
        const end = NDatejs.setHoursMinutesSecondsMilliseconds(endDate.value, endTime.value);

        const result = gerHandleSortList([start, end]);

        emit('setMergeDateTimeList', result);
      }
    }
    function setStartTime(value: Date) {
      startTime.value = NDatejs.setHoursMinutesSecondsMilliseconds(startDate.value, value);
      // 更新 rangeStore list中日期时刻
      // 未设置日期时，选中当前日期
      if (!isSelectFinished.value) {
        emit('pickDate', startTime.value);
        emit('pickDate', startTime.value);
        emit('changeIsUseInitModel', true);
        return;
      }
      updateMergeDateTimeList();
    }
    function setEndTime(value: Date) {
      endTime.value = NDatejs.setHoursMinutesSecondsMilliseconds(endDate.value, value);
      if (!isSelectFinished.value) {
        emit('pickDate', endTime.value);
        emit('pickDate', endTime.value);
        emit('changeIsUseInitModel', true);
        return;
      }
      updateMergeDateTimeList();
    }
    // 校验当前时刻，是否被禁用，若被禁用，清空默认时刻
    function checkTimeIsDisabled(disabledTime: Ref<Function>, time: Ref<any>) {
      if (
        disabledTime.value &&
        typeof disabledTime.value === 'function' &&
        disabledTime.value(NDatejs.dayjsToObject(time.value))
      ) {
        time.value = null;
      }
    }

    function initDateTime(list: Date[]) {
      // 选中日期时，更新header上显示的日期和时间
      if (list && list.length && (list?.[0] || list?.[1])) {
        // 更新日期
        if (list.length === 1 && isSelecting.value) {
          const firstSelectedDate = formatDisplayValue(list[0]);
          startDate.value = firstSelectedDate;
          endDate.value = firstSelectedDate;
        }
        if (list.length === 2 && !isSelecting.value) {
          const result = gerHandleSortList(list);
          if (dayjs(result[1]).isValid()) {
            startDate.value = formatDisplayValue(result[0]);
            endDate.value = formatDisplayValue(result[1]);
          } else {
            // 输入时，会出现，只有一个有效值情况
            startDate.value = formatDisplayValue(result[0]);
            endDate.value = formatDisplayValue(result[0]);
          }
        }
        // 更新默认时间
        const firstDefault = new Date(new Date(startDate.value).setHours(0, 0, 0, 0));
        const secondDefault = new Date(new Date(endDate.value).setHours(0, 0, 0, 0));
        startTime.value = firstDefault;
        endTime.value = secondDefault;
        // 打开后，点击更改日期选择时，展示默认时间
        if (defaultTime.value && Array.isArray(defaultTime.value)) {
          const parseDefaultTime = defaultTime.value.map(item =>
            NDatejs.setHoursMinutesSecondsMilliseconds(firstDefault, item),
          );
          const [startDefaultTime, endDefaultTime] = parseDefaultTime;
          const initStartDefaultTime = startDefaultTime || firstDefault;
          const initEndDefaultTime = endDefaultTime || secondDefault;

          if (isSelecting.value) {
            startTime.value = initStartDefaultTime;
            endTime.value = initStartDefaultTime;
          } else {
            startTime.value = initStartDefaultTime;
            endTime.value = initEndDefaultTime;
          }
        }
        // list有值，使用list中的时间，不使用默认时间
        if (
          isUseInitModel.value &&
          !isSelecting.value &&
          list.length === 2 &&
          dayjs(list[0]).isValid()
        ) {
          // 默认值处理
          if (dayjs(list[1]).isValid()) {
            [startTime.value, endTime.value] = list;
          } else {
            // 输入时，会出现，只有一个有效值情况
            startTime.value = list[0];
            endTime.value = list[0];
          }
        }
        checkTimeIsDisabled(beginDisabledTime, startTime);
        checkTimeIsDisabled(endDisabledTime, endTime);
        // 更新日期时间
        updateMergeDateTimeList();
      }
    }

    watch(
      () => rangeStore.value.list,
      list => {
        initDateTime(list as Date[]);
      },
      {
        immediate: true,
        deep: true,
      },
    );
    watch(
      [() => startTime.value, () => endTime.value],
      () => {
        const list = [
          NDatejs.handleDateObject(dayjs(startTime.value).toObject()),
          NDatejs.handleDateObject(dayjs(endTime.value).toObject()),
        ];

        emit('changeRangeTime', list);
      },
      {
        immediate: true,
        deep: true,
      },
    );
    watch(
      () => startTime.value,
      () => {
        checkTimeIsDisabled(endDisabledTime, endTime);
      },
    );
    watch(
      () => endTime.value,
      () => {
        checkTimeIsDisabled(beginDisabledTime, startTime);
      },
    );

    return () => (
      <div class={classHelper.block}>
        <div class={cls(classHelper.e('editor'))}>
          <NInput
            class={cls(classHelper.e('input'))}
            model-value={startDate.value}
            disabled={isSelecting.value}
            placeholder={selectDatePlaceholderText.value}
            size="medium"
            readonly={true}
          ></NInput>
          <NTimePicker
            class={cls(classHelper.e('input'))}
            size="medium"
            datePlacement="left"
            popperClass={cls(classHelper.e('time-picker-panel'))}
            model-value={startTime.value}
            clearable={false}
            disabled={isSelecting.value}
            onUpdate:model-value={setStartTime}
            type={timePickerType.value}
            pickerOptions={pickerOptions.value}
            prefixIcon=""
            placeholder={selectTimePlaceholderText.value}
            disabledTime={beginDisabledTime.value}
            pickerDate={pickerDate.value}
            supportSecondDay={false}
            toBody={false}
          />
        </div>
        <span class={cls(classHelper.e('separator'))}>-</span>
        <div class={cls(classHelper.e('editor'))}>
          <NInput
            class={cls(classHelper.e('input'))}
            model-value={endDate.value}
            disabled={isSelecting.value}
            placeholder={selectDatePlaceholderText.value}
            size="medium"
            readonly={true}
          ></NInput>
          <NTimePicker
            class={cls(classHelper.e('input'))}
            size="medium"
            datePlacement="right"
            popperClass={cls(classHelper.e('time-picker-panel'))}
            model-value={endTime.value}
            clearable={false}
            disabled={isSelecting.value}
            onUpdate:model-value={setEndTime}
            type={timePickerType.value}
            pickerOptions={pickerOptions.value}
            prefixIcon=""
            placeholder={selectTimePlaceholderText.value}
            disabledTime={endDisabledTime.value}
            pickerDate={pickerDate.value}
            supportSecondDay={false}
            toBody={false}
          />
        </div>
      </div>
    );
  },
});
