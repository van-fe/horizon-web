import { defineComponent, ref, toRefs, computed, watch, nextTick, inject } from 'vue';
import { ComponentClassBlock, cls, useNamespace } from '@nio-fe/shared';
import { NDatejs } from '~/components/DatePicker/src/composables/NDatejs';
import { usePanelTimeProps } from '../composables/useProps';
import type { TimeGrid, PanelTimeType } from '../composables/useProps';
import tooltip from '~/directives/v-tooltip';
import { NScrollbar } from '~/components/Scrollbar';

export default defineComponent({
  name: `${useNamespace()}BasicTime`,
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
      pickerOptions,
      disabledTime,
      showTimeTooltip,
      isTimePicker,
      updateTimePosCount,
      pickerDate,
      isRange,
      originalPanelTime,
      isLinkPanels,
      isMultipleSingleTime,
      datePlacement,
    } = toRefs(NTimePicker.props);
    const { panelTime, placement } = toRefs(props);
    const basicRef = ref<HTMLElement | null>(null);
    const blankList = computed(() => {
      const len = isTimePicker.value ? 5 : 6;
      return new Array(len).fill({});
    });
    const list = computed(() => {
      const result: TimeGrid[] = [];

      if (pickerOptions.value.start && pickerOptions.value.step && pickerOptions.value.end) {
        let current = pickerOptions.value.start;

        while (NDatejs.compareTime(current, pickerOptions.value.end) <= 0) {
          const currentPanelTime: PanelTimeType = NDatejs.getHoursMinutesSeconds(current);
          const currentDate = {
            ...(Array.isArray(pickerDate.value) ? (datePlacement.value === 'left' ? pickerDate.value[0] : pickerDate.value[1]) : pickerDate.value),
            ...currentPanelTime,
          };
          const isDisabled = handleDisabledTime(currentDate);
          const tooltip = showTimeTooltip.value?.(currentDate);
          
          const isSelected =
            !isDisabled &&
            handleIsSelected(currentPanelTime);

          result.push({
            id: NDatejs.getUUID(),
            text: current,
            isSelected,
            isDisabled,
            scrollHeight: result.length * 40,
            tooltip,
          });
          current = NDatejs.stepTime(current, pickerOptions.value.step);
        }
      }
      return result.concat(blankList.value);
    });
    const hasDisabledTimeProps = computed(() => typeof disabledTime.value === 'function');

    // 处理开始和结束时间disabledTime
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
    function handleIsSelected(currentPanelTime: PanelTimeType) {
      if (isMultipleSingleTime?.value) {
        return (panelTime.value as PanelTimeType[])?.findIndex(item => item.hours === currentPanelTime.hours &&
          item.minutes === currentPanelTime.minutes) > -1;
      }
      return (panelTime.value as PanelTimeType).hours === currentPanelTime.hours &&
        (panelTime.value as PanelTimeType).minutes === currentPanelTime.minutes;
    }
    function switchPosition(item: TimeGrid) {
      const element = document.getElementById(item.id);

      element?.scrollIntoView &&
        element?.scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        });
    }
    function onHandleClick(item: TimeGrid) {
      if (item.isDisabled || typeof item.text === 'undefined') {
        return;
      }
      emit('changePanelTime', NDatejs.getHoursMinutesSeconds(item.text));
      emit('pickTime', item.text, 'time');
      switchPosition(item);
    }
    function initTimePosition() {
      for (const e of list.value) {
        if (e.isSelected) {
          setTimeout(() => {
            basicRef.value?.scrollTo(0, e.scrollHeight || 0);
          });
        }
      }
    }

    watch(
      () => updateTimePosCount.value,
      () => {
        nextTick(() => {
          if (Object.entries(panelTime.value as PanelTimeType).length === 0) {
            basicRef.value!.scrollTo(0, 0);
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
        <div class={cls(classHelper.e('container'))}>
          <NScrollbar ref={basicRef} size="small">
            <ul class={cls(classHelper.e('wrap'))}>
              {list.value.map(item => {
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
      </div>
    );
  },
});
