import { defineComponent, provide, ref, toRefs } from 'vue';
import { focusStepsItem } from '@aurora/horizon-core';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, useNamespace } from '@aurora/utils';
import useSize from '~/utils/useSize';
import type { StepsEmits } from './composables/useEmits';
import { useStepsEmits } from './composables/useEmits';
import type { StepsExposes } from './composables/useExposes';
import { useStepsExposes } from './composables/useExposes';
import { useStepsProps } from './composables/useProps';
import type { StepsSlots } from './composables/useSlots';
import { useStepsSlots } from './composables/useSlots';
import { useStepsController } from './hooks/useStepsController';
import {
  HStepsActiveIndexInjectKey,
  HStepsCollectInjectKey,
  HStepsItemsInjectKey,
  HStepsOnClickStepInjectKey,
  HStepsPropsInjectKey,
  HStepsRemoveInjectKey,
  HStepsSizeInjectKey,
} from './utils/injectedKeys';

export default defineComponent({
  name: `${useNamespace()}Steps`,
  desc: '引导用户按照流程完成任务的分步导航条，可根据实际应用场景设定步骤，步骤不得少于 2 步',
  descLocales: { en: 'Steps and step components for progress indicators.' },
  props: useStepsProps,
  slots: useStepsSlots,
  emits: useStepsEmits,
  exposes: useStepsExposes,
  setup(
    props,
    { emit, slots, expose }: HorizonWebSetupContext<StepsEmits, StepsSlots, StepsExposes>,
  ) {
    const classBlock = new ComponentClassBlock('steps');
    const rootRef = ref<HTMLElement | null>(null);
    const { direction, labelPlacement, progressDot, size, clickable, labelAlign } = toRefs(props);
    const controller = useStepsController(props, {
      modelValue: index => emit('update:modelValue', index),
      current: index => emit('update:current', index),
      change: index => emit('change', index),
    });
    const sizeRef = useSize(size, 'medium', { default: 'medium' });

    provide(HStepsPropsInjectKey, props);
    provide(HStepsItemsInjectKey, controller.stepItems);
    provide(HStepsCollectInjectKey, controller.collect);
    provide(HStepsRemoveInjectKey, (_step, uuid) => controller.remove(uuid));
    provide(HStepsActiveIndexInjectKey, controller.activeIndex);
    provide(HStepsOnClickStepInjectKey, controller.requestChange);
    provide(HStepsSizeInjectKey, sizeRef);

    expose({ focus: (index?: number) => void focusStepsItem(rootRef.value, index) });

    return () => (
      <div
        ref={rootRef}
        class={cls(
          classBlock.block,
          classBlock.is(sizeRef.value),
          classBlock.is(direction.value),
          classBlock.is('dot', progressDot.value),
          classBlock.is('clickable', clickable.value),
          classBlock.is(`label-placement-${labelPlacement.value}`),
          classBlock.is(`label-align-${labelAlign.value}`),
        )}
      >
        {slots.default?.()}
      </div>
    );
  },
});
