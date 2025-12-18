import {
  defineComponent,
  ref,
  h,
  toRefs,
  reactive,
  computed,
  watch,
  provide,
  inject,
  nextTick,
} from 'vue';
import { useDatePickerProps } from './composables/useProps';
import type { LegoSetupContext } from '@nio-fe/shared';
import {
  useLowCaseNamespace,
  pickFromObject,
  ComponentClassBlock,
  cls,
  useNamespace,
} from '@nio-fe/shared';
import dayjs from '../src/composables/dayjs';
import NPopover from '~/components/Popover/src/Popover';
import PanelTrigger from './calendar-components/panel-trigger';
import PanelContent from './calendar-components/panel-content';
import eventOutside from '~/directives/v-event-outside';
import { NDatejs } from './composables/NDatejs';
import {
  FORMATS_DEFAULT_MAP,
  DATE_FORMATS_DEFAULT,
  TIME_FORMATS_DEFAULT,
} from './composables/default';
import type {
  ObjectMapType,
  ModelValueType,
  PanelTimeType,
  RangeStoreType,
  DatePickerProps,
  DatePickerType,
} from './composables/useProps';
import type { DatePickerEmits } from './composables/useEmits';
import { useDatePickerEmits } from './composables/useEmits';
import { defaultLocale, localeInjectKey } from '~/provides/localable';
import {
  NFormDisabledInjectedKey,
  NFormItemTriggerInjectedKey,
} from '~/components/Form/src/utils/injectedKeys';
import type { DatePickerSlots } from './composables/useSlots';
import { useDatePickerSlots } from './composables/useSlots';
import type { DatePickerExposes } from './composables/useExposes';
import { useDatePickerExposes } from './composables/useExposes';
import cloneDeep from 'lodash/cloneDeep';

