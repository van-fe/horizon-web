import type { PropType } from 'vue';
import { ref, watch, defineComponent } from 'vue';
import type { LegoComponentInstance, LegoSetupContext } from '@aurora/utils';
import { isDefined, cls, ComponentClassBlock } from '@aurora/utils';
import NScrollbar from '~/components/Scrollbar/src/Scrollbar';
import type { NTimePickerPanelOptionType, NTimePickerShowTimeTooltipType } from '../utils/types';
import type { ScrollbarExposes } from '~/components/Scrollbar/src/composables/useExposes';
import { unrefElement } from '@vueuse/core';
import type { TimePickerTimeColumnPanelExposes } from '../composables/useExposes';
import { useTimePickerTimeColumnPanelExposes } from '../composables/useExposes';
import type { TimePickerTimeColumnPanelEmits } from '../composables/useEmits';
import { useTimePickerTimeColumnPanelEmit } from '../composables/useEmits';
import type { Dayjs, OpUnitType } from 'dayjs';
import tooltip from '~/directives/v-tooltip/src';

export default defineComponent({
  name: 'TimeColumnPanel',
  directives: {
    tooltip,
  },
  props: {
    modelValue: {
      type: Object as PropType<Dayjs | null>,
    },
    options: {
      type: Array as PropType<Array<NTimePickerPanelOptionType>>,
      required: true,
    },
    unit: {
      type: String as PropType<OpUnitType>,
    },
    optionListMaxHeight: {
      type: [String, Number],
    },
    panelVisible: {
      type: Boolean,
      required: true,
    },
    panelType: {
      type: String as PropType<'time' | 'hour' | 'minute' | 'second'>,
      required: true,
    },
    showTimeTooltip: {
      type: Function as PropType<NTimePickerShowTimeTooltipType>,
    },
    previewTime: {
      type: Object as PropType<Dayjs>,
    },
    tooltipShowAfter: {
      type: Number,
      required: true,
    },
    tooltipHideAfter: {
      type: Number,
      required: true,
    },
  },
  emits: useTimePickerTimeColumnPanelEmit,
  exposes: useTimePickerTimeColumnPanelExposes,
  setup(
    props,
    {
      emit,
      expose,
    }: LegoSetupContext<TimePickerTimeColumnPanelEmits, {}, TimePickerTimeColumnPanelExposes>,
  ) {
    const classHelper = new ComponentClassBlock('time-picker');

    const scrollbarDomRefs = ref<LegoComponentInstance<typeof NScrollbar, ScrollbarExposes>>();

    watch(
      () => [props.panelVisible, props.modelValue],
      () => {
        scrollToCell();
      },
    );

    function scrollToCell() {
      setTimeout(() => {
        let targetIndex: number;

        if (isDefined(props.modelValue)) {
          targetIndex = props.options.findIndex(curr =>
            curr.value.isSame(props.modelValue, props.unit),
          );
        } else {
          targetIndex = props.options.findIndex(curr => !curr.disabled);
        }

        if (targetIndex === -1) return;

        unrefElement(scrollbarDomRefs.value?.viewRef)
          ?.querySelector(`.${classHelper.e('time-cell')}:nth-child(${targetIndex + 1})`)
          ?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }

    function handleClick(
      option: NTimePickerPanelOptionType,
      triggerType: 'click' | 'input' | 'confirmable-input' = 'click',
    ) {
      if (!option.disabled) {
        emit('update:modelValue', option.value, triggerType);
        return true;
      } else {
        return false;
      }
    }

    expose({
      clickTimeCell: (
        val: Dayjs,
        triggerType: 'click' | 'input' | 'confirmable-input' = 'click',
      ) => {
        const target = props.options.find(curr => curr.value.isSame(val, props.unit));

        if (target) {
          return handleClick(target, triggerType);
        }

        return false;
      },
    });

    return () => (
      <NScrollbar
        ref={scrollbarDomRefs}
        class={cls(classHelper.e('time-column-panel'))}
        maxHeight={props.optionListMaxHeight}
        viewClass={classHelper.em('time-column-panel', 'option-list')}
        size="small"
        onMouseLeave={() => emit('update:previewTime', undefined)}
      >
        {props.options.map(option => {
          const tooltipRet = props.showTimeTooltip?.(option.value, props.panelType);

          return (
            <div
              v-tooltip={{ show: tooltipRet?.show, content: tooltipRet?.content }}
              class={cls(
                classHelper.e('time-cell'),
                classHelper.is(
                  'active',
                  props.modelValue?.isSame(option.value, props.unit) ?? false,
                ),
                classHelper.is('disabled', option.disabled),
              )}
              onClick={() => handleClick(option)}
              onMouseenter={() => !option.disabled && emit('update:previewTime', option.value)}
            >
              {option.label}
            </div>
          );
        })}
      </NScrollbar>
    );
  },
});
