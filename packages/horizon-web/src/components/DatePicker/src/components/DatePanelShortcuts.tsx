import type { PropType, Ref } from 'vue';
import { computed, defineComponent, inject, ref } from 'vue';
import { cls, ComponentClassBlock, isUndefined } from '@aurora/shared';
import {
  NDatePickerEmitsInjectKey,
  NDatePickerFormatInjectKey,
  NDatePickerPropsInjectKey,
} from '../utils/injectKeys';
import type { GetableType, NDatePickerShortcutsType } from '../utils/types';
import NRadio from '~/components/Radio/src/Radio';
import type { Dayjs } from 'dayjs';
import { isDayjs } from 'dayjs';
import { getDayjsUnitByType } from '../hooks/usePanel';
import NScrollbar from '~/components/Scrollbar/src/Scrollbar';
import type { MaybeElement } from '@vueuse/core';
import { useResizeObserver } from '@vueuse/core';

export default defineComponent({
  name: 'DatePanelShortcuts',
  props: {
    startDate: {
      type: Object as PropType<Dayjs | undefined | null>,
    },
    endDate: {
      type: Object as PropType<Dayjs | undefined | null>,
    },
    isRange: {
      type: Boolean,
      required: true,
    },
    mainPanelDomRef: {
      type: Object as PropType<Ref<MaybeElement>>,
    },
    containTime: {
      type: Boolean,
      default: false,
    },
    refreshPanelShowDate: {
      type: Function,
    },
  },
  emits: {
    /**
     * 更新日期
     * @param vals 日期，如果不是范围，则只传第一个值
     */
    'update:modelValue': (vals: [Dayjs | undefined, Dayjs | undefined]) =>
      isDayjs(vals[0]) || isUndefined(vals[0]) || isDayjs(vals[1]) || isUndefined(vals[1]),
  },
  setup(props, { emit }) {
    const classHelper = new ComponentClassBlock('date-picker');

    const parentProps = inject(NDatePickerPropsInjectKey)!;
    const parentEmits = inject(NDatePickerEmitsInjectKey)!;
    const pickerType = inject(NDatePickerFormatInjectKey)!;

    const maxHeight = ref(290);

    useResizeObserver(props.mainPanelDomRef, ([entry]) => {
      maxHeight.value = entry.contentRect.height;
    });

    const currentPicked = computed(() => {
      if (props.isRange) {
        if (!props.startDate && !props.endDate) {
          return -1;
        }

        return (
          parentProps.shortcuts?.findIndex(curr => {
            let val = curr.value as GetableType<[Dayjs, Dayjs]>;

            if (typeof val === 'function') {
              val = val();
            }

            return (
              val[0].isSame(props.startDate, getDayjsUnitByType(pickerType.value)) &&
              val[1].isSame(props.endDate, getDayjsUnitByType(pickerType.value))
            );
          }) ?? -1
        );
      } else {
        if (!props.startDate) {
          return -1;
        }

        return (
          parentProps.shortcuts?.findIndex(curr => {
            let val = curr.value as GetableType<Dayjs>;

            if (typeof val === 'function') {
              val = val();
            }

            return val.isSame(props.startDate, getDayjsUnitByType(pickerType.value));
          }) ?? -1
        );
      }
    });

    function handleClick(shortcut: NDatePickerShortcutsType) {
      const value = typeof shortcut.value === 'function' ? shortcut.value() : shortcut.value;

      parentEmits('shortcutClick', shortcut);
      emit('update:modelValue', Array.isArray(value) ? value : [value, undefined]);
      props.refreshPanelShowDate?.();
    }

    return () => (
      <div class={cls(classHelper.e('shortcuts'))}>
        <NScrollbar size="small" maxHeight={maxHeight.value} viewStyle={{ padding: '16px' }}>
          {parentProps.shortcuts?.map((shortcut, idx) => (
            <div class={classHelper.e('shortcuts-item')} onClick={() => handleClick(shortcut)}>
              <NRadio modelValue={currentPicked.value} value={idx}>
                {shortcut.label}
              </NRadio>
            </div>
          ))}
        </NScrollbar>
      </div>
    );
  },
});
