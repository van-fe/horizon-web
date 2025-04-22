import { defineComponent, ref, toRefs, computed, watch, inject } from 'vue';
import type { PropType } from 'vue';
import { ComponentClassBlock, cls, useNamespace } from '@nio-fe/shared';
import PanelTime from './panel-time';
import PanelFooter from '~/components/DatePicker/src/calendar-components/panel-footer';
import { NDatejs } from '~/components/DatePicker/src/composables/NDatejs';
import type { FooterSlotsParamsType } from '~/components/DatePicker/src/composables/useProps';
import type {
  PickerTimeType,
  PanelTimeType,
} from '~/components/TimePicker/src/composables/useProps';

export default defineComponent({
  name: `${useNamespace()}PanelContent`,
  components: {
    PanelTime,
    PanelFooter,
  },
  props: {
    panelTime: {
      type: [Object, Array] as PropType<PickerTimeType | PickerTimeType[]>,
      default() {
        return {};
      },
    },
    isFooter: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['changePanelTime', 'cancel', 'confirm', 'pickTime'],
  setup(props, { emit }) {
    const classHelper = new ComponentClassBlock('time-picker-content');
    const { isFooter, panelTime } = toRefs(props);
    const NTimePicker = inject('N_TIME_PICKER') as any;
    const {
      isRange,
      type,
      showCancelButton,
      confirmButtonText,
      cancelButtonText,
      confirmButtonProps,
      cancelButtonProps,
      legoLocale,
      isMultipleSingleTime,
    } = toRefs(NTimePicker.props);

    const startTimeText = computed(() => legoLocale.value?.timePicker.startTime || 'Start Time');
    const endTimeText = computed(() => legoLocale.value?.timePicker.endTime || 'End Time');

    const footerSlots: undefined | ((params: FooterSlotsParamsType) => void) =
      NTimePicker.footerSlots;
    const footerVisible = computed(() => isFooter.value || footerSlots);

    const confirmDisabled = ref(true);
    const panelTimeClass = computed(() => {
      if (!isRange.value) {
        return {};
      }
      return {
        [classHelper.m('time')]: type.value === 'time',
        [classHelper.m('minutes')]: type.value === 'minutes',
        [classHelper.m('seconds')]: type.value === 'seconds',
      };
    });

    function onChangeFirstPanelTime(time: PanelTimeType) {
      const { hours, minutes, seconds } = (panelTime.value as PanelTimeType[])[1] || {};

      emit('changePanelTime', [time, { hours, minutes, seconds }]);
    }
    function onChangeEndPanelTime(time: PanelTimeType) {
      const { hours, minutes, seconds } = (panelTime.value as PanelTimeType[])[0] || {};

      emit('changePanelTime', [{ hours, minutes, seconds }, time]);
    }
    function onChangePanelTime(time: PanelTimeType) {
      if (!isMultipleSingleTime.value) {
        emit('changePanelTime', time);
        return;
      }
      // 点击 多选单个时间处理
      const list = (panelTime.value as PanelTimeType[])?.filter(item => typeof item.hours !== 'undefined');
      const index = list.findIndex(item => item.hours === time.hours && item.minutes === time.minutes);
      let result = [...(list as PanelTimeType[] || [])];

      if (index > -1) {
        list.splice(index, 1);
        result = [...list];
      } else {
        result.push(time);
      }
      emit('changePanelTime', result);
    }
    function onPickTime(value: number, type: string) {
      emit('pickTime', value, type);
    }
    function isSelectedTime(t: PanelTimeType) {
      let result;

      switch (type.value) {
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
    function handleConfirmStatus() {
      if (
        isRange.value &&
        Array.isArray(panelTime.value) &&
        panelTime.value.length === 2 &&
        (panelTime.value  as PanelTimeType[]).every(item => item && isSelectedTime(item))
      ) {
        confirmDisabled.value = false;
        return;
      }
      if (!isRange.value) {
        const list = panelTime.value as PanelTimeType[]
        if (isMultipleSingleTime.value && list?.length && list?.every(item => !NDatejs.isEmpty(item.hours) && !NDatejs.isEmpty(item.minutes))) {
          confirmDisabled.value = false;
          return;
        }
        if (!isMultipleSingleTime.value && isSelectedTime(panelTime.value as PanelTimeType)) {
          confirmDisabled.value = false;
          return;
        }
      }
      confirmDisabled.value = true;
    }
    function onCancel() {
      emit('cancel');
    }
    function onConfirm() {
      emit('confirm');
    }

    watch(
      [() => panelTime.value],
      () => {
        handleConfirmStatus();
      },
      {
        immediate: true,
      },
    );

    return () => (
      <div class={classHelper.block}>
        <div
          class={[
            classHelper.e('main'),
            {
              [classHelper.em('main', 'range')]: isRange.value,
            },
            panelTimeClass.value,
          ]}
        >
          {isRange.value && (
            <div class={cls(classHelper.e('header'))}>
              <div class={cls(classHelper.e('header-cell'))}>{startTimeText.value}</div>
              <div class={cls(classHelper.e('header-cell'))}>{endTimeText.value}</div>
            </div>
          )}
          <div class={cls(classHelper.e('body'))}>
            {isRange.value ? (
              <div class={cls(classHelper.e('body-wrapper'))}>
                <PanelTime
                  placement="left"
                  panelTime={(panelTime.value as PanelTimeType[])[0]}
                  onPickTime={onPickTime}
                  onChangePanelTime={onChangeFirstPanelTime}
                ></PanelTime>
                <PanelTime
                  placement="right"
                  panelTime={(panelTime.value as PanelTimeType[])[1]}
                  onPickTime={onPickTime}
                  onChangePanelTime={onChangeEndPanelTime}
                ></PanelTime>
              </div>
            ) : (
              <PanelTime
                placement="left"
                panelTime={panelTime.value as PanelTimeType}
                onPickTime={onPickTime}
                onChangePanelTime={onChangePanelTime}
              ></PanelTime>
            )}
          </div>
          <PanelFooter
            v-show={footerVisible.value}
            v-slots={{ footer: footerSlots }}
            showNow={false}
            confirmDisabled={confirmDisabled.value}
            showCancelButton={showCancelButton.value}
            confirmButtonText={confirmButtonText.value}
            cancelButtonText={cancelButtonText.value}
            confirmButtonProps={confirmButtonProps.value}
            cancelButtonProps={cancelButtonProps.value}
            onCancel={onCancel}
            onConfirm={onConfirm}
          ></PanelFooter>
        </div>
      </div>
    );
  },
});
