import { defineComponent, provide, ref, toRefs, watch, watchEffect } from 'vue';
import { useStepsProps } from './composables/useProps';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, isNumber, useNamespace } from '@aurora/utils';
import type { StepsEmits } from './composables/useEmits';
import { useStepsEmits } from './composables/useEmits';
import type { StepsSlots } from './composables/useSlots';
import { useStepsSlots } from './composables/useSlots';
import type { StepInstance } from './utils/injectedKeys';
import {
  HStepsActiveIndexInjectKey,
  HStepsCollectInjectKey,
  HStepsItemsInjectKey,
  HStepsOnClickStepInjectKey,
  HStepsPropsInjectKey,
  HStepsRemoveInjectKey,
  HStepsSizeInjectKey,
} from './utils/injectedKeys';
import useSize from '~/utils/useSize';

export default defineComponent({
  name: `${useNamespace()}Steps`,
  desc: '引导用户按照流程完成任务的分步导航条，可根据实际应用场景设定步骤，步骤不得少于 2 步',
  descLocales: { en: 'Steps and step components for progress indicators.' },
  props: useStepsProps,
  slots: useStepsSlots,
  emits: useStepsEmits,
  setup(props, { emit, slots }: HorizonWebSetupContext<StepsEmits, StepsSlots>) {
    const classBlock = new ComponentClassBlock('steps');
    const { direction, labelPlacement, progressDot, size, clickable, labelAlign } = toRefs(props);
    const stepItems = ref<Array<StepInstance>>([]);
    const activeIndex = ref(props.modelValue || props.current);

    const setCurrentIndex = (index: number, triggerChange = true) => {
      if (activeIndex.value !== index) {
        activeIndex.value = index;

        emit('update:modelValue', index);

        if (triggerChange) {
          emit('change', index);
        }
      }
    };

    watch(
      () => [props.modelValue, props.current],
      ([val1, val2]) => {
        setCurrentIndex(val1 || val2, false);
      },
    );

    watchEffect(() => {
      let prevIndex = props.initial;

      stepItems.value.forEach(step => {
        if (isNumber(step.props.index)) {
          step.setIndex(step.props.index);
          prevIndex = step.props.index;
        } else {
          step.setIndex(prevIndex);
        }

        prevIndex++;
      });
    });

    provide(HStepsPropsInjectKey, props);
    provide(HStepsItemsInjectKey, stepItems);

    provide(HStepsCollectInjectKey, (props, uuid, setIndex, getIndex) => {
      stepItems.value.push({
        uuid,
        props,
        setIndex,
        getIndex,
      });
    });

    provide(HStepsRemoveInjectKey, (step, uuid) => {
      const index = stepItems.value.findIndex(curr => curr.uuid === uuid);
      if (index >= 0) {
        stepItems.value.splice(index, 1);
      }
    });

    provide(HStepsActiveIndexInjectKey, activeIndex);

    provide(HStepsOnClickStepInjectKey, (index: number) => {
      if (props.controllable) {
        if (props.beforeChange) {
          Promise.resolve(
            props.beforeChange(
              index,
              activeIndex.value,
              stepItems.value.find(curr => curr.getIndex() === index)?.props,
              stepItems.value.find(curr => curr.getIndex() === activeIndex.value)?.props,
            ),
          )
            .then(status => {
              if (status) {
                setCurrentIndex(index);
              }
            })
            .catch(() => {
              // do nothing
            });
        } else {
          setCurrentIndex(index);
        }
      }
    });

    // global size
    const sizeRef = useSize(size, 'medium', { default: 'medium' });
    provide(HStepsSizeInjectKey, sizeRef);

    return () => {
      return (
        <div
          class={cls(
            classBlock.block,
            classBlock.is(sizeRef.value),
            classBlock.is(direction.value),
            classBlock.is('dot', !!progressDot.value),
            classBlock.is('clickable', clickable.value),
            classBlock.is(`label-placement-${labelPlacement.value}`),
            classBlock.is(`label-align-${labelAlign.value}`),
          )}
        >
          {slots.default?.()}
        </div>
      );
    };
  },
});
