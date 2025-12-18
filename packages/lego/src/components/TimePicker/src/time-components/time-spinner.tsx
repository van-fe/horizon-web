import { defineComponent, reactive, ref, toRefs, computed, inject, watch, nextTick } from 'vue';
import { ComponentClassBlock, cls, useNamespace } from '@nio-fe/shared';
import { NDatejs } from '~/components/DatePicker/src/composables/NDatejs';
import { usePanelTimeProps } from '../composables/useProps';
import type { TimeGrid, PanelTimeType, TimeSpinnerType } from '../composables/useProps';
import tooltip from '~/directives/v-tooltip';
import NScrollbar from '~/components/Scrollbar/src/Scrollbar';

export default defineComponent({
  name: `${useNamespace()}TimeSpinner`,
  components: {
    NScrollbar,
  },
  directives: {
    tooltip,
  },
  props: usePanelTimeProps,
  emits: ['changePanelTime', 'pickTime'],
  setup(props, { emit }) {
    const classHelper = new ComponentClassBlock('time-select');
    const NTimePicker = inject('N_TIME_PICKER') as any;
    const {
      type,
      pickerOptions,
      disabledTime,
      showTimeTooltip,
      isTimePicker,
      updateTimePosCount,
      pickerDate,
      formatCellText,
      isRange,
      originalPanelTime,
      isLinkPanels,
      datePlacement,
    } = toRefs(NTimePicker.props);
    const { panelTime, placement } = toRefs(props);
    const hoursRef = ref<typeof NScrollbar | null>(null);
    const minutesRef = ref<typeof NScrollbar | null>(null);
    const secondsRef = ref<typeof NScrollbar | null>(null);
    const blankList = computed(() => {
      const len = isTimePicker.value ? 5 : 6;
      return new Array(len).fill({});
    });
    const hoursList = computed(() => {
      let result: TimeGrid[] = [];
      const selectableHours = pickerOptions.value?.selectableHours || [];

      if (selectableHours && selectableHours.length) {
        const list = getSelectableList(selectableHours);
        result = list.map((item, index) => handleItem('hours', item, index));
      } else {
        for (let i = 0; i < 24; i++) {
          result.push(handleItem('hours', i, i));
        }
      }

      return result.concat(blankList.value);
    });
    const minutesList = computed(() => {
      let result: TimeGrid[] = [];
      const step = parseInt(pickerOptions.value.minutesStep) || 1;
      const selectableMinutes = pickerOptions.value?.selectableMinutes || [];

      if (selectableMinutes && selectableMinutes.length) {
        const list = getSelectableList(selectableMinutes);
        result = list.map((item, index) => handleItem('minutes', item, index));
      } else {
        for (let i = 0; i < 60; i += step) {
          result.push(handleItem('minutes', i, i / step));
        }
      }

      return result.concat(blankList.value);
    });
    const secondsList = computed(() => {
      let result: TimeGrid[] = [];
      const step = parseInt(pickerOptions.value.secondsStep) || 1;
      const selectableSeconds = pickerOptions.value?.selectableSeconds || [];

      if (selectableSeconds && selectableSeconds.length) {
        const list = getSelectableList(selectableSeconds);
        result = list.map((item, index) => handleItem('seconds', item, index));
      } else {
        for (let i = 0; i < 60; i += step) {
          result.push(handleItem('seconds', i, i / step));
        }
      }

      return result.concat(blankList.value);
    });
    const timesList = computed(() => {
      const hoursMinutes = [
        {
          type: 'hours',
          list: hoursList.value,
          ref: hoursRef,
        },
        {
          type: 'minutes',
          list: minutesList.value,
          ref: minutesRef,
        },
      ];
      const sceonds = [
        {
          type: 'seconds',
          list: secondsList.value,
          ref: secondsRef,
        },
      ];
      return type.value === 'minutes' ? hoursMinutes : hoursMinutes.concat(sceonds);
    });
    const hasDisabledTimeProps = computed(() => typeof disabledTime.value === 'function');

    function getSelectableList(list: (string | number)[]) {
      const result: number[] = [];

      list.forEach(it => {
        const item = `${it}`;

        if (item.indexOf('-') > -1) {
          const parseTime = item.split('-');
          const start = parseInt(parseTime[0], 10);
          const end = parseInt(parseTime[1], 10);

          for (let i = start; i <= end; i++) {
            result.push(i);
          }
          return;
        }
        result.push(parseInt(item, 10));
      });
      return result;
    }
    function handleItem(type: TimeSpinnerType, value: number, i: number) {
      const { hours, minutes, seconds } = panelTime.value as PanelTimeType;
      const current = reactive({
        ...(Array.isArray(pickerDate.value)
          ? datePlacement.value === 'left'
            ? pickerDate.value[0]
            : pickerDate.value[1]
          : pickerDate.value),
        hours,
        minutes,
        seconds,
        [type]: value,
      });
      const isDisabled = handleDisabledTime(current);
      const tooltip = showTimeTooltip.value?.(current);

      return {
        id: NDatejs.getUUID(),
        type,
        time: value,
        text: getFormatCellText(type, value),
        isSelected: !isDisabled && (panelTime.value as PanelTimeType)[type] === value,
        isDisabled,
        scrollHeight: i * 40,
        tooltip,
      };
    }
    function handleDisabledTime(current: PanelTimeType) {
      if (isRange?.value) {
        const outerResult = disabledTime.value?.(current, placement.value);
        if (placement.value === 'left') {
          const innerResult =
            isLinkPanels.value &&
            NDatejs.isBeforeTime(
              originalPanelTime.value[1],
              current as { hours: number; minutes: number; seconds: number },
            );

          return hasDisabledTimeProps.value ? innerResult || outerResult : innerResult;
        } else {
          const innerResult =
            isLinkPanels.value &&
            NDatejs.isBeforeTime(
              current as { hours: number; minutes: number; seconds: number },
              originalPanelTime.value[0],
            );

          return hasDisabledTimeProps.value ? innerResult || outerResult : innerResult;
        }
      }
      return disabledTime.value?.(current);
    }
    function getFormatCellText(type: string, value: number) {
      const text = NDatejs.padStart(value);
      if (typeof formatCellText?.value === 'function') {
        return formatCellText.value(type, text);
      }
      return text;
    }
    function onHandleClick(item: TimeGrid) {
      if (item.isDisabled || typeof item.text === 'undefined') {
        return;
      }
      switchPosition(item);
      changePanelTime(item);
    }
    function switchPosition(item: TimeGrid) {
      const element = document.getElementById(item.id);

      element?.scrollIntoView &&
        element?.scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        });
    }
    function changePanelTime(item: TimeGrid) {
      let { hours, minutes, seconds } = panelTime.value as PanelTimeType;

      switch (item.type) {
        case 'hours':
          hours = item.time;
          break;
        case 'minutes':
          minutes = item.time;
          break;
        case 'seconds':
          seconds = item.time;
          break;
        default:
          hours = item.time;
          break;
      }
      emit('changePanelTime', {
        hours,
        minutes,
        seconds,
      });
      emit('pickTime', item.time, item.type);
    }
    function initTimePosition() {
      for (const item of timesList.value) {
        for (const e of item.list) {
          if (e.isSelected) {
            const basicRef = ref();
            switch (e.type) {
              case 'hours':
                basicRef.value = hoursRef.value;
                break;
              case 'minutes':
                basicRef.value = minutesRef.value;
                break;
              case 'seconds':
                basicRef.value = secondsRef.value;
                break;
            }
            setTimeout(() => {
              basicRef.value!.scrollTo(0, e.scrollHeight || 0);
            });
            break;
          }
        }
      }
    }

    watch(
      () => updateTimePosCount.value,
      () => {
        nextTick(() => {
          if (Object.entries(panelTime.value).length === 0) {
            hoursRef.value!.scrollTo(0, 0);
            minutesRef.value!.scrollTo(0, 0);
            if (type.value === 'seconds') {
              secondsRef.value!.scrollTo(0, 0);
            }
            return;
          }
          // init position
          initTimePosition();
        });
      },
      {
        immediate: true,
      },
    );

    return () => (
      <div class={classHelper.block}>
        {timesList.value.map(time => {
          return (
            <div
              class={[
                cls(classHelper.e('container')),
                cls(classHelper.em('container', 'time-spinner')),
              ]}
            >
              <NScrollbar ref={time.ref} size="small">
                <ul class={cls(classHelper.e('wrap'))}>
                  {time.list.map(item => {
                    return (
                      <li
                        id={item.id}
                        class={[
                          cls(classHelper.e('item')),
                          {
                            [classHelper.em('item', 'selected')]: item.isSelected,
                            [classHelper.em('item', 'disabled')]: item.isDisabled,
                            [classHelper.em('item', 'blank')]: typeof item.text === 'undefined',
                          },
                        ]}
                        onClick={onHandleClick.bind(this, item)}
                        v-tooltip={{
                          content: item.tooltip?.content,
                          disabled: !item.tooltip?.show,
                        }}
                      >
                        <span>{item.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </NScrollbar>
            </div>
          );
        })}
      </div>
    );
  },
});
