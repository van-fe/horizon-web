import type { Ref } from 'vue';
import { ref, watch, watchEffect } from 'vue';
import { resolveStepIndexes, resolveStepsBeforeChange, resolveStepsSelection } from '@aurora/core';
import type { StepsProps } from '../composables/useProps';
import type { StepInstance } from '../utils/injectedKeys';

export interface StepsController {
  activeIndex: Ref<number>;
  stepItems: Ref<StepInstance[]>;
  collect: StepInstanceCollector;
  remove: (uuid: string) => void;
  requestChange: (index: number) => Promise<void>;
}

type StepInstanceCollector = (
  props: StepInstance['props'],
  uuid: string,
  setIndex: StepInstance['setIndex'],
  getIndex: StepInstance['getIndex'],
) => void;

export interface StepsControllerEmitters {
  modelValue: (index: number) => void;
  current: (index: number) => void;
  change: (index: number) => void;
}

export function useStepsController(
  props: StepsProps,
  emitters: StepsControllerEmitters,
): StepsController {
  const stepItems = ref<StepInstance[]>([]);
  const activeIndex = ref(props.modelValue);
  let requestVersion = 0;

  function setCurrentIndex(index: number, triggerChange = true): void {
    if (activeIndex.value === index) return;
    activeIndex.value = index;
    emitters.modelValue(index);
    emitters.current(index);
    if (triggerChange) emitters.change(index);
  }

  watch(
    () => props.modelValue,
    value => {
      requestVersion++;
      setCurrentIndex(value, false);
    },
  );

  watchEffect(() => {
    const indexes = resolveStepIndexes(
      stepItems.value.map(item => item.props),
      props.initial,
    );
    stepItems.value.forEach((step, position) => step.setIndex(indexes[position] ?? props.initial));
  });

  async function requestChange(index: number): Promise<void> {
    const selection = resolveStepsSelection(activeIndex.value, index, {
      clickable: true,
      controllable: props.controllable,
    });
    if (!selection.accepted) return;

    const version = ++requestVersion;
    const current = activeIndex.value;
    const nextItem = stepItems.value.find(item => item.getIndex() === index)?.props;
    const currentItem = stepItems.value.find(item => item.getIndex() === current)?.props;
    const accepted = await resolveStepsBeforeChange(
      props.beforeChange,
      index,
      current,
      nextItem,
      currentItem,
    );
    if (version === requestVersion && accepted) setCurrentIndex(index);
  }

  return {
    activeIndex,
    stepItems,
    collect: (stepProps, uuid, setIndex, getIndex) => {
      stepItems.value.push({ props: stepProps, uuid, setIndex, getIndex });
    },
    remove: uuid => {
      const position = stepItems.value.findIndex(item => item.uuid === uuid);
      if (position >= 0) stepItems.value.splice(position, 1);
    },
    requestChange,
  };
}
