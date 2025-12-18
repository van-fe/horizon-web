import { defineComponent, ref, toRefs, computed, inject, watch } from 'vue';
import { ComponentClassBlock, cls, useNamespace } from '@nio-fe/shared';
import dayjs from '../composables/dayjs';
import cloneDeep from 'lodash/cloneDeep';
import { NIcon } from '@nio-fe/icon';

export default defineComponent({
  name: `${useNamespace()}PanelHeader`,
  components: {
    NIcon,
  },
  props: {
    panelDate: {
      type: [Date, String],
    },
    panelDateList: {
      type: Array,
    },
    placement: String,
    rangeStoreList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  emits: ['changePanelDate', 'changeDateType'],
  setup(props, { emit }) {
    const classHelper = new ComponentClassBlock('date-picker-panel-header');
    const { panelDate, panelDateList, placement, rangeStoreList } = toRefs(props);
    // 渲染第一个面板年月日YMR对象
    const calendarDate = computed(() => {
      return dayjs(panelDate.value).toObject();
    });
    const NDatePicker = inject('N_DATE_PICKER') as any;
    const {
      type,
      isRange,
      isEvenPanel,
      disabledDate,
      disabledSwitchButton,
      showYearButton,
      unlinkPanelsProps,
      locale,
      legoLocale,
    } = toRefs(NDatePicker.props);
    const singleMonthButtonTypes = [
      'daterange',
      'datetimerange',
      'dateminutesrange',
      'datesecondsrange',
    ];
    const hideMonthButtonTypes = ['year', 'yearrange', 'month', 'monthrange'];
    // 是否显示整体月份切换按钮
    const showMonthButton = computed(() => {
      return !hideMonthButtonTypes.includes(type.value);
    });
    const showSingleMonthButton = computed(() => singleMonthButtonTypes.includes(type.value));
    // 是否显示单个切换按钮
    const leftYear = computed(() => {
      return (
        showYearButton.value &&
        (!isRange.value ||
          (isRange.value && (unlinkPanelsProps.value || placement.value === 'left')))
      );
    });
    const leftMonth = computed(() => {
      return (
        showMonthButton.value &&
        (!showSingleMonthButton.value ||
          unlinkPanelsProps.value ||
          (showSingleMonthButton.value && placement.value === 'left'))
      );
    });
    const rightMonth = computed(() => {
      return (
        showMonthButton.value &&
        (!showSingleMonthButton.value ||
          unlinkPanelsProps.value ||
          (showSingleMonthButton.value && (!isEvenPanel.value || placement.value === 'right')))
      );
    });
    const rightYear = computed(() => {
      return (
        showYearButton.value &&
        (!isRange.value ||
          (isRange.value &&
            (unlinkPanelsProps.value || !isEvenPanel.value || placement.value === 'right')))
      );
    });
    const showSingleSideButton = computed(() => !showYearButton.value || !showMonthButton.value);
    const displayDate = computed(() => {
      let title;
      const month = `${legoLocale.value?.datePicker.months[calendarDate.value.months] || ''}`;
      const yearLabel = legoLocale.value?.datePicker.year || '';
      switch (type.value) {
        case 'week':
        case 'date':
        case 'daterange':
        case 'datetimerange':
        case 'dateminutesrange':
        case 'datesecondsrange':
        case 'datetime':
        case 'dateminutes':
        case 'dateseconds':
        case 'panel':
          if (locale.value?.current === 'En') {
            title = `<span class="month">${month}</span> <span class="year">${calendarDate.value.years}</span>`;
          } else {
            title = `<span class="year">${calendarDate.value.years}${yearLabel}</span><span class="month">${month}</span>`;
          }
          break;
        case 'year':
        case 'yearrange':
          title = `${displayYearValue()}`;
          break;
        case 'month':
        case 'monthrange':
          title = `<span class="year">${calendarDate.value.years}${yearLabel}</span>`;
          break;
        default:
          title = `<span class="year">${calendarDate.value.years}${yearLabel}</span><span class="month">${month}</span>`;
          break;
      }
      return title;
    });
    // 当前面板年月第一天 range分left、right，当为right时，转化为左侧第一个面板的年月第一天，按钮切换更新的是左侧面板的年月
    const firstDayOfMonthYear = computed(() => {
      let year = calendarDate.value.years;
      let month = calendarDate.value.months;

      if (placement.value === 'right') {
        if (type.value === 'monthrange') {
          year = calendarDate.value.years - 1;
          month = 0;
        } else if (type.value === 'yearrange') {
          year = calendarDate.value.years - 10;
          month = 0;
        } else {
          month = calendarDate.value.months - 1;
        }
      }

      return new Date(year, month, 1);
    });
    const hasDisabledSwitchButtonProps = computed(
      () =>
        disabledSwitchButton.value &&
        disabledDate.value &&
        typeof disabledDate.value === 'function',
    );
    const leftYearDisabled = ref(false);
    const rightYearDisabled = ref(false);
    const leftMonthDisabled = ref(false);
    const rightMonthDisabled = ref(false);

    function changeYear(value: number) {
      const parseDate = getParsedYearDate(value);

      if (!checkSelectedDate(parseDate)) {
        return;
      }
      if (!checkUnlinkPanelsDate('year', value)) {
        return;
      }
      emit('changePanelDate', parseDate);
    }
    function changeMonth(value: number) {
      const parseDate = getParsedMonthDate(value);

      if (!checkSelectedDate(parseDate)) {
        return;
      }
      if (!checkUnlinkPanelsDate('month', value)) {
        return;
      }
      emit('changePanelDate', parseDate);
    }
    function getParsedYearDate(value: number) {
      const list = ['year', 'yearrange'];
      const diff = list.includes(type.value) ? value * 10 : value;
      const date = cloneDeep(firstDayOfMonthYear.value);

      return dayjs(date.setFullYear(date.getFullYear() + diff)).toDate();
    }
    function getParsedMonthDate(value: number) {
      const date = cloneDeep(firstDayOfMonthYear.value);

      return dayjs(date.setMonth(date.getMonth() + value)).toDate();
    }
    // 检测当前面板中是否有可选的日期
    function checkSelectedDate(parseDate: Date) {
      if (!hasDisabledSwitchButtonProps.value) {
        return true;
      }
      let result = false;
      const total = dayjs(parseDate).daysInMonth();

      for (let index = 0; index <= total; index++) {
        const current = dayjs(parseDate).add(index, 'day').toDate();
        if (!disabledDate.value?.(current)) {
          result = true;
          break;
        }
      }
      return result;
    }
    // 检测当前面板是否小于或者大于另外一个面板日期
    function checkUnlinkPanelsDate(dateType: string, diff: number) {
      if (!unlinkPanelsProps.value) {
        return true;
      }
      const year0 = dayjs(panelDateList.value![0] as Date).year();
      const year1 = dayjs(panelDateList.value![1] as Date).year();
      const month0 = dayjs(panelDateList.value![0] as Date).month();
      const month1 = dayjs(panelDateList.value![1] as Date).month();

      if (
        (placement.value === 'left' && diff === 1) ||
        (placement.value === 'right' && diff === -1)
      ) {
        if (dateType === 'year') {
          if (type.value === 'monthrange') {
            return year0 + 1 < year1;
          }
          if (type.value === 'yearrange') {
            return year0 + 10 < year1;
          }
          return year1 * 12 + month1 - (year0 * 12 + month0 + 1) >= 12;
        }
        if (dateType === 'month') {
          const nextMonth = (month0 + 1) % 12;
          const yearOffset = month0 + 1 >= 12 ? 1 : 0;
          return new Date(year0 + yearOffset, nextMonth) < new Date(year1, month1);
        }
      }
      return true;
    }
    function displayYearValue() {
      const beginYear = Math.floor(calendarDate.value.years / 10) * 10;

      return `${beginYear}-${beginYear + 10}`;
    }
    function getOperationBtnStatus(value: Date, type: string, diff: number) {
      if (!checkSelectedDate(value)) {
        return true;
      }
      if (!checkUnlinkPanelsDate(type, diff)) {
        return true;
      }
      return false;
    }
    function handleClickHeaderCenter(e: MouseEvent) {
      const target = e.target as HTMLElement;

      if (target?.className?.includes('year')) {
        emit('changeDateType', 'year');
        return;
      }
      if (target?.className?.includes('month')) {
        emit('changeDateType', 'month');
        return;
      }
    }

    watch(
      [() => firstDayOfMonthYear.value, () => rangeStoreList.value, () => panelDateList.value],
      () => {
        // left year
        leftYearDisabled.value = getOperationBtnStatus(getParsedYearDate(-1), 'year', -1);
        // right year
        rightYearDisabled.value = getOperationBtnStatus(getParsedYearDate(1), 'year', 1);
        // left month
        leftMonthDisabled.value = getOperationBtnStatus(getParsedMonthDate(-1), 'month', -1);
        // right month
        rightMonthDisabled.value = getOperationBtnStatus(getParsedMonthDate(1), 'month', 1);
      },
      {
        immediate: true,
      },
    );

    return () => (
      <div class={classHelper.block}>
        <div class={cls(classHelper.e('container'))}>
          <span
            class={[
              cls(classHelper.e('side')),
              { [classHelper.em('side', 'single')]: showSingleSideButton.value },
            ]}
          >
            {leftYear.value && (
              <span onClick={changeYear.bind(this, -1)}>
                <NIcon
                  class={[cls(classHelper.e('icon')), { disabled: leftYearDisabled.value }]}
                  name="toggle_left"
                ></NIcon>
              </span>
            )}
            {leftMonth.value && (
              <span onClick={changeMonth.bind(this, -1)}>
                <NIcon
                  class={[cls(classHelper.e('icon')), { disabled: leftMonthDisabled.value }]}
                  name="arrow_left"
                ></NIcon>
              </span>
            )}
          </span>
          <span
            class={cls(classHelper.e('center'))}
            v-html={displayDate.value}
            onClick={handleClickHeaderCenter.bind(this)}
          ></span>
          <span
            class={[
              cls(classHelper.e('side')),
              { [classHelper.em('side', 'single')]: showSingleSideButton.value },
            ]}
          >
            {rightMonth.value && (
              <span onClick={changeMonth.bind(this, 1)}>
                <NIcon
                  class={[cls(classHelper.e('icon')), { disabled: rightMonthDisabled.value }]}
                  name="arrow_right"
                ></NIcon>
              </span>
            )}
            {rightYear.value && (
              <span onClick={changeYear.bind(this, 1)}>
                <NIcon
                  class={[cls(classHelper.e('icon')), { disabled: rightYearDisabled.value }]}
                  name="toggle_right"
                ></NIcon>
              </span>
            )}
          </span>
        </div>
      </div>
    );
  },
});
