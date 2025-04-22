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
import { useTimePickerProps } from './composables/useProps';
import type { LegoSetupContext } from '@nio-fe/shared';
import { pickFromObject, ComponentClassBlock, cls, useNamespace } from '@nio-fe/shared';
import { NPopover } from '~/components/Popover';
import PanelTrigger from './time-components/panel-trigger';
import NInput from '~/components/Input';
import PanelContent from './time-components/panel-content';
import PanelTime from './time-components/panel-time';
import PanelFooter from '~/components/DatePicker/src/calendar-components/panel-footer';
import eventOutside from '~/directives/v-event-outside';
import dayjs from '~/components/DatePicker/src/composables/dayjs';
import { NDatejs } from '~/components/DatePicker/src/composables/NDatejs';
import type { TimePickerProps, PanelTimeType, PickerTimeType } from './composables/useProps';
import { NIcon } from '@nio-fe/icon';
import type { TimePickerEmits } from './composables/useEmits';
import { useTimePickerEmits } from './composables/useEmits';
import {
  NFormDisabledInjectedKey,
  NFormItemTriggerInjectedKey,
} from '~/components/Form/src/utils/injectedKeys';
import type { TimePickerSlots } from './composables/useSlots';
import { useTimePickerSlots } from './composables/useSlots';
import type { TimePickerExposes } from './composables/useExposes';
import { useTimePickerExposes } from './composables/useExposes';
import { defaultLocale, localeInjectKey } from '~/provides/localable';

