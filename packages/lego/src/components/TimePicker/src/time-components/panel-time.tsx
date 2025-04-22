import { defineComponent, toRefs, computed, inject } from 'vue';
import { ComponentClassBlock, useNamespace } from '@nio-fe/shared';
import { NButton } from '~/components/Button';
import BasicTime from './basic-time';
import TimeSpinner from './time-spinner';
import { usePanelTimeProps } from '../composables/useProps';
import type { PanelTimeType } from '../composables/useProps';

export default defineComponent({
  name: `${useNamespace()}PanelTime`,
  components: {
    NButton,
    BasicTime,
    TimeSpinner,
  },
  props: usePanelTimeProps,
  emits: ['changePanelTime', 'pickTime'],
  setup(props, { emit }) {
    const classHelper = new ComponentClassBlock('panel-time');
    const NTimePicker = inject('N_TIME_PICKER') as any;
    const { type } = toRefs(NTimePicker.props);
    const { panelTime, placement } = toRefs(props);
    const timeContent = computed(() => {
      let timeNode;
      switch (type.value) {
        case 'time':
          timeNode = (
            <basic-time
              placement={placement.value}
              panelTime={panelTime.value}
              onChangePanelTime={onChangePanelTime}
              onPickTime={onPickTime}
            ></basic-time>
          );
          break;
        case 'minutes':
        case 'seconds':
          timeNode = (
            <time-spinner
              placement={placement.value}
              panelTime={panelTime.value}
              onChangePanelTime={onChangePanelTime}
              onPickTime={onPickTime}
            ></time-spinner>
          );
          break;
        default:
          timeNode = (
            <basic-time
              placement={placement.value}
              panelTime={panelTime.value}
              onChangePanelTime={onChangePanelTime}
              onPickTime={onPickTime}
            ></basic-time>
          );
          break;
      }
      return timeNode;
    });

    function onChangePanelTime(time: PanelTimeType) {
      emit('changePanelTime', time);
    }
    function onPickTime(value: number, type: string) {
      emit('pickTime', value, type);
    }

    return () => <div class={classHelper.block}>{timeContent.value}</div>;
  },
});