export default defineComponent({
  name: `${useNamespace()}DatePicker`,
  desc: '选择或输入日期的控件。当用户需要输入一个日期，通过点击触发器，弹出日期面板进行选择',
  components: {
    NPopover,
    PanelTrigger,
    PanelContent,
  },
  directives: {
    eventOutside,
  },
  props: useDatePickerProps,
  emits: useDatePickerEmits,
  slots: useDatePickerSlots,
  exposes: useDatePickerExposes,
  setup(
    props,
    {
      attrs,
      slots,
      emit,
      expose,
    }: LegoSetupContext<DatePickerEmits, DatePickerSlots, DatePickerExposes>,
  ) {
    const classHelper = new ComponentClassBlock('date-picker');
    const classHelperReference = new ComponentClassBlock('date-picker-reference');
    const classHelperTrigger = new ComponentClassBlock('date-picker-trigger');
    const locale = inject(localeInjectKey, defaultLocale);
    const visible = ref(false);
    const {
      modelValue,
      valueFormat,
      type: dateType,
      showEmbed,
      showFooter,
      panelNumber,
      disabled,
      defaultTime,
      disabledDate,
      pickerOptions,
      disabledTime,
      inputStatus,
      showTimeTooltip,
      popperClass,
      placement,
      fallbackPlacements,
      preventOverflow,
      toBody,
      width: propsWidth,
      unlinkPanels,
      isHoverDisplayValue,
    } = toRefs<DatePickerProps>(props);
    // 记录是否正在更改type
    const isChangeType = ref(false);
    const type = ref(dateType.value);
    const PanelReferenceRef = ref<HTMLElement | null>(null);
    const PanelTriggerRef = ref<null | { input: HTMLInputElement }>(null);
    const PanelContentRef = ref<HTMLElement | null>(null);

    watch(dateType, val => {
      type.value = val;
    });

    const originalAttrs = computed(() =>
      pickFromObject(attrs, [
        'id',
        'name',
        'tabindex',
        'onKeydown',
        'onKeypress',
        'onKeyup',
        'onClick',
        /^data-[\w-]+$/,
      ]),
    );
    // dayjs替换后，兼容yyyy、dd -> YYYY、DD
    const parseValueFormat = computed(() =>
      valueFormat.value.replace(/y/g, 'Y').replace(/d/g, 'D'),
    );
    const isRangeType = computed(() => {
      const rangeTypeList = [
        'daterange',
        'datetimerange',
        'dateminutesrange',
        'datesecondsrange',
        'monthrange',
        'yearrange',
        'week',
      ];
      return rangeTypeList.includes(type.value);
    });
    const weekType = computed(() => type.value === 'week');
    const userModelValue = computed(() => {
      if (weekType.value) {
        const parseValue = NDatejs.parseDayjsDate(modelValue.value, parseValueFormat.value).startOf(
          'week',
        );
        return parseValue.isValid() ? [parseValue.toDate(), parseValue.add(6, 'day').toDate()] : '';
      }
      if (isRangeType.value) {
        return modelValue.value || [];
      }
      return modelValue.value;
    });
    // 记录打开面板时的输入框值
    const originalUserModelValue = ref<ModelValueType>(userModelValue.value);
    // 记录选中值
    const selectedModelValue = ref<ModelValueType>(userModelValue.value);
    const originalDatePicker = ref<ModelValueType>(userModelValue.value);
    // 日期+时间
    const originalTimePicker = ref(userModelValue.value);
    // 解析用户输入date
    const picker = computed(() => {
      return handlePickerValue(originalDatePicker.value);
    });
    // 用户选择的日期 供内部cell是否选中
    const selectedPicker = computed(() => {
      return handlePickerValue(
        isHoverDisplayValue.value ? selectedModelValue.value : originalDatePicker.value,
      );
    });
    // panelDate根据用户输入来展示哪2个月
    // 记录第一个版面日期，即左侧第一个面板日期
    const panelDate = ref(Array.isArray(picker.value) ? picker.value[0] : picker.value);
    // 日期范围时右侧面版日期
    const rightPanelDate = ref(Array.isArray(picker.value) ? picker.value[1] : picker.value);
    // unlinkPanels 在日期范围时才生效
    const unlinkPanelsProps = computed(() => {
      const list = [
        'daterange',
        'monthrange',
        'yearrange',
        'datetimerange',
        'dateminutesrange',
        'datesecondsrange',
      ];
      return unlinkPanels.value && list.includes(type.value);
    });
    const pickerDate = ref<PanelTimeType>(NDatejs.dayjsToObject(panelDate.value));
    const updateTimePosCount = ref(1);
    // record click or mousemove date list
    let rangeStore = reactive<RangeStoreType>({
      list:
        isRangeType.value && (picker.value as (Date | string)[])
          ? (picker.value as (Date | string)[])
          : [],
      selecting: false,
    });
    const panelTimeVisible = computed(() => {
      const timeList = ['datetime', 'dateminutes', 'dateseconds'];
      return timeList.includes(type.value);
    });
    const timePickerType = computed(() => {
      const timeType = type.value.split('date')[1];
      return panelTimeVisible.value && timeType ? timeType : '';
    });
    const timeDefaultFormat = computed(() => {
      return (FORMATS_DEFAULT_MAP as ObjectMapType)[timePickerType.value] || TIME_FORMATS_DEFAULT;
    });
    // 解析用户输入time
    const timePicker = computed(() => {
      if (!panelTimeVisible.value) {
        return {};
      }
      const parseValue = NDatejs.parseDayjsDate(originalTimePicker.value, parseValueFormat.value);
      return NDatejs.dayjsToObject(parseValue);
    });
    const panelTime = ref(timePicker.value);
    const rangeTime = ref<PanelTimeType[]>([]);
    // 底部操作按钮是否显示，日期选择时默认隐藏，日期时间选择时一直显示
    const isFooter = computed(() => {
      const hasFooterTypeList = [
        'datetime',
        'dateminutes',
        'dateseconds',
        'datetimerange',
        'dateminutesrange',
        'datesecondsrange',
      ];
      return hasFooterTypeList.includes(type.value) ? true : !!slots.footer || showFooter.value;
    });
    const isPanelType = computed(() => {
      // type === 'panel' 暂时兼容，后期大版本废弃，仅使用showEmbed确定
      return type.value === 'panel' || showEmbed.value;
    });
    const isEvenPanel = computed(() => {
      if (weekType.value) {
        return false;
      }
      return panelNumber.value === 2 ? true : panelNumber.value !== 1;
    });
    const triggerStyle = computed(() => {
      if (typeof propsWidth.value === 'string' && propsWidth.value.indexOf('%') > -1) {
        return {
          width: `${propsWidth.value} !important`,
        };
      }
      const width = parseFloat(propsWidth.value as string);
      if (isNaN(width)) {
        return {};
      }
      return {
        width: `${width}px !important`,
      };
    });
    const rangeHeaderVisible = computed(() => {
      const rangeHeaderList = ['datetimerange', 'dateminutesrange', 'datesecondsrange'];
      return rangeHeaderList.includes(type.value);
    });
    // record input by user
    const isUserInputStatus = ref(false);
    const isInitSelectTime = ref(false);
    const isCanInitPicker = computed(
      () => rangeHeaderVisible.value || isInitSelectTime.value || isUserInputStatus.value,
    );
    const isTimePicker = ref(false);
    // 当前选择的日期时间
    const currentMergeDateTime = computed(() => {
      const parseDateValue = NDatejs.parseDayjsDate(
        originalDatePicker.value,
        parseValueFormat.value,
      );
      const parseTimeValue = NDatejs.parseDayjsDate(
        originalTimePicker.value,
        parseValueFormat.value,
      );
      const parseDateString = parseDateValue.format(DATE_FORMATS_DEFAULT);
      const parseTimeString = parseTimeValue.format(timeDefaultFormat.value);
      let mergeDateTime = dayjs(`${parseDateString} ${parseTimeString}`).toDate();

      if (!parseTimeValue.isValid()) {
        mergeDateTime = dayjs(parseDateString).toDate();
      }

      return mergeDateTime;
    });

    // form-item validate trigger
    const formItemTrigger = inject(NFormItemTriggerInjectedKey, undefined);
    // because date-picker use n-input, so provide NFormItemTriggerInjectedKey as undefined
    provide(NFormItemTriggerInjectedKey, undefined);

    // form disabled inject
    const formDisabled = inject(NFormDisabledInjectedKey, undefined);
    const isDisabled = computed(() => disabled?.value ?? formDisabled?.value ?? false);

    function handlePickerValue(currentModelValue: ModelValueType) {
      let result: (Date | string)[] | Date | string;
      if (Array.isArray(currentModelValue)) {
        result = currentModelValue.map(item => {
          const parseValue = NDatejs.parseDayjsDate(item, parseValueFormat.value);
          return parseValue.isValid() ? parseValue.toDate() : '';
        });
      } else {
        const parseValue = NDatejs.parseDayjsDate(currentModelValue, parseValueFormat.value);

        result = parseValue.isValid() ? parseValue.toDate() : '';
      }
      return result;
    }
    function onShow() {
      visible.value = true;
    }
    function onHide() {
      visible.value = false;
    }
    function onClickPanelTrigger() {
      if (!isDisabled.value) {
        onShow();
      }
    }
    function checkClickNTimePicker(currentElement: HTMLElement) {
      let currentElementClassName;
      while (currentElement.className.indexOf(`${useLowCaseNamespace()}-time-picker`) < 0) {
        currentElement = currentElement.parentNode as HTMLElement;
        currentElementClassName = currentElement!.className;
        if (typeof currentElementClassName === 'undefined' || currentElementClassName === '') {
          // body或者没找到
          break;
        }
      }
      if (
        currentElementClassName &&
        currentElementClassName.indexOf(`${useLowCaseNamespace()}-time-picker`) > -1
      ) {
        return true;
      }
      return false;
    }
    function onClickOutsidePanelDate(currentElement: HTMLElement) {
      if (isPanelType.value || checkClickNTimePicker(currentElement)) {
        return;
      }
      if (visible.value && !PanelReferenceRef.value!.contains(currentElement)) {
        onCancel();
      }
    }

    function focus() {
      PanelTriggerRef.value?.input?.focus();
    }

    function onFocus(event: Event) {
      if (!isDisabled.value) {
        emit('focus', event);
        onShow();
      }
    }
    function onBlur(event: Event) {
      if (!isDisabled.value) {
        emit('blur', event);
        nextTick().then(() => {
          formItemTrigger?.('blur');
        });
      }
    }
    function onClear() {
      handleDateModelValue(null);
      emitModelValue(null);
      onChangeTimePicker(null);
      onChangePanelTime({});
      initRangeStore();
      onHide();
      // focus();
    }
    function onChangeDateType(value: DatePickerType) {
      isChangeType.value = true;
      type.value = value;
    }
    function onChangePanelDate(date: Date | string) {
      panelDate.value = date;
    }
    function onChangeRightPanelDate(date: Date | string) {
      rightPanelDate.value = date;
    }
    function onChangePanelTime(date: PanelTimeType) {
      panelTime.value = date;
    }
    function onChangeRangeTime(date: PanelTimeType[]) {
      rangeTime.value = date;
    }
    function onChangeRangeStoreList(value: (Date | string)[]) {
      rangeStore.list = value;
    }
    function handleDefaultTime(value: ModelValueType) {
      let result = value;

      if (defaultTime?.value && value) {
        const types1 = ['daterange', 'week'];
        const types2 = ['date'];
        // 数组
        if (types1.includes(type.value) && Array.isArray(defaultTime.value)) {
          result = (value as Date[]).map((item, index) =>
            NDatejs.setHoursMinutesSecondsMilliseconds(item, (defaultTime.value as any[])[index]),
          );
        }
        if (types2.includes(type.value) && !Array.isArray(defaultTime.value)) {
          result = NDatejs.setHoursMinutesSecondsMilliseconds(value as Date, defaultTime.value);
        }
      }
      return result;
    }
    function handleDateModelValue(pickValue: ModelValueType) {
      // 设置默认值
      const date = handleDefaultTime(pickValue);
      let result;

      if (Array.isArray(date)) {
        result = date.map(item => handleValueFormat(item));
      } else {
        result = handleValueFormat(date);
      }
      onChangeDatePicker(result);
    }
    function handleValueFormat(date: Date | string | number | null) {
      if (!date || !parseValueFormat.value) {
        return date;
      }
      if (parseValueFormat.value === 'timestamp') {
        return dayjs(date).valueOf();
      }
      if (parseValueFormat.value === 'X') {
        return parseInt(`${dayjs(date).valueOf() / 1000}`);
      }
      return dayjs(date).format(parseValueFormat.value);
    }
    // v-model绑定值
    function emitModelValue(v: ModelValueType) {
      const value = beforeEmitModelValue(v);
      if (userModelValue.value === value) {
        return;
      }
      emit('update:modelValue', value);
      emit('change', value);
      nextTick().then(() => {
        formItemTrigger?.('change');
      });
    }
    function beforeEmitModelValue(v: ModelValueType) {
      if (weekType.value && Array.isArray(v)) {
        return (v as (Date | string | number | null)[])[0];
      }
      return v;
    }
    function onChangeUserInputStatus(status: boolean) {
      isUserInputStatus.value = status;
    }
    function onChangeSelectTimeStatus(status: boolean) {
      isInitSelectTime.value = status;
    }
    function onSetMergeDateTimeList(list: Date[]) {
      handleDateModelValue(list);
    }
    // trigger emit pick event
    function onPanelTriggerPick(date: Date) {
      onChangeUserInputStatus(true);
      onPick(date);
    }
    // panel content emit pick event
    function onPanelContentPick(date: Date) {
      onChangeUserInputStatus(false);
      onPick(date);
    }
    // 更新type时，面板日期更新为选择的日期
    function handlePanelDateByChangeType(date: Date | Date[]) {
      // 不是更改type，走正常流程
      if (!isChangeType.value) {
        return false;
      }
      // 面板日期更新为选择的日期
      if (!Array.isArray(date)) {
        if (type.value === 'year') {
          const year = new Date(date).getFullYear();
          const oldPanelDate = NDatejs.isEmpty(panelDate.value) ? new Date() : panelDate.value;

          onChangePanelDate(dayjs(oldPanelDate).year(year).toDate());
        } else if (type.value === 'month') {
          const month = new Date(date).getMonth();
          const oldPanelDate = NDatejs.isEmpty(panelDate.value) ? new Date() : panelDate.value;

          onChangePanelDate(dayjs(oldPanelDate).month(month).toDate());
        }
      }
      // 将type更新为用户设置的type
      type.value = dateType.value;
      isChangeType.value = false;
      return true;
    }
    function onPick(date: Date | Date[]) {
      // 深度选择年月时，不触发
      if (handlePanelDateByChangeType(date)) {
        return;
      }
      let result;
      // emit回来统一为date对象，统一value format
      if (isRangeType.value) {
        let list: (Date | string)[] = [];
        if (!Array.isArray(date)) {
          if (!rangeStore.selecting) {
            // 再次重新选择时
            rangeStore.list = [];
            rangeStore.selecting = true;
          }
          // 记录选中cell
          onHandleRangeStoreList(date);
          // 点击时，缓存
          if (rangeStore.list.length !== 2) {
            handleDateModelValue(rangeStore.list);
            return;
          }
          // 选择结束
          rangeStore.selecting = false;
          list = rangeStore.list;
        } else {
          list = date;
          rangeStore.list = list;
        }
        // 比较时间先后
        const [from, to] = list;

        if (dayjs(from).isValid() && dayjs(to).isValid()) {
          result = NDatejs.compareDate(from, to) < 0 ? list : [to, from];
        } else {
          result = list;
        }
      } else {
        result = date;
      }
      handleDateModelValue(result);

      // 是否 更新初始化选中
      if (isCanInitPicker.value) {
        initPicker();
      }
      // user input
      if (isUserInputStatus.value) {
        onChangeUserInputStatus(false);
        const c1 =
          Array.isArray(result) && dayjs(result[0]).isValid() && dayjs(result[1]).isValid();
        const c2 = !Array.isArray(result) && dayjs(result).isValid();
        if (c1 || c2) {
          emitModelValue(originalDatePicker.value);
        }
        return;
      }

      // 不符合配置规则时间，清空选择的时间
      if (panelTimeVisible.value && !checkDateTime(currentMergeDateTime.value)) {
        originalTimePicker.value = null;
        return;
      }
      // emit and hide by footer
      if (isFooter.value) {
        if (isHoverDisplayValue.value) {
          emitModelValue(originalDatePicker.value);
          selectedModelValue.value = originalDatePicker.value;
        }
        return;
      }
      emitModelValue(originalDatePicker.value);
      onHide();
    }
    function onChangeDatePicker(date: ModelValueType) {
      originalDatePicker.value = date;
    }
    // 日期+时间字符串
    function onChangeTimePicker(date: ModelValueType) {
      originalTimePicker.value = date;
    }
    function initPicker(defaultValue?: (Date | string)[] | Date | string) {
      const initValue = defaultValue || picker.value;
      const value: Date | string = Array.isArray(initValue) ? initValue[0] : initValue;
      const value1: Date | string = Array.isArray(initValue) ? initValue[1] : initValue;

      onChangePanelDate(value);
      onChangeRightPanelDate(value1);
      onChangePickerDate(NDatejs.dayjsToObject(value));
      handleDateModelValue(initValue);

      if (isUserInputStatus.value) {
        // 初始化 记录打开面板时的输入框值
        initRecordInputValue(initValue);
      }
      if (!panelTimeVisible.value) {
        // 重置原始值
        initRangeStore();
      } else {
        onChangeTimePicker(initValue);
        onUpdateTimePosition();
      }
    }
    function onCancel() {
      if (isHoverDisplayValue.value) {
        // 处理hover值
        handleDateModelValue(originalUserModelValue.value);
      }
      onHide();
    }
    function onConfirm() {
      // merge date and time
      if (!panelTimeVisible.value) {
        if (!checkDate(originalDatePicker.value)) {
          return;
        }
        emitModelValue(originalDatePicker.value);
        onHide();
        return;
      }
      if (!checkDateTime(currentMergeDateTime.value)) {
        return;
      }
      handleDateModelValue(currentMergeDateTime.value);
      emitModelValue(originalDatePicker.value);
      onHide();
    }
    function checkDate(date: ModelValueType) {
      if (disabledDate?.value && typeof disabledDate?.value === 'function') {
        // daterange
        if (
          Array.isArray(date) &&
          (disabledDate?.value?.(new Date((date as (Date | string | number)[])[0])) ||
            disabledDate?.value?.(new Date((date as (Date | string | number)[])[1])))
        ) {
          return false;
        }
        if (
          !Array.isArray(date) &&
          disabledDate?.value?.(new Date(date as Date | string | number))
        ) {
          return false;
        }
      }
      return true;
    }
    function checkDateTime(date: Date | string | number) {
      if (!checkDate(date)) {
        return;
      }
      let currentDate = NDatejs.dayjsToObject(date);

      currentDate = {
        ...currentDate,
        year: currentDate.years, //暂时保留原参数，后期大版本废弃
        month: currentDate.months,
        day: currentDate.date,
      };
      return !(
        disabledTime?.value &&
        typeof disabledTime?.value === 'function' &&
        disabledTime?.value?.(currentDate)
      );
    }
    function onChangePickerDate(value: PanelTimeType) {
      pickerDate.value = value;
    }
    function onUpdateTimePosition() {
      if (panelTimeVisible.value) {
        updateTimePosCount.value++;
      }
    }
    function handleEmitPickDateTime() {
      let result;
      if (Array.isArray(originalDatePicker.value)) {
        result = originalDatePicker.value.map(item => {
          return fetchYearsMonthsDates(item);
        });
        // 日期时间范围
        if (rangeHeaderVisible.value && rangeTime.value.length) {
          result = result.map((item, index) => {
            return {
              ...item,
              ...rangeTime.value[index],
            };
          });
        }
      } else {
        const dateObject = fetchYearsMonthsDates(originalDatePicker.value);

        result = {
          ...panelTime.value,
          ...dateObject,
        };
      }
      emit('pick', result);
    }
    function fetchYearsMonthsDates(value: Date | string | number | null) {
      const { years, months, date } = NDatejs.dayjsToObject(
        NDatejs.parseDayjsDate(value, parseValueFormat.value),
      );

      return {
        years,
        months,
        date,
        year: years, //暂时保留原参数，后期大版本废弃
        month: months,
        day: date,
      };
    }
    function initRangeStore() {
      rangeStore = reactive({
        list:
          isRangeType.value && (picker.value as (Date | string)[])
            ? (picker.value as (Date | string)[])
            : [],
        selecting: false,
      });
    }
    function onHandleRangeStoreList(date: Date | string) {
      if (rangeStore.list.length <= 1) {
        rangeStore.list.push(date);
      } else if (!dayjs(rangeStore.list[1]).isSame(dayjs(date), 'second')) {
        rangeStore.list.splice(1, 1, date);
      }
      rangeStore.selecting = true;
    }
    function onHandleHoverList(date: Date | string) {
      if (!isHoverDisplayValue.value) {
        return;
      }
      let emitResult: (Date | string) | (Date | string)[] = date;

      if (isRangeType.value) {
        let result = [];
        if (!rangeStore.selecting) {
          // 日期范围只选了一个值，还未结束时
          result = [date, (userModelValue.value as Date[])[1]];

          if (!dayjs(date).isValid()) {
            result = (originalUserModelValue.value as Date[]) || [];
          }
        } else {
          // 日期范围 选择结束
          result = [rangeStore.list[0], date];
        }
        emitResult = result;
      }

      let handledModelValue = originalUserModelValue.value;

      if (isFooter.value) {
        handledModelValue = selectedModelValue.value;
      }
      // 如果是有效值，使用emitResult，否则使用初始值 handledModelValue
      handleDateModelValue(dayjs(date).isValid() ? emitResult : handledModelValue);
    }
    function changeYear(diff: number) {
      const currentPanelDate = cloneDeep(panelDate.value);
      const value = dayjs(
        (currentPanelDate as Date).setFullYear((currentPanelDate as Date).getFullYear() + diff),
      ).toDate();
      onChangePanelDate(value);
    }
    function changeMonth(diff: number) {
      const currentPanelDate = cloneDeep(panelDate.value);
      const value = dayjs(
        (currentPanelDate as Date).setMonth((currentPanelDate as Date).getMonth() + diff),
      ).toDate();
      onChangePanelDate(value);
    }
    function handleEmitPopperChange() {
      emit('popperChange', visible.value);
    }
    function onNotifyTimePicker(value: boolean) {
      isTimePicker.value = value;
    }
    function onShortcutClick(value: ObjectMapType) {
      emit('shortcutClick', value);
    }
    function manualControlPopperVisible(visible: boolean) {
      if (visible) {
        onShow();
      } else {
        onHide();
      }
    }
    function initRecordInputValue(value: ModelValueType) {
      if (!isHoverDisplayValue.value) {
        return;
      }
      // 初始化 记录打开面板时的输入框值
      originalUserModelValue.value = value;
      selectedModelValue.value = value;
    }

    const popoverSlots = {
      reference: () => (
        <div
          ref={PanelReferenceRef}
          class={[
            cls(classHelperTrigger.block),
            {
              [classHelper.m('disabled')]: isDisabled.value,
              [classHelper.m('reference')]: slots.reference,
            },
          ]}
          style={triggerStyle.value}
          onClick={onClickPanelTrigger}
        >
          {slots.reference ? (
            slots.reference({
              reference: userModelValue.value,
            })
          ) : (
            <PanelTrigger
              ref={PanelTriggerRef}
              model-value={userModelValue.value}
              visible={visible.value}
              inputStatus={inputStatus?.value}
              onPick={onPanelTriggerPick}
              onFocus={onFocus}
              onBlur={onBlur}
              onClear={onClear}
              onChangeRangeStoreList={onChangeRangeStoreList}
              onUpdateDateModelValue={emitModelValue}
              onShow={onShow}
              onHide={onHide}
            ></PanelTrigger>
          )}
        </div>
      ),
      popper: () => (
        <div
          ref={PanelContentRef}
          class={[
            cls(classHelper.e('body')),
            { [classHelper.em('body', 'panel')]: isPanelType.value },
          ]}
          v-event-outside={{ events: ['mousedown', 'focus'], handler: onClickOutsidePanelDate }}
        >
          <PanelContent
            picker={picker.value}
            panelDate={panelDate.value}
            rightPanelDate={rightPanelDate.value}
            rangeStore={rangeStore}
            isFooter={isFooter.value}
            rangeHeaderVisible={rangeHeaderVisible.value}
            onHandleRangeStoreList={onHandleRangeStoreList}
            onHandleHoverList={onHandleHoverList}
            onSetMergeDateTimeList={onSetMergeDateTimeList}
            onChangeDateType={onChangeDateType}
            onChangePanelDate={onChangePanelDate}
            onChangeRightPanelDate={onChangeRightPanelDate}
            onChangePanelTime={onChangePanelTime}
            onChangeRangeTime={onChangeRangeTime}
            onChangePickerDate={onChangePickerDate}
            onUpdateTimePosition={onUpdateTimePosition}
            onChangeSelectTimeStatus={onChangeSelectTimeStatus}
            onPick={onPanelContentPick}
            onChangeTimePicker={onChangeTimePicker}
            onNotifyTimePicker={onNotifyTimePicker}
            onShortcutClick={onShortcutClick}
            onCancel={onCancel}
            onConfirm={onConfirm}
          ></PanelContent>
        </div>
      ),
    };
    provide('N_DATE_PICKER', {
      props: reactive({
        ...toRefs(props),
        type: computed(() => {
          return type.value;
        }),
        dateType,
        locale: computed(() => locale.value),
        legoLocale: computed(() => locale.value?.langService.td()?.lego),
        isRange: computed(() => isRangeType.value),
        isPanelType: computed(() => isPanelType.value),
        isEvenPanel: computed(() => isEvenPanel.value),
        panelTime: computed(() => panelTime.value),
        panelTimeVisible: computed(() => panelTimeVisible.value),
        timePicker: computed(() => timePicker.value),
        timePickerType: computed(() => timePickerType.value),
        originalAttrs: computed(() => originalAttrs.value),
        unlinkPanelsProps: computed(() => unlinkPanelsProps.value),
        timeDefaultFormat: computed(() => timeDefaultFormat.value),
        pickerOptions: computed(() => pickerOptions.value),
        selectedPicker: computed(() => selectedPicker.value),
        fakeModelValue: computed(() =>
          isHoverDisplayValue.value ? originalDatePicker.value : modelValue.value,
        ),
        pickerDate: computed(() => {
          return isRangeType.value && Array.isArray(originalDatePicker.value)
            ? originalDatePicker.value.map(item => {
                const currentPickerDate = NDatejs.dayjsToObject(item);

                return {
                  ...currentPickerDate,
                  year: currentPickerDate.years,
                  month: currentPickerDate.months,
                  day: currentPickerDate.date,
                };
              })
            : {
                ...pickerDate.value,
                year: pickerDate.value.years, //暂时保留原参数，后期大版本废弃
                month: pickerDate.value.months,
                day: pickerDate.value.date,
              };
        }),
      }),
      prefixIconSlots: slots.prefix,
      suffixIconSlots: slots.suffix,
      gridSlots: slots.default,
      rangeSeparatorSlots: slots.rangeSeparator,
      footerSlots: slots.footer,
    });
    provide('N_TIME_PICKER', {
      props: reactive({
        locale: computed(() => locale.value),
        legoLocale: computed(() => locale.value?.langService.td()?.lego),
        isTimePicker: computed(() => isTimePicker.value),
        disabledTime: computed(() => disabledTime?.value),
        type: computed(() => timePickerType.value),
        pickerOptions: computed(() => pickerOptions.value),
        showTimeTooltip: computed(() => showTimeTooltip?.value),
        updateTimePosCount: computed(() => updateTimePosCount.value),
        pickerDate: computed(() => ({
          ...pickerDate.value,
          year: pickerDate.value.years, //暂时保留原参数，后期大版本废弃
          month: pickerDate.value.months,
          day: pickerDate.value.date,
        })),
      }),
    });

    watch(
      () => visible.value,
      value => {
        // popper visible变化时触发
        handleEmitPopperChange();
        if (value) {
          // init
          initPicker();

          // 初始化 记录打开面板时的输入框值
          initRecordInputValue(userModelValue.value);
        }
      },
    );
    watch(
      () => userModelValue.value,
      value => {
        // v-model变化时触发
        onChangeDatePicker(value);
      },
    );

    watch(
      () => userModelValue.value,
      value => {
        // v-model 变化时触发
        onChangeDatePicker(value);
      },
    );

    watch([() => originalDatePicker.value, () => panelTime.value, () => rangeTime.value], () => {
      handleEmitPickDateTime();
    });

    watch(
      () => timePicker.value,
      value => {
        if (JSON.stringify(value) !== JSON.stringify(panelTime.value)) {
          onChangePanelTime(value);
        }
      },
      {
        immediate: true,
      },
    );

    expose({
      onHide,
      changeYear,
      changeMonth,
      changePanelVisible: manualControlPopperVisible,
      initPicker,
      datePicker: computed(() => PanelTriggerRef.value?.input),
      focus,
    });

    return () => {
      return isPanelType.value
        ? popoverSlots.popper()
        : h(
            NPopover,
            {
              ref: 'refNPopover',
              trigger: 'manual',
              placement: placement.value,
              arrow: false,
              visible: visible.value,
              distance: 4,
              popperClass: cls([classHelper.block, popperClass.value]),
              referenceClass: cls(classHelperReference.block),
              fallbackPlacements: fallbackPlacements.value,
              preventOverflow: preventOverflow.value,
              toBody: toBody.value,
            },
            popoverSlots,
          );
    };
  },
});