export default defineComponent({
  name: `${useNamespace()}TimePicker`,
  desc: '选择或输入时间的控件',
  components: {
    NPopover,
    NInput,
    PanelTime,
    PanelFooter,
    NIcon,
  },
  directives: {
    eventOutside,
  },
  props: useTimePickerProps,
  emits: useTimePickerEmits,
  slots: useTimePickerSlots,
  exposes: useTimePickerExposes,
  setup(
    props,
    {
      attrs,
      slots,
      emit,
      expose,
    }: LegoSetupContext<TimePickerEmits, TimePickerSlots, TimePickerExposes>,
  ) {
    const classHelper = new ComponentClassBlock('time-picker');
    const classHelperReference = new ComponentClassBlock('time-picker-reference');
    const classHelperTrigger = new ComponentClassBlock('time-picker-trigger');
    const locale = inject(localeInjectKey, defaultLocale);
    const visible = ref(false);
    const {
      modelValue,
      valueFormat,
      type,
      isRange: propsIsRange,
      popperClass: propsPopperClass,
      width: propsWidth,
      disabled,
      inputStatus,
      placement,
      fallbackPlacements,
      preventOverflow,
      showFooter,
      toBody,
      isMultipleTime,
      supportSecondDay,
    } = toRefs<TimePickerProps>(props);
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

    /** formItemTrigger **/
    const formItemTrigger = inject(NFormItemTriggerInjectedKey, undefined);
    // because time-picker use n-input, so provide NFormItemTriggerInjectedKey as undefined
    provide(NFormItemTriggerInjectedKey, undefined);

    // form disabled inject
    const formDisabled = inject(NFormDisabledInjectedKey, undefined);
    const isDisabled = computed(() => disabled?.value ?? formDisabled?.value ?? false);

    const isRange = computed(() => propsIsRange.value);
    const isMultipleSingleTime = computed(() => type.value === 'time' && isMultipleTime.value);
    // dayjs替换后，兼容yyyy、dd -> YYYY、DD
    const parseValueFormat = computed(() =>
      valueFormat.value.replace(/y/g, 'Y').replace(/d/g, 'D'),
    );
    const defaultPickerValue = ref({
      hours: undefined,
      minutes: undefined,
      seconds: undefined,
    });
    const userModelValue = computed(() => {
      if (isRange.value || isMultipleSingleTime.value) {
        return modelValue.value || [];
      }
      return modelValue.value;
    });
    // 解析用户输入
    const picker = computed(() => {
      let result: PickerTimeType;

      if (Array.isArray(userModelValue.value) ) {
        result = (userModelValue.value.length === 2 &&
          (userModelValue.value as PanelTimeType[])?.map(item =>
            NDatejs.getHoursMinutesSecondsObject(item, supportSecondDay.value),
          )) || [defaultPickerValue.value, defaultPickerValue.value];
        // 多选单独处理
        if (isMultipleSingleTime.value) {
          result = (
            (userModelValue.value as PanelTimeType[])?.map(item =>
              NDatejs.getHoursMinutesSecondsObject(item, supportSecondDay.value),
            ))
        }
      } else {
        result = NDatejs.getHoursMinutesSecondsObject(userModelValue.value, supportSecondDay.value);
      }

      return result;
    });
    const panelTime = ref<PickerTimeType>(picker.value);
    const PanelReferenceRef = ref<HTMLElement | null>(null);
    const PanelTriggerRef = ref<HTMLElement | null>(null);
    const PanelDateRef = ref<HTMLElement | null>(null);
    const InputRef = ref<typeof NInput | null>(null);
    const isFooter = computed(() => {
      return (
        showFooter.value || isRange.value || type.value === 'minutes' || type.value === 'seconds'
      );
    });
    const popperClass = computed(() => {
      const classList = {
        [classHelper.m('range')]: isRange.value,
        [classHelper.m('time')]: !isRange.value && type.value === 'time',
        [classHelper.m('minutes')]: !isRange.value && type.value === 'minutes',
        [classHelper.m('seconds')]: !isRange.value && type.value === 'seconds',
      };
      return [
        propsPopperClass.value,
        classHelper.block,
        ...Object.entries(classList)
          .filter(item => item[1])
          .map(item => item[0]),
      ];
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

    function onShow() {
      visible.value = true;
    }
    function onHide() {
      visible.value = false;
    }
    function onClickOutsidePanelDate(value: Node) {
      if (visible.value && !PanelReferenceRef.value!.contains(value)) {
        onCancel();
      }
    }
    function focus() {
      (InputRef.value?.input as HTMLInputElement)?.focus();
    }
    function onFocus(event: FocusEvent) {
      if (!isDisabled.value) {
        emit('focus', event);
        onShow();
      }
    }
    function onBlur(event: FocusEvent) {
      if (!isDisabled.value) {
        emit('blur', event);
        nextTick().then(() => {
          formItemTrigger?.('blur');
        });
      }
    }
    // trigger emit pick event
    function onPanelTriggerPick(time: PickerTimeType) {
      onPick(time);
    }
    function onPick(time: PickerTimeType) {
      emitModelValue(time);
      onHide();
    }
    function onChangePanelTime(value: PickerTimeType) {
      changePanelTime(value);
      if (!isFooter.value) {
        onPick(panelTime.value);
      }
    }
    function changePanelTime(time: PickerTimeType) {
      if (!visible.value || (Array.isArray(time) && time.length === 0)) {
        panelTime.value = time;
        return;
      }
      if (!(JSON.stringify(time) === JSON.stringify(panelTime.value))) {
        emit('changePanelTime', time);
      }
      panelTime.value = time;
    }
    // v-model绑定值
    function emitModelValue(time: PickerTimeType | null) {
      const result = handleDateModelValue(time);
      if (userModelValue.value === result) {
        return;
      }
      emit('update:modelValue', result);
      emit('change', result);
      nextTick().then(() => {
        formItemTrigger?.('change');
      });
    }
    function handleDateModelValue(date: PickerTimeType | null) {
      let result;

      if (Array.isArray(date)) {
        result = date.map(item => handleValueFormat(item));
      } else {
        result = handleValueFormat(date);
      }
      return result;
    }
    function handleValueFormat(time: PanelTimeType | null) {
      if (!time) {
        return time;
      }
      // 解析为当天时间对象
      const date = NDatejs.parseTodayDateTime(NDatejs.formatTime(time));

      if (!parseValueFormat.value) {
        return date;
      }
      if (parseValueFormat.value === 'timestamp') {
        return dayjs(date).valueOf();
      }
      return dayjs(date).format(parseValueFormat.value);
    }
    function onClear() {
      emitModelValue(null);
      onHide();
      focus();
    }
    function onCancel() {
      onHide();
    }
    function onConfirm() {
      onPick(panelTime.value);
    }
    function onPickTime(value: number, type: string) {
      emit('pick', value, type);
    }
    function handleEmitPopperChange() {
      emit('popperChange', visible.value);
    }
    function onClickPanelTrigger() {
      if (!isDisabled.value) {
        onShow();
      }
    }
    function manualControlPopperVisible(visible: boolean) {
      if (visible) {
        onShow();
      } else {
        onHide();
      }
    }

    watch(
      () => visible.value,
      value => {
        // popper visible变化时触发
        handleEmitPopperChange();
        if (value) {
          // init
          changePanelTime(picker.value);
        }
      },
    );

    watch(
      () => picker.value,
      value => {
        changePanelTime(value);
      },
      {
        immediate: true,
      },
    );

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
              onFocus={onFocus}
              onBlur={onBlur}
              onClear={onClear}
              onPick={onPanelTriggerPick}
            />
          )}
        </div>
      ),
      popper: () => (
        <div
          ref={PanelDateRef}
          class={cls(classHelper.e('body'))}
          v-event-outside={{
            handler: onClickOutsidePanelDate,
            events: ['mousedown', 'focus'],
          }}
        >
          <PanelContent
            panelTime={panelTime.value}
            isFooter={isFooter.value}
            onPickTime={onPickTime}
            onChangePanelTime={onChangePanelTime}
            onCancel={onCancel}
            onConfirm={onConfirm}
          ></PanelContent>
        </div>
      ),
    };

    provide('N_TIME_PICKER', {
      props: reactive({
        ...toRefs(props),
        locale: computed(() => locale.value),
        legoLocale: computed(() => locale.value?.langService.td()?.lego),
        isTimePicker: true,
        updateTimePosCount: ref(1),
        isRange: computed(() => isRange.value),
        originalAttrs: computed(() => originalAttrs.value),
        originalPanelTime: computed(() => panelTime.value),
        isMultipleSingleTime: computed(() => isMultipleSingleTime.value),
      }),
      prefixIconSlots: slots.prefix,
      suffixIconSlots: slots.suffix,
      gridSlots: slots.default,
      rangeSeparatorSlots: slots.rangeSeparator,
      footerSlots: slots.footer,
    });

    expose({
      changePanelVisible: manualControlPopperVisible,
      onHide,
      timePicker: computed(() => InputRef.value?.input),
    });

    return () =>
      h(
        NPopover,
        {
          ref: 'refNPopover',
          trigger: 'manual',
          placement: placement.value,
          arrow: false,
          distance: 4,
          visible: visible.value,
          popperClass: cls(popperClass.value),
          referenceClass: cls(classHelperReference.block),
          fallbackPlacements: fallbackPlacements.value,
          preventOverflow: preventOverflow.value,
          toBody: toBody.value,
        },
        popoverSlots,
      );
  },
});
